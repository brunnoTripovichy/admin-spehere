'use client';
import { useI18n } from '../../../providers/I18nProvider';
import Logo from '../../components/Logo';
import { logout } from '../../../services/authService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Header = () => {
    const { t, lng } = useI18n();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push(`/${lng}/login`);
    };
    return (<header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={`/${lng}/dashboard`} className="flex items-center gap-2">
          <Logo className="h-8 w-auto"/>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('title')}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${lng}/dashboard`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
            {t('navigation.dashboard')}
          </Link>
          <Link href={`/${lng}/settings`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
            {t('navigation.settings')}
          </Link>
          <Link href={`/${lng}/profile`} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
            {t('navigation.profile')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="text-sm px-4 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors">
            {t('navigation.logout')}
          </button>
        </div>
      </div>
    </header>);
};
export default Header;
