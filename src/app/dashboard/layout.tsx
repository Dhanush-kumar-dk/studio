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
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  User,
  Newspaper,
  LayoutDashboard,
  Info,
  PlusCircle,
  Users,
  X,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/Assest/signal-2025-09-01-172433.jpeg';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as AppUser } from '@/lib/types';
import { useRouter, usePathname } from 'next/navigation';
import { checkAndCreateUser } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function AdminSidebarInner({ currentUser }: { currentUser: AppUser }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const role = currentUser.role || 'Subscriber';
  const isAdmin = role === 'Admin';
  const isEditor = role === 'Editor';
  const isAuthor = role === 'Author';
  const canManageArticles = isAdmin || isEditor || isAuthor;

  const initials = currentUser.name
    ? currentUser.name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <Sidebar className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/60 p-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 min-w-0 transition-opacity hover:opacity-90"
          >
            <img
              src={Logo.src}
              alt="Debt & Dominion"
              className="h-8 w-8 rounded-md object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline font-bold text-base leading-tight tracking-tight truncate">
                Debt & Dominion
              </span>
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Close button inside mobile drawer */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar navigation"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="space-y-4">
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Workspace
            </p>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard Overview">
                  <Link href="/dashboard" onClick={handleNavClick} className="flex items-center gap-2.5">
                    <LayoutDashboard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-sm">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {canManageArticles && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/create-post'} tooltip="Create Article">
                      <Link href="/create-post" onClick={handleNavClick} className="flex items-center gap-2.5">
                        <PlusCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-medium text-sm">Create Article</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Manage Articles">
                      <Link href="/dashboard#articles" onClick={handleNavClick} className="flex items-center gap-2.5">
                        <Newspaper className="h-4 w-4" />
                        <span className="font-medium text-sm">Articles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="User Role Management">
                    <Link href="/dashboard#users" onClick={handleNavClick} className="flex items-center gap-2.5">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-sm">Manage Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Preferences
            </p>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/profile'} tooltip="Account & Profile">
                  <Link href="/profile" onClick={handleNavClick} className="flex items-center gap-2.5">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">My Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to Website">
                  <Link href="/" onClick={handleNavClick} className="flex items-center gap-2.5">
                    <Home className="h-4 w-4" />
                    <span className="font-medium text-sm">Live Website</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="About Us">
                  <Link href="/about" onClick={handleNavClick} className="flex items-center gap-2.5">
                    <Info className="h-4 w-4" />
                    <span className="font-medium text-sm">About Publication</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2.5">
          <Avatar className="h-9 w-9 shrink-0 border border-border/60">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="text-xs font-semibold bg-emerald-600/10 text-emerald-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate leading-tight text-foreground">
              {currentUser.name}
            </p>
            <p className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5">
              {currentUser.email}
            </p>
          </div>
          <Badge
            variant={isAdmin ? 'destructive' : isEditor ? 'default' : isAuthor ? 'outline' : 'secondary'}
            className="text-[10px] px-1.5 py-0 capitalize shrink-0 font-medium"
          >
            {role}
          </Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

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
        <div className="text-sm text-muted-foreground animate-pulse">Loading dashboard...</div>
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
      <AdminSidebarInner currentUser={currentUser} />
      <SidebarInset className="min-w-0 flex-1 overflow-x-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
