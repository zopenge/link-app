'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function WelcomePage() {
  const { t } = useTranslation(['common']);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome')}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('welcome.description')}
          </p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}