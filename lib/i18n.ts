import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import { GetStaticPropsContext } from 'next/types';

export const getI18nProps = async (locale: string, namespaces: string[] = []) => {
    return {
        ...(await serverSideTranslations(locale, namespaces, nextI18NextConfig)),
    };
};

export const getStaticPropsWithI18n = (namespaces: string[] = []) => async (context: GetStaticPropsContext) => {
    const locale = context.locale || 'en';
    return {
        props: await getI18nProps(locale, namespaces),
    };
};
