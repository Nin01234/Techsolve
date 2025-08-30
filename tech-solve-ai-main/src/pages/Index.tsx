import { Navigation } from '@/components/Navigation';
import { HeroSlider } from '@/components/HeroSlider';
import { FeatureCards } from '@/components/FeatureCards';
import { StatsSection } from '@/components/StatsSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Bot, 
  BookOpen, 
  Video, 
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Cpu
} from 'lucide-react';

const featuredGuides = [
  {
    title: "Fix Blue Screen of Death (BSOD)",
    description: "Complete step-by-step guide to diagnose and fix Windows BSOD errors",
    category: "Software",
    readTime: "15 min",
    rating: 4.9,
    verified: true
  },
  {
    title: "RAM Upgrade Installation Guide",
    description: "Hardware tutorial for upgrading memory modules safely",
    category: "Hardware", 
    readTime: "10 min",
    rating: 4.8,
    verified: true
  },
  {
    title: "WiFi Connection Troubleshooting",
    description: "Resolve network connectivity issues across all devices",
    category: "Network",
    readTime: "12 min", 
    rating: 4.7,
    verified: true
  }
];

const recentVideos = [
  {
    title: "Complete PC Building Guide 2024",
    duration: "45:30",
    views: "234K",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    title: "GPU Installation & Troubleshooting",
    duration: "28:15", 
    views: "156K",
    thumbnail: "/api/placeholder/300/200"
  },
  {
    title: "SSD vs HDD: Performance Comparison",
    duration: "18:45",
    views: "89K", 
    thumbnail: "/api/placeholder/300/200"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Welcome Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Tech Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all your technical solutions, guides, and AI assistance in one place
          </p>
        </div>
      </section>

      {/* Features Section */}
      <FeatureCards />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Guides */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Guides</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Our most popular and effective troubleshooting guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredGuides.map((guide, index) => (
              <Card key={index} className="p-6 glass card-hover border-border/20 group">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{guide.category}</Badge>
                  {guide.verified && (
                    <Badge className="bg-success/20 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                
                <p className="text-foreground/70 mb-4">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-foreground/60">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      {guide.rating}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-full">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse All Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Videos */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Latest Video Tutorials</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Watch step-by-step video guides from tech experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden glass card-hover border-border/20 group">
                <div className="relative h-48 bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-foreground/60">
                    <span>{video.views} views</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-full">
              <Video className="w-5 h-5 mr-2" />
              Watch More Videos
            </Button>
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Card className="glass border-border/20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 lg:p-12">
                <div className="mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-secondary w-fit">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Need Instant Help?</span>
                </h2>
                
                <p className="text-xl text-foreground/80 mb-6">
                  Chat with our AI assistant for personalized troubleshooting guidance 24/7
                </p>
                
                <div className="flex items-center gap-4 mb-8">
                  <Badge className="bg-success/20 text-success">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    98% Success Rate
                  </Badge>
                  <Badge className="bg-primary/20 text-primary">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Instant Response
                  </Badge>
                </div>
                
                <Button size="lg" className="btn-hero rounded-full">
                  <Bot className="w-5 h-5 mr-2" />
                  Start Chat
                </Button>
              </div>
              
              <div className="relative h-64 lg:h-full bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Join Our Community</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Connect with thousands of tech enthusiasts and experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 glass border-border/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">47,000+</h3>
              <p className="text-foreground/70">Active Members</p>
            </Card>

            <Card className="p-8 glass border-border/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">15,000+</h3>
              <p className="text-foreground/70">Problems Solved</p>
            </Card>

            <Card className="p-8 glass border-border/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-foreground/70">Average Rating</p>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="rounded-full">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">TechSolve</span>
            </div>
            <p className="text-foreground/70 mb-6">
              Your ultimate platform for solving any tech problem
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-foreground/60">
              <span>© 2024 TechSolve. All rights reserved.</span>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
