import React, { useState } from 'react';
import { generatePathway } from '../../../lib/api';

const INTERESTS = ['Software Development', 'AI/ML', 'Data Science', 'Vision', 'Biology', 'Arts'];

const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [grade, setGrade] = useState<'5-8' | '9-12' | 'college' | 'adult'>('9-12');
  const [loading, setLoading] = useState(false);

  const toggle = (i: string) => {
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };

  const next = async () => {
    if (step === 0) return setStep(1);
    if (step === 1) {
      setLoading(true);
      try {
        const res = await generatePathway({ user_profile: { age_or_grade: grade, interests: selected, skill_level: 'beginner' } });
        const pathwayId = res?.data?.pathway_id || '';
        if (typeof window !== 'undefined' && pathwayId) {
          localStorage.setItem('tb_pathway', pathwayId);
          window.location.href = '/dashboard';
        }
      } catch (err) {
        alert('Failed to generate pathway.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded text-gray-800 max-w-2xl">
      {step === 0 && (
        <div>
          <h3 className="text-xl font-semibold">Choose your grade</h3>
          <div className="flex gap-2 mt-3">
            {['5-8', '9-12', 'college', 'adult'].map((g) => (
              <button key={g} onClick={() => setGrade(g as any)} className={`px-3 py-2 rounded ${grade === g ? 'bg-sky-600 text-white' : 'bg-gray-100'}`}>{g}</button>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Pick interests</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {INTERESTS.map((i) => (
                <button key={i} onClick={() => toggle(i)} className={`px-3 py-2 rounded ${selected.includes(i) ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>{i}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold">Quick summary</h3>
          <p className="mt-2">Grade: <strong>{grade}</strong></p>
          <p className="mt-1">Interests: <strong>{selected.join(', ') || '—'}</strong></p>
          <p className="mt-2 text-sm text-gray-600">We will now create a short learning roadmap for you.</p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="px-3 py-2 bg-gray-200 rounded">Back</button>
        <button onClick={next} disabled={loading} className="px-3 py-2 bg-sky-600 text-white rounded">{loading ? 'Working...' : step === 1 ? 'Create Roadmap' : 'Next'}</button>
      </div>
    </div>
  );
};

export default OnboardingWizard;
