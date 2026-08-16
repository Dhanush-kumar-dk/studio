
'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User, Article, UserRole } from '@/lib/types';
import { Loader2, Users, Newspaper, Shield, PlusCircle, Edit, Trash2, Eye, UserCheck } from 'lucide-react';
import { getUsers, getArticles, deleteArticle } from '@/app/actions';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, loading: authLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<(Article & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (authLoading) return;

      if (!user) {
        setLoading(false);
        setError("You must be logged in to view the dashboard.");
        return;
      }

      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        const userData: User = data
          ? {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role as UserRole,
              avatarUrl: data.avatar_url,
            }
          : { id: user.id, name: user.user_metadata?.full_name || 'User', email: user.email, role: 'Subscriber' as UserRole, avatarUrl: user.user_metadata?.avatar_url || '' };
        
        setCurrentUser(userData);

        // Fetch users & articles
        const [fetchedUsers, fetchedArticles] = await Promise.all([
          getUsers().catch(() => []),
          getArticles().catch(() => [])
        ]);

        setUsers(fetchedUsers);
        setArticles(fetchedArticles);
        setError(null);
      } catch (err: unknown) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading]);

  const handleDeleteArticle = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteArticle(id);
      if (res.success) {
        setArticles(prev => prev.filter(a => a._id !== id && a.id !== id));
        toast({ title: 'Article Deleted', description: 'Article has been removed.' });
      } else {
        toast({ title: 'Error', description: 'Failed to delete article.', variant: 'destructive' });
      }
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const role = currentUser?.role || 'Subscriber';
  const isAdmin = role === 'Admin';
  const isEditor = role === 'Editor';
  const isAuthor = role === 'Author';

  // Stats calculation
  const totalUsers = users.length;
  const totalArticles = articles.length;
  const adminCount = users.filter(u => u.role === 'Admin').length;
  const editorCount = users.filter(u => u.role === 'Editor').length;
  const authorCount = users.filter(u => u.role === 'Author').length;

  const authorArticles = articles.filter(a => 
    a.author.toLowerCase() === (currentUser?.name || '').toLowerCase() ||
    a.authorSlug === (user?.user_metadata?.full_name || '').toLowerCase().replace(/\s+/g, '-')
  );

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Welcome back, {currentUser?.name || user?.user_metadata?.full_name || 'User'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            Role: <Badge variant={isAdmin ? 'destructive' : isEditor ? 'default' : isAuthor ? 'outline' : 'secondary'} className="capitalize">{role}</Badge>
            <span>•</span>
            <span>{user?.email}</span>
          </p>
        </div>
        {(isAdmin || isEditor || isAuthor) && (
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Link href="/create-post" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Article
            </Link>
          </Button>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium font-sans">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">{adminCount} Admins, {editorCount} Editors, {authorCount} Authors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Articles</CardTitle>
            <Edit className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authorArticles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Authored by you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account Access</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{role}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified Permissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin User Management Section */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Role Management</CardTitle>
                <CardDescription>
                  View users in the database and assign roles (Admin, Editor, Author, Subscriber, User).
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center text-red-500 py-6">
                <p className="font-bold">Error loading users</p>
                <p>{error}</p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <UserTable users={users} searchQuery={searchQuery} />
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Article Management Section (Admin, Editor, Author) */}
      {(isAdmin || isEditor || isAuthor) && (
        <Card>
          <CardHeader>
            <CardTitle>{isAdmin || isEditor ? 'All Articles' : 'My Articles'}</CardTitle>
            <CardDescription>
              {isAdmin || isEditor
                ? 'Manage, edit, or delete articles across the platform.'
                : 'Manage articles published under your author name.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground font-medium border-b">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Author</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(isAdmin || isEditor ? articles : authorArticles).map((art) => (
                    <tr key={art._id || art.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 font-medium max-w-xs truncate">{art.title}</td>
                      <td className="p-3"><Badge variant="outline">{art.category}</Badge></td>
                      <td className="p-3">{art.author}</td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {new Date(art.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Link href={`/articles/${art.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Link href={`/edit-post/${art.slug}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteArticle(art._id || art.id, art.title)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscriber / User Dashboard View */}
      {(!isAdmin && !isEditor && !isAuthor) && (
        <Card className="bg-gradient-to-r from-emerald-950/20 to-slate-900/10 border-emerald-500/20">
          <CardHeader>
            <CardTitle>Subscriber Control Panel</CardTitle>
            <CardDescription>
              Manage your profile, view saved content, and stay updated with Debt & Dominion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/profile">Edit Profile Information</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">Explore About & Publication Team</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

