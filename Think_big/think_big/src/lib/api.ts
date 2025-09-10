import axios, {  } from 'axios';
import { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

interface AuthResponse {
  token: string;
}

export const authSignup = (
  payload: any
): Promise<AxiosResponse<AuthResponse>> =>
  API.post<AuthResponse>('/auth/signup', payload);

export const authLogin = (
  payload: { email: string; password: string }
): Promise<AxiosResponse<AuthResponse>> =>
  API.post<AuthResponse>('/auth/login', payload);

export const generatePathway = (payload: any) =>
    API.post('/pathway/generate', payload);

export const getPathway = (id: string) =>
    API.get(`/pathway/${id}`);

export default API;
