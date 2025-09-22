import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile-form';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-md bg-muted p-2">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <Button>Add New User</Button>
      </div>
      <ProfileForm />
    </div>
  );
}
