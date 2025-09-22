"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { X } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-32 w-32 rounded-lg bg-muted">
                <Image
                  src="https://picsum.photos/seed/gene-rodrig/128/128"
                  alt="User avatar"
                  layout="fill"
                  className="rounded-lg object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline">Upload Photo</Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="old-password">Old Password</Label>
                <Input id="old-password" type="password" defaultValue="********" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" defaultValue="********" />
              </div>
              <Button className="w-full">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="gene.rodrig" />
              </div>
              <div>
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Gene" />
              </div>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input id="nickname" defaultValue="Gene.r" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="subscriber">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscriber">Subscriber</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Rodriguez" />
              </div>
              <div>
                <Label htmlFor="display-name">Display Name Publicly as</Label>
                <Input id="display-name" defaultValue="Gene" />
              </div>
            </div>

            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email (required)</Label>
                <Input id="email" type="email" defaultValue="gene.rodrig@gmail.com" />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" defaultValue="@gene-rod" />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue="gene-roding.webflow.io" />
              </div>
              <div>
                <Label htmlFor="telegram">Telegram</Label>
                <Input id="telegram" defaultValue="@gene-rod" />
              </div>
            </div>

            <h3 className="text-lg font-semibold">About the User</h3>
            <div>
              <Label htmlFor="bio">Biographical Info</Label>
              <Textarea
                id="bio"
                rows={5}
                defaultValue="Albert Einstein was a German mathematician and physicist who developed the special and general theories of relativity. In 1921, he won the Nobel Prize for physics for his explanation of the photoelectric effect. In the following decade."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
