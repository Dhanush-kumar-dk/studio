

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
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { checkAndCreateUser } from '@/app/actions';
  
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
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
            
          if (data) {
            setCurrentUser(data);
          } else {
            // Auto-sync user in public.users
            await checkAndCreateUser(user);
            const { data: syncedUser } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .maybeSingle();

            if (syncedUser) {
              setCurrentUser(syncedUser);
            } else {
              setCurrentUser({
                id: user.id,
                name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                email: user.email || '',
                role: 'User',
                avatarUrl: user.user_metadata?.avatar_url || '',
              });
            }
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
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                <Image
                  src="/title-logo.png"
                  alt="Debt & Dominion"
                  width={150}
                  height={48}
                  className="h-7 w-auto rounded-md object-contain"
                />
                <span className="sr-only">Debt & Dominion</span>
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
