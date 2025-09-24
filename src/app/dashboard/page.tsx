
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { getUsers } from '@/app/actions';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
        getUsers().then(fetchedUsers => {
            setUsers(fetchedUsers);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to fetch users:", err);
            setLoading(false);
        });
    } else if (!authLoading && !user) {
        setLoading(false);
    }
  }, [user, authLoading]);


  if (loading || authLoading) {
      return (
          <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  const handleUsersChange = (updatedUsers: User[]) => {
    // This function will be called by UserTable when roles are changed
    setUsers(updatedUsers);
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
                  users={users} 
                  searchQuery={searchQuery} 
                  onUsersChange={handleUsersChange}
                />
            </CardContent>
        </Card>
    </div>
  );
}
