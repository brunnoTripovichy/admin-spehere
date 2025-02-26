'use client';

import { useI18n } from '../../../providers/I18nProvider';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useI18n();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p>{t('form.username', 'login')}</p>
    </div>
  );
};

export default LoginForm;
