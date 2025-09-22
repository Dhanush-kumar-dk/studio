import ProfileSettings from '@/components/profile-settings';
import { Suspense } from 'react';

export default function ProfileSettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">
          Profile Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileSettings />
      </Suspense>
    </div>
  );
}
