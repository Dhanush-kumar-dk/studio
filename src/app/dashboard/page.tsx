import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  CircleHelp,
  CreditCard,
  Edit,
  FileText,
  LayoutGrid,
  MessageSquareWarning,
  Phone,
  Search,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <aside className="hidden w-64 flex-col border-r bg-background p-6 sm:flex">
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground"
          >
            <LayoutGrid className="h-5 w-5" />
            My dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <User className="h-5 w-5" />
            Accounts
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Phone className="h-5 w-5" />
            Mobile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <CreditCard className="h-5 w-5" />
            Payments
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <MessageSquareWarning className="h-5 w-5" />
            Complaints
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <CircleHelp className="h-5 w-5" />
            Supports
          </Link>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
          <div>
            <h1 className="text-xl font-semibold">My finance dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome to xPay payment portal
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/sami/40/40" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <span>Hello Sami</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="relative mb-4 h-32 w-32">
                    <Image
                      src="https://picsum.photos/seed/profile-picture/200/200"
                      alt="Profile"
                      className="rounded-full"
                      width={128}
                      height={128}
                    />
                  </div>
                  <CardTitle className="text-xl">My profile</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Last Login: 07 Aug 2018, 14:54
                  </p>
                  <div className="mt-6 w-full space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Sami Rahman</span>
                      <span className="text-muted-foreground">
                        +1-856-589-900-1236
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Samirahman0021@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">SMS alerts activation</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Button className="mt-6 w-full bg-orange-500 text-white hover:bg-orange-600">Save</Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">My xPay accounts</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Active account</p>
                      <p className="text-sm text-muted-foreground">
                        8040 5060 8008 4525
                      </p>
                    </div>
                    <Button variant="destructive" className="bg-red-500 text-white hover:bg-red-600">Block Account</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">Blocked account</p>
                      <p className="text-sm text-muted-foreground">
                        7582 5060 3583 2046
                      </p>
                    </div>
                    <Button className="bg-green-500 text-white hover:bg-green-600">Unblock account</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">My bills</CardTitle>
                  <Button variant="outline" size="sm">Filter by</Button>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                        <p className="flex-1 font-medium">Phone bill</p>
                        <Badge className="bg-green-100 text-green-800">Bill paid</Badge>
                    </div>
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-3"></div>
                        <p className="flex-1 font-medium">Internet bill</p>
                        <Badge className="bg-red-100 text-red-800">Not paid</Badge>
                    </div>
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                        <p className="flex-1 font-medium">House rent</p>
                        <Badge className="bg-green-100 text-green-800">Bill paid</Badge>
                    </div>
                     <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-3"></div>
                        <p className="flex-1 font-medium">Income tax</p>
                        <Badge className="bg-green-100 text-green-800">Bill paid</Badge>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
