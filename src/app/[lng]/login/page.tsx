import type React from 'react';
import Logo from '../../components/Logo';
import { useTranslation } from '../../i18n';

interface PageProps {
  params: {
    lng: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const lng = (await params).lng;
  const { t } = await useTranslation(lng, 'login');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card">
        <Logo />
        <h2>{t('title')}</h2>
      </div>
    </div>
  );
};

export default Page;
