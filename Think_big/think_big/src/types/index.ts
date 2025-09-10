export type Role = 'student' | 'parent' | 'teacher' | 'mentor' | 'admin';

export interface User {
  id: string;
  name?: string;
  email?: string;
  role?: Role;
  grade_range?: '5-8' | '9-12' | 'college' | 'adult';
}

export interface PathwayNode {
  id: string;
  type: 'module' | 'project';
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  estimate_minutes?: number;
}

export interface Pathway {
  id: string;
  user_id: string;
  title: string;
  nodes: PathwayNode[];
}