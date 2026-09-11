'use client';

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import dynamic_ from 'next/dynamic';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CreateArticleForm = dynamic_(() => import('@/components/create-article-form'), {
  ssr: false,
  loading: () => <div className="p-10 text-center">Loading form...</div>,
});

export default function CreatePostPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    async function checkPermission() {
      if (!loading) {
        if (!user) {
          router.push('/login');
          return;
        }

        try {
          const supabase = createClient();
          const { data } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();

          setRole(data?.role || 'User');
        } catch {
          setRole('User');
        } finally {
          setRoleLoading(false);
        }
      }
    }

    checkPermission();
  }, [user, loading, router]);

  if (loading || roleLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const canPost = role === 'Admin' || role === 'Editor' || role === 'Author';

  if (!canPost) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-4 p-6 border rounded-lg bg-card">
            <ShieldAlert className="h-12 w-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold">Author Permission Required</h2>
            <p className="text-sm text-muted-foreground">
              Your current account role is <span className="font-semibold capitalize text-foreground">{role}</span>. Only Authors, Editors, and Admins can publish articles.
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
              Create a New Article
            </h1>
            <p className="mt-2 text-muted-foreground">Share your story with the world.</p>
          </div>

          <Suspense fallback={<div className="p-10 text-center">Loading form...</div>}>
            <CreateArticleForm />
          </Suspense>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
