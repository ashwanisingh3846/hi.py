import React, { useEffect, useState } from 'react';

import { getPathway } from '../lib/api';
import SkillRoadmap from './api/components/SkillRoadmap';

export default function DashboardPage() {
  const [pathway, setPathway] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = localStorage.getItem('tb_pathway');
    if (id) {
      getPathway(id)
        .then((res) => setPathway(res.data))
        .catch(() => {
          // silently ignore in dev if endpoint missing
        });
    }
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <SkillRoadmap pathway={pathway} />
      </div>
      <aside className="col-span-1">
        <div className="bg-white text-gray-800 p-4 rounded">
          <h3 className="font-semibold">Career Forecaster</h3>
          <p className="text-sm mt-2">AI Engineer: +38% growth in 3 years</p>
        </div>

        <div className="bg-white text-gray-800 p-4 rounded mt-4">
          <h3 className="font-semibold">AI Mentor</h3>
          <p className="text-sm mt-2">Ask a quick question about your lesson.</p>
          <button className="mt-3 bg-sky-600 text-white px-3 py-1 rounded">Ask Mentor</button>
        </div>
      </aside>
    </div>
  );
}
