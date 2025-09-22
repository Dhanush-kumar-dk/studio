
"use client";

import { useState, useMemo } from 'react';
import type { User } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type UserTableProps = {
  users: User[];
  searchQuery: string;
};

type ActionType = 'make' | 'remove';

export default function UserTable({ users: initialUsers, searchQuery }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<ActionType>('make');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);


  const handleRoleChangeClick = (user: User, type: ActionType) => {
    setSelectedUser(user);
    setActionType(type);
    setIsAlertOpen(true);
  };

  const handleConfirmRoleChange = () => {
    if (selectedUser) {
      const newRole = actionType === 'make' ? 'Admin' : 'Subscriber';
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
      toast({
        title: "Success",
        description: `${selectedUser.name}'s role has been updated to ${newRole}.`,
      });
    }
    setIsAlertOpen(false);
    setSelectedUser(null);
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  }

  const dialogDescription = actionType === 'make' 
    ? `You are about to make ${selectedUser?.name} an admin. Do you want to continue?`
    : `You are about to remove admin privileges from ${selectedUser?.name}. Do you want to continue?`;

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.role === 'Admin' ? (
                     <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRoleChangeClick(user, 'remove')}
                    >
                      Remove Admin
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRoleChangeClick(user, 'make')}
                    >
                      Make Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRoleChange}
              className={cn(
                actionType === 'make' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700',
                buttonVariants({ variant: 'default' })
              )}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
