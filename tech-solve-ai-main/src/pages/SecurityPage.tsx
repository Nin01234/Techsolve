import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Bug, 
  Lock, 
  Trash2,
  AlertTriangle,
  Key,
  Search,
  Clock,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import securityProtectionImage from '@/assets/security-protection.jpg';

const securityProblems = [
  {
    id: 1,
    title: "Malware & Virus Removal",
    description: "Detect, remove, and prevent malware infections",
    icon: Bug,
    severity: "critical",
    estimatedTime: "60-90 min",
    difficulty: "intermediate",
    steps: [
      "Boot into Safe Mode",
      "Run Windows Defender full scan",
      "Use Malwarebytes for deep scan",
      "Remove detected threats",
      "Update all software and OS",
      "Enable real-time protection"
    ],
    image: securityProtectionImage,
    youtubeId: "UwYSWqOdvWs"
  },
  {
    id: 2,
    title: "Password Security Setup",
    description: "Create strong passwords and enable two-factor authentication",
    icon: Key,
    severity: "high",
    estimatedTime: "30-45 min",
    difficulty: "beginner",
    steps: [
      "Use password manager like Bitwarden",
      "Generate unique passwords for each account",
      "Enable 2FA on all important accounts",
      "Review account security settings",
      "Set up security questions properly",
      "Regular password audits"
    ],
    image: securityProtectionImage,
    youtubeId: "0eSLn6Sab6A"
  },
  {
    id: 3,
    title: "Firewall Configuration",
    description: "Set up and configure Windows Firewall for maximum protection",
    icon: Shield,
    severity: "medium",
    estimatedTime: "20-30 min",
    difficulty: "intermediate",
    steps: [
      "Open Windows Security settings",
      "Enable Windows Defender Firewall",
      "Configure inbound and outbound rules",
      "Allow trusted applications",
      "Block suspicious network activity",
      "Monitor firewall logs regularly"
    ],
    image: securityProtectionImage,
    youtubeId: "9GZLLwV2UCs"
  },
  {
    id: 4,
    title: "Ransomware Protection",
    description: "Prevent and recover from ransomware attacks",
    icon: Lock,
    severity: "critical",
    estimatedTime: "45-60 min",
    difficulty: "advanced",
    steps: [
      "Enable controlled folder access",
      "Create offline backups regularly",
      "Keep OS and software updated",
      "Avoid suspicious email attachments",
      "Use ransomware protection tools",
      "Have an incident response plan"
    ],
    image: securityProtectionImage,
    youtubeId: "DI7AeABdQH8"
  }
];

const SecurityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProblems, setFilteredProblems] = useState(securityProblems);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const filtered = securityProblems.filter(problem =>
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProblems(filtered);
  }, [searchTerm]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive bg-destructive/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-secondary bg-secondary/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-foreground bg-muted';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-destructive bg-destructive/10';
      default: return 'text-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-destructive/10 to-warning/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Security Solutions</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Protect your system from malware, secure your data, and prevent cyber attacks. 
                Complete security guides from basic protection to advanced threat mitigation.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Badge className="bg-success/20 text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Threat Protection
                </Badge>
                <Badge className="bg-primary/20 text-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Security Expert
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src={securityProtectionImage} 
                alt="Security Protection" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 w-5 h-5" />
            <Input
              placeholder="Search security problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProblems.map((problem) => (
              <Card key={problem.id} className="p-6 glass border-border/20 hover:border-primary/20 transition-all group cursor-pointer"
                    onClick={() => setSelectedProblem(problem)}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-destructive to-warning">
                    <problem.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-foreground/70 mb-4">{problem.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(problem.severity)}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {problem.severity}
                    </Badge>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/60">
                    <Clock className="w-4 h-4" />
                    {problem.estimatedTime}
                  </div>
                </div>

                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  View Solution <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Detail Modal */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedProblem.title}</h2>
                <Button variant="ghost" onClick={() => setSelectedProblem(null)}>✕</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedProblem.image} 
                    alt={selectedProblem.title}
                    className="rounded-lg mb-4"
                  />
                  
                  {selectedProblem.youtubeId && (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedProblem.youtubeId}`}
                        title={selectedProblem.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-foreground/80 mb-6">{selectedProblem.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Badge className={getSeverityColor(selectedProblem.severity)}>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {selectedProblem.severity}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                      {selectedProblem.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-foreground/60">
                      <Clock className="w-4 h-4" />
                      {selectedProblem.estimatedTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">Step-by-Step Solution:</h3>
                  <div className="space-y-3">
                    {selectedProblem.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-foreground/80">{step}</p>
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
  );
};

export default SecurityPage;