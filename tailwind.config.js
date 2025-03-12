export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                primaryHover: 'var(--primary-hover)',
                secondary: 'var(--secondary)',
                secondaryHover: 'var(--secondary-hover)',
                borderColor: 'var(--border)',
                cardBg: 'var(--card-bg)',
            },
        },
    },
    plugins: [],
};
