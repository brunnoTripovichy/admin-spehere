import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import TextField from '../TextField';

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

describe('TextField Component', () => {
  test('renders with label and placeholder', () => {
    render(
      <FormWrapper defaultValues={{ email: '' }}>
        <TextField
          name="email"
          label="Email Address"
          placeholder="Enter your email"
        />
      </FormWrapper>,
    );

    const label = screen.getByText('Email Address');
    const input = screen.getByPlaceholderText('Enter your email');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <FormWrapper defaultValues={{ email: '' }}>
        <TextField name="email" label="Email Address" />
      </FormWrapper>,
    );

    const input = screen.getByLabelText('Email Address') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(input.value).toBe('test@example.com');
  });

  test('initializes with default value', () => {
    render(
      <FormWrapper defaultValues={{ email: 'initial@example.com' }}>
        <TextField name="email" label="Email Address" />
      </FormWrapper>,
    );

    const input = screen.getByLabelText('Email Address') as HTMLInputElement;
    expect(input.value).toBe('initial@example.com');
  });

  test('displays helper text when provided', () => {
    render(
      <FormWrapper defaultValues={{ email: '' }}>
        <TextField
          name="email"
          label="Email Address"
          helperText="We'll never share your email"
        />
      </FormWrapper>,
    );

    const helperText = screen.getByText("We'll never share your email");
    expect(helperText).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <FormWrapper defaultValues={{ email: '' }}>
        <TextField
          name="email"
          label="Email Address"
          className="custom-class"
        />
      </FormWrapper>,
    );

    // The className should be applied to the field container
    const fieldContainer = screen.getByText('Email Address').closest('.field');
    expect(fieldContainer).toHaveClass('custom-class');
  });

  test('displays error message when form has validation errors', async () => {
    // Create a form with validation errors
    const TestForm = () => {
      const methods = useForm({
        defaultValues: { email: '' },
        mode: 'onChange',
      });

      // Manually set an error
      React.useEffect(() => {
        methods.setError('email', {
          type: 'manual',
          message: 'Please enter a valid email address',
        });
      }, [methods]);

      return (
        <FormProvider {...methods}>
          <TextField name="email" label="Email Address" />
        </FormProvider>
      );
    };

    render(<TestForm />);

    // Wait for the error to appear
    await waitFor(
      () => {
        expect(
          screen.queryByText('Please enter a valid email address'),
        ).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
