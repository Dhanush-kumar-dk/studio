import CreateArticleForm from '@/components/create-article-form';
import { getArticleBySlug } from '@/app/actions';
import { notFound, redirect } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';
import { createClient, createAdminClient } from '@/lib/supabase/server';

type EditPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  // 1. Authenticate user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // 2. Authorize role (Admin, Editor, Author)
  const adminClient = createAdminClient();
  const { data: profile } = await adminClient
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const role = profile?.role || 'User';
  if (role !== 'Admin' && role !== 'Editor' && role !== 'Author') {
    redirect('/dashboard');
  }

  // 3. Fetch article
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
              Edit Article
            </h1>
            <p className="mt-2 text-muted-foreground">Refine your story.</p>
          </div>
          <CreateArticleForm article={article} />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
