'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { GB, CN } from 'country-flag-icons/react/3x2';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { setCookie } from 'cookies-next';
import '../lib/i18n-client';

const languages = [
    {
        code: 'en',
        name: 'English',
        flag: GB
    },
    {
        code: 'zh',
        name: '中文',
        flag: CN
    }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
    const Flag = currentLanguage.flag;

    const changeLanguage = async (locale: string) => {
        // Save the language preference in both localStorage and cookie
        localStorage.setItem('i18nextLng', locale);
        setCookie('i18nextLng', locale, {
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        await i18n.changeLanguage(locale);
        const newPath = pathname?.replace(/^\/[a-z]{2}/, '');
        router.push(`/${locale}${newPath || '/'}`);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-200">
                <Flag className="w-5 h-5" />
                <span>{currentLanguage.name}</span>
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {languages.map((language) => {
                            const LangFlag = language.flag;
                            return (
                                <Menu.Item key={language.code}>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-gray-100' : ''
                                                } ${i18n.language === language.code ? 'bg-gray-50' : ''
                                                } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                                            onClick={() => changeLanguage(language.code)}
                                        >
                                            <LangFlag className="w-5 h-5" />
                                            {language.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
