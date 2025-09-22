
'use client';

import { User, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/profile-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const profileData = {
    username: user.displayName?.toLowerCase().replace(' ', '.') || user.email?.split('@')[0] || 'user',
    firstName: user.displayName?.split(' ')[0] || '',
    lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
    email: user.email || '',
    avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/150/150`,
    role: 'subscriber',
    website: '',
    bio: 'This is a default bio. Please update it.',
  };


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
      <ProfileForm initialData={profileData} />
    </div>
  );
}
