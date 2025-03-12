import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import LoginForm from '../LoginForm';
import { login } from '../../../../services/authService';

// Mock the authService
jest.mock('../../../../services/authService', () => ({
  login: jest.fn(),
  isAuthenticated: jest.fn().mockReturnValue(false),
}));

// Mock the I18nProvider
jest.mock('../../../../providers/I18nProvider', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'form.username': 'Username',
        'form.usernamePlaceholder': 'Enter your username',
        'form.password': 'Password',
        'form.passwordPlaceholder': 'Enter your password',
        'form.rememberMe': 'Remember me',
        'form.forgotPassword': 'Forgot password?',
        'form.submit': 'Login',
        'form.loggingIn': 'Logging in...',
        'form.loginFailed': 'Login failed. Please try again.',
      };
      return translations[key] || key;
    },
    lng: 'en',
  }),
}));

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('renders login form with all fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    // Mock successful login
    (login as jest.Mock).mockResolvedValue({
      success: true,
      user: { name: 'Test User', email: 'test@example.com' },
    });

    render(<LoginForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Check remember me
    fireEvent.click(screen.getByLabelText('Remember me'));

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    // Wait for the login process to complete
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });
    });

    // Check that user data was stored in localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user_data',
      JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
      }),
    );
  });

  test('displays error message on login failure', async () => {
    // Mock failed login
    (login as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    render(<LoginForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    });

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    // Check that localStorage was not called
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test('displays loading state during login process', async () => {
    // Mock login with delay to show loading state
    (login as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true }), 100),
        ),
    );

    render(<LoginForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    // Submit the form and wait for loading state
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Login' }));
      // Wait a bit for the loading state to appear
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    // Check for loading state
    expect(screen.getByText('Logging in...')).toBeInTheDocument();

    // Wait for the login process to complete
    await waitFor(() => {
      expect(login).toHaveBeenCalled();
    });
  });
});
