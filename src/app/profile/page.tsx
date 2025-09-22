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

      <Tabs defaultValue="all-users">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="all-users" className="mt-6">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="settings" className="mt-6">
          <p>Settings content will go here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
