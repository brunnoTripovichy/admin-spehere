'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '../../services/authService';
import { useI18n } from '../../providers/I18nProvider';
/**
 * A client-side component that protects routes requiring authentication.
 * This is a second layer of protection in addition to the middleware.
 */
const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { lng } = useI18n();
    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated()) {
            // Redirect to login page with callback URL
            router.push(`/${lng}/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [router, pathname, lng]);
    // If we're on the client side and the user is not authenticated,
    // show a loading state or nothing until the redirect happens
    if (typeof window !== 'undefined' && !isAuthenticated()) {
        return (<div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    // If the user is authenticated, render the children
    return <>{children}</>;
};
export default ProtectedRoute;
