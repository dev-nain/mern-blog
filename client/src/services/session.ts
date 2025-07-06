// session.ts
// Handles session token storage with expiration

const TOKEN_KEY = "token";
const EXPIRY_KEY = "token_expiry";
const EXPIRY_DAYS = 7;

function getExpiryTimestamp() {
  return Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, getExpiryTimestamp().toString());
}

export function getToken(): string | null {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!expiry) return null;
  if (Date.now() > Number(expiry)) {
    removeToken();
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > Number(expiry);
} 