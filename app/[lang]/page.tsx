'use client';

import { useTranslation } from 'react-i18next';
import '../../lib/i18n-client';

export default function LocalizedHome() {
  const { t } = useTranslation(['common']);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>{t('common:welcome')}</h1>
      <p>{t('common:home')}</p>
    </div>
  );
} 