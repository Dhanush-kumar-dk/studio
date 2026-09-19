import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import LoginForm from '@/components/login-form';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Debt & Dominion account to access editorial features and manage your profile.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}