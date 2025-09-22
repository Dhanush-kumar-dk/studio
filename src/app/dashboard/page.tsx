
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { users } from '@/lib/users';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading } = useAuth();
  const [displayUsers, setDisplayUsers] = useState<User[]>(users);

  useEffect(() => {
    if (user) {
      const userExists = users.some(u => u.id === user.uid);
      if (!userExists) {
        const newUser: User = {
            id: user.uid,
            name: user.displayName || user.email || 'Anonymous',
            email: user.email || '',
            role: 'Admin', // Logged in user is likely admin of their own dashboard
            avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
        };
        // Add user to the start of the list
        const updatedUsers = [newUser, ...users];
        // update the original array for prototype persistence across navigations
        users.splice(0, users.length, ...updatedUsers);
        setDisplayUsers(updatedUsers);
      }
    }
  }, [user]);

  if (loading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage your application's users here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Input 
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <UserTable users={displayUsers} searchQuery={searchQuery} />
            </CardContent>
        </Card>
    </div>
  );
}
