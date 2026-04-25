// Centralized API configuration
// In production, this falls back to '/api' assuming frontend and backend 
// are served from the same domain, or uses a provided VITE_API_URL environment variable.

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
