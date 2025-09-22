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

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app, this would come from an API or auth context
  const [userData, setUserData] = useState({
    username: "gene.rodrig",
    firstName: "Gene",
    nickname: "Gene.r",
    role: "subscriber",
    lastName: "Rodriguez",
    displayName: "Gene",
    email: "gene.rodrig@gmail.com",
    whatsapp: "@gene-rod",
    website: "gene-roding.webflow.io",
    telegram: "@gene-rod",
    bio: "Albert Einstein was a German mathematician and physicist who developed the special and general theories of relativity. In 1921, he won the Nobel Prize for physics for his explanation of the photoelectric effect. In the following decade.",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setUserData(prev => ({...prev, role: value}));
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log("Saving data:", userData);
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };


  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="lg:col-span-2">
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
                <Label htmlFor="nickname">Nickname</Label>
                 {isEditing ? (
                    <Input id="nickname" value={userData.nickname} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.nickname}</p>
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
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                 {isEditing ? (
                    <Input id="lastName" value={userData.lastName} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.lastName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="displayName">Display Name Publicly as</Label>
                 {isEditing ? (
                    <Input id="displayName" value={userData.displayName} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.displayName}</p>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email (required)</Label>
                 {isEditing ? (
                    <Input id="email" type="email" value={userData.email} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                {isEditing ? (
                    <Input id="whatsapp" value={userData.whatsapp} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.whatsapp}</p>
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
              <div>
                <Label htmlFor="telegram">Telegram</Label>
                {isEditing ? (
                    <Input id="telegram" value={userData.telegram} onChange={handleInputChange} />
                ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{userData.telegram}</p>
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
          <CardFooter className="justify-end">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Profile</Button>
              </div>
            ) : (
              <Button onClick={handleEdit}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
