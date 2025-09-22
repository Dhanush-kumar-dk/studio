
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UserProfileCard from "./user-profile-card";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { Loader2 } from "lucide-react";

const mockData = {
  username: "gene.rodrig",
  firstName: "Gene",
  role: "subscriber",
  lastName: "Rodriguez",
  email: "gene.rodrig@gmail.com",
  website: "gene-roding.webflow.io",
  bio: "Albert Einstein was a German mathematician and physicist who developed the special and general theories of relativity. In 1921, he won the Nobel Prize for physics for his explanation of the photoelectric effect. In the following decade.",
  avatarUrl: 'https://picsum.photos/seed/gene-rodrig/150/150'
};

type ProfileFormProps = {
  initialData?: typeof mockData;
  isCurrentUser?: boolean;
}

export default function ProfileForm({ initialData = mockData, isCurrentUser = false }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [userData, setUserData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setUserData(prev => ({...prev, role: value}));
  }

  const handleSave = async () => {
    setIsSaving(true);
    const currentUser = auth.currentUser;
    if (currentUser && isCurrentUser) {
        try {
            await updateProfile(currentUser, {
                displayName: `${userData.firstName} ${userData.lastName}`.trim(),
                // PhotoURL update would require file upload, skipping for now.
            });
            // Here you would also save other data (bio, website, etc.) to your database (e.g., Firestore)
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile: ", error);
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive"
            });
        }
    }
    setIsSaving(false);
  };
  
  const handleEdit = () => {
    if(isCurrentUser) {
        setIsEditing(true);
    }
  };


  return (
    <div className="space-y-8">
      <UserProfileCard userData={userData} />
      <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="username">Username</Label>
                {isEditing ? (
                    <Input id="username" value={userData.username} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor="firstName">First Name</Label>
                 {isEditing ? (
                    <Input id="firstName" value={userData.firstName} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                 {isEditing ? (
                    <Input id="lastName" value={userData.lastName} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.lastName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                {isEditing ? (
                    <Select value={userData.role} onValueChange={handleSelectChange}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="subscriber">Subscriber</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground capitalize">{userData.role}</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email (required)</Label>
                 {isEditing ? (
                    <Input id="email" type="email" value={userData.email} onChange={handleInputChange} disabled/>
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                    <Input id="website" value={userData.website} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.website}</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold">About the User</h3>
            <div>
              <Label htmlFor="bio">Biographical Info</Label>
                {isEditing ? (
                    <Textarea
                        id="bio"
                        rows={5}
                        value={userData.bio}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.bio}</p>
                )}
            </div>
          </CardContent>
          {isCurrentUser && (
           <CardFooter className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Profile
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit}>Edit Profile</Button>
                )}
            </CardFooter>
          )}
        </Card>
    </div>
  );
}
