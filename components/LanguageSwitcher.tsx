'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../lib/i18n-client';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = async (locale: string) => {
        await i18n.changeLanguage(locale);
        const newPath = pathname?.replace(/^\/[a-z]{2}/, '');
        router.push(`/${locale}${newPath || '/'}`);
    };

    return (
        <div className="flex gap-2">
            <button 
                className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('en')}
            >
                English
            </button>
            <button 
                className={`px-3 py-1 rounded ${i18n.language === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => changeLanguage('zh')}
            >
                中文
            </button>
        </div>
    );
}
