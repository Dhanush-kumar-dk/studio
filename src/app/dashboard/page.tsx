
'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { getUsers } from '@/app/actions';

/**
 * Inner dashboard logic component — runs after client hydration.
 */
function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      if (authLoading) {
        // Wait until authentication status is resolved
        return;
      }

      if (!user) {
        setLoading(false);
        setError("You must be logged in to view the dashboard.");
        return;
      }

      setLoading(true);
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
        setError(null);
      } catch (err: unknown) {
        console.error("Failed to fetch users:", err);
        const message =
          err instanceof Error && err.message.includes('permission_denied') // Firebase RTDB error code
            ? "Permission denied. Please check your Firebase Realtime Database rules."
            : "Could not fetch user data. Please try again later.";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [user, authLoading]);

  // Loading or auth in progress
  if (loading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render main dashboard
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of all users in your application.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error ? (
            <div className="text-center text-red-500 py-8">
              <p className="font-bold">An Error Occurred</p>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Input
                  placeholder="Search by email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <UserTable users={users} searchQuery={searchQuery} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Outer component — wrapped in Suspense to satisfy Next.js requirements.
 */
export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
