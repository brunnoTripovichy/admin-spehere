import type React from 'react';
import Logo from '../../components/Logo';
import { useTranslation } from '../../i18n';
import type { PageProps } from '../../../types';
import Heading3 from '../../components/typography/Heading3';
import HelperTextInfo from '../../components/typography/HelperTextInfo';

const Page: React.FC<PageProps> = async ({ params }) => {
  const lng = (await params).lng;
  const { t } = await useTranslation(lng, 'login');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <Logo className="flex justify-center" />
        <Heading3 className="text-center mt-3">{t('title')}</Heading3>
        <HelperTextInfo className="text-center mt-2">
          {t('description')}
        </HelperTextInfo>
      </div>
    </div>
  );
};

export default Page;
