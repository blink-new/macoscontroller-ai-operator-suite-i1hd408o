import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { FeatureCategory } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Music, 
  Film, 
  PenTool, 
  Palette, 
  Briefcase, 
  Scale,
  DollarSign,
  Brain,
  Settings,
  Grid3X3
} from 'lucide-react';

const categoryIcons = {
  [FeatureCategory.AUDIO_PRODUCTION]: Music,
  [FeatureCategory.FILM_VIDEO]: Film,
  [FeatureCategory.WRITING_EDITING]: PenTool,
  [FeatureCategory.DESIGN_GRAPHICS]: Palette,
  [FeatureCategory.BUSINESS_MANAGEMENT]: Briefcase,
  [FeatureCategory.LEGAL_TOOLS]: Scale,
  [FeatureCategory.PASSIVE_INCOME]: DollarSign,
  [FeatureCategory.AI_MODELS]: Brain,
  [FeatureCategory.SYSTEM_INTEGRATION]: Settings
};

const categoryColors = {
  [FeatureCategory.AUDIO_PRODUCTION]: 'from-purple-500 to-pink-600',
  [FeatureCategory.FILM_VIDEO]: 'from-red-500 to-orange-600',
  [FeatureCategory.WRITING_EDITING]: 'from-blue-500 to-cyan-600',
  [FeatureCategory.DESIGN_GRAPHICS]: 'from-green-500 to-emerald-600',
  [FeatureCategory.BUSINESS_MANAGEMENT]: 'from-yellow-500 to-amber-600',
  [FeatureCategory.LEGAL_TOOLS]: 'from-indigo-500 to-purple-600',
  [FeatureCategory.PASSIVE_INCOME]: 'from-emerald-500 to-teal-600',
  [FeatureCategory.AI_MODELS]: 'from-violet-500 to-purple-600',
  [FeatureCategory.SYSTEM_INTEGRATION]: 'from-gray-500 to-slate-600'
};

const categoryDescriptions = {
  [FeatureCategory.AUDIO_PRODUCTION]: 'Music generation, spatial audio, voice cloning, and professional mastering',
  [FeatureCategory.FILM_VIDEO]: 'Video generation, editing, face swap, and immersive content creation',
  [FeatureCategory.WRITING_EDITING]: 'Content creation, plagiarism detection, humanization, and SEO optimization',
  [FeatureCategory.DESIGN_GRAPHICS]: 'Image generation, logo design, 3D rendering, and visual enhancement',
  [FeatureCategory.BUSINESS_MANAGEMENT]: 'Project management, CRM, financial tracking, and automation',
  [FeatureCategory.LEGAL_TOOLS]: 'Contract generation, IP protection, compliance, and legal research',
  [FeatureCategory.PASSIVE_INCOME]: 'Investment strategies, content monetization, and licensing management',
  [FeatureCategory.AI_MODELS]: 'Advanced AI capabilities, multi-agent systems, and model orchestration',
  [FeatureCategory.SYSTEM_INTEGRATION]: 'macOS integration, automation, and system-level operations'
};

export const FeaturesDashboard: React.FC = () => {
  const { features, toggleFeature } = useAppStore();

  const groupedFeatures = features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<FeatureCategory, typeof features>);

  const enabledCount = features.filter(f => f.enabled).length;
  const totalCount = features.length;

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Features Dashboard</h1>
          <p className="text-gray-400">
            Manage and configure MacOSController capabilities
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{enabledCount}/{totalCount}</div>
          <div className="text-sm text-gray-400">Features Active</div>
        </div>
      </div>

      {/* Overview */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5" />
            <span>Feature Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => {
              const Icon = categoryIcons[category as FeatureCategory];
              const enabledInCategory = categoryFeatures.filter(f => f.enabled).length;
              const totalInCategory = categoryFeatures.length;
              const percentage = Math.round((enabledInCategory / totalInCategory) * 100);
              
              return (
                <div key={category} className="text-center space-y-2">
                  <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${categoryColors[category as FeatureCategory]} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{enabledInCategory}/{totalInCategory}</div>
                    <div className="text-xs text-gray-400 capitalize">
                      {category.replace('_', ' ')}
                    </div>
                    <div className="text-xs text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feature Categories */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6">
          {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => {
            const Icon = categoryIcons[category as FeatureCategory];
            const enabledInCategory = categoryFeatures.filter(f => f.enabled).length;
            
            return (
              <Card key={category} className="glass-card border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[category as FeatureCategory]} flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <span className="capitalize">{category.replace('_', ' ')}</span>
                        <p className="text-sm text-gray-400 font-normal mt-1">
                          {categoryDescriptions[category as FeatureCategory]}
                        </p>
                      </div>
                    </CardTitle>
                    <Badge variant="secondary" className="bg-white/10 text-white">
                      {enabledInCategory}/{categoryFeatures.length} Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryFeatures.map((feature) => (
                      <div key={feature.id} className="glass-card p-4 border border-white/5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`status-indicator ${feature.enabled ? 'status-active' : 'status-inactive'}`}></div>
                              <h3 className="font-medium text-white">{feature.name}</h3>
                            </div>
                            <p className="text-sm text-gray-400">{feature.description}</p>
                          </div>
                          <Switch
                            checked={feature.enabled}
                            onCheckedChange={() => toggleFeature(feature.id)}
                            className="ml-3"
                          />
                        </div>
                        
                        {feature.cost && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Cost per use:</span>
                            <span className="text-green-400">${feature.cost.toFixed(4)}</span>
                          </div>
                        )}
                        
                        {feature.requirements && feature.requirements.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-1">Requirements:</div>
                            <div className="flex flex-wrap gap-1">
                              {feature.requirements.map((req, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-400">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};