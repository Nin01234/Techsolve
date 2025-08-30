import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Share2,
  Bookmark,
  Clock,
  Eye,
  Star,
  Filter,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info,
  Cpu,
  HardDrive,
  Monitor,
  Wifi,
  Smartphone,
  Shield,
  Zap,
  Users,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Play,
  BookmarkPlus,
  BookmarkCheck,
  Heart,
  MoreHorizontal,
  ArrowRight,
  ChevronRight,
  Calendar,
  User,
  Award,
  Target,
  BarChart3,
  Layers,
  Settings,
  HelpCircle,
  FileCode,
  Database,
  Cloud,
  Server,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  Activity,
  PieChart,
  LineChart,
  Grid,
  List
} from 'lucide-react';

const categories = [
  { 
    id: 'hardware', 
    name: 'Hardware', 
    icon: Cpu, 
    count: 4, 
    color: 'bg-blue-500',
    description: 'PC components, upgrades, and hardware troubleshooting',
    subcategories: ['CPU & Motherboard', 'RAM & Storage', 'GPU & Graphics', 'Peripherals']
  },
  { 
    id: 'software', 
    name: 'Software', 
    icon: Monitor, 
    count: 3, 
    color: 'bg-green-500',
    description: 'Operating systems, applications, and software solutions',
    subcategories: ['Windows', 'macOS', 'Linux', 'Applications']
  },
  { 
    id: 'network', 
    name: 'Network', 
    icon: Wifi, 
    count: 3, 
    color: 'bg-purple-500',
    description: 'Internet, WiFi, and network connectivity issues',
    subcategories: ['WiFi Setup', 'Router Configuration', 'VPN & Security', 'Troubleshooting']
  },
  { 
    id: 'mobile', 
    name: 'Mobile', 
    icon: Smartphone, 
    count: 3, 
    color: 'bg-orange-500',
    description: 'Smartphones, tablets, and mobile device support',
    subcategories: ['iOS', 'Android', 'Tablets', 'Mobile Apps']
  },
  { 
    id: 'security', 
    name: 'Security', 
    icon: Shield, 
    count: 3, 
    color: 'bg-red-500',
    description: 'Cybersecurity, privacy, and protection guides',
    subcategories: ['Antivirus', 'Firewall', 'Privacy', 'Encryption']
  },
  { 
    id: 'performance', 
    name: 'Performance', 
    icon: Zap, 
    count: 0, 
    color: 'bg-yellow-500',
    description: 'System optimization and performance tuning',
    subcategories: ['Speed Optimization', 'Battery Life', 'Gaming Performance', 'Benchmarking']
  },
  { 
    id: 'cloud', 
    name: 'Cloud & Storage', 
    icon: Cloud, 
    count: 2, 
    color: 'bg-indigo-500',
    description: 'Cloud services, backup, and data management',
    subcategories: ['Cloud Storage', 'Backup Solutions', 'Sync Services', 'Data Recovery']
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    icon: Target, 
    count: 2, 
    color: 'bg-pink-500',
    description: 'Gaming hardware, optimization, and troubleshooting',
    subcategories: ['Gaming PCs', 'Console Support', 'Performance', 'Streaming']
  }
];

const featuredArticles = [
  {
    id: 1,
    title: "Complete Guide to SSD Installation & Migration",
    excerpt: "Step-by-step tutorial for installing and migrating to SSD drives with performance optimization tips.",
    category: "Hardware",
    difficulty: "Intermediate",
    readTime: "15 min",
    views: "2.4K",
    rating: 4.8,
    likes: 156,
    comments: 23,
    author: {
      name: "TechExpert Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 15420,
      verified: true
    },
    tags: ["SSD", "Installation", "Migration", "Performance"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
    bookmarked: false,
    liked: false,
    content: {
      sections: [
        {
          title: "Introduction",
          content: "Upgrading to an SSD is one of the most impactful improvements you can make to your computer's performance. This guide covers everything from choosing the right SSD to complete data migration."
        },
        {
          title: "Choosing the Right SSD",
          content: "Consider factors like capacity, speed, form factor, and budget. NVMe SSDs offer the best performance but SATA SSDs are more affordable."
        },
        {
          title: "Installation Process",
          content: "Step-by-step instructions for physical installation, including safety precautions and tool requirements."
        },
        {
          title: "Data Migration",
          content: "Complete guide to migrating your operating system and data from HDD to SSD using various methods."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Windows 11 Performance Optimization Masterclass",
    excerpt: "Comprehensive guide to optimize Windows 11 for maximum performance including registry tweaks and system maintenance.",
    category: "Software",
    difficulty: "Advanced",
    readTime: "25 min",
    views: "3.1K",
    rating: 4.9,
    likes: 234,
    comments: 45,
    author: {
      name: "Windows Guru",
      avatar: "/api/placeholder/40/40",
      reputation: 12850,
      verified: true
    },
    tags: ["Windows 11", "Optimization", "Performance", "Registry"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    bookmarked: false,
    liked: false,
    content: {
      sections: [
        {
          title: "System Assessment",
          content: "Learn how to analyze your system's current performance and identify bottlenecks."
        },
        {
          title: "Startup Optimization",
          content: "Disable unnecessary startup programs and services to improve boot times."
        },
        {
          title: "Registry Optimization",
          content: "Advanced registry tweaks for performance improvement (use with caution)."
        },
        {
          title: "Maintenance Schedule",
          content: "Regular maintenance tasks to keep your system running optimally."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Android Performance Boost: Complete Guide",
    excerpt: "Expert techniques to boost Android device performance with RAM management and battery optimization.",
    category: "Mobile",
    difficulty: "Beginner",
    readTime: "12 min",
    views: "1.8K",
    rating: 4.7,
    likes: 189,
    comments: 34,
    author: {
      name: "Mobile Master",
      avatar: "/api/placeholder/40/40",
      reputation: 11200,
      verified: true
    },
    tags: ["Android", "Performance", "Battery", "RAM"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
    bookmarked: false,
    liked: false,
    content: {
      sections: [
        {
          title: "Performance Analysis",
          content: "How to identify what's slowing down your Android device."
        },
        {
          title: "RAM Management",
          content: "Techniques to free up RAM and improve multitasking performance."
        },
        {
          title: "Battery Optimization",
          content: "Settings and apps to optimize battery life without sacrificing performance."
        },
        {
          title: "Storage Cleanup",
          content: "Methods to free up storage space and improve overall performance."
        }
      ]
    }
  }
];

const knowledgeArticles = [
  {
    id: 1,
    title: "Router Setup & Security Configuration Guide",
    excerpt: "Complete router setup guide with advanced security configuration, firewall settings, and guest networks.",
    category: "Network",
    difficulty: "Intermediate",
    readTime: "18 min",
    views: "1.2K",
    rating: 4.6,
    likes: 89,
    comments: 15,
    author: {
      name: "Network Ninja",
      avatar: "/api/placeholder/40/40",
      reputation: 9850,
      verified: true
    },
    tags: ["Router", "Security", "WiFi", "Firewall"],
    bookmarked: false,
    liked: false
  },
  {
    id: 2,
    title: "Blue Screen of Death: Complete Troubleshooting",
    excerpt: "Comprehensive troubleshooting guide for Windows BSOD errors with multiple solutions and prevention tips.",
    category: "Software",
    difficulty: "Intermediate",
    readTime: "20 min",
    views: "2.8K",
    rating: 4.5,
    likes: 167,
    comments: 28,
    author: {
      name: "Windows Expert",
      avatar: "/api/placeholder/40/40",
      reputation: 11200,
      verified: true
    },
    tags: ["BSOD", "Windows", "Troubleshooting", "Drivers"],
    bookmarked: false,
    liked: false
  },
  {
    id: 3,
    title: "RAM Upgrade Installation: Desktop & Laptop",
    excerpt: "Complete hardware tutorial showing how to upgrade memory modules safely with compatibility tips.",
    category: "Hardware",
    difficulty: "Beginner",
    readTime: "14 min",
    views: "1.5K",
    rating: 4.7,
    likes: 134,
    comments: 22,
    author: {
      name: "Hardware Master",
      avatar: "/api/placeholder/40/40",
      reputation: 8750,
      verified: true
    },
    tags: ["RAM", "Upgrade", "Installation", "Compatibility"],
    bookmarked: false,
    liked: false
  },
  {
    id: 4,
    title: "WiFi Troubleshooting: Fix Any Connection Problem",
    excerpt: "Master class on resolving WiFi connectivity issues across all devices and operating systems.",
    category: "Network",
    difficulty: "Intermediate",
    readTime: "22 min",
    views: "1.9K",
    rating: 4.4,
    likes: 145,
    comments: 31,
    author: {
      name: "Connectivity Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 7200,
      verified: true
    },
    tags: ["WiFi", "Troubleshooting", "Connectivity", "Network"],
    bookmarked: false,
    liked: false
  },
  {
    id: 5,
    title: "GPU Overclocking: Safe Performance Enhancement",
    excerpt: "Learn how to safely overclock your graphics card for better gaming performance without damaging your hardware.",
    category: "Hardware",
    difficulty: "Advanced",
    readTime: "16 min",
    views: "2.1K",
    rating: 4.8,
    likes: 198,
    comments: 42,
    author: {
      name: "Gaming Tech Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 13400,
      verified: true
    },
    tags: ["GPU", "Overclocking", "Gaming", "Performance"],
    bookmarked: false,
    liked: false
  },
  {
    id: 6,
    title: "iPhone Battery Optimization: iOS 17 Guide",
    excerpt: "Complete guide to maximizing iPhone battery life with iOS 17 features and settings optimization.",
    category: "Mobile",
    difficulty: "Beginner",
    readTime: "10 min",
    views: "3.2K",
    rating: 4.9,
    likes: 267,
    comments: 38,
    author: {
      name: "Apple Specialist",
      avatar: "/api/placeholder/40/40",
      reputation: 15600,
      verified: true
    },
    tags: ["iPhone", "Battery", "iOS 17", "Optimization"],
    bookmarked: false,
    liked: false
  },
  {
    id: 7,
    title: "VPN Setup: Complete Security Guide",
    excerpt: "Step-by-step guide to setting up VPNs for enhanced privacy and security across all devices.",
    category: "Security",
    difficulty: "Intermediate",
    readTime: "12 min",
    views: "1.8K",
    rating: 4.6,
    likes: 123,
    comments: 19,
    author: {
      name: "Security Expert",
      avatar: "/api/placeholder/40/40",
      reputation: 9200,
      verified: true
    },
    tags: ["VPN", "Security", "Privacy", "Setup"],
    bookmarked: false,
    liked: false
  },
  {
    id: 8,
    title: "Cloud Backup Solutions: Complete Comparison",
    excerpt: "Compare the best cloud backup services for personal and business use with setup guides.",
    category: "Cloud & Storage",
    difficulty: "Beginner",
    readTime: "14 min",
    views: "1.6K",
    rating: 4.5,
    likes: 156,
    comments: 25,
    author: {
      name: "Cloud Architect",
      avatar: "/api/placeholder/40/40",
      reputation: 10800,
      verified: true
    },
    tags: ["Cloud", "Backup", "Storage", "Comparison"],
    bookmarked: false,
    liked: false
  },
  {
    id: 9,
    title: "CPU Installation & Thermal Paste Application",
    excerpt: "Complete guide to installing CPUs and applying thermal paste for optimal cooling performance.",
    category: "Hardware",
    difficulty: "Intermediate",
    readTime: "12 min",
    views: "1.8K",
    rating: 4.7,
    likes: 145,
    comments: 23,
    author: {
      name: "PC Builder Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 11800,
      verified: true
    },
    tags: ["CPU", "Installation", "Thermal Paste", "Cooling"],
    bookmarked: false,
    liked: false
  },
  {
    id: 10,
    title: "Windows 10 to 11 Upgrade: Complete Guide",
    excerpt: "Step-by-step guide to safely upgrade from Windows 10 to Windows 11 with compatibility checks.",
    category: "Software",
    difficulty: "Beginner",
    readTime: "15 min",
    views: "4.2K",
    rating: 4.8,
    likes: 312,
    comments: 56,
    author: {
      name: "Windows Guru",
      avatar: "/api/placeholder/40/40",
      reputation: 12850,
      verified: true
    },
    tags: ["Windows 11", "Upgrade", "Compatibility", "Installation"],
    bookmarked: false,
    liked: false
  },
  {
    id: 11,
    title: "Android Rooting: Complete Guide & Safety Tips",
    excerpt: "Comprehensive guide to rooting Android devices safely with custom ROM installation.",
    category: "Mobile",
    difficulty: "Advanced",
    readTime: "25 min",
    views: "2.3K",
    rating: 4.6,
    likes: 189,
    comments: 34,
    author: {
      name: "Android Developer",
      avatar: "/api/placeholder/40/40",
      reputation: 14200,
      verified: true
    },
    tags: ["Android", "Rooting", "Custom ROM", "Development"],
    bookmarked: false,
    liked: false
  },
  {
    id: 12,
    title: "Network Security: Firewall Configuration",
    excerpt: "Advanced firewall setup and configuration for home and business network security.",
    category: "Security",
    difficulty: "Advanced",
    readTime: "20 min",
    views: "1.4K",
    rating: 4.5,
    likes: 98,
    comments: 18,
    author: {
      name: "Security Architect",
      avatar: "/api/placeholder/40/40",
      reputation: 16200,
      verified: true
    },
    tags: ["Firewall", "Network Security", "Configuration", "Protection"],
    bookmarked: false,
    liked: false
  },
  {
    id: 13,
    title: "Gaming PC Build: Complete Component Guide",
    excerpt: "Comprehensive guide to building a gaming PC from scratch with component selection and assembly.",
    category: "Gaming",
    difficulty: "Intermediate",
    readTime: "30 min",
    views: "3.8K",
    rating: 4.9,
    likes: 298,
    comments: 67,
    author: {
      name: "Gaming Master",
      avatar: "/api/placeholder/40/40",
      reputation: 15800,
      verified: true
    },
    tags: ["Gaming PC", "Build Guide", "Components", "Assembly"],
    bookmarked: false,
    liked: false
  },
  {
    id: 14,
    title: "Data Recovery: Recover Lost Files",
    excerpt: "Professional techniques to recover deleted files and corrupted data from various storage devices.",
    category: "Cloud & Storage",
    difficulty: "Intermediate",
    readTime: "18 min",
    views: "2.7K",
    rating: 4.7,
    likes: 234,
    comments: 41,
    author: {
      name: "Data Recovery Expert",
      avatar: "/api/placeholder/40/40",
      reputation: 13200,
      verified: true
    },
    tags: ["Data Recovery", "File Recovery", "Storage", "Backup"],
    bookmarked: false,
    liked: false
  },
  {
    id: 15,
    title: "Linux Installation: Dual Boot Setup",
    excerpt: "Complete guide to installing Linux alongside Windows with dual boot configuration.",
    category: "Software",
    difficulty: "Intermediate",
    readTime: "22 min",
    views: "1.9K",
    rating: 4.6,
    likes: 167,
    comments: 29,
    author: {
      name: "Linux Expert",
      avatar: "/api/placeholder/40/40",
      reputation: 11500,
      verified: true
    },
    tags: ["Linux", "Dual Boot", "Installation", "Partitioning"],
    bookmarked: false,
    liked: false
  },
  {
    id: 16,
    title: "iPhone Screen Replacement: DIY Guide",
    excerpt: "Step-by-step guide to replacing iPhone screens safely with proper tools and techniques.",
    category: "Mobile",
    difficulty: "Advanced",
    readTime: "28 min",
    views: "2.1K",
    rating: 4.4,
    likes: 156,
    comments: 33,
    author: {
      name: "Mobile Repair Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 9800,
      verified: true
    },
    tags: ["iPhone", "Screen Replacement", "Repair", "DIY"],
    bookmarked: false,
    liked: false
  },
  {
    id: 17,
    title: "Password Security: Best Practices Guide",
    excerpt: "Comprehensive guide to creating and managing secure passwords with password managers.",
    category: "Security",
    difficulty: "Beginner",
    readTime: "12 min",
    views: "3.5K",
    rating: 4.8,
    likes: 289,
    comments: 45,
    author: {
      name: "Security Specialist",
      avatar: "/api/placeholder/40/40",
      reputation: 14500,
      verified: true
    },
    tags: ["Passwords", "Security", "Password Managers", "Privacy"],
    bookmarked: false,
    liked: false
  },
  {
    id: 18,
    title: "Console Gaming Setup: PS5 & Xbox Series X",
    excerpt: "Complete setup guide for PlayStation 5 and Xbox Series X with optimization tips.",
    category: "Gaming",
    difficulty: "Beginner",
    readTime: "16 min",
    views: "2.9K",
    rating: 4.7,
    likes: 223,
    comments: 38,
    author: {
      name: "Console Gaming Pro",
      avatar: "/api/placeholder/40/40",
      reputation: 12100,
      verified: true
    },
    tags: ["PS5", "Xbox Series X", "Console Setup", "Gaming"],
    bookmarked: false,
    liked: false
  },
  {
    id: 19,
    title: "SSD vs HDD: Complete Comparison Guide",
    excerpt: "Detailed comparison between SSD and HDD storage with performance benchmarks and recommendations.",
    category: "Hardware",
    difficulty: "Beginner",
    readTime: "14 min",
    views: "2.4K",
    rating: 4.6,
    likes: 198,
    comments: 31,
    author: {
      name: "Storage Expert",
      avatar: "/api/placeholder/40/40",
      reputation: 10800,
      verified: true
    },
    tags: ["SSD", "HDD", "Storage", "Performance"],
    bookmarked: false,
    liked: false
  },
  {
    id: 20,
    title: "Network Speed Optimization: Boost Your Internet",
    excerpt: "Advanced techniques to optimize network speed and reduce latency for gaming and streaming.",
    category: "Network",
    difficulty: "Intermediate",
    readTime: "19 min",
    views: "2.2K",
    rating: 4.5,
    likes: 178,
    comments: 26,
    author: {
      name: "Network Engineer",
      avatar: "/api/placeholder/40/40",
      reputation: 13800,
      verified: true
    },
    tags: ["Network Speed", "Optimization", "Latency", "Gaming"],
    bookmarked: false,
    liked: false
  }
];

export const KnowledgeBasePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [articles, setArticles] = useState([...featuredArticles, ...knowledgeArticles]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showStatistics, setShowStatistics] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedReadTime, setSelectedReadTime] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  // Simulate reading progress
  useEffect(() => {
    if (selectedArticle) {
      const interval = setInterval(() => {
        setReadingProgress(prev => {
          if (prev >= 100) return 100;
          return prev + Math.random() * 10;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setReadingProgress(0);
    }
  }, [selectedArticle]);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'hardware' && article.category === 'Hardware') ||
                           (selectedCategory === 'software' && article.category === 'Software') ||
                           (selectedCategory === 'network' && article.category === 'Network') ||
                           (selectedCategory === 'mobile' && article.category === 'Mobile') ||
                           (selectedCategory === 'security' && article.category === 'Security') ||
                           (selectedCategory === 'performance' && article.category === 'Performance') ||
                           (selectedCategory === 'cloud' && article.category === 'Cloud & Storage') ||
                           (selectedCategory === 'gaming' && article.category === 'Gaming');
    
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = !selectedDifficulty || article.difficulty === selectedDifficulty;
    
    const matchesReadTime = !selectedReadTime || 
                           (selectedReadTime === '5' && parseInt(article.readTime) <= 5) ||
                           (selectedReadTime === '10' && parseInt(article.readTime) <= 10) ||
                           (selectedReadTime === '20' && parseInt(article.readTime) <= 20);
    
    return matchesCategory && matchesSearch && matchesDifficulty && matchesReadTime;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return parseInt(b.views.replace('K', '000')) - parseInt(a.views.replace('K', '000'));
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'readTime':
        return parseInt(a.readTime) - parseInt(b.readTime);
      default:
        return 0;
    }
  });

  const handleLike = (articleId: number) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, liked: !article.liked, likes: article.liked ? article.likes - 1 : article.likes + 1 }
        : article
    ));
  };

  const handleBookmark = (articleId: number) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, bookmarked: !article.bookmarked }
        : article
    ));
  };

  const handleShare = (article: any) => {
    const shareData = {
      title: article.title,
      text: article.excerpt,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${article.title}\n\n${article.excerpt}\n\n${window.location.href}`);
      alert('Article link copied to clipboard!');
    }
  };

  const handleDownload = (article: any) => {
    // In a real app, this would generate and download a PDF
    alert(`Downloading "${article.title}" as PDF...`);
  };

  const handleArticleView = (article: any) => {
    setSelectedArticle(article);
    setRecentlyViewed(prev => {
      const newList = [article.id, ...prev.filter(id => id !== article.id)].slice(0, 10);
      return newList;
    });
  };

  const handleBookmarkToggle = (articleId: number) => {
    setBookmarkedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else {
        return [...prev, articleId];
      }
    });
  };

  const getArticleStatistics = () => {
    const totalArticles = articles.length;
    const totalViews = articles.reduce((sum, article) => sum + parseInt(article.views.replace('K', '000')), 0);
    const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
    const totalComments = articles.reduce((sum, article) => sum + article.comments, 0);
    const avgRating = articles.reduce((sum, article) => sum + article.rating, 0) / totalArticles;
    
    return { totalArticles, totalViews, totalLikes, totalComments, avgRating };
  };

  const getRecentlyViewedArticles = () => {
    return articles.filter(article => recentlyViewed.includes(article.id));
  };

  const getBookmarkedArticles = () => {
    return articles.filter(article => bookmarkedArticles.includes(article.id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReputationColor = (reputation: number) => {
    if (reputation >= 15000) return 'text-purple-500';
    if (reputation >= 10000) return 'text-blue-500';
    if (reputation >= 5000) return 'text-green-500';
    return 'text-gray-500';
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
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Knowledge Base</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Comprehensive guides, tutorials, and solutions for all your tech problems
              </p>
              
                             {/* Enhanced Search */}
               <div className="space-y-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg glass border-border/20"
                />
                   <Button
                     variant="ghost"
                     size="sm"
                     className="absolute right-2 top-1/2 -translate-y-1/2"
                     onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                   >
                     <Filter className="w-4 h-4" />
                   </Button>
              </div>
                 
                 {/* Advanced Search Options */}
                 {showAdvancedSearch && (
                   <div className="max-w-2xl mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-border/20">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       <div>
                         <label className="text-sm font-medium mb-2 block">Sort By</label>
                         <select 
                           value={sortBy}
                           onChange={(e) => setSortBy(e.target.value)}
                           className="w-full h-10 px-3 rounded-lg bg-background border border-border/20"
                         >
                           <option value="relevance">Relevance</option>
                           <option value="views">Most Views</option>
                           <option value="rating">Highest Rating</option>
                           <option value="newest">Newest</option>
                           <option value="readTime">Quickest Read</option>
                         </select>
                       </div>
                       <div>
                         <label className="text-sm font-medium mb-2 block">Difficulty</label>
                         <select 
                           value={selectedDifficulty}
                           onChange={(e) => setSelectedDifficulty(e.target.value)}
                           className="w-full h-10 px-3 rounded-lg bg-background border border-border/20"
                         >
                           <option value="">All Levels</option>
                           <option value="Beginner">Beginner</option>
                           <option value="Intermediate">Intermediate</option>
                           <option value="Advanced">Advanced</option>
                         </select>
                       </div>
                       <div>
                         <label className="text-sm font-medium mb-2 block">Read Time</label>
                         <select 
                           value={selectedReadTime}
                           onChange={(e) => setSelectedReadTime(e.target.value)}
                           className="w-full h-10 px-3 rounded-lg bg-background border border-border/20"
                         >
                           <option value="">Any Time</option>
                           <option value="5">Under 5 min</option>
                           <option value="10">Under 10 min</option>
                           <option value="20">Under 20 min</option>
                         </select>
                       </div>
                       <div>
                         <label className="text-sm font-medium mb-2 block">View Mode</label>
                         <div className="flex gap-2">
                           <Button
                             variant={viewMode === 'grid' ? 'default' : 'outline'}
                             size="sm"
                             onClick={() => setViewMode('grid')}
                             className="flex-1"
                           >
                             <Grid className="w-4 h-4" />
                           </Button>
                           <Button
                             variant={viewMode === 'list' ? 'default' : 'outline'}
                             size="sm"
                             onClick={() => setViewMode('list')}
                             className="flex-1"
                           >
                             <List className="w-4 h-4" />
                           </Button>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>

               {/* Quick Stats */}
               <div className="flex justify-center mt-8">
                 <Button
                   variant="outline"
                   onClick={() => setShowStatistics(!showStatistics)}
                   className="flex items-center gap-2"
                 >
                   <BarChart3 className="w-4 h-4" />
                   {showStatistics ? 'Hide' : 'Show'} Statistics
                 </Button>
               </div>

               {/* Statistics Panel */}
               {showStatistics && (
                 <div className="max-w-4xl mx-auto mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-border/20">
                   <h3 className="text-lg font-semibold mb-4 text-center">Knowledge Base Statistics</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {(() => {
                       const stats = getArticleStatistics();
                       return (
                         <>
                           <div className="text-center">
                             <div className="text-2xl font-bold text-primary">{stats.totalArticles}</div>
                             <div className="text-sm text-foreground/70">Total Articles</div>
                           </div>
                           <div className="text-center">
                             <div className="text-2xl font-bold text-blue-500">{stats.totalViews.toLocaleString()}</div>
                             <div className="text-sm text-foreground/70">Total Views</div>
                           </div>
                           <div className="text-center">
                             <div className="text-2xl font-bold text-green-500">{stats.totalLikes.toLocaleString()}</div>
                             <div className="text-sm text-foreground/70">Total Likes</div>
                           </div>
                           <div className="text-center">
                             <div className="text-2xl font-bold text-purple-500">{stats.avgRating.toFixed(1)}</div>
                             <div className="text-sm text-foreground/70">Avg Rating</div>
                           </div>
                         </>
                       );
                     })()}
                   </div>
                 </div>
               )}
            </div>
          </div>
        </section>

        {/* Enhanced Categories */}
        <section className="py-8 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Browse by Category</h2>
              <p className="text-foreground/70">Find solutions organized by topic and difficulty</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <Button
                variant={selectedCategory === 'all' ? "default" : "outline"}
                onClick={() => setSelectedCategory('all')}
                className="flex flex-col items-center gap-2 h-24 p-4"
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-xs font-medium">All</span>
                <Badge variant="secondary" className="text-xs">
                  {articles.length}
                </Badge>
              </Button>
              
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex flex-col items-center gap-2 h-24 p-4 group hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`p-2 rounded-lg ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-center">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="all">All Articles</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Featured Articles</h3>
                <p className="text-foreground/70">Hand-picked guides and tutorials from our experts</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white hover:bg-white/20"
                          onClick={() => handleBookmark(article.id)}
                        >
                          {article.bookmarked ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                          <Bookmark className="w-4 h-4" />
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-white hover:bg-white/20"
                          onClick={() => handleShare(article)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="mb-2">{article.category}</Badge>
                        <h3 className="text-lg font-bold text-white line-clamp-2">{article.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={article.author.avatar} />
                          <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{article.author.name}</span>
                            {article.author.verified && (
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <span className={`text-xs ${getReputationColor(article.author.reputation)}`}>
                            {article.author.reputation.toLocaleString()} reputation
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(article.difficulty)}>
                            {article.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-foreground/60">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span className="text-sm font-medium">{article.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className={`w-4 h-4 ${article.liked ? 'text-red-500 fill-current' : ''}`} />
                            {article.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {article.comments}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedArticle(article)}
                          className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">All Articles</h3>
                <p className="text-foreground/70">Browse all {filteredArticles.length} articles in our knowledge base</p>
              </div>
              
              {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {sortedArticles.map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="mb-2">{article.category}</Badge>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleBookmarkToggle(article.id)}
                          >
                            {bookmarkedArticles.includes(article.id) ? (
                              <BookmarkCheck className="w-4 h-4 text-blue-500" />
                            ) : (
                          <Bookmark className="w-4 h-4" />
                            )}
                        </Button>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                            <Badge className={getDifficultyColor(article.difficulty)}>
                            {article.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                            onClick={() => handleArticleView(article)}
                          variant="outline"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              ) : (
                <div className="space-y-4">
                  {sortedArticles.map((article) => (
                    <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge>{article.category}</Badge>
                              <Badge className={getDifficultyColor(article.difficulty)}>
                                {article.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-foreground/60">
                                <Clock className="w-4 h-4" />
                                {article.readTime}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-foreground/70 mb-3 line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-foreground/60">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {article.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warning fill-current" />
                                {article.rating}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {article.likes}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleBookmarkToggle(article.id)}
                            >
                              {bookmarkedArticles.includes(article.id) ? (
                                <BookmarkCheck className="w-4 h-4 text-blue-500" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleArticleView(article)}
                            >
                              Read Article
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Recently Viewed</h3>
                <p className="text-foreground/70">Articles you've recently read</p>
              </div>
              
              {getRecentlyViewedArticles().length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {getRecentlyViewedArticles().map((article) => (
                    <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-blue-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className="mb-2">{article.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-blue-600">
                            <Clock className="w-4 h-4" />
                            Recently Viewed
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-foreground/60">
                            <Badge className={getDifficultyColor(article.difficulty)}>
                              {article.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleArticleView(article)}
                            variant="outline"
                          >
                            Read Again
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
                  <h3 className="text-xl font-semibold mb-2">No Recently Viewed Articles</h3>
                  <p className="text-foreground/70">Start reading articles to see them here</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bookmarked" className="space-y-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Bookmarked Articles</h3>
                <p className="text-foreground/70">Your saved articles for quick access</p>
              </div>
              
              {getBookmarkedArticles().length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {getBookmarkedArticles().map((article) => (
                    <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-yellow-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className="mb-2">{article.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-yellow-600">
                            <BookmarkCheck className="w-4 h-4" />
                            Bookmarked
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-foreground/60">
                            <Badge className={getDifficultyColor(article.difficulty)}>
                              {article.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleBookmarkToggle(article.id)}
                            >
                              <BookmarkCheck className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleArticleView(article)}
                            >
                              Read Article
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
                  <h3 className="text-xl font-semibold mb-2">No Bookmarked Articles</h3>
                  <p className="text-foreground/70">Bookmark articles to save them for later</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="space-y-8">
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Trending Articles</h3>
                <p className="text-foreground/70">Most popular and trending tech solutions</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.concat(knowledgeArticles).slice(0, 6).map((article) => (
                  <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="mb-2">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-foreground/60">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          Trending
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-foreground/70 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <Badge variant={getDifficultyColor(article.difficulty)}>
                            {article.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedArticle(article)}
                          className="bg-gradient-to-r from-primary to-secondary"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <Card className="max-w-6xl w-full max-h-[95vh] overflow-hidden">
              {/* Reading Progress Bar */}
              <div className="w-full bg-gray-200 h-1">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-1 transition-all duration-300"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getDifficultyColor(selectedArticle.difficulty)}>
                        {selectedArticle.difficulty}
                      </Badge>
                      <Badge variant="outline">{selectedArticle.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-foreground/60">
                        <Clock className="w-4 h-4" />
                        {selectedArticle.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-3xl mb-3">{selectedArticle.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {selectedArticle.excerpt}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                    className="text-2xl"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              
              <div className="flex">
                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
                  <div className="space-y-6">
                    {/* Article Stats */}
                    <div className="flex items-center gap-6 text-sm text-foreground/60 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedArticle.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    {selectedArticle.rating} rating
                  </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {selectedArticle.likes} likes
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {selectedArticle.comments} comments
                      </div>
                </div>

                    {/* Author Info */}
                    {selectedArticle.author && (
                      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedArticle.author.avatar} />
                          <AvatarFallback>{selectedArticle.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{selectedArticle.author.name}</span>
                            {selectedArticle.author.verified && (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            )}
                          </div>
                          <span className={`text-sm ${getReputationColor(selectedArticle.author.reputation)}`}>
                            {selectedArticle.author.reputation.toLocaleString()} reputation • Expert Contributor
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                      {selectedArticle.content?.sections ? (
                        selectedArticle.content.sections.map((section: any, index: number) => (
                          <div key={index} className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-primary">{section.title}</h3>
                            <p className="text-foreground/80 leading-relaxed">{section.content}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <h3 className="text-xl font-bold mb-4">Article Content</h3>
                          <p className="text-foreground/80 mb-4">
                            This is a detailed article about {selectedArticle.title.toLowerCase()}. The content includes comprehensive information, step-by-step instructions, and expert tips.
                          </p>
                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                              <Info className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                              <div>
                                <p className="text-sm text-yellow-800">
                                  <strong>Note:</strong> This is a preview. The full article would contain detailed step-by-step instructions, troubleshooting guides, and visual aids.
                                </p>
                              </div>
                            </div>
                          </div>
                          <h4 className="font-semibold mb-2">What you'll learn:</h4>
                          <ul className="space-y-2 text-foreground/80">
                            <li>✓ Step-by-step instructions with screenshots</li>
                            <li>✓ Detailed explanations of technical concepts</li>
                            <li>✓ Troubleshooting tips and common solutions</li>
                            <li>✓ Best practices and prevention strategies</li>
                            <li>✓ Video tutorials and interactive elements</li>
                  </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 border-l p-6 space-y-6">
                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={() => handleDownload(selectedArticle)}
                    >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleShare(selectedArticle)}
                    >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleBookmark(selectedArticle.id)}
                    >
                      {selectedArticle.bookmarked ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 mr-2" />
                          Bookmarked
                        </>
                      ) : (
                        <>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmark
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleLike(selectedArticle.id)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${selectedArticle.liked ? 'text-red-500 fill-current' : ''}`} />
                      {selectedArticle.liked ? 'Liked' : 'Like'}
                  </Button>
                </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div>
                    <h4 className="font-semibold mb-3">Related Articles</h4>
                    <div className="space-y-3">
                      {articles.slice(0, 3).map((article) => (
                        <div 
                          key={article.id}
                          className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <h5 className="font-medium text-sm line-clamp-2">{article.title}</h5>
                          <div className="flex items-center gap-2 mt-2 text-xs text-foreground/60">
                            <span>{article.category}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
