import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Info, 
  Cpu, 
  Zap, 
  Shield, 
  Music, 
  Film, 
  PenTool, 
  Palette, 
  Briefcase, 
  Scale,
  DollarSign,
  Brain,
  Settings as SettingsIcon,
  CheckCircle,
  Star,
  Globe,
  Code,
  Database,
  Cloud
} from 'lucide-react';

const featureCategories = [
  {
    title: 'Audio Production Features',
    icon: Music,
    color: 'from-purple-500 to-pink-600',
    features: [
      'Music Generation & Composition',
      'Spatial Audio Mixing (9.1.6)',
      'Voice Cloning & Synthesis',
      'Psychoacoustic Enhancement',
      'Dolby Atmos Mastering',
      'Stem Separation & MIDI',
      'Real-time Audio Processing',
      'Professional Mastering Suite'
    ]
  },
  {
    title: 'Film & Video Features',
    icon: Film,
    color: 'from-red-500 to-orange-600',
    features: [
      'AI Video Generation',
      'Face Swap & Lip Sync',
      'Apple Immersive Video',
      'Intelligent Film Editing',
      '4K HDR & Dolby Vision',
      'Character Consistency',
      'Scene Composition',
      'Cinematic Audio Mixing'
    ]
  },
  {
    title: 'Writing & Content Features',
    icon: PenTool,
    color: 'from-blue-500 to-cyan-600',
    features: [
      'Novel Generation (900K+ words)',
      'Plagiarism Detection',
      'Content Humanization',
      'SEO Optimization',
      'Multi-language Support',
      'Style Adaptation',
      'Research Integration',
      'Grammar & Syntax Analysis'
    ]
  },
  {
    title: 'Design & Visual Features',
    icon: Palette,
    color: 'from-green-500 to-emerald-600',
    features: [
      'AI Image Generation',
      'Logo & Brand Design',
      '3D Rendering & Modeling',
      'Image Enhancement & Upscaling',
      'UI/UX Design',
      'Print & Digital Media',
      'Color Theory Application',
      'Typography Systems'
    ]
  },
  {
    title: 'Business Management Features',
    icon: Briefcase,
    color: 'from-yellow-500 to-amber-600',
    features: [
      'Project Management',
      'CRM Automation',
      'Financial Tracking',
      'Social Media Management',
      'Email Marketing',
      'Analytics & Reporting',
      'Team Collaboration',
      'Workflow Automation'
    ]
  },
  {
    title: 'Legal & Compliance Features',
    icon: Scale,
    color: 'from-indigo-500 to-purple-600',
    features: [
      'Contract Generation',
      'IP Protection',
      'Compliance Checking',
      'Legal Research',
      'Document Analysis',
      'Risk Assessment',
      'Regulatory Updates',
      'Case Law Integration'
    ]
  },
  {
    title: 'Passive Income Features',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-600',
    features: [
      'Investment Strategies',
      'Content Monetization',
      'Licensing Management',
      'Grant Writing',
      'Affiliate Marketing',
      'Revenue Optimization',
      'Market Analysis',
      'Portfolio Management'
    ]
  },
  {
    title: 'Advanced AI Features',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    features: [
      'Multi-Agent Orchestration',
      'Model Context Protocol (MCP)',
      'Agent-to-Agent Communication',
      'Quantum AI Integration',
      'Continuous Thought Machines',
      'Self-Learning Systems',
      'Neural Architecture Search',
      'Federated Learning'
    ]
  },
  {
    title: 'System Integration Features',
    icon: SettingsIcon,
    color: 'from-gray-500 to-slate-600',
    features: [
      'macOS Deep Integration',
      'Automation Workflows',
      'Hardware Acceleration',
      'Neural Engine Optimization',
      'Cross-Platform Sync',
      'API Orchestration',
      'Security Protocols',
      'Performance Monitoring'
    ]
  }
];

const technicalSpecs = [
  {
    category: 'Framework & Architecture',
    icon: Code,
    specs: [
      'React 18 with TypeScript',
      'Liquid Glass UI Design System',
      'Multi-Agent System Architecture',
      'Real-time State Management',
      'Component-based Architecture',
      'Responsive Design Patterns'
    ]
  },
  {
    category: 'AI Model Support',
    icon: Brain,
    specs: [
      'GPT-4, Claude 3, Gemini Pro',
      'Local Models (Llama, Mistral)',
      'Multimodal AI Integration',
      'Custom Fine-tuned Models',
      'Model Context Protocol',
      'Dynamic Model Selection'
    ]
  },
  {
    category: 'Audio Specifications',
    icon: Music,
    specs: [
      'Spatial Audio (9.1.6)',
      'Dolby Atmos Support',
      'Apple Binaural Renderer',
      'Psychoacoustic Processing',
      '96kHz/32-bit Audio',
      'Real-time DSP'
    ]
  },
  {
    category: 'Video Specifications',
    icon: Film,
    specs: [
      '4K HDR10 & Dolby Vision',
      'Apple Immersive Video',
      'HEVC/H.265 Encoding',
      'Real-time Ray Tracing',
      'Motion Graphics Engine',
      'Color Grading Suite'
    ]
  },
  {
    category: 'Security Features',
    icon: Shield,
    specs: [
      'End-to-End Encryption',
      'Anti-Theft Protection',
      'Secure Key Management',
      'Privacy-First Design',
      'Compliance Standards',
      'Audit Logging'
    ]
  },
  {
    category: 'Performance',
    icon: Zap,
    specs: [
      'Neural Engine Optimization',
      'GPU Acceleration',
      'Concurrent Processing',
      'Memory Management',
      'Caching Strategies',
      'Load Balancing'
    ]
  }
];

const systemRequirements = {
  minimum: [
    'macOS 14.0+ (Sonoma)',
    '8GB RAM',
    '100GB Storage',
    'Intel Core i5 or Apple M1',
    'Internet Connection',
    'Graphics: Integrated'
  ],
  recommended: [
    'macOS 15.0+ (Sequoia)',
    '32GB RAM',
    '2TB SSD Storage',
    'Apple M3 Pro or M3 Max',
    'High-speed Internet',
    'Dedicated GPU'
  ]
};

export const AboutSection: React.FC = () => {
  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">MC</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">MacOSController</h1>
          <p className="text-xl text-gray-300 mt-2">AI Operator Suite v1.0.0</p>
          <p className="text-lg text-blue-400 mt-4 font-medium">
            "ANYTHING A HUMAN CAN DO, MacOSController CAN DO, AUTOMATE and MORE!"
          </p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-8">
          {/* Application Overview */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Application Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                MacOSController is an advanced, all-in-one AI-powered operator, assistant, and agent application 
                designed to autonomously handle, automate, and optimize any task a human can do. Featuring a 
                visually stunning Liquid Glass UI, persistent cloud-synced memory, multi-agent AI orchestration, 
                and comprehensive creative and business capabilities, it serves as "A COMPANY WITHIN ONE APP."
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">145+</div>
                  <div className="text-sm text-gray-400">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">9</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-sm text-gray-400">Operation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">∞</div>
                  <div className="text-sm text-gray-400">Possibilities</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comprehensive Feature Lists */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Comprehensive Feature Lists</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featureCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span>{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-2">
                        {category.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Technical Specifications */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <span>Technical Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicalSpecs.map((spec, index) => {
                  const Icon = spec.icon;
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-blue-400" />
                        <h3 className="font-semibold text-white">{spec.category}</h3>
                      </div>
                      <div className="space-y-1">
                        {spec.specs.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-sm text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System Requirements */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">Minimum</Badge>
                  </h3>
                  <div className="space-y-2">
                    {systemRequirements.minimum.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-gray-300 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                    <Badge variant="outline" className="border-green-500 text-green-400">Recommended</Badge>
                  </h3>
                  <div className="space-y-2">
                    {systemRequirements.recommended.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal & Compliance */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Legal & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Copyright Information</h3>
                  <p className="text-sm text-gray-400">
                    © 2024 MacOSController. All rights reserved. This software and its documentation 
                    are protected by international copyright laws.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Compliance Statements</h3>
                  <p className="text-sm text-gray-400">
                    Compliant with GDPR, CCPA, SOC 2, and international data protection regulations. 
                    Enterprise-grade security and privacy standards.
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h3 className="font-semibold text-white mb-2">Anti-detection Protocols</h3>
                <p className="text-sm text-gray-400">
                  Advanced humanization and anti-plagiarism systems ensure all generated content 
                  meets originality standards and passes detection systems.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Version Information */}
          <Card className="glass-card border-white/10">
            <CardContent className="text-center py-8">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">MacOSController v1.0.0</h3>
                <p className="text-gray-400">Built with React 18, TypeScript, and Tailwind CSS</p>
                <p className="text-sm text-gray-500">
                  Release Date: {new Date().toLocaleDateString()} • 
                  Platform: Web Application • 
                  Architecture: Multi-Agent AI System
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};