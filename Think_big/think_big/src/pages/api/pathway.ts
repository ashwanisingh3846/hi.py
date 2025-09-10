import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id = 'path-' + Math.random().toString(36).slice(2, 9);
    const payload = {
      pathway_id: id,
      title: 'Beginner AI/ML Pathway',
      nodes: [
        { id: 'n1', type: 'module', title: 'Python Basics', status: 'todo' },
        { id: 'n2', type: 'module', title: 'Data & Visualization', status: 'todo' },
        { id: 'n3', type: 'project', title: 'Image Classifier', status: 'todo' },
      ],
    };
    return res.status(200).json(payload);
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
