'use client';

import { useI18n } from '../../../providers/I18nProvider';
import ThemeSwitcher from '../../features/theme/ThemeSwitcher';
import { languages } from '../../i18n/settings';
import Link from 'next/link';

const Footer = () => {
  const { lng, t, changeLanguage } = useI18n();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 transition-colors duration-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Language:</span>
            <div className="flex gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => changeLanguage(language)}
                  className={`px-2 py-1 rounded ${
                    lng === language
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
