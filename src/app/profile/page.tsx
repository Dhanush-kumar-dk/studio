'use client';
export const dynamic = 'force-dynamic';

import { User, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/profile-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import { checkAndCreateUser } from '@/app/actions';
import { createClient } from '@/lib/supabase/client';
import type { UserRole } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!loading && !user) {
        router.push('/login');
        return;
      }
      if (!loading && user) {
        try {
          await checkAndCreateUser(user);
          const supabase = createClient();
          const { data: dbUser, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

          const displayName = dbUser?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
          const nameParts = displayName.split(' ');

          setProfileData({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            firstName: dbUser?.first_name || nameParts[0] || '',
            lastName: dbUser?.last_name || nameParts.slice(1).join(' ') || '',
            email: user.email || '',
            avatarUrl: dbUser?.avatar_url || user.user_metadata?.avatar_url || `https://picsum.photos/seed/${user.id}/150/150`,
            role: dbUser?.role || 'Subscriber',
            website: dbUser?.website || '',
            bio: dbUser?.bio || 'Welcome to my Debt & Dominion profile.',
          });
        } catch (error) {
          console.error("Failed to load profile:", error);
        } finally {
          setFetching(false);
        }
      }
    }
    loadProfile();
  }, [loading, user, router]);

  if (loading || fetching || !profileData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="rounded-md bg-muted p-2">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
      </div>
      <ProfileForm initialData={profileData} isCurrentUser={true} />
    </div>
  );
}