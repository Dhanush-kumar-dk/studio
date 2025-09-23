
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { users as initialUsers } from '@/lib/users';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading } = useAuth();
  const [displayUsers, setDisplayUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    if (user) {
      setDisplayUsers(prevUsers => {
        const userExists = prevUsers.some(u => u.id === user.uid);
        if (!userExists) {
          const newUser: User = {
            id: user.uid,
            name: user.displayName || user.email || 'Anonymous',
            email: user.email || '',
            role: 'Subscriber',
            avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
          };
          return [newUser, ...prevUsers];
        } else {
          // If user exists, check if an update is needed (e.g. new avatar from Google login)
          return prevUsers.map(u => {
            if (u.id === user.uid) {
              return {
                ...u,
                name: user.displayName || u.name,
                email: user.email || u.email,
                avatarUrl: user.photoURL || u.avatarUrl
              };
            }
            return u;
          });
        }
      });
    }
  }, [user]);

  if (loading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  const handleUsersChange = (updatedUsers: User[]) => {
    // This function will be called by UserTable when roles are changed
    setDisplayUsers(updatedUsers);
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
                <UserTable 
                  users={displayUsers} 
                  searchQuery={searchQuery} 
                  onUsersChange={handleUsersChange}
                />
            </CardContent>
        </Card>
    </div>
  );
}
