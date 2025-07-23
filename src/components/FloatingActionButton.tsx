import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Button } from './ui/button';
import { 
  Plus, 
  Music, 
  Film, 
  PenTool, 
  Palette, 
  Briefcase, 
  Scale,
  X
} from 'lucide-react';

const quickActions = [
  { icon: Music, label: 'Music', prompt: 'I want to create a professional music track with vocals and instruments.' },
  { icon: Film, label: 'Video', prompt: 'I need help creating a video project with AI-generated footage.' },
  { icon: PenTool, label: 'Write', prompt: 'I want to write high-quality content - articles, stories, or scripts.' },
  { icon: Palette, label: 'Design', prompt: 'I need to create visual designs, logos, or artwork.' },
  { icon: Briefcase, label: 'Business', prompt: 'Help me with business management, planning, or automation.' },
  { icon: Scale, label: 'Legal', prompt: 'I need assistance with legal documents or research.' }
];

export const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentProject, addMessage, setCurrentTab } = useAppStore();

  const handleQuickAction = (prompt: string) => {
    if (!currentProject) return;

    // Add message to chat
    const message = {
      id: `msg_${Date.now()}`,
      content: prompt,
      role: 'user' as const,
      timestamp: new Date(),
      projectId: currentProject.id
    };
    
    addMessage(message);
    setCurrentTab('chat' as any);
    setIsExpanded(false);
  };

  if (!currentProject) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                onClick={() => handleQuickAction(action.prompt)}
                className="w-12 h-12 rounded-full glass-card border-white/10 hover:bg-white/10 group"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transform: `translateY(${isExpanded ? 0 : 20}px)`,
                  opacity: isExpanded ? 1 : 0,
                  transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`
                }}
              >
                <Icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fab ${isExpanded ? 'expanded' : ''}`}
      >
        {isExpanded ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Plus className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
};