'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '../../../providers/I18nProvider';
import Button from '../../components/Button';
import TextField from '../../components/form/TextField';
import Form from '../../components/form/Form';
import * as yup from 'yup';

interface ForgotPasswordFormProps {
  className?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  className,
}) => {
  const { t, lng } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('form.invalidEmail', 'login'))
      .required(t('form.emailRequired', 'login')),
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would call an API endpoint
      console.log('Password reset requested for:', data.email);

      setIsSubmitted(true);
    } catch (err) {
      setError(t('form.resetPasswordError', 'login'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 ${className}`}
      data-testid="forgot-password-form"
    >
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {!isSubmitted ? (
        <Form
          onSubmit={handleSubmit}
          validationSchema={schema}
          defaultValues={{
            email: '',
          }}
        >
          <TextField
            name="email"
            label={t('form.email', 'login')}
            placeholder={t('form.emailPlaceholder', 'login')}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
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
                {t('form.sending', 'login')}
              </span>
            ) : (
              t('form.resetPassword', 'login')
            )}
          </Button>
        </Form>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-green-600 dark:text-green-400 mb-4">
            {t('form.resetPasswordSuccess', 'login')}
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href={`/${lng}/login`}
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t('form.backToLogin', 'login')}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
