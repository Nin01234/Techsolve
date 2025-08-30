import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { initEmailJS, sendCommunityNotification } from '@/lib/emailjs';
import { 
  Users, 
  Plus, 
  Search, 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  Clock,
  TrendingUp,
  Award,
  CheckCircle,
  Star,
  Filter,
  User,
  Bookmark,
  Share2,
  Reply,
  Heart,
  MoreHorizontal,
  Send,
  AlertCircle,
  CheckCircle2,
  Zap,
  Shield,
  Cpu,
  Monitor,
  Smartphone,
  Wifi
} from 'lucide-react';

const categories = [
  { name: 'All Discussions', count: 1847 },
  { name: 'Hardware Help', count: 456 },
  { name: 'Software Issues', count: 623 },
  { name: 'Mobile Support', count: 289 },
  { name: 'Network Problems', count: 234 },
  { name: 'General Discussion', count: 245 }
];

const allDiscussions = [
  {
    id: 1,
    title: "Windows 11 BSOD after latest update - Need help!",
    content: "Getting frequent blue screens after installing the latest Windows update. Error code: SYSTEM_THREAD_EXCEPTION_NOT_HANDLED. Anyone else experiencing this?",
    author: {
      name: "TechUser123",
      avatar: "/api/placeholder/40/40",
      reputation: 1250,
      badges: ['Verified', 'Helper']
    },
    category: "Software Issues",
    replies: 23,
    likes: 45,
    views: 892,
    timeAgo: "2 hours ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 2,
    title: "RAM upgrade compatibility question",
    content: "Planning to upgrade from 16GB to 32GB RAM. Current setup: DDR4-3200 16GB (2x8GB). Can I add another 16GB kit or should I replace entirely?",
    author: {
      name: "HardwareNewbie",
      avatar: "/api/placeholder/40/40",
      reputation: 450,
      badges: ['New Member']
    },
    category: "Hardware Help",
    replies: 12,
    likes: 28,
    views: 567,
    timeAgo: "4 hours ago",
    solved: true,
    trending: false,
    bookmarked: false,
    liked: false
  },
  {
    id: 3,
    title: "iPhone battery drains overnight - iOS 17 issue?",
    content: "Since updating to iOS 17, my iPhone 13 Pro battery drops 30-40% overnight even with airplane mode on. Battery health shows 89%. Any solutions?",
    author: {
      name: "AppleFan2023",
      avatar: "/api/placeholder/40/40",
      reputation: 820,
      badges: ['Regular', 'Helper']
    },
    category: "Mobile Support",
    replies: 18,
    likes: 35,
    views: 734,
    timeAgo: "6 hours ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 4,
    title: "Mesh WiFi vs Single Router - Performance comparison",
    content: "Considering upgrading my home network. Current house is 2500 sq ft, 2 floors. Would a mesh system like Eero or Orbi be better than a high-end single router?",
    author: {
      name: "NetworkPro",
      avatar: "/api/placeholder/40/40",
      reputation: 2100,
      badges: ['Expert', 'Verified', 'Top Contributor']
    },
    category: "Network Problems",
    replies: 31,
    likes: 67,
    views: 1240,
    timeAgo: "1 day ago",
    solved: true,
    trending: false,
    bookmarked: false,
    liked: false
  },
  {
    id: 5,
    title: "GPU temperatures reaching 85°C during gaming - Normal?",
    content: "RTX 4070 hitting 85°C during intensive gaming. Case has good airflow (3 intake, 2 exhaust fans). Is this temperature safe long-term?",
    author: {
      name: "GamerTech",
      avatar: "/api/placeholder/40/40",
      reputation: 950,
      badges: ['Gaming Expert', 'Helper']
    },
    category: "Hardware Help",
    replies: 15,
    likes: 42,
    views: 689,
    timeAgo: "1 day ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 6,
    title: "SSD vs HDD for gaming - Performance impact analysis",
    content: "Currently using a 1TB HDD for games. Would upgrading to an NVMe SSD significantly improve loading times and overall gaming performance?",
    author: {
      name: "GamingEnthusiast",
      avatar: "/api/placeholder/40/40",
      reputation: 1800,
      badges: ['Gaming Expert', 'Verified']
    },
    category: "Hardware Help",
    replies: 27,
    likes: 89,
    views: 1567,
    timeAgo: "3 hours ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 7,
    title: "Android 14 update causing app crashes - Solutions needed",
    content: "After updating to Android 14, several apps are crashing randomly. Tried clearing cache and reinstalling but issues persist. Any workarounds?",
    author: {
      name: "AndroidUser2024",
      avatar: "/api/placeholder/40/40",
      reputation: 650,
      badges: ['Regular']
    },
    category: "Mobile Support",
    replies: 14,
    likes: 31,
    views: 445,
    timeAgo: "5 hours ago",
    solved: false,
    trending: false,
    bookmarked: false,
    liked: false
  },
  {
    id: 8,
    title: "VPN connection issues with corporate network",
    content: "Having trouble connecting to corporate VPN from home. Error: 'Connection failed - authentication timeout'. Firewall settings seem correct.",
    author: {
      name: "RemoteWorker",
      avatar: "/api/placeholder/40/40",
      reputation: 320,
      badges: ['New Member']
    },
    category: "Network Problems",
    replies: 8,
    likes: 12,
    views: 234,
    timeAgo: "8 hours ago",
    solved: true,
    trending: false,
    bookmarked: false,
    liked: false
  },
  {
    id: 9,
    title: "MacBook Pro M2 thermal throttling under load",
    content: "M2 MacBook Pro getting very hot during video editing. CPU usage spikes and performance drops significantly. Normal behavior or hardware issue?",
    author: {
      name: "MacVideoEditor",
      avatar: "/api/placeholder/40/40",
      reputation: 1450,
      badges: ['Expert', 'Verified']
    },
    category: "Hardware Help",
    replies: 19,
    likes: 56,
    views: 892,
    timeAgo: "12 hours ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 10,
    title: "Windows Defender vs Third-party antivirus - 2024 comparison",
    content: "Is Windows Defender sufficient for 2024, or should I invest in a third-party antivirus? Looking for real-world protection vs performance impact.",
    author: {
      name: "SecurityConscious",
      avatar: "/api/placeholder/40/40",
      reputation: 2100,
      badges: ['Security Expert', 'Top Contributor']
    },
    category: "Software Issues",
    replies: 42,
    likes: 123,
    views: 2340,
    timeAgo: "1 day ago",
    solved: true,
    trending: false,
    bookmarked: false,
    liked: false
  },
  {
    id: 11,
    title: "Smart home integration - HomeKit vs Google Home vs Alexa",
    content: "Building a smart home system. Which ecosystem offers the best integration, reliability, and future-proofing? Currently have mixed devices.",
    author: {
      name: "SmartHomeBuilder",
      avatar: "/api/placeholder/40/40",
      reputation: 890,
      badges: ['IoT Expert', 'Helper']
    },
    category: "General Discussion",
    replies: 35,
    likes: 78,
    views: 1456,
    timeAgo: "2 days ago",
    solved: false,
    trending: true,
    bookmarked: false,
    liked: false
  },
  {
    id: 12,
    title: "Dual monitor setup - Display scaling issues",
    content: "Using 27\" 4K and 24\" 1080p monitors. Windows scaling is inconsistent between displays. Text too small on 4K, too large on 1080p. Solutions?",
    author: {
      name: "MultiMonitorUser",
      avatar: "/api/placeholder/40/40",
      reputation: 1100,
      badges: ['Display Expert', 'Verified']
    },
    category: "Hardware Help",
    replies: 16,
    likes: 34,
    views: 567,
    timeAgo: "1 day ago",
    solved: true,
    trending: false,
    bookmarked: false,
    liked: false
  }
];

const topContributors = [
  { name: "TechGuru2024", reputation: 15420, solutions: 234, avatar: "/api/placeholder/40/40" },
  { name: "HardwareMaster", reputation: 12850, solutions: 189, avatar: "/api/placeholder/40/40" },
  { name: "SoftwareWiz", reputation: 11200, solutions: 156, avatar: "/api/placeholder/40/40" },
  { name: "NetworkNinja", reputation: 9850, solutions: 134, avatar: "/api/placeholder/40/40" },
  { name: "MobilePro", reputation: 8750, solutions: 112, avatar: "/api/placeholder/40/40" }
];

export const CommunityPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [discussions, setDiscussions] = useState(allDiscussions);
  const [newPostData, setNewPostData] = useState({
    title: '',
    category: '',
    content: ''
  });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();
  }, []);

  // Dynamic posts that change every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDiscussions(prevDiscussions => {
        const shuffled = [...allDiscussions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8); // Show 8 random posts
      });
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'All Discussions' || discussion.category === selectedCategory;
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (discussionId: number) => {
    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, liked: !discussion.liked, likes: discussion.liked ? discussion.likes - 1 : discussion.likes + 1 }
        : discussion
    ));
  };

  const handleBookmark = (discussionId: number) => {
    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, bookmarked: !discussion.bookmarked }
        : discussion
    ));
  };

  const handleShare = (discussion: any) => {
    const shareData = {
      title: discussion.title,
      text: discussion.content.substring(0, 100) + '...',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${discussion.title}\n\n${discussion.content}\n\n${window.location.href}`);
      alert('Discussion link copied to clipboard!');
    }
  };

  const handleReply = (discussion: any) => {
    setSelectedDiscussion(discussion);
    setShowReplyModal(true);
  };

  const submitReply = () => {
    if (replyContent.trim()) {
      // In a real app, this would send the reply to the server
      alert('Reply submitted successfully!');
      setReplyContent('');
      setShowReplyModal(false);
      setSelectedDiscussion(null);
    }
  };

  const createNewPost = async () => {
    if (!user) {
      alert('Please log in to create a post');
      return;
    }
    
    if (newPostData.title && newPostData.category && newPostData.content) {
      const newPost = {
        id: Date.now(),
        title: newPostData.title,
        content: newPostData.content,
        author: {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          avatar: user.user_metadata?.avatar_url || "/api/placeholder/40/40",
          reputation: 1000,
          badges: ['Member']
        },
        category: newPostData.category,
        replies: 0,
        likes: 0,
        views: 0,
        timeAgo: "Just now",
        solved: false,
        trending: false,
        bookmarked: false,
        liked: false
      };

      setDiscussions(prev => [newPost, ...prev]);
      setNewPostData({ title: '', category: '', content: '' });
      setShowNewPost(false);
      
      // Send email notification about new post
      try {
        const result = await sendCommunityNotification(newPostData, user);
        if (result.success) {
          console.log('Community notification email sent successfully');
        } else {
          console.error('Failed to send community notification email:', result.error);
        }
      } catch (error) {
        console.error('Failed to send community notification email:', error);
      }
      
      alert('New discussion created successfully! Your post is now visible in the community.');
    } else {
      alert('Please fill in all fields');
    }
  };

  const joinCommunity = () => {
    alert('Welcome to the community! You are now a member. You can now create posts, reply to discussions, and participate in all community activities.');
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 10000) return 'text-purple-500';
    if (reputation >= 5000) return 'text-blue-500';
    if (reputation >= 1000) return 'text-green-500';
    return 'text-foreground/70';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-primary to-secondary">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Community</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Connect with experts and fellow users to share solutions and learn together
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 glass border-border/20"
                  />
                </div>
                <Button 
                  onClick={() => setShowNewPost(!showNewPost)}
                  className="h-12 px-6 bg-gradient-to-r from-primary to-secondary"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Discussion
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
              <Button variant="outline" className="flex items-center gap-2 ml-auto">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* New Post Form */}
              {showNewPost && (
                <Card className="p-6 glass border-border/20">
                  <h3 className="text-lg font-bold mb-4">Start a New Discussion</h3>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Discussion title..." 
                      className="glass border-border/20"
                      value={newPostData.title}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <select 
                      className="w-full h-10 px-3 rounded-lg bg-background border border-border/20"
                      value={newPostData.category}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="">Select category...</option>
                      <option value="Hardware Help">Hardware Help</option>
                      <option value="Software Issues">Software Issues</option>
                      <option value="Mobile Support">Mobile Support</option>
                      <option value="Network Problems">Network Problems</option>
                      <option value="General Discussion">General Discussion</option>
                    </select>
                    <Textarea 
                      placeholder="Describe your question or start a discussion..." 
                      rows={4}
                      className="glass border-border/20"
                      value={newPostData.content}
                      onChange={(e) => setNewPostData(prev => ({ ...prev, content: e.target.value }))}
                    />
                    <div className="flex gap-3">
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary"
                        onClick={createNewPost}
                      >
                        Post Discussion
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Discussions List */}
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="p-6 glass border-border/20 card-hover">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline">{discussion.category}</Badge>
                            {discussion.trending && (
                              <Badge className="bg-orange-500/20 text-orange-500">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {discussion.solved && (
                              <Badge className="bg-success/20 text-success">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Solved
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-foreground/60 whitespace-nowrap">
                            {discussion.timeAgo}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>

                        <p className="text-foreground/70 mb-4 line-clamp-2">
                          {discussion.content}
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{discussion.author.name}</span>
                            <span className={`text-sm ${getReputationColor(discussion.author.reputation)}`}>
                              {discussion.author.reputation.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {discussion.author.badges.map((badge, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-foreground/60">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {discussion.likes} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {discussion.views.toLocaleString()} views
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReply(discussion)}
                              className="flex items-center gap-1 text-foreground/60 hover:text-primary"
                            >
                              <Reply className="w-4 h-4" />
                              Reply
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(discussion.id)}
                              className={`flex items-center gap-1 ${
                                discussion.liked ? 'text-red-500' : 'text-foreground/60 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${discussion.liked ? 'fill-current' : ''}`} />
                              {discussion.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleBookmark(discussion.id)}
                              className={`flex items-center gap-1 ${
                                discussion.bookmarked ? 'text-blue-500' : 'text-foreground/60 hover:text-blue-500'
                              }`}
                            >
                              <Bookmark className={`w-4 h-4 ${discussion.bookmarked ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(discussion)}
                              className="flex items-center gap-1 text-foreground/60 hover:text-green-500"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg" className="rounded-full">
                  Load More Discussions
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Community Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Total Members</span>
                    <span className="font-bold">47,239</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Active Today</span>
                    <span className="font-bold text-success">2,845</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Problems Solved</span>
                    <span className="font-bold text-primary">15,067</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">This Week</span>
                    <span className="font-bold">1,234</span>
                  </div>
                </div>
              </Card>

              {/* Top Contributors */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-sm font-bold text-primary">#{index + 1}</div>
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{contributor.name}</div>
                        <div className="text-sm text-foreground/60">
                          {contributor.solutions} solutions • {contributor.reputation.toLocaleString()} rep
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* My Posts & Bookmarks */}
              {user && (
                <>
                  <Card className="p-6 glass border-border/20">
                    <h3 className="text-lg font-bold mb-4">My Posts</h3>
                    <div className="space-y-3">
                      {discussions.filter(d => d.author.name === (user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous')).slice(0, 3).map((post) => (
                        <div key={post.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-foreground/60">
                            <span>{post.likes} likes</span>
                            <span>•</span>
                            <span>{post.replies} replies</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                      {discussions.filter(d => d.author.name === (user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous')).length === 0 && (
                        <p className="text-sm text-foreground/60">No posts yet. Start by asking a question!</p>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6 glass border-border/20">
                    <h3 className="text-lg font-bold mb-4">My Bookmarks</h3>
                    <div className="space-y-3">
                      {discussions.filter(d => d.bookmarked).slice(0, 3).map((post) => (
                        <div key={post.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-foreground/60">
                            <span>{post.likes} likes</span>
                            <span>•</span>
                            <span>{post.replies} replies</span>
                            <span>•</span>
                            <span>{post.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                      {discussions.filter(d => d.bookmarked).length === 0 && (
                        <p className="text-sm text-foreground/60">No bookmarks yet. Save interesting posts!</p>
                      )}
                    </div>
                  </Card>
                </>
              )}

              {/* Quick Actions */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowNewPost(true)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      const trendingPosts = discussions.filter(d => d.trending);
                      alert(`Found ${trendingPosts.length} trending posts!`);
                    }}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Browse Popular
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      const recentPosts = discussions.slice(0, 5);
                      alert(`Showing ${recentPosts.length} recent posts!`);
                    }}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Activity
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={joinCommunity}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Button>
                </div>
              </Card>

              {/* Community Guidelines */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4">Community Guidelines</h3>
                <div className="space-y-3 text-sm text-foreground/70">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Be respectful and helpful to others</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Search before posting duplicate questions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Provide detailed information about your issue</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>Mark solutions that help you</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedDiscussion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-2xl bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Reply to: {selectedDiscussion.title}</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Original post:</p>
                <p className="text-sm">{selectedDiscussion.content.substring(0, 200)}...</p>
              </div>
              
              <Textarea 
                placeholder="Write your reply..." 
                rows={6}
                className="mb-4"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowReplyModal(false)}>
                  Cancel
                </Button>
                <Button onClick={submitReply} disabled={!replyContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};