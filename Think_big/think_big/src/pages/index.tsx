import React from 'react';
import AuthForm from './api/components/AuthForm';
;

export default function Home() {
  return (
    <div className="flex items-center gap-10">
      <div className="w-1/2 text-white">
        <h1 className="text-5xl font-bold">ThinkBig</h1>
        <p className="mt-4 text-lg">Your personalized roadmap to future-proof skills.</p>
      </div>
      <div className="w-1/2">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
