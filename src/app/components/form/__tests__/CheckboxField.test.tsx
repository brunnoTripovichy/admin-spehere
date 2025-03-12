import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import CheckboxField from '../CheckboxField';

// Wrapper component to provide form context
const FormWrapper = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: any;
}) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CheckboxField Component', () => {
  test('renders checkbox with label', () => {
    render(
      <FormWrapper defaultValues={{ rememberMe: false }}>
        <CheckboxField name="rememberMe" label="Remember me" />
      </FormWrapper>,
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Remember me');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('handles form state changes', () => {
    render(
      <FormWrapper defaultValues={{ rememberMe: false }}>
        <CheckboxField name="rememberMe" label="Remember me" />
      </FormWrapper>,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('initializes with default value', () => {
    render(
      <FormWrapper defaultValues={{ rememberMe: true }}>
        <CheckboxField name="rememberMe" label="Remember me" />
      </FormWrapper>,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('displays helper text when provided', () => {
    render(
      <FormWrapper defaultValues={{ rememberMe: false }}>
        <CheckboxField
          name="rememberMe"
          label="Remember me"
          helperText="Stay logged in for 30 days"
        />
      </FormWrapper>,
    );

    const helperText = screen.getByText('Stay logged in for 30 days');
    expect(helperText).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <FormWrapper defaultValues={{ rememberMe: false }}>
        <CheckboxField
          name="rememberMe"
          label="Remember me"
          className="custom-class"
        />
      </FormWrapper>,
    );

    const checkboxContainer = screen
      .getByRole('checkbox')
      .closest('div')?.parentElement;
    expect(checkboxContainer).toHaveClass('custom-class');
  });

  test('displays error message when form has validation errors', async () => {
    // Create a form with validation errors
    const TestForm = () => {
      const methods = useForm({
        defaultValues: { rememberMe: false },
        mode: 'onChange',
      });

      // Manually set an error
      React.useEffect(() => {
        methods.setError('rememberMe', {
          type: 'manual',
          message: 'This field is required',
        });
      }, [methods]);

      return (
        <FormProvider {...methods}>
          <CheckboxField name="rememberMe" label="Remember me" />
        </FormProvider>
      );
    };

    render(<TestForm />);

    // Wait for the error to appear
    await waitFor(
      () => {
        expect(
          screen.queryByText('This field is required'),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
