import React, { useState } from 'react';
import { authLogin, authSignup } from '../../../lib/api';
import { saveToken } from '../../../lib/auth';


const AuthForm: React.FC<{ mode?: 'login' | 'signup' }> = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
//   interface AuthResponse{
//     data:{
//       token:string
//     }
//   }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const res = await authSignup({ name, email, password, role: 'student' });
        if (res?.data?.token) saveToken(res.data.token);
        window.location.href = '/onboarding';
      } else {
        const res = await authLogin({ email, password });
        if (res?.data?.token) saveToken(res.data.token);
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Unexpected error';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg text-gray-800 w-full max-w-md">
      <h2 className="text-2xl mb-4">{mode === 'signup' ? 'Create account' : 'Welcome back'}</h2>
      {mode === 'signup' && (
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full p-2 rounded mb-3 border" />
      )}
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded mb-3 border" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 rounded mb-3 border" />
      <button disabled={loading} type="submit" className="w-full bg-sky-600 text-white py-2 rounded">{loading ? 'Please wait...' : (mode === 'signup' ? 'Sign up' : 'Log in')}</button>
    </form>
  );
};

export default AuthForm;
