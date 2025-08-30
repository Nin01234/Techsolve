import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { YouTubeVideo, YouTubeVideoModal } from '@/components/YouTubeVideo';
import { 
  Search, 
  Play, 
  Clock, 
  Eye, 
  Star, 
  Filter,
  Monitor,
  HardDrive,
  Cpu,
  Smartphone,
  Wifi,
  Download,
  BookOpen
} from 'lucide-react';

const categories = [
  { name: 'All Videos', icon: Monitor, count: 1257 },
  { name: 'Hardware', icon: Cpu, count: 466 },
  { name: 'Software', icon: HardDrive, count: 388 },
  { name: 'Mobile', icon: Smartphone, count: 244 },
  { name: 'Network', icon: Wifi, count: 189 }
];

const videos = [
  {
    id: 1,
    videoId: "25TobarxAjM",
    title: "SSD Installation & Migration Guide",
    description: "Complete step-by-step tutorial for installing and migrating to SSD drives. Learn proper installation techniques, data migration, and optimization tips for maximum performance.",
    category: "Hardware",
    duration: "24:15",
    views: "156K",
    likes: "3.2K",
    difficulty: "Intermediate",
    author: "TechRepair Pro",
    uploadDate: "2 days ago",
    chapters: [
      { title: "SSD Selection Guide", time: "0:00" },
      { title: "Installation Preparation", time: "4:30" },
      { title: "Physical Installation", time: "8:45" },
      { title: "Data Migration", time: "15:20" },
      { title: "Performance Optimization", time: "20:10" }
    ]
  },
  {
    id: 2,
    videoId: "n8BgHzC4RUQ",
    title: "Windows 11 Performance Optimization",
    description: "Comprehensive guide to optimize Windows 11 for maximum performance. Includes registry tweaks, startup optimization, and system maintenance techniques.",
    category: "Software",
    duration: "32:45",
    views: "203K",
    likes: "4.8K",
    difficulty: "Intermediate",
    author: "Windows Expert",
    uploadDate: "1 week ago",
    chapters: [
      { title: "System Assessment", time: "0:00" },
      { title: "Startup Optimization", time: "6:15" },
      { title: "Registry Tweaks", time: "12:30" },
      { title: "Performance Settings", time: "20:45" },
      { title: "Maintenance Tools", time: "28:20" }
    ]
  },
  {
    id: 3,
    videoId: "eSebSEeejOM",
    title: "Android Performance Boost Guide",
    description: "Expert techniques to boost Android device performance. Learn about RAM management, battery optimization, and system cleanup methods.",
    category: "Mobile",
    duration: "18:30",
    views: "189K",
    likes: "3.7K",
    difficulty: "Beginner",
    author: "Mobile Fix Expert",
    uploadDate: "3 days ago",
    chapters: [
      { title: "Performance Analysis", time: "0:00" },
      { title: "RAM Optimization", time: "4:45" },
      { title: "Battery Settings", time: "9:20" },
      { title: "System Cleanup", time: "14:15" }
    ]
  },
  {
    id: 4,
    videoId: "mJnIgjyjEtc",
    title: "Router Setup & Security Configuration",
    description: "Complete router setup guide with advanced security configuration. Learn about firewall settings, guest networks, and parental controls.",
    category: "Network",
    duration: "26:20",
    views: "145K",
    likes: "2.9K",
    difficulty: "Intermediate",
    author: "Network Ninja",
    uploadDate: "5 days ago",
    chapters: [
      { title: "Router Installation", time: "0:00" },
      { title: "Basic Configuration", time: "5:30" },
      { title: "Security Settings", time: "12:45" },
      { title: "Guest Network Setup", time: "18:20" },
      { title: "Advanced Features", time: "22:10" }
    ]
  },
  {
    id: 5,
    videoId: "2eluzD7UiRw",
    title: "Complete Guide: Fix Blue Screen of Death (BSOD)",
    description: "Step-by-step tutorial to diagnose and fix Windows BSOD errors with multiple solutions and prevention tips.",
    category: "Software",
    duration: "18:45",
    views: "125K",
    likes: "2.1K",
    difficulty: "Intermediate",
    author: "TechRepair Pro",
    uploadDate: "2 days ago"
  },
  {
    id: 6,
    videoId: "fBXvkejaofY",
    title: "RAM Upgrade Installation - Desktop & Laptop",
    description: "Complete hardware tutorial showing how to upgrade memory modules safely with compatibility tips.",
    category: "Hardware",
    duration: "12:30",
    views: "89K",
    likes: "1.8K",
    difficulty: "Beginner",
    author: "Hardware Master",
    uploadDate: "1 week ago"
  },
  {
    id: 7,
    videoId: "1KgF79SCyRA",
    title: "Complete PC Build Guide - Step by Step Tutorial",
    description: "Comprehensive guide to building a PC from scratch. Learn component selection, assembly techniques, and first boot setup.",
    category: "Hardware",
    duration: "45:22",
    views: "2.8M",
    likes: "67K",
    difficulty: "Intermediate",
    author: "Linus Tech Tips",
    uploadDate: "2 months ago",
    chapters: [
      { title: "Component Selection", time: "0:00" },
      { title: "CPU Installation", time: "8:15" },
      { title: "Motherboard Setup", time: "15:30" },
      { title: "RAM & Storage", time: "25:45" },
      { title: "Power Supply & GPU", time: "35:20" },
      { title: "First Boot", time: "42:10" }
    ]
  },
  {
    id: 8,
    videoId: "huJFlml1zuM",
    title: "Advanced Windows Troubleshooting - Command Line Solutions",
    description: "Deep dive into Windows troubleshooting using command prompt and PowerShell. Fix system issues, repair boot problems, and optimize performance.",
    category: "Software",
    duration: "38:15",
    views: "1.9M",
    likes: "42K",
    difficulty: "Advanced",
    author: "Britec09",
    uploadDate: "4 months ago",
    chapters: [
      { title: "Command Prompt Basics", time: "0:00" },
      { title: "System File Checker", time: "6:45" },
      { title: "DISM Commands", time: "12:30" },
      { title: "Boot Repair", time: "20:15" },
      { title: "Registry Fixes", time: "28:40" },
      { title: "Advanced Recovery", time: "35:20" }
    ]
  },
  {
    id: 9,
    videoId: "i293n9VVpHg",
    title: "iPhone Screen Replacement - Complete Tutorial",
    description: "Step-by-step guide to replace iPhone screen safely. Includes tools needed, disassembly process, and reassembly tips.",
    category: "Mobile",
    duration: "22:48",
    views: "1.2M",
    likes: "28K",
    difficulty: "Intermediate",
    author: "iFixit",
    uploadDate: "6 months ago",
    chapters: [
      { title: "Tools & Preparation", time: "0:00" },
      { title: "Battery Disconnect", time: "4:30" },
      { title: "Screen Removal", time: "8:45" },
      { title: "New Screen Installation", time: "15:20" },
      { title: "Testing & Calibration", time: "20:15" }
    ]
  },
  {
    id: 10,
    videoId: "Z2LgmIGE2nI",
    title: "Network Security Setup - Firewall & VPN Configuration",
    description: "Complete network security guide covering firewall setup, VPN configuration, and advanced security protocols.",
    category: "Network",
    duration: "31:25",
    views: "950K",
    likes: "23K",
    difficulty: "Intermediate",
    author: "NetworkChuck",
    uploadDate: "8 months ago",
    chapters: [
      { title: "Firewall Basics", time: "0:00" },
      { title: "VPN Setup", time: "8:15" },
      { title: "Port Security", time: "16:30" },
      { title: "Advanced Protocols", time: "24:45" },
      { title: "Monitoring Tools", time: "28:20" }
    ]
  },
  {
    id: 11,
    videoId: "fBXvkejaofY",
    title: "Laptop Battery Replacement - DIY Guide",
    description: "Complete tutorial for replacing laptop batteries safely. Covers different laptop models and safety precautions.",
    category: "Hardware",
    duration: "18:33",
    views: "780K",
    likes: "19K",
    difficulty: "Intermediate",
    author: "JerryRigEverything",
    uploadDate: "10 months ago",
    chapters: [
      { title: "Safety First", time: "0:00" },
      { title: "Laptop Disassembly", time: "4:45" },
      { title: "Battery Removal", time: "10:20" },
      { title: "New Battery Installation", time: "14:30" },
      { title: "Testing & Calibration", time: "16:45" }
    ]
  },
  {
    id: 12,
    videoId: "p6BJvS3nrb0",
    title: "MacOS Recovery & Disk Utility - Complete Guide",
    description: "Comprehensive guide to MacOS recovery options, disk utility usage, and system restoration procedures.",
    category: "Software",
    duration: "26:47",
    views: "1.1M",
    likes: "25K",
    difficulty: "Intermediate",
    author: "MacRumors",
    uploadDate: "1 year ago",
    chapters: [
      { title: "Recovery Mode Access", time: "0:00" },
      { title: "Disk Utility Overview", time: "6:15" },
      { title: "Partition Management", time: "12:30" },
      { title: "System Restoration", time: "18:45" },
      { title: "Data Recovery", time: "23:20" }
    ]
  },
  {
    id: 13,
    videoId: "gKPg70FGOik",
    title: "Android Rooting & Custom ROM Installation",
    description: "Complete guide to rooting Android devices and installing custom ROMs. Includes safety precautions and troubleshooting.",
    category: "Mobile",
    duration: "34:12",
    views: "650K",
    likes: "15K",
    difficulty: "Advanced",
    author: "XDA Developers",
    uploadDate: "1 year ago",
    chapters: [
      { title: "Rooting Basics", time: "0:00" },
      { title: "Unlock Bootloader", time: "8:30" },
      { title: "Custom Recovery", time: "16:45" },
      { title: "ROM Installation", time: "25:20" },
      { title: "Troubleshooting", time: "30:15" }
    ]
  },
  {
    id: 14,
    videoId: "qjoF1PhulD4",
    title: "Server Setup & Configuration - Home Lab Guide",
    description: "Complete guide to setting up a home server for various applications. Covers hardware selection, OS installation, and configuration.",
    category: "Hardware",
    duration: "42:18",
    views: "520K",
    likes: "12K",
    difficulty: "Advanced",
    author: "ServeTheHome",
    uploadDate: "1 year ago",
    chapters: [
      { title: "Hardware Selection", time: "0:00" },
      { title: "OS Installation", time: "10:15" },
      { title: "Network Configuration", time: "20:30" },
      { title: "Service Setup", time: "30:45" },
      { title: "Security & Monitoring", time: "38:20" }
    ]
  },
  {
    id: 15,
    videoId: "1LefMI67mIM",
    title: "Linux Troubleshooting - Command Line Mastery",
    description: "Advanced Linux troubleshooting techniques using command line tools. Fix system issues, manage services, and optimize performance.",
    category: "Software",
    duration: "29:55",
    views: "890K",
    likes: "21K",
    difficulty: "Advanced",
    author: "Linux Tech Tips",
    uploadDate: "1 year ago",
    chapters: [
      { title: "System Monitoring", time: "0:00" },
      { title: "Process Management", time: "6:45" },
      { title: "Service Control", time: "12:30" },
      { title: "Log Analysis", time: "18:15" },
      { title: "Performance Tuning", time: "24:40" }
    ]
  },
  {
    id: 16,
    videoId: "GL7NWz93JN8",
    title: "Wireless Network Optimization - Advanced Techniques",
    description: "Advanced techniques for optimizing wireless networks. Covers channel selection, interference mitigation, and performance tuning.",
    category: "Network",
    duration: "24:33",
    views: "720K",
    likes: "17K",
    difficulty: "Advanced",
    author: "Techquickie",
    uploadDate: "1 year ago",
    chapters: [
      { title: "Channel Analysis", time: "0:00" },
      { title: "Interference Detection", time: "6:20" },
      { title: "Advanced Settings", time: "12:45" },
      { title: "Performance Testing", time: "18:30" },
      { title: "Optimization Tips", time: "22:15" }
    ]
  }
];

export const VideosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All Videos' || video.category === selectedCategory.replace(' Videos', '');
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/20 text-success';
      case 'Intermediate': return 'bg-warning/20 text-warning';
      case 'Advanced': return 'bg-destructive/20 text-destructive';
      default: return 'bg-muted text-muted-foreground';
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
                <span className="gradient-text">Video Library</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Watch expert demonstrations and follow along with professional tutorials
              </p>
              
              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search video tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg glass border-border/20"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
              <Button variant="outline" className="flex items-center gap-2 ml-auto">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} onClick={() => setSelectedVideo(video)}>
                    <YouTubeVideo
                      videoId={video.videoId}
                      title={video.title}
                      description={video.description}
                      duration={video.duration}
                      views={video.views}
                      likes={video.likes}
                      category={video.category}
                    />
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button size="lg" variant="outline" className="rounded-full">
                  Load More Videos
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Video */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  Featured Tutorial
                </h3>
                <div className="space-y-3">
                  <div className="relative h-32 bg-muted rounded-lg overflow-hidden cursor-pointer"
                       onClick={() => setSelectedVideo(videos[6])} // PC Build Guide
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-bold">Complete PC Build Guide</h4>
                  <p className="text-sm text-foreground/70">Step-by-step tutorial for building your first PC</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedVideo(videos[6])}
                  >
                    Watch Now
                  </Button>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      // In a real app, this would show a download manager
                      alert('Download manager would open with available videos for offline viewing')
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Offline
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      // In a real app, this would navigate to guides section
                      alert('Would navigate to related guides and documentation')
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Related Guides
                  </Button>
                </div>
              </Card>

              {/* Popular This Week */}
              <Card className="p-6 glass border-border/20">
                <h3 className="text-lg font-bold mb-4">Popular This Week</h3>
                <div className="space-y-3">
                  {videos.slice(0, 3).map((video, index) => (
                    <div key={video.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-foreground/60">{video.views} views</span>
                          <span className="text-xs text-foreground/60">•</span>
                          <span className="text-xs text-foreground/60">{video.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <YouTubeVideoModal
            videoId={selectedVideo.videoId}
            title={selectedVideo.title}
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoData={selectedVideo}
          />
        )}
      </div>
    </div>
  );
};