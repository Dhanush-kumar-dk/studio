"use client";

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import ImageUpload from './image-upload';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export default function ProfileSettings() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await updateProfile(user, { displayName });
      toast({
        title: "Profile Updated",
        description: "Your display name has been updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <Skeleton className="h-40 w-40 rounded-lg" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }


  return (
    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <ImageUpload />
            </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="old-password">Old Password</Label>
              <Input id="old-password" type="password" placeholder="********" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="********" />
            </div>
            <Button variant="outline" className="w-full">Change Password</Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8 lg:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue={user?.email?.split('@')[0] || 'gene.rodrig'} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue={displayName.split(' ')[0] || 'Gene'} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input id="nickname" defaultValue="Gene.r" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="subscriber">
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="subscriber">Subscriber</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue={displayName.split(' ').slice(1).join(' ') || 'Rodriguez'} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name Publicly as</Label>
                    <Input id="display-name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <div className="space-y-2">
                    <Label htmlFor="email">Email (required)</Label>
                    <Input id="email" type="email" defaultValue={user?.email || 'gene.rodrig@gmail.com'} disabled/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" defaultValue="@gene-rod" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="gene-roding.webflow.io" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input id="telegram" defaultValue="@gene-rod" />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>About the User</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="bio">Biographical Info</Label>
                    <Textarea id="bio" rows={5} defaultValue="Albert Einstein was a German mathematician and physicist who developed the special and general theories of relativity. In 1921, he won the Nobel Prize for physics for his explanation of the photoelectric effect. In the following decade." />
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
            </Button>
        </div>
      </div>
    </form>
  );
}
