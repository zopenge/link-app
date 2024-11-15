'use client';

import '@/lib/i18n-client';
import { useTranslation } from 'react-i18next';

export default function LocalizedHome() {
  const { t } = useTranslation(['common']);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>{t('welcome')}</h1>
      <p>{t('home')}</p>
    </div>
  );
} 