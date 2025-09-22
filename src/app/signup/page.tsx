import SignupForm from '@/components/signup-form';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

export default function SignupPage() {
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
