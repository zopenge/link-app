import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import authConfig from './config';

// Define the type directly in your code
type CookieOptions = {
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
  maxAge?: number;
};

const TOKEN_NAME = 'auth_token';

// Define default cookie options
const defaultOptions: CookieOptions = {
  path: '/',
  secure: authConfig.session.secure,
  sameSite: 'lax',
  httpOnly: true,
  maxAge: 60 * 60 * 24, // 24 hours
};

// Client-side cookie operations
export const setAuthToken = (token: string, options?: CookieOptions) => {
  setCookie(TOKEN_NAME, token, {
    ...defaultOptions,
    ...options,
  });
};

export const getAuthToken = () => {
  return getCookie(TOKEN_NAME);
};

export const removeAuthToken = () => {
  deleteCookie(TOKEN_NAME);
};

// Server-side cookie operations
export const serverCookies = {
  set: (name: string, value: string, options?: CookieOptions) => {
    // Use next/headers cookies API for server-side
    setCookie(name, value, {
      ...defaultOptions,
      ...options,
    });
  },
  get: (name: string) => {
    return getCookie(name);
  },
  delete: (name: string) => {
    deleteCookie(name);
  },
};
