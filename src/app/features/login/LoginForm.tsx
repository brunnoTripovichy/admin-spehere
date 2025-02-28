'use client';

import { useI18n } from '../../../providers/I18nProvider';
import Form from '../../components/form/Form';
import * as yup from 'yup';
import TextField from '../../components/form/TextField';
import PasswordField from '../../components/form/PasswordField';

interface LoginFormProps {
  className?: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useI18n();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p></p>

      <Form onSubmit={(data) => console.log(data)} validationSchema={schema}>
        <TextField
          name="email"
          label={t('form.username', 'login')}
          placeholder={t('form.usernamePlaceholder', 'login')}
        />

        <PasswordField
          name="password"
          label={t('form.password', 'login')}
          placeholder={t('form.passwordPlaceholder', 'login')}
        />
      </Form>
    </div>
  );
};

export default LoginForm;
