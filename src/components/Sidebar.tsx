import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { MainTab, ProjectType, ProjectStatus } from '../types';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  MessageSquare, 
  BarChart3, 
  Grid3X3, 
  Settings, 
  Info,
  Plus,
  User,
  FolderOpen,
  ChevronDown
} from 'lucide-react';

const tabIcons = {
  [MainTab.CHAT]: MessageSquare,
  [MainTab.PROGRESS]: BarChart3,
  [MainTab.FEATURES]: Grid3X3,
  [MainTab.SETTINGS]: Settings,
  [MainTab.ABOUT]: Info
};

const projectTypeColors = {
  [ProjectType.AUDIO]: 'bg-purple-500/20 text-purple-300',
  [ProjectType.FILM]: 'bg-red-500/20 text-red-300',
  [ProjectType.WRITING]: 'bg-blue-500/20 text-blue-300',
  [ProjectType.DESIGN]: 'bg-green-500/20 text-green-300',
  [ProjectType.BUSINESS]: 'bg-yellow-500/20 text-yellow-300',
  [ProjectType.LEGAL]: 'bg-indigo-500/20 text-indigo-300',
  [ProjectType.PASSIVE_INCOME]: 'bg-emerald-500/20 text-emerald-300',
  [ProjectType.GENERAL]: 'bg-gray-500/20 text-gray-300'
};

const statusColors = {
  [ProjectStatus.PLANNING]: 'bg-blue-500/20 text-blue-300',
  [ProjectStatus.IN_PROGRESS]: 'bg-yellow-500/20 text-yellow-300',
  [ProjectStatus.COMPLETED]: 'bg-green-500/20 text-green-300',
  [ProjectStatus.PAUSED]: 'bg-gray-500/20 text-gray-300'
};

export const Sidebar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    currentProfile,
    profiles,
    setCurrentProfile,
    currentProject,
    projects,
    setCurrentProject,
    addProfile,
    addProject
  } = useAppStore();

  const handleCreateProfile = () => {
    const profileName = prompt('Enter profile name:') || `Profile ${profiles.length + 1}`;
    const profileEmail = prompt('Enter email:') || `user${profiles.length + 1}@example.com`;
    
    const newProfile = {
      id: `profile_${Date.now()}`,
      name: profileName,
      email: profileEmail,
      createdAt: new Date(),
      settings: {
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
        preferLocalModels: false,
        apiKeys: {}
      }
    };
    addProfile(newProfile);
  };

  const handleCreateProject = () => {
    if (!currentProfile) return;
    
    const projectName = prompt('Enter project name:') || `New Project ${projects.length + 1}`;
    const projectDescription = prompt('Enter project description:') || 'A new project created with MacOSController';
    
    const newProject = {
      id: `project_${Date.now()}`,
      name: projectName,
      type: ProjectType.GENERAL,
      status: ProjectStatus.PLANNING,
      description: projectDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: currentProfile.id,
      metadata: {}
    };
    addProject(newProject);
  };

  return (
    <div className="w-64 h-screen glass-panel border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">MC</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">MacOSController</h1>
            <p className="text-xs text-gray-400">AI Operator Suite</p>
          </div>
        </div>
      </div>

      {/* Profile Selection */}
      <div className="p-4 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white">Profile</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCreateProfile}
              className="h-7 w-7 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full"
              title="Create new profile"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={currentProfile?.id || ''}
            onValueChange={(value) => {
              const profile = profiles.find(p => p.id === value);
              setCurrentProfile(profile || null);
            }}
          >
            <SelectTrigger className="glass-card border-white/20 hover:border-white/30 bg-white/5 h-10">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-blue-400" />
                <SelectValue placeholder="Select or create profile" />
                <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
              </div>
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20 bg-gray-900/95 backdrop-blur-xl">
              {profiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id} className="hover:bg-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {profile.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{profile.name}</div>
                      <div className="text-xs text-gray-400">{profile.email}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Selection */}
      <div className="p-4 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-white">Project</label>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCreateProject}
              disabled={!currentProfile}
              className="h-7 w-7 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-full disabled:opacity-50 disabled:hover:bg-transparent"
              title="Create new project"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={currentProject?.id || ''}
            onValueChange={(value) => {
              const project = projects.find(p => p.id === value);
              setCurrentProject(project || null);
            }}
            disabled={!currentProfile}
          >
            <SelectTrigger className="glass-card border-white/20 hover:border-white/30 bg-white/5 h-10 disabled:opacity-50">
              <div className="flex items-center space-x-2 w-full">
                <FolderOpen className="h-4 w-4 text-green-400 flex-shrink-0" />
                <SelectValue placeholder={
                  !currentProfile 
                    ? "Select a profile first" 
                    : projects.filter(p => p.userId === currentProfile?.id).length === 0
                    ? "No projects - click + to create"
                    : "Select or create project"
                } />
                <ChevronDown className="h-4 w-4 text-gray-400 ml-auto flex-shrink-0" />
              </div>
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20 bg-gray-900/95 backdrop-blur-xl">
              {projects
                .filter(p => p.userId === currentProfile?.id)
                .map((project) => (
                  <SelectItem key={project.id} value={project.id} className="hover:bg-white/10">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                          <FolderOpen className="h-3 w-3 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{project.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-32">{project.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Badge className={`text-xs ${projectTypeColors[project.type]}`}>
                          {project.type}
                        </Badge>
                        <Badge className={`text-xs ${statusColors[project.status]}`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {Object.values(MainTab).map((tab) => {
            const Icon = tabIcons[tab];
            const isActive = currentTab === tab;
            
            return (
              <Button
                key={tab}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start space-x-3 ${
                  isActive 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setCurrentTab(tab)}
              >
                <Icon className="h-4 w-4" />
                <span className="capitalize">{tab.replace('_', ' ')}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Status Indicator */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400">System Online</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          v1.0.0 • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};