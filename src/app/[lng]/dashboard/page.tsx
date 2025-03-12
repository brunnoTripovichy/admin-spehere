import type React from 'react';
import { useTranslation } from '../../i18n';
import type { ComponentProps } from '../../../types';
import Heading3 from '../../components/typography/Heading3';
import I18nProvider from '../../../providers/I18nProvider';
import StoreProvider from '../../../providers/StoreProvider';
import DashboardContent from '../../features/dashboard/DashboardContent';

const DashboardPage: React.FC<ComponentProps> = async ({ params }) => {
  const lng = (await params).lng;
  const { t } = await useTranslation(lng, 'common');

  return (
    <div className="p-6 min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <Heading3 className="mb-6">
          {t('dashboard.title', 'Dashboard')}
        </Heading3>

        <StoreProvider>
          <I18nProvider
            namespaces={['common', 'dashboard']}
            initialTranslations={{}}
          >
            <DashboardContent />
          </I18nProvider>
        </StoreProvider>
      </div>
    </div>
  );
};

export default DashboardPage;
