'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SignupForm from '@/components/signup-form';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

function SignupContent() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
          <SignupForm />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}