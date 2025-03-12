import { Geist as GeistSans, Geist_Mono as GeistMono } from 'next/font/google';
import { dir } from 'i18next';
import './../../app/globals.css';
import { languages } from '../i18n/settings';
import Footer from '../layouts/footer/Footer';
import AuthHeader from '../layouts/header/AuthHeader';
import StoreProvider from '../../providers/StoreProvider';
import I18nProvider from '../../providers/I18nProvider';
import ThemeProvider from '../../providers/ThemeProvider';
export const generateStaticParams = async () => {
    return languages.map((lng) => ({ lng }));
};
const geistSans = GeistSans({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});
const geistMono = GeistMono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});
export const metadata = {
    title: 'Admin Sphere',
    description: 'Admin dashboard for your application',
};
export default async function RootLayout({ children, params, }) {
    const lng = (await params).lng;
    const namespaces = ['common'];
    const initialTranslations = {};
    return (<html lang={lng} dir={dir(lng)} className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}>
        <StoreProvider>
          <ThemeProvider>
            <I18nProvider initialLng={lng} namespaces={namespaces} initialTranslations={initialTranslations}>
              {/* App Container */}
              <div className="flex flex-col min-h-screen">
                {/* Header is now conditionally rendered in AuthHeader component */}
                <AuthHeader />

                {/* Main Content - Scrollable Area */}
                <main className="flex-grow overflow-auto">{children}</main>

                {/* Fixed Footer */}
                <Footer />
              </div>
            </I18nProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>);
}
