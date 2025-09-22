import LoginForm from '@/components/login-form';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Newsletter from '@/components/newsletter';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
          <LoginForm />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
