"use client";

import { usePathname } from 'next/navigation';
import Contact from './contact';
import Header from './header';
import Footer from './footer';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboardRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');

    return (
        <>
            {!isDashboardRoute && <Header />}
            <main className="flex-1">{children}</main>
            {!isDashboardRoute && <Contact />}
            {!isDashboardRoute && <Footer />}
        </>
    );
}
