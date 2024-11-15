'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n-client';

export default function I18nProvider({ children }: PropsWithChildren) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    // Get language from pathname or localStorage or default to 'en'
    const pathLocale = pathname?.split('/')[1];
    const savedLocale = localStorage.getItem('i18nextLng');
    const locale = pathLocale || savedLocale || 'en';
    
    // Save the language preference
    localStorage.setItem('i18nextLng', locale);
    
    i18n.changeLanguage(locale).then(() => {
      setIsI18nInitialized(true);
    });
  }, [pathname]);

  if (!isI18nInitialized) {
    return null;
  }

  return <>{children}</>;
} 