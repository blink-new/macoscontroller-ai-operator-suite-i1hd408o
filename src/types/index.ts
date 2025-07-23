export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  settings: UserSettings;
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  metadata: Record<string, any>;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  projectId: string;
  metadata?: Record<string, any>;
  attachments?: FileAttachment[];
}

export interface FileAttachment {
  name: string;
  size: number;
  type: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  enabled: boolean;
  cost?: number;
  requirements?: string[];
}

export interface ProgressTask {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: TaskStatus;
  estimatedTime?: number;
  startedAt?: Date;
  completedAt?: Date;
}

export interface CostAnalysis {
  totalCost: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  breakdown: CostBreakdown[];
}

export interface CostBreakdown {
  service: string;
  model: string;
  usage: number;
  cost: number;
  timestamp: Date;
}

export interface UserSettings {
  assistantName: string;
  assistantPersonality: string;
  autoSelectModel: boolean;
  selectedModel: string;
  dailyBudgetLimit: number;
  monthlyBudgetLimit: number;
  maxConcurrentProcesses: number;
  cloudSyncEnabled: boolean;
  antiTheftEnabled: boolean;
  costOptimizationEnabled: boolean;
  preferLocalModels: boolean;
  apiKeys: Record<string, string>;
}

export enum MainTab {
  CHAT = 'chat',
  PROGRESS = 'progress',
  FEATURES = 'features',
  SETTINGS = 'settings',
  ABOUT = 'about'
}

export enum ProjectType {
  AUDIO = 'audio',
  FILM = 'film',
  WRITING = 'writing',
  DESIGN = 'design',
  BUSINESS = 'business',
  LEGAL = 'legal',
  PASSIVE_INCOME = 'passive_income',
  GENERAL = 'general'
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAUSED = 'paused'
}

export enum FeatureCategory {
  AUDIO_PRODUCTION = 'audio_production',
  FILM_VIDEO = 'film_video',
  WRITING_EDITING = 'writing_editing',
  DESIGN_GRAPHICS = 'design_graphics',
  BUSINESS_MANAGEMENT = 'business_management',
  LEGAL_TOOLS = 'legal_tools',
  PASSIVE_INCOME = 'passive_income',
  AI_MODELS = 'ai_models',
  SYSTEM_INTEGRATION = 'system_integration'
}

export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PAUSED = 'paused'
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  type: 'text' | 'image' | 'audio' | 'video' | 'multimodal';
  costPerToken?: number;
  maxTokens?: number;
  capabilities: string[];
  local: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  prompt: string;
  category: ProjectType;
}