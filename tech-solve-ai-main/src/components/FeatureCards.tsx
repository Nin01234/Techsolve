import { Bot, BookOpen, Video, Stethoscope, Users, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Bot,
    title: "AI Troubleshooting Assistant",
    description: "Get instant help from our advanced AI that understands your tech problems and provides step-by-step solutions.",
    color: "from-primary to-primary-glow"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Knowledge Base",
    description: "Access thousands of verified guides covering all hardware and software issues with detailed instructions.",
    color: "from-secondary to-accent"
  },
  {
    icon: Video,
    title: "Video Tutorial Library",
    description: "Watch expert demonstrations and follow along with professional repair and troubleshooting videos.",
    color: "from-accent to-primary"
  },
  {
    icon: Stethoscope,
    title: "Interactive Diagnostics",
    description: "Use our smart diagnostic tools to identify problems automatically and get targeted solutions.",
    color: "from-primary to-secondary"
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with experts and fellow users to share solutions and learn from collective experience.",
    color: "from-secondary to-primary-glow"
  },
  {
    icon: Shield,
    title: "Verified Solutions",
    description: "All our guides and solutions are tested and verified by certified technicians and experts.",
    color: "from-accent to-secondary"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Everything you need to solve any tech problem, all in one intelligent platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="p-8 glass card-hover border-border/20 group"
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};