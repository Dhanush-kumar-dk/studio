import CreateArticleForm from '@/components/create-article-form';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

export default function CreatePostPage() {
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
          <CreateArticleForm />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
