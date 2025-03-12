import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import PasswordField from '../PasswordField';
// Wrapper component to provide form context
const FormWrapper = ({ children, defaultValues = {}, }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
};
describe('PasswordField Component', () => {
    test('renders with label and placeholder', () => {
        render(<FormWrapper defaultValues={{ password: '' }}>
        <PasswordField name="password" label="Password" placeholder="Enter your password"/>
      </FormWrapper>);
        const label = screen.getByText('Password');
        const input = screen.getByPlaceholderText('Enter your password');
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'password');
    });
    test('toggles password visibility', () => {
        render(<FormWrapper defaultValues={{ password: 'secret123' }}>
        <PasswordField name="password" label="Password"/>
      </FormWrapper>);
        const input = screen.getByLabelText('Password');
        expect(input.type).toBe('password');
        // Find and click the toggle button
        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);
        // Password should now be visible
        expect(input.type).toBe('text');
        // Click again to hide
        fireEvent.click(toggleButton);
        expect(input.type).toBe('password');
    });
    test('handles input changes', () => {
        render(<FormWrapper defaultValues={{ password: '' }}>
        <PasswordField name="password" label="Password"/>
      </FormWrapper>);
        const input = screen.getByLabelText('Password');
        fireEvent.change(input, { target: { value: 'newpassword' } });
        expect(input.value).toBe('newpassword');
    });
    test('initializes with default value', () => {
        render(<FormWrapper defaultValues={{ password: 'initialpassword' }}>
        <PasswordField name="password" label="Password"/>
      </FormWrapper>);
        const input = screen.getByLabelText('Password');
        expect(input.value).toBe('initialpassword');
    });
    test('displays helper text when provided', () => {
        render(<FormWrapper defaultValues={{ password: '' }}>
        <PasswordField name="password" label="Password" helperText="Must be at least 8 characters"/>
      </FormWrapper>);
        const helperText = screen.getByText('Must be at least 8 characters');
        expect(helperText).toBeInTheDocument();
    });
    test('applies custom className', () => {
        render(<FormWrapper defaultValues={{ password: '' }}>
        <PasswordField name="password" label="Password" className="custom-class"/>
      </FormWrapper>);
        // The className should be applied to the field container
        const fieldContainer = screen.getByText('Password').closest('.field');
        expect(fieldContainer).toHaveClass('custom-class');
    });
    test('displays error message when form has validation errors', async () => {
        // Create a form with validation errors
        const TestForm = () => {
            const methods = useForm({
                defaultValues: { password: '' },
                mode: 'onChange',
            });
            // Manually set an error
            React.useEffect(() => {
                methods.setError('password', {
                    type: 'manual',
                    message: 'Password must be at least 8 characters',
                });
            }, [methods]);
            return (<FormProvider {...methods}>
          <PasswordField name="password" label="Password"/>
        </FormProvider>);
        };
        render(<TestForm />);
        // Wait for the error to appear
        await waitFor(() => {
            expect(screen.queryByText('Password must be at least 8 characters')).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});
