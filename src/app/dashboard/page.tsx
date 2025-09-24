
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { getAllUsers } from '@/lib/services/userService';
import UserTable from '@/components/user-table';

export default async function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const users = await getAllUsers();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage your application's users here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Input 
                        placeholder="Search by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <UserTable users={users} searchQuery={searchQuery} />
            </CardContent>
        </Card>
    </div>
  );
}
