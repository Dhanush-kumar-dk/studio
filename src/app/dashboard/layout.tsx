

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
import { Home, User, Cog, Newspaper, Settings, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
  
  export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
                <Logo />
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
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
      </SidebarProvider>
    );
  }
  
