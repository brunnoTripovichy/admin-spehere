'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useI18n } from '../../../providers/I18nProvider';
import Form from '../../components/form/Form';
import * as yup from 'yup';
import TextField from '../../components/form/TextField';
import PasswordField from '../../components/form/PasswordField';
import Button from '../../components/Button';
import CheckboxField from '../../components/form/CheckboxField';
import Link from 'next/link';
import { login, isAuthenticated } from '../../../services/authService';

interface LoginFormProps {
  className?: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'At least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().optional(),
});

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t, lng } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the callback URL from the query parameters
  const callbackUrl = searchParams.get('callbackUrl') || `/dashboard`;

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      router.push(
        callbackUrl.startsWith('/') ? callbackUrl : `/${lng}${callbackUrl}`,
      );
    }
  }, [router, callbackUrl, lng]);

  const handleSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (response.success) {
        // Store user data in localStorage for the dashboard
        localStorage.setItem(
          'user_data',
          JSON.stringify({
            name: response.user?.name || 'User',
            email: response.user?.email || data.email,
          }),
        );

        // Redirect to the callback URL or dashboard
        const redirectPath = callbackUrl.startsWith('/')
          ? callbackUrl
          : `/${lng}${callbackUrl}`;

        router.push(redirectPath);
      } else {
        // Show error message
        setError(response.error || t('form.loginFailed', 'login'));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('form.loginFailed', 'login'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <Form
        onSubmit={handleSubmit}
        validationSchema={schema}
        defaultValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
      >
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

        <div className="flex justify-between items-center mt-2">
          <CheckboxField
            name="rememberMe"
            label={t('form.rememberMe', 'login')}
          />

          <Link
            href={`/${lng}/forgot-password`}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t('form.forgotPassword', 'login')}
          </Link>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t('form.loggingIn', 'login')}
            </span>
          ) : (
            t('form.submit', 'login')
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
