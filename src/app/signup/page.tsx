import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SignupForm from '@/components/signup-form';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: 'Join Debt & Dominion to access in-depth geopolitical intelligence, macro research, and saved articles.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <Header />
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
          <SignupForm />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </Suspense>
  );
}
