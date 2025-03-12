'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '../app/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../stores/language/languageSlice';
const I18nContext = createContext(undefined);
const I18nProvider = ({ children, initialLng, namespaces, initialTranslations, }) => {
    const currentLanguage = useSelector((state) => state.language.currentLanguage);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();
    // Use `initialLng` if provided, otherwise fallback to Redux state
    const [lng, setLng] = useState(initialLng || currentLanguage);
    const [translations, setTranslations] = useState(initialTranslations);
    useEffect(() => {
        const loadTranslations = async () => {
            const loadedTranslations = {};
            for (const ns of namespaces) {
                const { t } = await useTranslation(lng, ns);
                loadedTranslations[ns] = t;
            }
            setTranslations(loadedTranslations);
        };
        loadTranslations();
    }, [lng, namespaces]);
    const changeLanguage = (newLng) => {
        setLng(newLng);
        dispatch(setLanguage(newLng));
        router.push(`/${newLng}${pathname.replace(/^\/[a-z]{2}/, '')}`);
    };
    const t = (key, ns = namespaces[0]) => {
        var _a;
        return ((_a = translations[ns]) === null || _a === void 0 ? void 0 : _a.call(translations, key)) || key;
    };
    return (<I18nContext.Provider value={{ lng, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>);
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
