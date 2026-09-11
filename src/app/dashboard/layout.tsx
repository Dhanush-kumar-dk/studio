

'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarProvider,
    SidebarInset,
  } from '@/components/ui/sidebar';
import { Home, User, Cog, Newspaper, Settings, LayoutDashboard, Info } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/Assest/signal-2025-09-01-172433.jpeg';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
  
  export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
    const supabase = createClient();

  useEffect(() => {
      async function fetchUserRole() {
        if (user) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (data) {
            setCurrentUser(data);
          } else {
            // User exists in auth but not in DB, maybe redirect or handle
            setCurrentUser(null);
            router.push('/');
          }
        } else if (!loading) {
             // No user, not loading, so redirect
             router.push('/login');
          }
        }
        fetchUserRole();
      }, [user, loading, router]);
    
      if (loading || !currentUser) {
        return (
            <div className="flex h-screen items-center justify-center">
              <div>Loading...</div>
            </div>
          );
      }
    
      const allowedRoles = ['Admin', 'Editor', 'Author', 'Subscriber', 'User'];
      if (!allowedRoles.includes(currentUser.role)) {
        router.push('/');
        return null;
      }



    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
                <img src={Logo.src} alt="Debt & Dominion" className="h-8 w-auto rounded-md pl-1" />
                <span className="text-xl font-bold">Debt & Dominion</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/">
                        <Home />
                        Home
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                        <LayoutDashboard />
                        Dashboard
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/profile">
                        <User />
                        Accounts
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/about">
                            <Info />
                            About Us
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
      </SidebarProvider>
    );
  }
