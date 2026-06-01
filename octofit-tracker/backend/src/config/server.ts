import dotenv from 'dotenv';

dotenv.config();

// Build the Codespace URL from CODESPACE_NAME on port 8000, otherwise use localhost.
export const PORT = process.env.PORT || 8000;
export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;
