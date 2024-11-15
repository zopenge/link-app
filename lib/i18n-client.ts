import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from '../next-i18next.config';

const initI18n = () => {
  if (i18n.isInitialized) return;

  Promise.all([
    import('../public/locales/en/common.json'),
    import('../public/locales/zh/common.json')
  ]).then(([enCommon, zhCommon]) => {
    const resources = {
      en: {
        common: enCommon.default
      },
      zh: {
        common: zhCommon.default
      }
    };

    i18n
      .use(initReactI18next)
      .init({
        ...nextI18NextConfig,
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      });
  });
};

initI18n();

export default i18n;