"use client";

import { usePathname } from 'next/navigation';
import Contact from './contact';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showContactForm = pathname !== '/create-post' && !pathname.startsWith('/edit-post');

    return (
        <>
            <main className="flex-1">{children}</main>
            {showContactForm && <Contact />}
        </>
    );
}
