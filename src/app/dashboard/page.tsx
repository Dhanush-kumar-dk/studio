'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserTable from '@/components/user-table';
import { useAuth } from '@/hooks/use-auth';
import type { User, Article, UserRole } from '@/lib/types';
import {
  Loader2,
  Users,
  Newspaper,
  Shield,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Search,
  X,
  Calendar,
  User as UserIcon,
  LayoutDashboard,
  Filter,
} from 'lucide-react';
import { getUsers, getArticles, deleteArticle } from '@/app/actions';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Logo from '@/Assest/signal-2025-09-01-172433.jpeg';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import UserNav from '@/components/user-nav';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
        setError('You must be logged in to view the dashboard.');
        return;
      }

      setLoading(true);
      try {
        const supabase = createClient();
        const { data } = await supabase
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
          : {
              id: user.id,
              name: user.user_metadata?.full_name || 'User',
              email: user.email,
              role: 'Subscriber' as UserRole,
              avatarUrl: user.user_metadata?.avatar_url || '',
            };

        setCurrentUser(userData);

        // Fetch users & articles
        const [fetchedUsers, fetchedArticles] = await Promise.all([
          getUsers().catch(() => []),
          getArticles().catch(() => []),
        ]);

        setUsers(fetchedUsers);
        setArticles(fetchedArticles);
        setError(null);
      } catch (err: unknown) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, authLoading]);

  const handleDeleteArticle = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setDeletingId(id);
      try {
        const res = await deleteArticle(id);
        if (res.success) {
          setArticles((prev) => prev.filter((a) => a._id !== id && a.id !== id));
          toast({ title: 'Article Deleted', description: `"${title}" has been removed.` });
        } else {
          toast({
            title: 'Error',
            description: res.error || 'Failed to delete article.',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred while deleting article.',
          variant: 'destructive',
        });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const role = currentUser?.role || 'Subscriber';
  const isAdmin = role === 'Admin';
  const isEditor = role === 'Editor';
  const isAuthor = role === 'Author';

  // Stats calculation
  const totalUsers = users.length;
  const totalArticles = articles.length;
  const adminCount = users.filter((u) => u.role === 'Admin').length;
  const editorCount = users.filter((u) => u.role === 'Editor').length;
  const authorCount = users.filter((u) => u.role === 'Author').length;

  const authorArticles = useMemo(() => {
    return articles.filter(
      (a) =>
        a.author?.toLowerCase() === (currentUser?.name || '').toLowerCase() ||
        a.authorSlug === (user?.user_metadata?.full_name || '').toLowerCase().replace(/\s+/g, '-')
    );
  }, [articles, currentUser, user]);

  const activeArticles = useMemo(() => {
    return isAdmin || isEditor ? articles : authorArticles;
  }, [isAdmin, isEditor, articles, authorArticles]);

  // Unique categories for filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    activeArticles.forEach((a) => {
      if (a.category?.trim()) set.add(a.category.trim());
    });
    return Array.from(set).sort();
  }, [activeArticles]);

  // Filtered articles based on search & category
  const filteredArticles = useMemo(() => {
    return activeArticles.filter((art) => {
      const q = articleSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.title?.toLowerCase().includes(q) ||
        art.author?.toLowerCase().includes(q) ||
        art.category?.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'all' ||
        art.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [activeArticles, articleSearchQuery, selectedCategory]);

  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Unified Responsive Admin Dashboard Header */}
      <header className="sticky top-0 z-40 flex h-14 sm:h-16 w-full items-center justify-between border-b border-border/60 bg-background/95 px-3 sm:px-6 backdrop-blur shadow-xs">
        {/* Left: Sidebar trigger + Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <SidebarTrigger className="h-9 w-9 text-foreground hover:bg-muted shrink-0" />
          <Link href="/" className="flex items-center gap-2 min-w-0 hover:opacity-90 transition-opacity">
            <img
              src={Logo.src}
              alt="Debt & Dominion"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-md object-contain shrink-0"
            />
            <span className="font-headline font-bold text-sm sm:text-base tracking-tight truncate">
              Debt & Dominion
            </span>
          </Link>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[10px] px-1.5 py-0 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
          >
            Admin
          </Badge>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {(isAdmin || isEditor || isAuthor) && (
            <Button
              asChild
              size="sm"
              className="h-8 sm:h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2.5 sm:px-3 font-medium"
            >
              <Link href="/create-post" className="flex items-center gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Create Article</span>
                <span className="sm:hidden">Create</span>
              </Link>
            </Button>
          )}
          <ThemeToggle />
          <UserNav />
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 w-full">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8 max-w-7xl">
          {/* Quick-Jump Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <a
              href="#overview"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary/80 px-3 py-1.5 font-medium text-secondary-foreground hover:bg-secondary transition-colors"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-emerald-600" />
              <span>Overview</span>
            </a>
            {isAdmin && (
              <a
                href="#users"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary/80 px-3 py-1.5 font-medium text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <Users className="h-3.5 w-3.5 text-blue-600" />
                <span>Users ({totalUsers})</span>
              </a>
            )}
            {(isAdmin || isEditor || isAuthor) && (
              <a
                href="#articles"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-secondary/80 px-3 py-1.5 font-medium text-secondary-foreground hover:bg-secondary transition-colors"
              >
                <Newspaper className="h-3.5 w-3.5 text-amber-600" />
                <span>Articles ({activeArticles.length})</span>
              </a>
            )}
          </div>

          {/* Welcome Header Banner */}
          <div
            id="overview"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6 scroll-mt-20"
          >
            <div className="space-y-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-headline font-bold text-foreground tracking-tight break-words">
                Welcome back, {currentUser?.name || user?.user_metadata?.full_name || 'User'}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span>Role:</span>
                  <Badge
                    variant={isAdmin ? 'destructive' : isEditor ? 'default' : isAuthor ? 'outline' : 'secondary'}
                    className="capitalize text-xs font-medium"
                  >
                    {role}
                  </Badge>
                </span>
                <span className="hidden sm:inline">•</span>
                <span
                  className="truncate max-w-[200px] sm:max-w-none text-muted-foreground"
                  title={user?.email || ''}
                >
                  {user?.email}
                </span>
              </div>
            </div>

            {(isAdmin || isEditor || isAuthor) && (
              <Button
                asChild
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 font-medium h-10 px-4"
              >
                <Link href="/create-post" className="flex items-center justify-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Create Article</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card className="hover:border-emerald-500/40 transition-colors shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Total Articles
                </CardTitle>
                <div className="rounded-md bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                  <Newspaper className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">{totalArticles}</div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  Across all publication topics
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-blue-500/40 transition-colors shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
                <div className="rounded-md bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">{totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1 break-words">
                  {adminCount} Admins, {editorCount} Editors, {authorCount} Authors
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-amber-500/40 transition-colors shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  My Articles
                </CardTitle>
                <div className="rounded-md bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                  <Edit className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {authorArticles.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">Authored by you</p>
              </CardContent>
            </Card>

            <Card className="hover:border-purple-500/40 transition-colors shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Account Access
                </CardTitle>
                <div className="rounded-md bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
                  <Shield className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight capitalize">{role}</div>
                <p className="text-xs text-muted-foreground mt-1 truncate">Verified Permissions</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin User Management Section */}
          {isAdmin && (
            <Card id="users" className="scroll-mt-20 shadow-xs border-border/60">
              <CardHeader className="p-4 sm:p-6 border-b border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-600" />
                      <span>User Role Management</span>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">
                      View users in the database and assign roles (Admin, Editor, Author, Subscriber, User).
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs shrink-0 self-start sm:self-center">
                    {users.length} {users.length === 1 ? 'user' : 'users'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4">
                {error ? (
                  <div className="text-center text-red-500 py-6">
                    <p className="font-bold">Error loading users</p>
                    <p>{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="relative w-full sm:max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search users by name, email, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-8 text-sm h-10 w-full"
                      />
                      {searchQuery && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setSearchQuery('')}
                          aria-label="Clear user search"
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    <UserTable users={users} searchQuery={searchQuery} />
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Article Management Section (Admin, Editor, Author) */}
          {(isAdmin || isEditor || isAuthor) && (
            <Card id="articles" className="scroll-mt-20 shadow-xs border-border/60">
              <CardHeader className="p-4 sm:p-6 border-b border-border/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <Newspaper className="h-5 w-5 text-emerald-600" />
                      <span>{isAdmin || isEditor ? 'All Articles' : 'My Articles'}</span>
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1">
                      {isAdmin || isEditor
                        ? 'Manage, preview, edit, or delete articles across the platform.'
                        : 'Manage articles published under your author name.'}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs shrink-0 self-start sm:self-center">
                    {filteredArticles.length} of {activeArticles.length}{' '}
                    {activeArticles.length === 1 ? 'article' : 'articles'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Responsive Filter & Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search articles by title, author..."
                      value={articleSearchQuery}
                      onChange={(e) => setArticleSearchQuery(e.target.value)}
                      className="pl-9 pr-8 text-sm h-10 w-full"
                    />
                    {articleSearchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setArticleSearchQuery('')}
                        aria-label="Clear article search"
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  {categories.length > 0 && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Filter className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
                      <Select
                        value={selectedCategory}
                        onValueChange={(val) => setSelectedCategory(val)}
                      >
                        <SelectTrigger className="w-full sm:w-48 h-10 text-xs sm:text-sm bg-background">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Empty State */}
                {filteredArticles.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/80 p-8 text-center bg-card">
                    <Newspaper className="mx-auto h-10 w-10 text-muted-foreground/40 mb-2" />
                    <h3 className="text-sm font-semibold text-foreground">No articles found</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      {articleSearchQuery || selectedCategory !== 'all'
                        ? 'No articles matched your search or category filter. Try clearing the filter.'
                        : 'You do not have any published articles yet.'}
                    </p>
                    {(articleSearchQuery || selectedCategory !== 'all') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 text-xs"
                        onClick={() => {
                          setArticleSearchQuery('');
                          setSelectedCategory('all');
                        }}
                      >
                        Reset Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Mobile Article Card List (< 768px) */}
                    <div className="block md:hidden space-y-3">
                      {filteredArticles.map((art) => {
                        const id = art._id || art.id;
                        const isDeleting = deletingId === id;

                        return (
                          <div
                            key={id}
                            className="rounded-lg border bg-card p-3.5 space-y-3 shadow-xs hover:border-border transition-colors"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <Badge variant="outline" className="text-[11px] font-medium">
                                  {art.category || 'General'}
                                </Badge>
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(art.publishedAt).toLocaleDateString()}
                                </span>
                              </div>

                              <Link
                                href={`/articles/${art.slug}`}
                                target="_blank"
                                className="font-semibold text-sm leading-snug line-clamp-2 text-foreground hover:text-emerald-600 transition-colors block"
                              >
                                {art.title}
                              </Link>

                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <UserIcon className="h-3 w-3 shrink-0" />
                                <span className="truncate">By {art.author || 'Anonymous'}</span>
                              </p>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                              <Button
                                asChild
                                size="sm"
                                variant="ghost"
                                className="h-8 px-2.5 text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                              >
                                <Link href={`/articles/${art.slug}`} target="_blank">
                                  <Eye className="h-3.5 w-3.5" />
                                  <span>View</span>
                                </Link>
                              </Button>

                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="h-8 px-2.5 text-xs flex items-center gap-1.5"
                              >
                                <Link href={`/edit-post/${art.slug}`}>
                                  <Edit className="h-3.5 w-3.5" />
                                  <span>Edit</span>
                                </Link>
                              </Button>

                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={isDeleting}
                                className="h-8 px-2.5 text-xs flex items-center gap-1.5"
                                onClick={() => handleDeleteArticle(id, art.title)}
                              >
                                {isDeleting ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                                <span>Delete</span>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tablet & Desktop Table View (>= 768px) */}
                    <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted/40 text-muted-foreground font-medium border-b">
                            <tr>
                              <th className="p-3 w-[45%]">Title</th>
                              <th className="p-3 w-[15%]">Category</th>
                              <th className="p-3 w-[15%]">Author</th>
                              <th className="p-3 w-[12%]">Date</th>
                              <th className="p-3 w-[13%] text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {filteredArticles.map((art) => {
                              const id = art._id || art.id;
                              const isDeleting = deletingId === id;

                              return (
                                <tr key={id} className="hover:bg-muted/40 transition-colors">
                                  <td className="p-3 font-medium max-w-sm">
                                    <Link
                                      href={`/articles/${art.slug}`}
                                      target="_blank"
                                      className="hover:text-emerald-600 transition-colors truncate block"
                                      title={art.title}
                                    >
                                      {art.title}
                                    </Link>
                                  </td>
                                  <td className="p-3">
                                    <Badge variant="outline" className="text-xs">
                                      {art.category || 'General'}
                                    </Badge>
                                  </td>
                                  <td className="p-3 text-muted-foreground truncate max-w-[150px]">
                                    {art.author || 'Anonymous'}
                                  </td>
                                  <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(art.publishedAt).toLocaleDateString()}
                                  </td>
                                  <td className="p-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <Button
                                        asChild
                                        size="sm"
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                        title="Preview article"
                                      >
                                        <Link href={`/articles/${art.slug}`} target="_blank">
                                          <Eye className="h-4 w-4" />
                                        </Link>
                                      </Button>

                                      <Button
                                        asChild
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        title="Edit article"
                                      >
                                        <Link href={`/edit-post/${art.slug}`}>
                                          <Edit className="h-4 w-4" />
                                        </Link>
                                      </Button>

                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        disabled={isDeleting}
                                        className="h-8 w-8 p-0"
                                        title="Delete article"
                                        onClick={() => handleDeleteArticle(id, art.title)}
                                      >
                                        {isDeleting ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <Trash2 className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Subscriber / Standard User View */}
          {!isAdmin && !isEditor && !isAuthor && (
            <Card className="bg-gradient-to-r from-emerald-950/20 to-slate-900/10 border-emerald-500/20 shadow-xs">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Subscriber Control Panel</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage your profile, view saved content, and stay updated with Debt & Dominion.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild variant="default" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/profile">Edit Profile Information</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/about">Explore About & Publication Team</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Clean Minimal Admin Footer */}
          <footer className="mt-12 border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Debt & Dominion &bull; Admin Console</p>
          </footer>
        </div>
      </main>
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
