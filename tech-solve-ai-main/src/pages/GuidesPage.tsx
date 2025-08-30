import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  User,
  Monitor,
  HardDrive,
  Cpu,
  Smartphone,
  Wifi,
  Download
} from 'lucide-react';

const categories = [
  { name: 'All', icon: Monitor, count: 2847 },
  { name: 'Hardware', icon: Cpu, count: 1205 },
  { name: 'Software', icon: HardDrive, count: 892 },
  { name: 'Mobile', icon: Smartphone, count: 456 },
  { name: 'Network', icon: Wifi, count: 294 }
];

const guides = [
  {
    id: 1,
    title: "Fix Blue Screen of Death (BSOD) on Windows 11",
    description: "Complete guide to diagnose and fix BSOD errors with step-by-step instructions and video tutorial.",
    category: "Software",
    difficulty: "Intermediate",
    readTime: "15 min",
    rating: 4.8,
    reviews: 324,
    author: "TechExpert Mike",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 2,
    title: "Replace Laptop RAM Memory Modules",
    description: "Hardware replacement guide with compatibility checker and installation video.",
    category: "Hardware",
    difficulty: "Beginner",
    readTime: "10 min",
    rating: 4.9,
    reviews: 156,
    author: "HardwarePro",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 3,
    title: "Fix iPhone Not Charging Issue",
    description: "Troubleshoot charging problems with multiple solutions and diagnostics.",
    category: "Mobile",
    difficulty: "Beginner",
    readTime: "8 min",
    rating: 4.7,
    reviews: 289,
    author: "MobileMaster",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: false
  },
  {
    id: 4,
    title: "Resolve WiFi Connection Problems",
    description: "Network troubleshooting for Windows, Mac, and mobile devices.",
    category: "Network",
    difficulty: "Intermediate",
    readTime: "12 min",
    rating: 4.6,
    reviews: 412,
    author: "NetworkNinja",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 5,
    title: "GPU Not Detected - Complete Fix Guide",
    description: "Comprehensive guide for graphics card detection issues and driver problems.",
    category: "Hardware",
    difficulty: "Advanced",
    readTime: "20 min",
    rating: 4.8,
    reviews: 198,
    author: "GPUGuru",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 6,
    title: "Clean Install Windows 11 Step by Step",
    description: "Complete reinstallation guide with data backup and driver installation.",
    category: "Software",
    difficulty: "Intermediate",
    readTime: "25 min",
    rating: 4.9,
    reviews: 567,
    author: "WindowsWiz",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 7,
    title: "SSD Installation & Migration Complete Guide",
    description: "Step-by-step tutorial for installing and migrating to SSD drives with performance optimization.",
    category: "Hardware",
    difficulty: "Intermediate",
    readTime: "18 min",
    rating: 4.7,
    reviews: 234,
    author: "StorageExpert",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 8,
    title: "Windows 11 Performance Optimization",
    description: "Comprehensive guide to optimize Windows 11 for maximum performance and speed.",
    category: "Software",
    difficulty: "Intermediate",
    readTime: "22 min",
    rating: 4.8,
    reviews: 189,
    author: "PerformancePro",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  },
  {
    id: 9,
    title: "Android Battery Life Optimization",
    description: "Expert techniques to extend Android device battery life and improve performance.",
    category: "Mobile",
    difficulty: "Beginner",
    readTime: "12 min",
    rating: 4.6,
    reviews: 156,
    author: "MobileMaster",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: false
  },
  {
    id: 10,
    title: "Router Security & Configuration",
    description: "Complete guide to secure your router and optimize network performance.",
    category: "Network",
    difficulty: "Intermediate",
    readTime: "16 min",
    rating: 4.7,
    reviews: 98,
    author: "NetworkNinja",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    verified: true,
    hasVideo: true
  }
];

export const GuidesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                <span className="gradient-text">Knowledge Base</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Comprehensive troubleshooting guides for all your tech problems
              </p>
              
              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  placeholder="Search guides, problems, solutions..."
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
                More Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden card-hover glass border-border/20 group">
                  {/* Image */}
                  <div className="relative h-48 bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    {guide.hasVideo && (
                      <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                        Video Tutorial
                      </Badge>
                    )}
                    {guide.verified && (
                      <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Category & Difficulty */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{guide.category}</Badge>
                      <Badge className={getDifficultyColor(guide.difficulty)}>
                        {guide.difficulty}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-foreground/70 mb-4 line-clamp-3">
                      {guide.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {guide.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          {guide.rating}
                        </div>
                      </div>
                      <span>({guide.reviews} reviews)</span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm text-foreground/80">{guide.author}</span>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="rounded-full">
                Load More Guides
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};