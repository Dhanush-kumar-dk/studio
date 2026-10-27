import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/providers';
import ChatBot from '@/components/chat-bot';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

import { siteConfig, getBaseUrl } from '@/lib/site-config';
import { WebSiteJsonLd, OrganizationJsonLd } from '@/components/schema-org';

const baseUrl = getBaseUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0EAD6' },
    { media: '(prefers-color-scheme: dark)', color: '#0F172A' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: '/manifest.json',
  verification: {
    google: 'fcw6VY0xM1E0RbMKD7j1_ljpqm9Je4rlCT8KLEqwiK4',
  },
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="fcw6VY0xM1E0RbMKD7j1_ljpqm9Je4rlCT8KLEqwiK4" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://picsum.photos" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <WebSiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className={cn('font-body bg-background text-foreground antialiased selection:bg-orange-500/20 selection:text-orange-500')}>
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
