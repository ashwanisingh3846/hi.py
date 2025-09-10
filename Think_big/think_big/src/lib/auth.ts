export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tb_token', token);
  }
};
export const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('tb_token') : null);
export const clearToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('tb_token');
};
