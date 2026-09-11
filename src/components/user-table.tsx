import { useState, useMemo, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserRole } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

type UserTableProps = {
  users: User[];
  searchQuery: string;
};

const ROLE_COLORS: Record<string, 'default' | 'destructive' | 'outline' | 'secondary'> = {
  Admin: 'destructive',
  Editor: 'default',
  Author: 'outline',
  Subscriber: 'secondary',
  User: 'secondary',
};

export default function UserTable({ users: initialUsers, searchQuery }: UserTableProps) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(user => 
        (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setLoadingId(userId);
    const result = await updateUserRole(userId, newRole);
    if (result.success) {
      setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast({
        title: 'Role Updated',
        description: `User role has been updated to ${newRole}.`,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to update role.',
        variant: 'destructive',
      });
    }
    setLoadingId(null);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Change Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.email || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={ROLE_COLORS[user.role] || 'secondary'} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {loadingId === user.id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <Select
                        value={user.role}
                        onValueChange={(val: UserRole) => handleRoleChange(user.id, val)}
                        disabled={user.id === currentUser?.id}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Author">Author</SelectItem>
                          <SelectItem value="Subscriber">Subscriber</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

