import type { UserConfig } from 'next-i18next';

const i18nConfig: UserConfig = {
    i18n: {
        locales: ['en', 'zh'],
        defaultLocale: 'en',
    },
    ns: ['common'],
    defaultNS: 'common',
};

export default i18nConfig;