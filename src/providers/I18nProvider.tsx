'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '../app/i18n';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../stores/store';
import { setLanguage } from '../stores/language/languageSlice';

interface I18nContextType {
  lng: string;
  t: (key: string, ns?: string) => string;
  changeLanguage: (lng: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const I18nProvider = ({
  children,
  initialLng,
  namespaces,
  initialTranslations,
}: {
  children: React.ReactNode;
  initialLng?: string;
  namespaces: string[];
  initialTranslations: Record<string, (key: string) => string>;
}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage,
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  // Use `initialLng` if provided, otherwise fallback to Redux state
  const [lng, setLng] = useState(initialLng || currentLanguage);
  const [translations, setTranslations] = useState(initialTranslations);

  useEffect(() => {
    const loadTranslations = async (): Promise<void> => {
      const loadedTranslations: Record<string, (key: string) => string> = {};
      for (const ns of namespaces) {
        const { t } = await useTranslation(lng, ns);
        loadedTranslations[ns] = t;
      }
      setTranslations(loadedTranslations);
    };

    loadTranslations();
  }, [lng, namespaces]);

  const changeLanguage = (newLng: string): void => {
    setLng(newLng);
    dispatch(setLanguage(newLng));
    router.push(`/${newLng}${pathname.replace(/^\/[a-z]{2}/, '')}`);
  };

  const t = (key: string, ns: string = namespaces[0]): string => {
    return translations[ns]?.(key) || key;
  };

  return (
    <I18nContext.Provider value={{ lng, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;

const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export { useI18n };
