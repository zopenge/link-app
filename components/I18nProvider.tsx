'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n-client';

export default function I18nProvider({ children }: PropsWithChildren) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Retrieve the saved language from localStorage
      const savedLocale = localStorage.getItem('i18nextLng');
      // Extract the language code from the pathname
      const pathLocale = pathname?.split('/')[1];
      // Determine the locale to use: pathLocale, savedLocale, or default to 'en'
      const locale = pathLocale || savedLocale || 'en';

      // Change language only if it's different from the current language
      if (i18n.language !== locale) {
        i18n.changeLanguage(locale).then(() => {
          setIsI18nInitialized(true);
        });
      } else {
        setIsI18nInitialized(true);
      }

      // Save the language preference to localStorage
      localStorage.setItem('i18nextLng', locale);
    }
  }, [pathname]);

  if (!isI18nInitialized) {
    return null;
  }

  return <>{children}</>;
}