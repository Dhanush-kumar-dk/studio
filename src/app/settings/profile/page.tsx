
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from '@/components/ui/sidebar';
  import {
    Bell,
    Home,
    LayoutGrid,
    Settings,
    User,
  } from 'lucide-react';
  import ProfileSettings from '@/components/profile-settings';
  import { Button } from '@/components/ui/button';
  import UserNav from '@/components/user-nav';
  import Link from 'next/link';
  import Logo from '@/components/logo';
  
  export default function ProfileSettingsPage() {
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">Debt & Dominion</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/" tooltip="Home">
                  <Home />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
                  <LayoutGrid />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Accounts">
                  <User />
                  Accounts
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarHeader>
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/settings/profile" tooltip="Profile" isActive>
                    <Settings />
                    Profile
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-lg font-semibold">User Settings</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="mt-6">
              <ProfileSettings />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  
