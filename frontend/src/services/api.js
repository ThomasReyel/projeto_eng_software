import axios from 'axios';

// Mude para false quando o servidor Django estiver rodando
export const USE_MOCK_DATA = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

// Aceita tanto lista simples [...] quanto paginada do DRF { results: [...] }
export function extractList(data) {
  if (Array.isArray(data)) return data;
  return data?.results || [];
}

export default api;