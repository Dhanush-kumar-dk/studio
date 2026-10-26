import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Montserrat, Lato, Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import { siteConfig, getBaseUrl } from '@/lib/site-config';
import { WebSiteJsonLd, OrganizationJsonLd } from '@/components/schema-org';

// Exact fonts from https://wptuts.co.uk/ (Montserrat, Lato, Nunito)
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '700', '900'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-button',
  display: 'swap',
  weight: ['600', '700', '800'],
});

// Defer non-critical ChatBot to avoid blocking initial hydration
const ChatBot = dynamic(() => import('@/components/chat-bot'), {
  ssr: false,
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Debt & Dominion',
    'Geopolitics',
    'Global Finance',
    'Macroeconomics',
    'Technology & AI',
    'Sovereign Debt',
    'World Affairs',
    'Financial Intelligence',
    'Policy Analysis',
    'Sports Analytics',
  ],
  authors: [{ name: 'Debt & Dominion Editorial Board', url: baseUrl }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: baseUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Debt & Dominion — Geopolitics, Finance & Global Power Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${baseUrl}/og.png`],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(montserrat.variable, lato.variable, nunito.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <WebSiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="font-body bg-background text-foreground antialiased selection:bg-[#e95f3c]/20 selection:text-[#e95f3c]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
            <Toaster />
            <ChatBot />
            <SpeedInsights />
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
