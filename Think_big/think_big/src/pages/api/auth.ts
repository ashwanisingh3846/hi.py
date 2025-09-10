import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body || {};
    return res.status(200).json({ token: 'dev-token', user: { id: 'u1', name: name || 'Student', email: email || null } });
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
