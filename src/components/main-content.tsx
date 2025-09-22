"use client";

import { usePathname } from 'next/navigation';
import Contact from './contact';
import Header from './header';
import Footer from './footer';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showHeader = !pathname.startsWith('/dashboard') && !pathname.startsWith('/settings');
    const showFooter = !pathname.startsWith('/dashboard') && !pathname.startsWith('/settings');
    const showContactForm = (pathname === '/' || pathname.startsWith('/articles/')) && !pathname.startsWith('/dashboard') && !pathname.startsWith('/settings');

    return (
        <>
            {showHeader && <Header />}
            <main className="flex-1">{children}</main>
            {showContactForm && <Contact />}
            {showFooter && <Footer />}
        </>
    );
}
