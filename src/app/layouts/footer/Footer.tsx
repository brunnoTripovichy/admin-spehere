'use client';

import { useI18n } from '../../../providers/I18nProvider';
import { languages } from '../../i18n/settings';

const Footer = () => {
  const { lng, t, changeLanguage } = useI18n();

  return (
    <footer>
      <p>
        {t('languageSwitcher')} <strong>{lng}</strong> to:{' '}
      </p>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => (
          <span key={l}>
            {index > 0 && ' or '}
            <a onClick={() => changeLanguage(l)}>{l}</a>
          </span>
        ))}
    </footer>
  );
};

export default Footer;
