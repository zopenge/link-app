import type { NextConfig } from "next";
import { i18n } from './next-i18next.config';

const nextConfig: NextConfig = {
  i18n,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_KEY: process.env.SUPABASE_KEY || '',
    AI_PROVIDER: process.env.AI_PROVIDER || 'default',
    AI_API_KEY: process.env.AI_API_KEY || ''
  }
};

export default nextConfig;
