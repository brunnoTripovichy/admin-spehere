import type React from 'react';
import Logo from '../../components/Logo';
import { useTranslation } from '../../i18n';
import Heading3 from '../../components/typography/Heading3';
import HelperTextInfo from '../../components/typography/HelperTextInfo';
import LoginForm from '../../features/login/LoginForm';
import I18nProvider from '../../../providers/I18nProvider';
import StoreProvider from '../../../providers/StoreProvider';
import { PageProps } from '../../../types/props/common';

const Page = async ({ params }: PageProps) => {
  const lng = params.lng;
  const { t } = await useTranslation(lng, 'login');

  return (
    <div
      className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 min-h-full
                 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <div
        className="w-full max-w-md p-6 rounded-lg border shadow-md 
                   bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
                   text-gray-900 dark:text-gray-100 transition-all duration-200"
      >
        <Logo className="flex justify-center" />
        <Heading3 className="text-center mt-3">{t('title')}</Heading3>
        <HelperTextInfo className="text-center mt-2">
          {t('description')}
        </HelperTextInfo>

        <StoreProvider>
          <I18nProvider
            namespaces={['common', 'login']}
            initialTranslations={{}}
          >
            <LoginForm className="mt-6" />
          </I18nProvider>
        </StoreProvider>
      </div>
    </div>
  );
};

export default Page;
