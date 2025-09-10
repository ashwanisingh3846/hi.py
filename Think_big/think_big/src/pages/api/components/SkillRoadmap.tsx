import React from 'react';
import { Pathway } from '../../../types';

const SkillRoadmap: React.FC<{ pathway?: Pathway | null }> = ({ pathway = null }) => {
  const nodes = pathway?.nodes ?? [
    { id: '1', type: 'module', title: 'Python Basics', status: 'done' },
    { id: '2', type: 'module', title: 'Intro to ML', status: 'in_progress' },
    { id: '3', type: 'project', title: 'Image Classifier', status: 'todo' },
  ];

  return (
    <div className="bg-white p-4 rounded text-gray-800">
      <h3 className="font-semibold mb-3">My Skill Pathway</h3>
      <div className="flex gap-3 overflow-x-auto">
        {nodes.map((n) => (
          <div key={n.id} className={`p-3 rounded w-48 flex-shrink-0 ${n.status === 'done' ? 'bg-green-100' : n.status === 'in_progress' ? 'bg-yellow-100' : 'bg-gray-100'}`}>
            <div className="text-sm font-semibold">{n.title}</div>
            <div className="text-xs mt-2">{n.type}</div>
            <div className="text-xs mt-1 opacity-70">{n.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRoadmap;
