'use client';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    // Apply theme to <html> tag
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);
    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };
    return (<ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>);
}
// Context for easy access in components
const ThemeContext = createContext(undefined);
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
