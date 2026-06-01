const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const codespaceName =
  typeof rawCodespaceName === 'string' && rawCodespaceName.trim().length > 0
    ? rawCodespaceName.trim()
    : undefined;

// Use Codespaces host when available, otherwise fall back to localhost.
export const API_BASE_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const API_BASE_URL = `${API_BASE_HOST}/api`;

export const normalizeApiResponse = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  return [payload];
};
