import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Stethoscope, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Smartphone,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Info,
  Thermometer,
  Battery,
  Activity,
  Shield,
  Settings,
  BookOpen,
  MessageCircle,
  ExternalLink,
  Play,
  Download,
  Users,
  Star,
  TrendingUp,
  Target,
  BarChart3,
  FileText,
  Database,
  Server,
  Globe,
  Lock,
  Unlock,
  RefreshCw,
  PieChart,
  LineChart,
  Grid,
  List,
  HelpCircle,
  FileCode,
  Cloud
} from 'lucide-react';

const problemCategories = [
  {
    id: 'hardware',
    icon: Cpu,
    title: 'Hardware Issues',
    description: 'Physical components, peripherals, and connections',
    symptoms: [
      'Computer won\'t turn on',
      'Random shutdowns or restarts',
      'Strange noises from computer',
      'Overheating issues',
      'USB devices not working',
      'Display problems',
      'Graphics card issues',
      'RAM/memory problems',
      'Storage drive failures',
      'Power supply problems',
      'Motherboard issues',
      'Fan/cooling system failures'
    ],
    commonCauses: [
      'Loose cable connections',
      'Dust accumulation',
      'Power supply failure',
      'Component overheating',
      'Physical damage',
      'Age-related wear'
    ],
    estimatedFixTime: '15-60 minutes',
    difficulty: 'Beginner to Advanced',
    toolsNeeded: ['Screwdriver', 'Thermal paste', 'Compressed air', 'Multimeter']
  },
  {
    id: 'software',
    icon: Monitor,
    title: 'Software Problems',
    description: 'Operating system, applications, and drivers',
    symptoms: [
      'Blue screen errors (BSOD)',
      'System running very slow',
      'Applications crashing',
      'Boot/startup problems',
      'Driver conflicts',
      'Update issues',
      'Registry errors',
      'Malware infections',
      'Corrupted system files',
      'Software compatibility issues',
      'Performance degradation',
      'System freezes'
    ],
    commonCauses: [
      'Corrupted system files',
      'Outdated drivers',
      'Malware infection',
      'Insufficient disk space',
      'Conflicting software',
      'Registry corruption'
    ],
    estimatedFixTime: '10-45 minutes',
    difficulty: 'Beginner to Intermediate',
    toolsNeeded: ['Windows Recovery Media', 'Antivirus software', 'Driver update tools']
  },
  {
    id: 'network',
    icon: Wifi,
    title: 'Network & Internet',
    description: 'Connectivity, WiFi, and internet-related issues',
    symptoms: [
      'No internet connection',
      'WiFi keeps disconnecting',
      'Slow internet speed',
      'Can\'t connect to WiFi',
      'Network adapter problems',
      'VPN issues',
      'DNS resolution errors',
      'Limited connectivity',
      'Network timeouts',
      'Port forwarding issues',
      'Firewall blocking connections',
      'Router configuration problems'
    ],
    commonCauses: [
      'Router/modem issues',
      'ISP service problems',
      'Network adapter drivers',
      'Firewall settings',
      'DNS configuration',
      'Physical cable damage'
    ],
    estimatedFixTime: '5-30 minutes',
    difficulty: 'Beginner to Intermediate',
    toolsNeeded: ['Network cable tester', 'Router admin access', 'Command prompt']
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Devices',
    description: 'Smartphones, tablets, and mobile accessories',
    symptoms: [
      'Device won\'t charge',
      'Battery drains quickly',
      'Apps keep crashing',
      'Touch screen not responsive',
      'Storage space issues',
      'Sync problems',
      'WiFi/Bluetooth issues',
      'Camera not working',
      'Speaker/microphone problems',
      'Slow performance',
      'Overheating',
      'Boot loop issues'
    ],
    commonCauses: [
      'Battery degradation',
      'Software bugs',
      'Physical damage',
      'Malware infection',
      'Storage corruption',
      'Hardware failure'
    ],
    estimatedFixTime: '10-40 minutes',
    difficulty: 'Beginner to Advanced',
    toolsNeeded: ['USB cable', 'Screen protector', 'Cleaning cloth', 'Replacement parts']
  }
];

interface DiagnosticStep {
  id: string;
  question: string;
  type: 'radio' | 'checkbox' | 'text';
  options?: string[];
  required: boolean;
}

const diagnosticSteps: Record<string, DiagnosticStep[]> = {
  hardware: [
    {
      id: 'power_status',
      question: 'What happens when you press the power button?',
      type: 'radio',
      options: [
        'Nothing happens at all (no lights, no sound)',
        'Lights turn on but no display on monitor',
        'Computer starts but shuts down immediately',
        'Normal startup but crashes later during use',
        'Computer starts but makes unusual noises',
        'Power button feels stuck or unresponsive'
      ],
      required: true
    },
    {
      id: 'recent_changes',
      question: 'Have you made any recent hardware changes or modifications?',
      type: 'checkbox',
      options: [
        'Added or replaced RAM modules',
        'Installed new hard drive or SSD',
        'Connected new USB devices or peripherals',
        'Opened the computer case for cleaning',
        'Installed new graphics card',
        'Replaced power supply',
        'Added new cooling fans',
        'No recent changes made'
      ],
      required: false
    },
    {
      id: 'environmental_factors',
      question: 'Are there any environmental factors that might affect your hardware?',
      type: 'checkbox',
      options: [
        'High room temperature or poor ventilation',
        'Dusty environment',
        'Power surges or electrical issues',
        'Humidity or moisture exposure',
        'Physical impact or drops',
        'None of the above'
      ],
      required: false
    },
    {
      id: 'specific_symptoms',
      question: 'What specific hardware symptoms are you experiencing?',
      type: 'checkbox',
      options: [
        'Unusual noises (grinding, clicking, buzzing)',
        'Overheating (hot to touch, thermal shutdowns)',
        'Display artifacts or visual glitches',
        'USB ports not working',
        'Audio problems (no sound, distorted audio)',
        'Network adapter issues',
        'Storage drive problems',
        'Fan speed issues'
      ],
      required: false
    }
  ],
  software: [
    {
      id: 'error_type',
      question: 'What type of software error are you experiencing?',
      type: 'radio',
      options: [
        'Blue screen with error code (BSOD)',
        'Application crashes or freezes',
        'System freezes completely (no response)',
        'Slow performance and lag',
        'Boot/startup problems',
        'Driver-related errors',
        'Update installation failures',
        'Malware or virus symptoms'
      ],
      required: true
    },
    {
      id: 'when_occurs',
      question: 'When does this software problem occur?',
      type: 'checkbox',
      options: [
        'During system startup or boot',
        'When opening specific programs or applications',
        'After Windows updates or system updates',
        'Randomly during normal use',
        'During shutdown or restart',
        'When performing specific tasks (gaming, video editing, etc.)',
        'After installing new software',
        'When connecting external devices'
      ],
      required: false
    },
    {
      id: 'system_info',
      question: 'What is your current system configuration?',
      type: 'checkbox',
      options: [
        'Windows 10 (latest version)',
        'Windows 11 (latest version)',
        'Older Windows version (7, 8, 8.1)',
        'Limited disk space (less than 10GB free)',
        'Recently updated drivers',
        'Antivirus software installed',
        'Multiple antivirus programs',
        'Custom software or modifications'
      ],
      required: false
    },
    {
      id: 'performance_issues',
      question: 'What performance issues are you experiencing?',
      type: 'checkbox',
      options: [
        'Slow boot times',
        'High CPU usage',
        'High memory (RAM) usage',
        'Slow file operations',
        'Internet browser issues',
        'Gaming performance problems',
        'Video playback issues',
        'Printing problems'
      ],
      required: false
    }
  ],
  network: [
    {
      id: 'connection_type',
      question: 'What type of internet connection are you using?',
      type: 'radio',
      options: [
        'WiFi connection (wireless)',
        'Ethernet cable connection',
        'Mobile hotspot or tethering',
        'Powerline adapter',
        'Satellite internet',
        'Cable or DSL modem'
      ],
      required: true
    },
    {
      id: 'connection_issues',
      question: 'What specific network issues are you experiencing?',
      type: 'checkbox',
      options: [
        'No internet connection at all',
        'WiFi keeps disconnecting randomly',
        'Slow internet speed',
        'Can\'t connect to WiFi network',
        'Limited connectivity (no internet but local network works)',
        'DNS resolution errors',
        'VPN connection problems',
        'Network adapter not detected'
      ],
      required: false
    },
    {
      id: 'device_scope',
      question: 'Which devices are affected by the network problem?',
      type: 'checkbox',
      options: [
        'Only this computer/device',
        'All devices on the network',
        'Specific devices only',
        'Mobile devices only',
        'Wired devices only',
        'Wireless devices only'
      ],
      required: false
    },
    {
      id: 'network_environment',
      question: 'What is your network environment like?',
      type: 'checkbox',
      options: [
        'Home network with router',
        'Office/business network',
        'Public WiFi network',
        'Network with multiple routers',
        'Network with range extenders',
        'Network with mesh WiFi system',
        'Network with firewall or security software'
      ],
      required: false
    }
  ],
  mobile: [
    {
      id: 'device_type',
      question: 'What type of mobile device are you having issues with?',
      type: 'radio',
      options: [
        'iPhone (iOS)',
        'Android smartphone',
        'iPad (iOS tablet)',
        'Android tablet',
        'Other mobile device'
      ],
      required: true
    },
    {
      id: 'mobile_issues',
      question: 'What specific mobile device issues are you experiencing?',
      type: 'checkbox',
      options: [
        'Device won\'t charge or charging slowly',
        'Battery drains quickly',
        'Apps keep crashing or freezing',
        'Touch screen not responsive',
        'Storage space issues',
        'WiFi or Bluetooth problems',
        'Camera not working properly',
        'Speaker or microphone issues'
      ],
      required: false
    },
    {
      id: 'mobile_environment',
      question: 'What environmental factors might affect your mobile device?',
      type: 'checkbox',
      options: [
        'Physical damage (cracks, drops)',
        'Water or liquid exposure',
        'Extreme temperatures',
        'Dust or debris in ports',
        'Recent software updates',
        'New app installations',
        'None of the above'
      ],
      required: false
    },
    {
      id: 'mobile_performance',
      question: 'What performance issues are you experiencing with your mobile device?',
      type: 'checkbox',
      options: [
        'Slow app loading times',
        'Device overheats during use',
        'Random restarts or shutdowns',
        'Poor camera performance',
        'Slow internet browsing',
        'Bluetooth connectivity issues',
        'GPS or location problems',
        'Notification delays'
      ],
      required: false
    }
  ]
};

export const DiagnosticsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentStep(0);
    setResponses({});
    setDiagnosticResults(null);
  };

  const handleResponse = (stepId: string, value: any) => {
    setResponses(prev => ({ ...prev, [stepId]: value }));
  };

  const nextStep = () => {
    if (selectedCategory && currentStep < diagnosticSteps[selectedCategory].length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      runDiagnostic();
    }
  };

  const runDiagnostic = () => {
    setIsRunningDiagnostic(true);
    setDiagnosticProgress(0);

    const interval = setInterval(() => {
      setDiagnosticProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningDiagnostic(false);
          generateResults();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateResults = () => {
    // Generate comprehensive diagnostic results based on responses
    const category = selectedCategory;
    const responsesData = responses;
    
    let results: any = {
      category: category,
      severity: 'moderate',
      confidence: 85,
      primaryIssue: '',
      detailedAnalysis: '',
      solutions: [],
      relatedGuides: [],
      preventionTips: [],
      toolsNeeded: [],
      estimatedTotalTime: '',
      riskLevel: 'Low'
    };

    if (category === 'hardware') {
      const powerStatus = responsesData['power_status'];
      const recentChanges = responsesData['recent_changes'] || [];
      const environmentalFactors = responsesData['environmental_factors'] || [];
      const specificSymptoms = responsesData['specific_symptoms'] || [];

      if (powerStatus?.includes('Nothing happens at all')) {
        results.primaryIssue = 'Power supply failure or motherboard issue detected';
        results.severity = 'high';
        results.confidence = 90;
        results.detailedAnalysis = 'Complete power failure indicates either a dead power supply, motherboard failure, or severe electrical issue. This requires immediate attention to prevent further damage.';
        results.solutions = [
          {
            title: 'Test Power Supply',
            description: 'Use a multimeter to test power supply output voltages and check for proper power delivery',
            difficulty: 'Intermediate',
            estimatedTime: '15 minutes',
            steps: [
              'Unplug all power cables',
              'Test power supply with multimeter',
              'Check for proper voltage outputs',
              'Replace if readings are incorrect'
            ]
          },
          {
            title: 'Check Power Connections',
            description: 'Verify all internal power cables are properly connected to motherboard and components',
          difficulty: 'Easy',
            estimatedTime: '10 minutes',
            steps: [
              'Open computer case safely',
              'Check 24-pin motherboard connector',
              'Verify CPU power connector',
              'Check all component power cables'
            ]
          },
          {
            title: 'Test with Different Power Supply',
            description: 'Try a known working power supply to isolate the issue',
          difficulty: 'Intermediate',
            estimatedTime: '20 minutes',
            steps: [
              'Obtain compatible power supply',
              'Disconnect current power supply',
              'Connect test power supply',
              'Test system startup'
            ]
          }
        ];
        results.toolsNeeded = ['Multimeter', 'Screwdriver', 'Replacement power supply'];
        results.estimatedTotalTime = '45 minutes';
        results.riskLevel = 'Medium';
      } else if (powerStatus?.includes('Lights turn on but no display')) {
        results.primaryIssue = 'Display or graphics card issue detected';
        results.severity = 'moderate';
        results.confidence = 85;
        results.detailedAnalysis = 'System power is working but display output is failing. This could be a graphics card, monitor, or cable issue.';
        results.solutions = [
          {
            title: 'Check Monitor and Cables',
            description: 'Test monitor with different device and check all display cables',
            difficulty: 'Easy',
            estimatedTime: '5 minutes',
            steps: [
              'Test monitor with different device',
              'Check display cable connections',
              'Try different display ports',
              'Test with different cable'
            ]
          },
          {
            title: 'Test Graphics Card',
            description: 'Remove and reseat graphics card, test with integrated graphics',
          difficulty: 'Intermediate',
            estimatedTime: '15 minutes',
            steps: [
              'Power off and unplug system',
              'Remove graphics card carefully',
              'Connect monitor to motherboard',
              'Test with integrated graphics'
            ]
          },
          {
            title: 'Update Graphics Drivers',
            description: 'Install latest graphics drivers and check for compatibility issues',
            difficulty: 'Easy',
            estimatedTime: '10 minutes',
            steps: [
              'Boot in Safe Mode',
              'Download latest drivers',
              'Uninstall old drivers',
              'Install new drivers'
            ]
          }
        ];
        results.toolsNeeded = ['Screwdriver', 'Display cables', 'Alternative monitor'];
        results.estimatedTotalTime = '30 minutes';
        results.riskLevel = 'Low';
      }
    } else if (category === 'software') {
      const errorType = responsesData['error_type'];
      const whenOccurs = responsesData['when_occurs'] || [];
      const systemInfo = responsesData['system_info'] || [];
      const performanceIssues = responsesData['performance_issues'] || [];

      if (errorType?.includes('Blue screen')) {
        results.primaryIssue = 'Blue Screen of Death (BSOD) detected';
        results.severity = 'high';
        results.confidence = 95;
        results.detailedAnalysis = 'BSOD indicates a critical system error, often caused by driver conflicts, hardware issues, or corrupted system files. Immediate attention required.';
        results.solutions = [
          {
            title: 'Safe Mode Boot and Driver Update',
            description: 'Boot in Safe Mode and update all system drivers',
            difficulty: 'Intermediate',
            estimatedTime: '20 minutes',
            steps: [
              'Restart and enter Safe Mode',
              'Open Device Manager',
              'Update all drivers',
              'Check for driver conflicts'
            ]
          },
          {
            title: 'System File Checker (SFC)',
            description: 'Run SFC scan to repair corrupted system files',
            difficulty: 'Easy',
            estimatedTime: '15 minutes',
            steps: [
              'Open Command Prompt as Administrator',
              'Run: sfc /scannow',
              'Wait for scan completion',
              'Restart if repairs were made'
            ]
          },
          {
            title: 'Memory Diagnostic Test',
            description: 'Test RAM for errors that could cause BSOD',
            difficulty: 'Easy',
            estimatedTime: '30 minutes',
            steps: [
              'Open Windows Memory Diagnostic',
              'Choose restart and check',
              'Wait for test completion',
              'Check results in Event Viewer'
            ]
          }
        ];
        results.toolsNeeded = ['Windows Recovery Media', 'Driver update software', 'Memory testing tool'];
        results.estimatedTotalTime = '65 minutes';
        results.riskLevel = 'Medium';
      } else if (errorType?.includes('Slow performance')) {
        results.primaryIssue = 'System performance degradation detected';
        results.severity = 'moderate';
        results.confidence = 80;
        results.detailedAnalysis = 'Performance issues can be caused by multiple factors including malware, insufficient resources, or system bloat.';
        results.solutions = [
          {
            title: 'Malware Scan and Cleanup',
            description: 'Run comprehensive malware scan and remove threats',
            difficulty: 'Easy',
            estimatedTime: '30 minutes',
            steps: [
              'Update antivirus software',
              'Run full system scan',
              'Quarantine detected threats',
              'Remove malicious files'
            ]
          },
          {
            title: 'System Cleanup and Optimization',
            description: 'Clean temporary files and optimize system performance',
            difficulty: 'Easy',
            estimatedTime: '15 minutes',
            steps: [
              'Run Disk Cleanup',
              'Remove unnecessary programs',
              'Disable startup programs',
              'Clear browser cache'
            ]
          },
          {
            title: 'Hardware Resource Check',
            description: 'Check CPU, RAM, and disk usage for bottlenecks',
            difficulty: 'Easy',
            estimatedTime: '10 minutes',
            steps: [
              'Open Task Manager',
              'Check CPU and RAM usage',
              'Identify resource-heavy processes',
              'Optimize or close unnecessary programs'
            ]
          }
        ];
        results.toolsNeeded = ['Antivirus software', 'System optimization tools', 'Task Manager'];
        results.estimatedTotalTime = '55 minutes';
        results.riskLevel = 'Low';
      }
    } else if (category === 'network') {
      const connectionType = responsesData['connection_type'];
      const connectionIssues = responsesData['connection_issues'] || [];
      const deviceScope = responsesData['device_scope'] || [];
      const networkEnvironment = responsesData['network_environment'] || [];

      if (connectionType?.includes('WiFi') && connectionIssues.includes('WiFi keeps disconnecting')) {
        results.primaryIssue = 'WiFi connectivity instability detected';
        results.severity = 'moderate';
        results.confidence = 85;
        results.detailedAnalysis = 'WiFi disconnection issues are often caused by signal interference, router problems, or driver issues.';
        results.solutions = [
          {
            title: 'Router Reset and Configuration',
            description: 'Reset router to factory settings and reconfigure',
            difficulty: 'Intermediate',
            estimatedTime: '20 minutes',
            steps: [
              'Locate router reset button',
              'Hold reset for 30 seconds',
              'Wait for router restart',
              'Reconfigure WiFi settings'
            ]
          },
          {
            title: 'WiFi Channel Optimization',
            description: 'Change WiFi channel to reduce interference',
            difficulty: 'Easy',
            estimatedTime: '10 minutes',
            steps: [
              'Access router admin panel',
              'Check current channel',
              'Change to less crowded channel',
              'Test connection stability'
            ]
          },
          {
            title: 'Network Driver Update',
            description: 'Update network adapter drivers',
            difficulty: 'Easy',
            estimatedTime: '10 minutes',
            steps: [
              'Open Device Manager',
              'Find network adapters',
              'Update WiFi driver',
              'Restart computer'
            ]
          }
        ];
        results.toolsNeeded = ['Router admin access', 'Network cable', 'Driver update software'];
        results.estimatedTotalTime = '40 minutes';
        results.riskLevel = 'Low';
      }
    } else if (category === 'mobile') {
      const deviceType = responsesData['device_type'];
      const mobileIssues = responsesData['mobile_issues'] || [];
      const mobileEnvironment = responsesData['mobile_environment'] || [];
      const mobilePerformance = responsesData['mobile_performance'] || [];

      if (mobileIssues.includes('Device won\'t charge')) {
        results.primaryIssue = 'Mobile device charging problem detected';
        results.severity = 'moderate';
        results.confidence = 80;
        results.detailedAnalysis = 'Charging issues can be caused by hardware damage, software problems, or environmental factors.';
        results.solutions = [
          {
            title: 'Hardware Connection Check',
            description: 'Check charging port and cable for damage',
            difficulty: 'Easy',
            estimatedTime: '5 minutes',
            steps: [
              'Inspect charging port for debris',
              'Try different charging cable',
              'Test with different power adapter',
              'Check for physical damage'
            ]
          },
          {
            title: 'Software Reset and Update',
            description: 'Perform soft reset and check for software updates',
            difficulty: 'Easy',
            estimatedTime: '15 minutes',
            steps: [
              'Restart device completely',
              'Check for system updates',
              'Reset charging settings',
              'Test charging after restart'
            ]
          },
          {
            title: 'Battery Health Check',
            description: 'Check battery health and replace if necessary',
            difficulty: 'Advanced',
            estimatedTime: '30 minutes',
            steps: [
              'Check battery health in settings',
              'Monitor charging behavior',
              'Consider battery replacement',
              'Professional repair if needed'
            ]
          }
        ];
        results.toolsNeeded = ['Alternative charging cable', 'Different power adapter', 'Cleaning tools'];
        results.estimatedTotalTime = '50 minutes';
        results.riskLevel = 'Low';
      }
    }

    // Add prevention tips and related guides
    results.preventionTips = [
      'Regular system maintenance and updates',
      'Keep drivers updated',
      'Use surge protectors for hardware',
      'Regular malware scans',
      'Backup important data regularly',
      'Monitor system temperatures',
      'Clean dust from components regularly'
    ];

    results.relatedGuides = [
      `${category.charAt(0).toUpperCase() + category.slice(1)} Troubleshooting Guide`,
      'System Maintenance Best Practices',
      'Preventive Maintenance Schedule',
      'Emergency Recovery Procedures'
    ];
    
    setDiagnosticResults(results);
  };

  const resetDiagnostic = () => {
    setSelectedCategory(null);
    setCurrentStep(0);
    setResponses({});
    setDiagnosticResults(null);
    setDiagnosticProgress(0);
  };

  const currentSteps = selectedCategory ? diagnosticSteps[selectedCategory] : [];
  const currentStepData = currentSteps[currentStep];

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
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Smart Diagnostics</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Let our AI guide you through identifying and solving your tech problems
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  95% Accuracy Rate
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  5-10 Minutes
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  Instant Results
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12">
          {!selectedCategory && !diagnosticResults && (
            /* Category Selection */
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                What type of problem are you experiencing?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {problemCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card 
                      key={category.id}
                      className="p-6 card-hover glass border-border/20 cursor-pointer group"
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-foreground/70 mb-4">
                            {category.description}
                          </p>
                          
                          {/* Quick Stats */}
                          <div className="flex gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="text-foreground/60">{category.estimatedFixTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4 text-primary" />
                              <span className="text-foreground/60">{category.difficulty}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Settings className="w-4 h-4 text-primary" />
                              <span className="text-foreground/60">{category.toolsNeeded.length} tools</span>
                            </div>
                          </div>

                          {/* Common Symptoms */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2 text-foreground/80">Common Symptoms:</h4>
                          <div className="space-y-1">
                            {category.symptoms.slice(0, 4).map((symptom, index) => (
                              <div key={index} className="text-sm text-foreground/60 flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {symptom}
                              </div>
                            ))}
                            {category.symptoms.length > 4 && (
                              <div className="text-sm text-foreground/60 flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                And {category.symptoms.length - 4} more...
                              </div>
                            )}
                          </div>
                          </div>

                          {/* Common Causes */}
                          {category.commonCauses && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold mb-2 text-foreground/80">Common Causes:</h4>
                              <div className="flex flex-wrap gap-1">
                                {category.commonCauses.slice(0, 3).map((cause, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-orange-50">
                                    {cause}
                                  </Badge>
                                ))}
                                {category.commonCauses.length > 3 && (
                                  <Badge variant="outline" className="text-xs bg-orange-50">
                                    +{category.commonCauses.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Tools Needed */}
                          {category.toolsNeeded && (
                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-foreground/80">Tools Needed:</h4>
                              <div className="flex flex-wrap gap-1">
                                {category.toolsNeeded.slice(0, 3).map((tool, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                                    {tool}
                                  </Badge>
                                ))}
                                {category.toolsNeeded.length > 3 && (
                                  <Badge variant="outline" className="text-xs bg-blue-50">
                                    +{category.toolsNeeded.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCategory && !isRunningDiagnostic && !diagnosticResults && (
            /* Diagnostic Questions */
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">
                    Step {currentStep + 1} of {currentSteps.length}
                  </Badge>
                  <Button variant="ghost" onClick={resetDiagnostic}>
                    Start Over
                  </Button>
                </div>
                <Progress value={((currentStep + 1) / currentSteps.length) * 100} className="mb-4" />
              </div>

              <Card className="p-8 glass border-border/20">
                <h2 className="text-2xl font-bold mb-6">
                  {currentStepData?.question}
                </h2>

                {currentStepData?.type === 'radio' && (
                  <RadioGroup 
                    value={responses[currentStepData.id] || ''}
                    onValueChange={(value) => handleResponse(currentStepData.id, value)}
                    className="space-y-4"
                  >
                    {currentStepData.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentStepData?.type === 'checkbox' && (
                  <div className="space-y-4">
                    {currentStepData.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox 
                          id={`checkbox-${index}`}
                          checked={(responses[currentStepData.id] || []).includes(option)}
                          onCheckedChange={(checked) => {
                            const current = responses[currentStepData.id] || [];
                            const updated = checked 
                              ? [...current, option]
                              : current.filter((item: string) => item !== option);
                            handleResponse(currentStepData.id, updated);
                          }}
                        />
                        <Label htmlFor={`checkbox-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={currentStepData?.required && !responses[currentStepData.id]}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {currentStep === currentSteps.length - 1 ? 'Run Diagnostic' : 'Next'}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {isRunningDiagnostic && (
            /* Running Diagnostic */
            <div className="max-w-2xl mx-auto text-center">
              <Card className="p-8 glass border-border/20">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary p-4 animate-pulse">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Running Diagnostic...</h2>
                  <p className="text-foreground/70">
                    Analyzing your responses and system information
                  </p>
                </div>
                
                <Progress value={diagnosticProgress} className="mb-4" />
                <p className="text-sm text-foreground/60">
                  {diagnosticProgress}% Complete
                </p>
              </Card>
            </div>
          )}

          {diagnosticResults && (
            /* Enhanced Diagnostic Results */
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Diagnostic Complete</h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Badge className="bg-success/20 text-success">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {diagnosticResults.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline" className={
                    diagnosticResults.severity === 'high' ? 'bg-red-100 text-red-800' :
                    diagnosticResults.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {diagnosticResults.severity} severity
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-4 h-4 mr-1" />
                    {diagnosticResults.estimatedTotalTime}
                  </Badge>
                  <Badge variant="outline" className={
                    diagnosticResults.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                    diagnosticResults.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {diagnosticResults.riskLevel} Risk
                  </Badge>
                </div>
              </div>

              {/* Primary Issue and Analysis */}
              <Card className="p-8 glass border-border/20 mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Primary Issue Identified</h3>
                    <p className="text-foreground/80 text-lg mb-4">{diagnosticResults.primaryIssue}</p>
                    {diagnosticResults.detailedAnalysis && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                        <div className="flex">
                          <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-blue-800">
                              <strong>Analysis:</strong> {diagnosticResults.detailedAnalysis}
                            </p>
                  </div>
                </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Tools Needed */}
              {diagnosticResults.toolsNeeded && diagnosticResults.toolsNeeded.length > 0 && (
                <Card className="p-6 glass border-border/20 mb-8">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Tools and Equipment Needed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {diagnosticResults.toolsNeeded.map((tool: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-blue-50">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Detailed Solutions */}
              <Card className="p-8 glass border-border/20 mb-8">
                <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recommended Solutions
                </h4>
                <div className="space-y-6">
                  {diagnosticResults.solutions.map((solution: any, index: number) => (
                    <Card key={index} className="p-6 border-border/20">
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h5 className="text-lg font-bold mb-2">{solution.title}</h5>
                          <p className="text-foreground/70 mb-3">{solution.description}</p>
                            <div className="flex gap-2 mb-3">
                              <Badge variant="outline" className={
                                solution.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                solution.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {solution.difficulty}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="w-3 h-3 mr-1" />
                                {solution.estimatedTime}
                              </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            const guideContent = {
                              title: solution.title,
                                content: `# ${solution.title}\n\n${solution.description}\n\n## Step-by-Step Instructions:\n\n${solution.steps?.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n') || '1. Follow the solution description carefully\n2. Take necessary safety precautions\n3. Test the solution\n4. Verify the issue is resolved'}\n\n## Additional Resources:\n- Related video tutorials\n- Community forums\n- Expert support contact\n\n## Estimated Time: ${solution.estimatedTime}\n## Difficulty Level: ${solution.difficulty}`,
                              difficulty: solution.difficulty,
                              time: solution.estimatedTime
                            };
                            
                            alert(`Guide: ${guideContent.title}\n\n${guideContent.content}`);
                          }}
                        >
                            <BookOpen className="w-4 h-4 mr-2" />
                          View Guide
                        </Button>
                        </div>
                        
                        {/* Step-by-step instructions */}
                        {solution.steps && solution.steps.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h6 className="font-semibold mb-3 text-sm">Step-by-Step Instructions:</h6>
                            <ol className="space-y-2 text-sm">
                              {solution.steps.map((step: string, stepIndex: number) => (
                                <li key={stepIndex} className="flex items-start gap-2">
                                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                    {stepIndex + 1}
                                  </span>
                                  <span className="text-foreground/80">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Prevention Tips */}
              {diagnosticResults.preventionTips && diagnosticResults.preventionTips.length > 0 && (
                <Card className="p-6 glass border-border/20 mb-8">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Prevention Tips
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {diagnosticResults.preventionTips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{tip}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Related Guides */}
              {diagnosticResults.relatedGuides && diagnosticResults.relatedGuides.length > 0 && (
                <Card className="p-6 glass border-border/20 mb-8">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Related Guides and Resources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {diagnosticResults.relatedGuides.map((guide: string, index: number) => (
                      <Button key={index} variant="outline" className="justify-start h-auto p-3">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {guide}
                      </Button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={resetDiagnostic} variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Run Another Diagnostic
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary flex items-center gap-2"
                  onClick={() => {
                    // Navigate to the AI chat page
                    window.location.href = '/chat';
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with AI Assistant
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};