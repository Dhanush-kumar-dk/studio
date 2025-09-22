"use client";

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

export default function ProfileForm() {
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
