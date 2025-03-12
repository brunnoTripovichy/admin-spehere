import React from 'react';
import { render, screen, fireEvent, waitFor, act, } from '@testing-library/react';
import ForgotPasswordForm from '../ForgotPasswordForm';
// Mock the I18nProvider
jest.mock('../../../../providers/I18nProvider', () => ({
    useI18n: () => ({
        t: (key) => {
            const translations = {
                'form.email': 'Email Address',
                'form.emailPlaceholder': 'Enter your email address',
                'form.invalidEmail': 'Please enter a valid email address',
                'form.emailRequired': 'Email is required',
                'form.resetPassword': 'Reset Password',
                'form.sending': 'Sending...',
                'form.resetPasswordError': 'An error occurred. Please try again.',
                'form.resetPasswordSuccess': 'If an account exists with this email, you will receive password reset instructions.',
                'form.backToLogin': 'Back to Login',
            };
            return translations[key] || key;
        },
        lng: 'en',
    }),
}));
describe('ForgotPasswordForm Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        // Mock console.log
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    test('renders forgot password form with email field', () => {
        render(<ForgotPasswordForm />);
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
        expect(screen.getByText('Back to Login')).toBeInTheDocument();
    });
    test('handles form submission with valid email', async () => {
        render(<ForgotPasswordForm />);
        // Fill in the form
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'test@example.com' },
        });
        // Submit the form and wait for loading state
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
            // Wait a bit for the loading state to appear
            await new Promise((resolve) => setTimeout(resolve, 10));
        });
        // Check for loading state
        expect(screen.getByText('Sending...')).toBeInTheDocument();
        // Wait for the form submission to complete
        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('Password reset requested for:', 'test@example.com');
        });
        // Check for success message
        await waitFor(() => {
            expect(screen.getByText('If an account exists with this email, you will receive password reset instructions.')).toBeInTheDocument();
        });
        // Check that the form is no longer displayed
        expect(screen.queryByLabelText('Email Address')).not.toBeInTheDocument();
    });
    test('validates email format', async () => {
        render(<ForgotPasswordForm />);
        // Fill in the form with invalid email
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'invalid-email' },
        });
        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
        });
        // Wait for validation error
        await waitFor(() => {
            expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });
        // Check that the form is still displayed
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });
    test('handles error during form submission', async () => {
        // Mock console.log to throw an error
        const originalConsoleLog = console.log;
        console.log = jest.fn().mockImplementation(() => {
            throw new Error('Test error');
        });
        render(<ForgotPasswordForm />);
        // Fill in the form
        fireEvent.change(screen.getByLabelText('Email Address'), {
            target: { value: 'test@example.com' },
        });
        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Reset Password' }));
            // Wait a bit for the error to appear
            await new Promise((resolve) => setTimeout(resolve, 10));
        });
        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
        });
        // Check that the form is still displayed
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        // Restore original console.log
        console.log = originalConsoleLog;
    });
    test('applies custom className', () => {
        render(<ForgotPasswordForm className="custom-class"/>);
        const formContainer = screen.getByTestId('forgot-password-form');
        expect(formContainer).toHaveClass('custom-class');
    });
});
