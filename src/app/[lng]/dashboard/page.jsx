import { useTranslation } from '../../i18n';
import DashboardContent from '../../features/dashboard/DashboardContent';
import I18nProvider from '../../../providers/I18nProvider';
import StoreProvider from '../../../providers/StoreProvider';
const Page = async ({ params }) => {
    const lng = params.lng;
    const { t } = await useTranslation(lng, 'dashboard');
    return (<StoreProvider>
      <I18nProvider namespaces={['common', 'dashboard']} initialTranslations={{}}>
        <DashboardContent />
      </I18nProvider>
    </StoreProvider>);
};
export default Page;
