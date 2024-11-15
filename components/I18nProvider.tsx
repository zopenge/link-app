'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n-client';

export default function I18nProvider({ children }: PropsWithChildren) {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const locale = pathname?.split('/')[1] || 'en';
    i18n.changeLanguage(locale).then(() => {
      setIsI18nInitialized(true);
    });
  }, [pathname]);

  if (!isI18nInitialized) {
    return null;
  }

  return <>{children}</>;
} 