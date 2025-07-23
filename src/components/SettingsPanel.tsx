import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  Settings, 
  Brain, 
  DollarSign, 
  Zap, 
  Shield, 
  Key,
  Save,
  RotateCcw,
  Cpu,
  Cloud,
  Lock
} from 'lucide-react';

const aiModels = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', cost: 0.03 },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', cost: 0.01 },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', cost: 0.015 },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', cost: 0.003 },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', cost: 0.0005 },
  { id: 'llama-2-70b', name: 'Llama 2 70B', provider: 'Local', cost: 0 },
  { id: 'mistral-7b', name: 'Mistral 7B', provider: 'Local', cost: 0 }
];

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useAppStore();

  const handleSettingChange = (key: string, value: any) => {
    updateSettings({ [key]: value });
  };

  const resetToDefaults = () => {
    updateSettings({
      assistantName: 'MacController',
      assistantPersonality: 'Professional and efficient AI operator',
      autoSelectModel: true,
      selectedModel: 'gpt-4',
      dailyBudgetLimit: 50,
      monthlyBudgetLimit: 1000,
      maxConcurrentProcesses: 4,
      cloudSyncEnabled: true,
      antiTheftEnabled: true,
      costOptimizationEnabled: true,
      preferLocalModels: false
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">
            Configure MacOSController to match your preferences and requirements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={resetToDefaults} className="glass-card border-white/10">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-6">
          {/* AI Model Configuration */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI Model Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Auto-select Best Model</Label>
                  <p className="text-sm text-gray-400">
                    Automatically choose the optimal AI model for each task
                  </p>
                </div>
                <Switch
                  checked={settings.autoSelectModel}
                  onCheckedChange={(checked) => handleSettingChange('autoSelectModel', checked)}
                />
              </div>

              {!settings.autoSelectModel && (
                <div className="space-y-2">
                  <Label className="text-white">Manual Model Selection</Label>
                  <Select
                    value={settings.selectedModel}
                    onValueChange={(value) => handleSettingChange('selectedModel', value)}
                  >
                    <SelectTrigger className="glass-card border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/10">
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <div className="flex items-center space-x-2 ml-4">
                              <Badge variant="outline" className="text-xs">
                                {model.provider}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                ${model.cost}/1K tokens
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Prefer Local Models</Label>
                  <p className="text-sm text-gray-400">
                    Prioritize local models to reduce costs and improve privacy
                  </p>
                </div>
                <Switch
                  checked={settings.preferLocalModels}
                  onCheckedChange={(checked) => handleSettingChange('preferLocalModels', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Assistant Customization */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Assistant Customization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Assistant Name</Label>
                <Input
                  value={settings.assistantName}
                  onChange={(e) => handleSettingChange('assistantName', e.target.value)}
                  className="glass-card border-white/10"
                  placeholder="Enter assistant name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Personality & Behavior</Label>
                <Textarea
                  value={settings.assistantPersonality}
                  onChange={(e) => handleSettingChange('assistantPersonality', e.target.value)}
                  className="glass-card border-white/10 min-h-[100px]"
                  placeholder="Describe the assistant's personality and behavior..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget & Cost Control */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Budget & Cost Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">Daily Budget Limit</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[settings.dailyBudgetLimit]}
                    onValueChange={(value) => handleSettingChange('dailyBudgetLimit', value[0])}
                    max={500}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <div className="w-20">
                    <Input
                      type="number"
                      value={settings.dailyBudgetLimit}
                      onChange={(e) => handleSettingChange('dailyBudgetLimit', parseInt(e.target.value))}
                      className="glass-card border-white/10 text-center"
                    />
                  </div>
                  <span className="text-gray-400">USD</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Monthly Budget Limit</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[settings.monthlyBudgetLimit]}
                    onValueChange={(value) => handleSettingChange('monthlyBudgetLimit', value[0])}
                    max={10000}
                    min={10}
                    step={10}
                    className="flex-1"
                  />
                  <div className="w-20">
                    <Input
                      type="number"
                      value={settings.monthlyBudgetLimit}
                      onChange={(e) => handleSettingChange('monthlyBudgetLimit', parseInt(e.target.value))}
                      className="glass-card border-white/10 text-center"
                    />
                  </div>
                  <span className="text-gray-400">USD</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Cost Optimization</Label>
                  <p className="text-sm text-gray-400">
                    Automatically optimize for cost-effectiveness
                  </p>
                </div>
                <Switch
                  checked={settings.costOptimizationEnabled}
                  onCheckedChange={(checked) => handleSettingChange('costOptimizationEnabled', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Performance Settings */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Performance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Max Concurrent Processes</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={[settings.maxConcurrentProcesses]}
                    onValueChange={(value) => handleSettingChange('maxConcurrentProcesses', value[0])}
                    max={16}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <div className="w-16 text-center">
                    <span className="text-white font-medium">{settings.maxConcurrentProcesses}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Higher values may improve speed but increase resource usage
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Neural Engine</span>
                  </div>
                  <p className="text-xs text-gray-400">Optimized for Apple Silicon</p>
                </div>
                <div className="glass-card p-4 border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-white">GPU Acceleration</span>
                  </div>
                  <p className="text-xs text-gray-400">Hardware acceleration enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Configuration */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Cloud Synchronization</Label>
                  <p className="text-sm text-gray-400">
                    Sync settings and data across devices
                  </p>
                </div>
                <Switch
                  checked={settings.cloudSyncEnabled}
                  onCheckedChange={(checked) => handleSettingChange('cloudSyncEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Anti-theft Protection</Label>
                  <p className="text-sm text-gray-400">
                    Protect intellectual property and user data
                  </p>
                </div>
                <Switch
                  checked={settings.antiTheftEnabled}
                  onCheckedChange={(checked) => handleSettingChange('antiTheftEnabled', checked)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-white">End-to-End Encryption</span>
                  </div>
                  <p className="text-xs text-gray-400">All data encrypted at rest</p>
                </div>
                <div className="glass-card p-4 border border-white/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cloud className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">Secure Cloud Storage</span>
                  </div>
                  <p className="text-xs text-gray-400">Enterprise-grade security</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Management */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-400">
                Manage API keys for external services. Keys are encrypted and stored securely.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'OpenAI API Key',
                  'Anthropic API Key',
                  'Google AI API Key',
                  'Eleven Labs API Key',
                  'Suno API Key',
                  'Stripe API Key'
                ].map((keyName) => (
                  <div key={keyName} className="space-y-2">
                    <Label className="text-white">{keyName}</Label>
                    <Input
                      type="password"
                      placeholder="Enter API key..."
                      className="glass-card border-white/10"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};