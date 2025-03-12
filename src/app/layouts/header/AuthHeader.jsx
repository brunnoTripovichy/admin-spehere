'use client';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../../../services/authService';
import Header from './Header';
/**
 * AuthHeader component that conditionally renders the Header
 * only when the user is authenticated
 */
const AuthHeader = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        // Set isClient to true when component mounts (client-side only)
        setIsClient(true);
        // Check authentication status
        const checkAuth = () => {
            setIsAuth(isAuthenticated());
        };
        // Initial check
        checkAuth();
        // Set up event listener for storage changes (for logout/login events)
        const handleStorageChange = (e) => {
            if (e.key === 'auth_token' || e.key === null) {
                checkAuth();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        // Custom event for auth changes within the same window
        const handleAuthChange = () => checkAuth();
        window.addEventListener('auth_change', handleAuthChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth_change', handleAuthChange);
        };
    }, []);
    // Only render the header if we're on the client and the user is authenticated
    if (!isClient)
        return null;
    return isAuth ? <Header /> : null;
};
export default AuthHeader;
