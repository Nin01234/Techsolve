import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Cpu,
  HardDrive,
  Network,
  Shield,
  BookOpen,
  Video,
  MessageSquare,
  Settings,
  ArrowRight,
  Zap,
  Star,
  Target,
  BarChart3,
  Calendar,
  Bell,
  Heart,
  Eye,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  Plus,
  Search,
  Filter,
  FileText
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalSolutions: 0,
    activeSessions: 0,
    successRate: 0,
    responseTime: 0,
    recentActivities: [],
    systemHealth: [],
    quickActions: [],
    userPosts: [],
    bookmarks: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user-specific data
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate user-specific stats based on user ID
      const userId = user?.id || 'default';
      const userHash = userId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      setUserStats({
        totalSolutions: Math.abs(userHash % 500) + 50,
        activeSessions: Math.abs(userHash % 10) + 1,
        successRate: 85 + (Math.abs(userHash % 15)),
        responseTime: 1.5 + (Math.abs(userHash % 3)),
        recentActivities: generateUserActivities(userId),
        systemHealth: generateSystemHealth(userId),
        quickActions: [
          { title: "Run Diagnostics", icon: Activity, color: "bg-blue-500", link: "/diagnostics", description: "Check system health" },
          { title: "AI Chat", icon: MessageSquare, color: "bg-purple-500", link: "/chat", description: "Get instant help" },
          { title: "Video Library", icon: Video, color: "bg-green-500", link: "/videos", description: "Watch tutorials" },
          { title: "Knowledge Base", icon: BookOpen, color: "bg-orange-500", link: "/guides", description: "Browse guides" },
          { title: "Community", icon: Users, color: "bg-pink-500", link: "/community", description: "Join discussions" },
          { title: "Settings", icon: Settings, color: "bg-gray-500", link: "/settings", description: "Manage account" }
        ],
        userPosts: generateUserPosts(userId),
        bookmarks: generateUserBookmarks(userId)
      });
      
      setIsLoading(false);
    };

    fetchUserData();
  }, [user]);

  const generateUserActivities = (userId: string) => {
    const activities = [
      {
        id: 1,
        type: "solution",
        title: "Fixed Blue Screen of Death",
        user: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
        time: "2 minutes ago",
        status: "completed",
        icon: CheckCircle,
        color: "text-green-600"
      },
      {
        id: 2,
        type: "diagnostic",
        title: "Network Performance Scan",
        user: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
        time: "15 minutes ago",
        status: "in-progress",
        icon: Activity,
        color: "text-blue-600"
      },
      {
        id: 3,
        type: "guide",
        title: "RAM Upgrade Tutorial",
        user: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
        time: "1 hour ago",
        status: "completed",
        icon: BookOpen,
        color: "text-purple-600"
      },
      {
        id: 4,
        type: "chat",
        title: "AI Assistant Session",
        user: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
        time: "2 hours ago",
        status: "completed",
        icon: MessageSquare,
        color: "text-orange-600"
      }
    ];
    
    return activities.slice(0, Math.abs(userId.length % 4) + 1);
  };

  const generateSystemHealth = (userId: string) => {
    const baseValues = [
      { name: "CPU Usage", value: 45 + (userId.length % 30), status: "good" },
      { name: "Memory Usage", value: 60 + (userId.length % 25), status: "warning" },
      { name: "Disk Space", value: 30 + (userId.length % 40), status: "good" },
      { name: "Network", value: 75 + (userId.length % 20), status: "excellent" }
    ];
    
    return baseValues.map(item => ({
      ...item,
      value: Math.min(100, Math.max(0, item.value))
    }));
  };

  const generateUserPosts = (userId: string) => {
    const posts = [
      {
        id: 1,
        title: "Windows 11 BSOD after latest update",
        content: "Getting frequent blue screens after installing the latest Windows update...",
        likes: 12 + (userId.length % 20),
        replies: 5 + (userId.length % 10),
        views: 89 + (userId.length % 100),
        timeAgo: "2 hours ago",
        category: "Software Issues"
      },
      {
        id: 2,
        title: "RAM upgrade compatibility question",
        content: "Planning to upgrade from 16GB to 32GB RAM. Current setup: DDR4-3200...",
        likes: 8 + (userId.length % 15),
        replies: 3 + (userId.length % 8),
        views: 45 + (userId.length % 80),
        timeAgo: "1 day ago",
        category: "Hardware Help"
      }
    ];
    
    return posts.slice(0, Math.abs(userId.length % 2) + 1);
  };

  const generateUserBookmarks = (userId: string) => {
    const bookmarks = [
      {
        id: 1,
        title: "How to fix Windows 10 slow boot",
        type: "guide",
        url: "/guides/windows-10-slow-boot",
        timeAdded: "3 days ago"
      },
      {
        id: 2,
        title: "Best antivirus software 2024",
        type: "article",
        url: "/knowledge/antivirus-software-2024",
        timeAdded: "1 week ago"
      }
    ];
    
    return bookmarks.slice(0, Math.abs(userId.length % 2) + 1);
  };

  const stats = [
    {
      title: "Total Solutions",
      value: userStats.totalSolutions.toString(),
      change: "+12.5%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Active Sessions",
      value: userStats.activeSessions.toString(),
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Success Rate",
      value: `${userStats.successRate}%`,
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "Response Time",
      value: `${userStats.responseTime}s`,
      change: "-15.3%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const handleQuickAction = (action: any) => {
    navigate(action.link);
  };

  const handleViewAll = (section: string) => {
    switch(section) {
      case 'activities':
        navigate('/community');
        break;
      case 'posts':
        navigate('/community');
        break;
      case 'bookmarks':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  Here's what's happening with your tech solutions today
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary to-secondary"
                  onClick={() => navigate('/diagnostics')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Start
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Access your most used features quickly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userStats.quickActions.map((action, index) => {
                      const Icon = action.icon
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
                          onClick={() => handleQuickAction(action)}
                        >
                          <div className={`p-3 rounded-full ${action.color} bg-opacity-10`}>
                            <Icon className={`w-6 h-6 ${action.color.replace('bg-', 'text-')}`} />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-sm">{action.title}</p>
                            <p className="text-xs text-muted-foreground">{action.description}</p>
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        Recent Activities
                      </CardTitle>
                      <CardDescription>
                        Your latest tech solution activities
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewAll('activities')}>
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.recentActivities.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`p-2 rounded-full ${activity.color} bg-opacity-10`}>
                            <Icon className={`w-4 h-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.user} • {activity.time}
                            </p>
                          </div>
                          <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* My Posts */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        My Posts
                      </CardTitle>
                      <CardDescription>
                        Your recent community posts
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewAll('posts')}>
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.userPosts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {post.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views}
                            </span>
                          </div>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    System Health
                  </CardTitle>
                  <CardDescription>
                    Current system performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.systemHealth.map((metric, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className="text-sm text-muted-foreground">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`w-2 h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <span className="text-xs text-muted-foreground capitalize">{metric.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* My Bookmarks */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5 text-primary" />
                        My Bookmarks
                      </CardTitle>
                      <CardDescription>
                        Your saved articles and guides
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleViewAll('bookmarks')}>
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userStats.bookmarks.map((bookmark) => (
                      <div key={bookmark.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            bookmark.type === 'guide' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {bookmark.type === 'guide' ? <BookOpen className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2">{bookmark.title}</h4>
                            <p className="text-xs text-muted-foreground">{bookmark.timeAdded}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Community Posts</span>
                      <span className="font-medium">{userStats.userPosts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Bookmarks</span>
                      <span className="font-medium">{userStats.bookmarks.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Solutions Found</span>
                      <span className="font-medium">{userStats.totalSolutions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Member Since</span>
                      <span className="font-medium">
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
