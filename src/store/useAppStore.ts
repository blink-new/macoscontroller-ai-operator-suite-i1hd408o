import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  UserProfile,
  Project,
  ChatMessage,
  Feature,
  ProgressTask,
  CostAnalysis,
  UserSettings,
  MainTab,
  ProjectType,
  ProjectStatus,
  FeatureCategory,
  TaskStatus,
  AIModel,
  QuickAction
} from '../types';

interface AppState {
  // UI State
  currentTab: MainTab;
  sidebarCollapsed: boolean;
  
  // User & Profile
  currentProfile: UserProfile | null;
  profiles: UserProfile[];
  
  // Projects
  currentProject: Project | null;
  projects: Project[];
  
  // Chat
  messages: ChatMessage[];
  isProcessing: boolean;
  
  // Features
  features: Feature[];
  
  // Progress
  currentTasks: ProgressTask[];
  
  // Cost Analysis
  costAnalysis: CostAnalysis | null;
  
  // Settings
  settings: UserSettings;
  
  // AI Models
  availableModels: AIModel[];
  
  // Quick Actions
  quickActions: QuickAction[];
  
  // Actions
  setCurrentTab: (tab: MainTab) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCurrentProfile: (profile: UserProfile | null) => void;
  addProfile: (profile: UserProfile) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setProcessing: (processing: boolean) => void;
  toggleFeature: (featureId: string) => void;
  addTask: (task: ProgressTask) => void;
  updateTask: (id: string, updates: Partial<ProgressTask>) => void;
  removeTask: (id: string) => void;
  updateSettings: (updates: Partial<UserSettings>) => void;
  updateCostAnalysis: (analysis: CostAnalysis) => void;
}

const defaultSettings: UserSettings = {
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
};

const defaultFeatures: Feature[] = [
  // Audio Production
  {
    id: 'music-generation',
    name: 'Music Generation',
    description: 'Generate original songs, instrumentals, and vocals',
    category: FeatureCategory.AUDIO_PRODUCTION,
    enabled: true
  },
  {
    id: 'spatial-audio',
    name: 'Spatial Audio Mixing',
    description: '9.1.6 head-tracking mixing and Dolby Atmos',
    category: FeatureCategory.AUDIO_PRODUCTION,
    enabled: true
  },
  {
    id: 'voice-cloning',
    name: 'Voice Cloning',
    description: 'Clone and synthesize voices with professional quality',
    category: FeatureCategory.AUDIO_PRODUCTION,
    enabled: true
  },
  {
    id: 'audio-mastering',
    name: 'AI Audio Mastering',
    description: 'Professional mastering with psychoacoustic enhancement',
    category: FeatureCategory.AUDIO_PRODUCTION,
    enabled: true
  },
  
  // Film & Video
  {
    id: 'video-generation',
    name: 'AI Video Generation',
    description: 'Generate high-quality video content and footage',
    category: FeatureCategory.FILM_VIDEO,
    enabled: true
  },
  {
    id: 'film-editing',
    name: 'Intelligent Film Editing',
    description: 'AI-powered video editing and post-production',
    category: FeatureCategory.FILM_VIDEO,
    enabled: true
  },
  {
    id: 'face-swap',
    name: 'Face Swap & Lip Sync',
    description: 'Advanced face replacement and lip synchronization',
    category: FeatureCategory.FILM_VIDEO,
    enabled: true
  },
  {
    id: 'immersive-video',
    name: 'Apple Immersive Video',
    description: 'Create content for Apple Vision Pro',
    category: FeatureCategory.FILM_VIDEO,
    enabled: true
  },
  
  // Writing & Editing
  {
    id: 'content-generation',
    name: 'Advanced Content Generation',
    description: 'Novels, scripts, articles with deep memory',
    category: FeatureCategory.WRITING_EDITING,
    enabled: true
  },
  {
    id: 'plagiarism-detection',
    name: 'Plagiarism Detection',
    description: 'Ensure originality and avoid copyright issues',
    category: FeatureCategory.WRITING_EDITING,
    enabled: true
  },
  {
    id: 'humanization',
    name: 'Content Humanization',
    description: 'Make AI-generated content undetectable',
    category: FeatureCategory.WRITING_EDITING,
    enabled: true
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    description: 'Optimize content for search engines',
    category: FeatureCategory.WRITING_EDITING,
    enabled: true
  },
  
  // Design & Graphics
  {
    id: 'image-generation',
    name: 'AI Image Generation',
    description: 'Create stunning visuals and artwork',
    category: FeatureCategory.DESIGN_GRAPHICS,
    enabled: true
  },
  {
    id: 'logo-design',
    name: 'Logo & Brand Design',
    description: 'Professional branding and identity design',
    category: FeatureCategory.DESIGN_GRAPHICS,
    enabled: true
  },
  {
    id: '3d-rendering',
    name: '3D Rendering',
    description: 'Generate 3D models and environments',
    category: FeatureCategory.DESIGN_GRAPHICS,
    enabled: true
  },
  {
    id: 'image-upscaling',
    name: 'Image Enhancement',
    description: 'Upscale and enhance image quality',
    category: FeatureCategory.DESIGN_GRAPHICS,
    enabled: true
  },
  
  // Business Management
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Comprehensive project planning and tracking',
    category: FeatureCategory.BUSINESS_MANAGEMENT,
    enabled: true
  },
  {
    id: 'crm-automation',
    name: 'CRM Automation',
    description: 'Customer relationship management',
    category: FeatureCategory.BUSINESS_MANAGEMENT,
    enabled: true
  },
  {
    id: 'financial-tracking',
    name: 'Financial Tracking',
    description: 'Revenue, expenses, and ROI analysis',
    category: FeatureCategory.BUSINESS_MANAGEMENT,
    enabled: true
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    description: 'Automated posting and engagement',
    category: FeatureCategory.BUSINESS_MANAGEMENT,
    enabled: true
  },
  
  // Legal Tools
  {
    id: 'contract-generation',
    name: 'Contract Generation',
    description: 'Generate legal documents and contracts',
    category: FeatureCategory.LEGAL_TOOLS,
    enabled: true
  },
  {
    id: 'ip-protection',
    name: 'IP Protection',
    description: 'Intellectual property management',
    category: FeatureCategory.LEGAL_TOOLS,
    enabled: true
  },
  {
    id: 'compliance-check',
    name: 'Compliance Checking',
    description: 'Ensure legal compliance across jurisdictions',
    category: FeatureCategory.LEGAL_TOOLS,
    enabled: true
  },
  {
    id: 'legal-research',
    name: 'Legal Research',
    description: 'Case law and statute research',
    category: FeatureCategory.LEGAL_TOOLS,
    enabled: true
  },
  
  // Passive Income
  {
    id: 'investment-strategies',
    name: 'Investment Strategies',
    description: 'AI-driven investment recommendations',
    category: FeatureCategory.PASSIVE_INCOME,
    enabled: true
  },
  {
    id: 'content-monetization',
    name: 'Content Monetization',
    description: 'Monetize created content across platforms',
    category: FeatureCategory.PASSIVE_INCOME,
    enabled: true
  },
  {
    id: 'licensing-management',
    name: 'Licensing Management',
    description: 'Manage rights and licensing deals',
    category: FeatureCategory.PASSIVE_INCOME,
    enabled: true
  },
  {
    id: 'grant-writing',
    name: 'Grant Writing',
    description: 'Research and write grant applications',
    category: FeatureCategory.PASSIVE_INCOME,
    enabled: true
  }
];

const defaultQuickActions: QuickAction[] = [
  {
    id: 'produce-music',
    title: 'Produce Music',
    description: 'Generate and produce professional music tracks',
    icon: '🎵',
    prompt: 'I want to create a professional music track. Please help me with composition, arrangement, and production.',
    category: ProjectType.AUDIO
  },
  {
    id: 'create-film',
    title: 'Film Projects',
    description: 'Create and edit video content',
    icon: '🎬',
    prompt: 'I want to create a film or video project. Help me with scripting, filming, and post-production.',
    category: ProjectType.FILM
  },
  {
    id: 'write-content',
    title: 'Write & Edit',
    description: 'Generate and edit written content',
    icon: '✍️',
    prompt: 'I need help with writing and editing content. Please assist with creation and refinement.',
    category: ProjectType.WRITING
  },
  {
    id: 'design-graphics',
    title: 'Design Graphics',
    description: 'Create visual designs and artwork',
    icon: '🎨',
    prompt: 'I want to create visual designs and graphics. Help me with concept development and execution.',
    category: ProjectType.DESIGN
  },
  {
    id: 'manage-business',
    title: 'Manage Business',
    description: 'Business operations and management',
    icon: '💼',
    prompt: 'I need assistance with business management tasks. Help me organize and optimize operations.',
    category: ProjectType.BUSINESS
  },
  {
    id: 'legal-assistance',
    title: 'Legal Tools',
    description: 'Legal document generation and research',
    icon: '⚖️',
    prompt: 'I need legal assistance with documents, research, or compliance matters.',
    category: ProjectType.LEGAL
  }
];

// Create default profile
const createDefaultProfile = (): UserProfile => ({
  id: 'default_profile',
  name: 'Default User',
  email: 'user@macoscontroller.com',
  createdAt: new Date(),
  settings: { ...defaultSettings }
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentTab: MainTab.CHAT,
      sidebarCollapsed: false,
      currentProfile: null,
      profiles: [],
      currentProject: null,
      projects: [],
      messages: [],
      isProcessing: false,
      features: defaultFeatures,
      currentTasks: [],
      costAnalysis: null,
      settings: defaultSettings,
      availableModels: [],
      quickActions: defaultQuickActions,
      
      // Actions
      setCurrentTab: (tab) => set({ currentTab: tab }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      setCurrentProfile: (profile) => set({ currentProfile: profile }),
      addProfile: (profile) => set((state) => ({ 
        profiles: [...state.profiles, profile],
        currentProfile: profile
      })),
      
      setCurrentProject: (project) => set({ currentProject: project }),
      addProject: (project) => set((state) => ({ 
        projects: [...state.projects, project],
        currentProject: project
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...updates } 
          : state.currentProject
      })),
      
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),
      setProcessing: (processing) => set({ isProcessing: processing }),
      
      toggleFeature: (featureId) => set((state) => ({
        features: state.features.map(f => 
          f.id === featureId ? { ...f, enabled: !f.enabled } : f
        )
      })),
      
      addTask: (task) => set((state) => ({ 
        currentTasks: [...state.currentTasks, task] 
      })),
      updateTask: (id, updates) => set((state) => ({
        currentTasks: state.currentTasks.map(t => 
          t.id === id ? { ...t, ...updates } : t
        )
      })),
      removeTask: (id) => set((state) => ({
        currentTasks: state.currentTasks.filter(t => t.id !== id)
      })),
      
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),
      
      updateCostAnalysis: (analysis) => set({ costAnalysis: analysis })
    }),
    {
      name: 'macoscontroller-storage',
      partialize: (state) => ({
        profiles: state.profiles,
        projects: state.projects,
        settings: state.settings,
        features: state.features
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.profiles.length === 0) {
          const defaultProfile = createDefaultProfile();
          state.profiles = [defaultProfile];
          state.currentProfile = defaultProfile;
        } else if (state && state.profiles.length > 0 && !state.currentProfile) {
          state.currentProfile = state.profiles[0];
        }
      }
    }
  )
);