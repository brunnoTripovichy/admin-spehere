'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '../../../providers/I18nProvider';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';

interface DashboardContentProps {
  className?: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ className }) => {
  const { t } = useI18n();
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // In a real app, you would fetch user data from an API
    // For this example, we'll use mock data from localStorage
    if (typeof window !== 'undefined') {
      const userDataStr = localStorage.getItem('user_data');
      if (userDataStr) {
        try {
          setUserData(JSON.parse(userDataStr));
        } catch (e) {
          console.error('Failed to parse user data', e);
        }
      } else {
        // Mock user data if none exists
        const mockUser = { name: 'Test User', email: 'test@example.com' };
        setUserData(mockUser);
        localStorage.setItem('user_data', JSON.stringify(mockUser));
      }
    }
  }, []);

  return (
    <ProtectedRoute>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {t('dashboard.welcome', 'Welcome to your Dashboard')}
          </h2>
        </div>

        {userData ? (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {t('dashboard.userInfo', 'User Information')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">{t('common.name', 'Name')}:</span>{' '}
              {userData.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">{t('common.email', 'Email')}:</span>{' '}
              {userData.email}
            </p>
          </div>
        ) : (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
              {t('dashboard.stats', 'Statistics')}
            </h3>
            <p className="text-blue-600 dark:text-blue-400">
              {t(
                'dashboard.statsDescription',
                'View your account statistics and analytics.',
              )}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-300 mb-2">
              {t('dashboard.activity', 'Recent Activity')}
            </h3>
            <p className="text-green-600 dark:text-green-400">
              {t(
                'dashboard.activityDescription',
                'Check your recent account activity.',
              )}
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardContent;
