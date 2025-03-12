'use client';
import { useTheme } from '../../../providers/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    return (<button onClick={toggleTheme} className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      {theme === 'light' ? (<MoonIcon className="h-5 w-5"/>) : (<SunIcon className="h-5 w-5"/>)}
    </button>);
};
export default ThemeSwitcher;
