import { Toaster } from '@/components/atoms/toaster';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { siteConfig } from '@/shared/config/site';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#f4f7f9]">
        <Providers>
          <Header />
          <main className="min-h-[60vh] pt-[76px] max-w-[1200px] mx-auto ">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
