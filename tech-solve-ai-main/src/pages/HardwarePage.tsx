import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Thermometer,
  Wrench,
  Search,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import hardwareRepairImage from '@/assets/hardware-repair.jpg';

const hardwareProblems = [
  {
    id: 1,
    title: "Computer Won't Turn On",
    description: "Diagnose and fix power supply, motherboard, and connection issues",
    icon: Cpu,
    severity: "critical",
    estimatedTime: "30-60 min",
    difficulty: "intermediate",
    steps: [
      "Check power cable and outlet",
      "Test PSU with paperclip method",
      "Inspect motherboard for damage",
      "Check RAM seating",
      "Test with minimal hardware setup"
    ],
    image: hardwareRepairImage,
    youtubeId: "QG4baP8rZSk"
  },
  {
    id: 2,
    title: "Overheating Issues",
    description: "Fix CPU and GPU thermal problems causing shutdowns",
    icon: Thermometer,
    severity: "high",
    estimatedTime: "45 min",
    difficulty: "beginner",
    steps: [
      "Clean dust from fans and heatsinks",
      "Check thermal paste application",
      "Verify fan operation",
      "Monitor temperatures with software",
      "Adjust fan curves if needed"
    ],
    image: hardwareRepairImage,
    youtubeId: "kSCVahyh3Dk"
  },
  {
    id: 3,
    title: "RAM Memory Errors",
    description: "Identify and resolve memory-related crashes and instability",
    icon: MemoryStick,
    severity: "high",
    estimatedTime: "20 min",
    difficulty: "beginner",
    steps: [
      "Run Windows Memory Diagnostic",
      "Test with MemTest86",
      "Reseat memory modules",
      "Test individual RAM sticks",
      "Check motherboard compatibility"
    ],
    image: hardwareRepairImage,
    youtubeId: "tUUTS674RgQ"
  },
  {
    id: 4,
    title: "Hard Drive Failure",
    description: "Diagnose drive health and recover data safely",
    icon: HardDrive,
    severity: "critical",
    estimatedTime: "2-4 hours",
    difficulty: "advanced",
    steps: [
      "Check SMART status",
      "Run disk health scans",
      "Create drive image backup",
      "Test with different SATA cables",
      "Consider professional data recovery"
    ],
    image: hardwareRepairImage,
    youtubeId: "F5Y7BniaRXg"
  }
];

const HardwarePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProblems, setFilteredProblems] = useState(hardwareProblems);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const filtered = hardwareProblems.filter(problem =>
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
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Hardware Solutions</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Comprehensive guides for diagnosing and fixing computer hardware problems. 
                From power issues to component failures, we've got you covered.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Badge className="bg-success/20 text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Professional Guides
                </Badge>
                <Badge className="bg-primary/20 text-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Expert Verified
                </Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src={hardwareRepairImage} 
                alt="Hardware Repair Workspace" 
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
              placeholder="Search hardware problems..."
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
                  <div className="p-3 rounded-lg bg-gradient-to-r from-primary to-secondary">
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

export default HardwarePage;