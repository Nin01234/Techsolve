import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Filter,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  Eye,
  Star,
  Award,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Monitor,
  Wifi,
  Smartphone,
  Shield,
  Zap,
  Heart,
  Flag
} from 'lucide-react';

const communityCategories = [
  { id: 'general', name: 'General Discussion', icon: MessageSquare, count: 234, color: 'bg-blue-500' },
  { id: 'hardware', name: 'Hardware Support', icon: Cpu, count: 156, color: 'bg-green-500' },
  { id: 'software', name: 'Software Issues', icon: Monitor, count: 203, color: 'bg-purple-500' },
  { id: 'network', name: 'Network Problems', icon: Wifi, count: 89, color: 'bg-orange-500' },
  { id: 'mobile', name: 'Mobile Devices', icon: Smartphone, count: 134, color: 'bg-red-500' },
  { id: 'security', name: 'Security & Privacy', icon: Shield, count: 67, color: 'bg-yellow-500' }
];

const forumPosts = [
  {
    id: 1,
    title: "Help! My computer won't start after Windows update",
    content: "I recently updated Windows 11 and now my computer won't start. It shows a black screen with a cursor. I've tried safe mode but no luck. Any suggestions?",
    author: {
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      reputation: 1250,
      badges: ["Expert", "Helper"]
    },
    category: "Software Issues",
    tags: ["Windows 11", "Boot Problem", "Update Issue"],
    replies: 12,
    views: 234,
    likes: 8,
    isSolved: false,
    isPinned: false,
    createdAt: "2 hours ago",
    lastActivity: "30 minutes ago"
  },
  {
    id: 2,
    title: "SSD Installation Guide - Step by Step Tutorial",
    content: "I've created a comprehensive guide for installing SSDs in both desktop and laptop computers. This covers everything from preparation to optimization.",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      reputation: 2840,
      badges: ["Moderator", "Expert", "Contributor"]
    },
    category: "Hardware Support",
    tags: ["SSD", "Installation", "Tutorial", "Guide"],
    replies: 45,
    views: 892,
    likes: 67,
    isSolved: true,
    isPinned: true,
    createdAt: "1 day ago",
    lastActivity: "2 hours ago"
  },
  {
    id: 3,
    title: "WiFi keeps disconnecting - Router troubleshooting",
    content: "My WiFi connection keeps dropping every few minutes. I've tried resetting the router but the problem persists. Looking for advanced troubleshooting steps.",
    author: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      reputation: 890,
      badges: ["Helper"]
    },
    category: "Network Problems",
    tags: ["WiFi", "Router", "Connection", "Troubleshooting"],
    replies: 8,
    views: 156,
    likes: 3,
    isSolved: false,
    isPinned: false,
    createdAt: "4 hours ago",
    lastActivity: "1 hour ago"
  },
  {
    id: 4,
    title: "Android battery optimization techniques",
    content: "Sharing some proven techniques to extend Android battery life. These methods have helped me get 2+ days of battery life on my phone.",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      reputation: 1560,
      badges: ["Expert", "Mobile Specialist"]
    },
    category: "Mobile Devices",
    tags: ["Android", "Battery", "Optimization", "Tips"],
    replies: 23,
    views: 445,
    likes: 34,
    isSolved: true,
    isPinned: false,
    createdAt: "2 days ago",
    lastActivity: "5 hours ago"
  }
];

const topContributors = [
  {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    reputation: 2840,
    posts: 156,
    solutions: 89,
    badges: ["Moderator", "Expert", "Contributor"]
  },
  {
    name: "David Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    reputation: 2150,
    posts: 134,
    solutions: 67,
    badges: ["Expert", "Helper"]
  },
  {
    name: "Lisa Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    reputation: 1890,
    posts: 98,
    solutions: 45,
    badges: ["Expert", "Mobile Specialist"]
  }
];

export const CommunitySupportPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = () => {
    if (newPostData.title && newPostData.content && newPostData.category) {
      // Here you would typically send the data to your backend
      console.log('Creating new post:', newPostData);
      alert('Post created successfully! (This is a demo)');
      setNewPostData({ title: '', content: '', category: '', tags: '' });
      setShowNewPost(false);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Community Support</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Connect with tech experts, share solutions, and get help from the community
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setShowNewPost(true)}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Post
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search community posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedCategory === 'all' ? "default" : "outline"}
                  onClick={() => setSelectedCategory('all')}
                  size="sm"
                >
                  All Topics
                </Button>
                {communityCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="recent" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="recent">Recent Posts</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  <TabsTrigger value="solved">Solved</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Author Info */}
                          <div className="flex-shrink-0">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Post Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                  {post.title}
                                </h3>
                                {post.isPinned && (
                                  <Badge variant="outline" className="text-xs">
                                    📌 Pinned
                                  </Badge>
                                )}
                                {post.isSolved && (
                                  <Badge className="bg-success/20 text-success text-xs">
                                    ✅ Solved
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <p className="text-foreground/70 mb-3 line-clamp-2">
                              {post.content}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-foreground/60">
                              <div className="flex items-center gap-4">
                                <span>By {post.author.name}</span>
                                <span>•</span>
                                <span>{post.createdAt}</span>
                                <span>•</span>
                                <span>{post.category}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {post.replies}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {post.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="w-4 h-4" />
                                  {post.likes}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/20">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Reply
                          </Button>
                          <Button size="sm" variant="outline">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Like
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline">
                            <Bookmark className="w-4 h-4 mr-1" />
                            Bookmark
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="popular" className="space-y-4">
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Popular Posts</h3>
                    <p className="text-foreground/70">Most viewed and discussed topics</p>
                  </div>
                </TabsContent>

                <TabsContent value="unanswered" className="space-y-4">
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Unanswered Questions</h3>
                    <p className="text-foreground/70">Posts that need your help and expertise</p>
                  </div>
                </TabsContent>

                <TabsContent value="solved" className="space-y-4">
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Solved Problems</h3>
                    <p className="text-foreground/70">Successfully resolved community issues</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">2,847</div>
                      <div className="text-sm text-foreground/60">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">1,234</div>
                      <div className="text-sm text-foreground/60">Posts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">567</div>
                      <div className="text-sm text-foreground/60">Solutions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">89%</div>
                      <div className="text-sm text-foreground/60">Solved Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-warning" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{contributor.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-current" />
                          <span className="text-xs text-foreground/60">{contributor.reputation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bookmark className="w-4 h-4 mr-2" />
                    My Bookmarks
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    My Posts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <Card className="max-w-2xl w-full">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>
                  Share your question or knowledge with the community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    placeholder="Enter a clear, descriptive title..."
                    value={newPostData.title}
                    onChange={(e) => setNewPostData({...newPostData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    className="w-full p-2 border border-border rounded-md"
                    value={newPostData.category}
                    onChange={(e) => setNewPostData({...newPostData, category: e.target.value})}
                  >
                    <option value="">Select a category</option>
                    {communityCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    placeholder="Describe your question or share your knowledge..."
                    value={newPostData.content}
                    onChange={(e) => setNewPostData({...newPostData, content: e.target.value})}
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags (comma separated)</label>
                  <Input
                    placeholder="e.g., Windows, Hardware, Troubleshooting"
                    value={newPostData.tags}
                    onChange={(e) => setNewPostData({...newPostData, tags: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <Button onClick={handleCreatePost} className="flex-1">
                    Create Post
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewPost(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
