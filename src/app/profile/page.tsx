
'use client';

import { User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/profile-form';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

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
          <h1 className="text-2xl font-bold">User</h1>
        </div>
      </div>
      <ProfileForm />
    </div>
  );
}
