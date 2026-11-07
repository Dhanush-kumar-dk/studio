'use client';

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
import { Loader2, Users, Mail } from 'lucide-react';

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
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase().trim();
    return users.filter(
      (u) =>
        (u.email || '').toLowerCase().includes(q) ||
        (u.name || '').toLowerCase().includes(q) ||
        (u.role || '').toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setLoadingId(userId);
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        toast({
          title: 'Role Updated',
          description: `User role has been updated to ${newRole}.`,
        });
      } else {
        toast({
          title: 'Update Failed',
          description: result.error || 'Failed to update user role.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while updating the role.',
        variant: 'destructive',
      });
    } finally {
      setLoadingId(null);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (filteredUsers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/80 p-8 text-center bg-card">
        <Users className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
        <h3 className="text-sm font-semibold text-foreground">No users found</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          {searchQuery
            ? `No registered users match "${searchQuery}". Try a different name or email.`
            : 'No users currently registered in the database.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card List View (< 640px) */}
      <div className="block sm:hidden space-y-3">
        {filteredUsers.map((u) => {
          const isCurrent = u.id === currentUser?.id;
          const isLoading = loadingId === u.id;

          return (
            <div
              key={u.id}
              className="rounded-lg border bg-card p-3.5 space-y-3 shadow-xs hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="h-10 w-10 shrink-0 border border-border/50">
                    <AvatarImage src={u.avatarUrl} alt={u.name} />
                    <AvatarFallback className="text-xs font-semibold bg-muted">
                      {getInitials(u.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-semibold text-sm truncate text-foreground leading-tight">
                        {u.name}
                      </p>
                      {isCurrent && (
                        <span className="text-[10px] text-muted-foreground font-normal">
                          (You)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-1">
                      <Mail className="h-3 w-3 shrink-0 text-muted-foreground/70" />
                      <span className="truncate">{u.email || 'No email registered'}</span>
                    </p>
                  </div>
                </div>

                <Badge
                  variant={ROLE_COLORS[u.role] || 'secondary'}
                  className="capitalize text-[11px] shrink-0 font-medium"
                >
                  {u.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-border/50 text-xs">
                <span className="text-muted-foreground font-medium">Assign Role:</span>
                {isLoading ? (
                  <div className="flex items-center gap-1.5 text-muted-foreground py-1">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                    <span>Updating...</span>
                  </div>
                ) : isCurrent ? (
                  <span className="text-muted-foreground italic text-[11px]">
                    Current Account (Protected)
                  </span>
                ) : (
                  <Select
                    value={u.role}
                    onValueChange={(val: UserRole) => handleRoleChange(u.id, val)}
                  >
                    <SelectTrigger className="w-32 h-8 text-xs bg-background">
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
            </div>
          );
        })}
      </div>

      {/* Desktop & Tablet Table View (>= 640px) */}
      <div className="hidden sm:block rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[32%]">User</TableHead>
              <TableHead className="w-[33%]">Email</TableHead>
              <TableHead className="w-[15%]">Role</TableHead>
              <TableHead className="w-[20%] text-right">Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((u) => {
              const isCurrent = u.id === currentUser?.id;
              const isLoading = loadingId === u.id;

              return (
                <TableRow key={u.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-9 w-9 shrink-0 border border-border/50">
                        <AvatarImage src={u.avatarUrl} alt={u.name} />
                        <AvatarFallback className="text-xs font-semibold bg-muted">
                          {getInitials(u.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate text-foreground">
                          {u.name}
                          {isCurrent && (
                            <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                              (You)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground truncate max-w-[220px]">
                    {u.email || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={ROLE_COLORS[u.role] || 'secondary'} className="capitalize">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <Select
                          value={u.role}
                          onValueChange={(val: UserRole) => handleRoleChange(u.id, val)}
                          disabled={isCurrent}
                        >
                          <SelectTrigger className="w-[125px] h-8 text-xs bg-background">
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
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
