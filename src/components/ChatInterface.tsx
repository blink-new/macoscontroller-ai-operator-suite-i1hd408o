import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ChatMessage, ProjectType } from '../types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { AIService } from '../lib/blink';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square,
  Copy,
  Trash2,
  Music,
  Film,
  PenTool,
  Palette,
  Briefcase,
  Scale
} from 'lucide-react';

const quickActionIcons = {
  [ProjectType.AUDIO]: Music,
  [ProjectType.FILM]: Film,
  [ProjectType.WRITING]: PenTool,
  [ProjectType.DESIGN]: Palette,
  [ProjectType.BUSINESS]: Briefcase,
  [ProjectType.LEGAL]: Scale
};

export const ChatInterface: React.FC = () => {
  const {
    messages,
    isProcessing,
    currentProject,
    currentProfile,
    settings,
    quickActions,
    addMessage,
    clearMessages,
    setProcessing,
    updateProgress
  } = useAppStore();

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && attachedFiles.length === 0) || !currentProject || !currentProfile) return;

    const originalInput = input.trim();
    let messageContent = originalInput;
    
    // Add file information to message content for display
    if (attachedFiles.length > 0) {
      const fileList = attachedFiles.map(file => 
        `📎 ${file.name} (${formatFileSize(file.size)})`
      ).join('\n');
      messageContent = messageContent ? `${messageContent}\n\n${fileList}` : fileList;
    }

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: messageContent,
      role: 'user',
      timestamp: new Date(),
      projectId: currentProject.id,
      attachments: attachedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };

    addMessage(userMessage);
    const currentFiles = [...attachedFiles]; // Store files before clearing
    setInput('');
    setAttachedFiles([]);
    setProcessing(true);

    try {
      // Update progress tracking
      updateProgress({
        currentTask: `Processing: ${originalInput.substring(0, 50)}${originalInput.length > 50 ? '...' : ''}`,
        progress: 25,
        timeRemaining: 30,
        completedSteps: ['Analyzing request', 'Processing attachments'],
        remainingSteps: ['Generating response', 'Quality check', 'Finalizing output']
      });

      // Use AI service to process the request
      const aiResponse = await AIService.processUserRequest(originalInput, currentFiles);
      
      // Update progress to completion
      updateProgress({
        currentTask: 'Task completed successfully',
        progress: 100,
        timeRemaining: 0,
        completedSteps: ['Analyzing request', 'Processing attachments', 'Generating response', 'Quality check', 'Finalizing output'],
        remainingSteps: []
      });
      
      const aiMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
        projectId: currentProject.id
      };
      
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error processing AI request:', error);
      
      // Fallback response
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        content: `I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.\n\nError details: ${error instanceof Error ? error.message : 'Unknown error'}`,
        role: 'assistant',
        timestamp: new Date(),
        projectId: currentProject.id
      };
      
      addMessage(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">MC</span>
          </div>
          <h2 className="text-xl font-semibold text-white">Welcome to MacOSController</h2>
          <p className="text-gray-400 max-w-md">
            Create a profile to get started with your AI-powered operator suite.
          </p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">Select a Project</h2>
          <p className="text-gray-400 max-w-md">
            Choose an existing project or create a new one to start working with {settings.assistantName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-white/10 glass-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <h2 className="font-semibold text-white">{settings.assistantName}</h2>
              <p className="text-sm text-gray-400">
                {currentProject.name} • {settings.autoSelectModel ? 'Auto Model' : settings.selectedModel}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300">
              Online
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-gray-400 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-white/10">
        <ScrollArea className="w-full">
          <div className="flex space-x-3 pb-2">
            {quickActions.map((action) => {
              const Icon = quickActionIcons[action.category] || Briefcase;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex-shrink-0 glass-card border-white/10 hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.title}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Ready to assist with {currentProject.name}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                I'm {settings.assistantName}, your AI operator. I can help with audio production, 
                film editing, writing, design, business management, and much more.
              </p>
              <div className="text-sm text-gray-500">
                Use the quick actions above or type your request below.
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'message-user ml-12'
                    : 'message-ai mr-12'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-white">
                        {message.role === 'user' ? currentProfile.name : settings.assistantName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-gray-200 whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMessage(message.content)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="message-ai mr-12 max-w-[80%] rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-white">{settings.assistantName}</span>
                  <span className="text-xs text-gray-400">Processing...</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 glass-panel">
        {/* File Attachments Display */}
        {attachedFiles.length > 0 && (
          <div className="mb-3 space-y-2">
            <div className="text-sm text-gray-400">Attached files:</div>
            <div className="flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2 text-sm"
                >
                  <Paperclip className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-300">{file.name}</span>
                  <span className="text-gray-500">({formatFileSize(file.size)})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="h-4 w-4 p-0 text-gray-400 hover:text-red-400"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="*/*"
        />
        
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${settings.assistantName}...`}
              className="glass-card border-white/10 resize-none min-h-[60px] max-h-[120px] pr-20"
              disabled={isProcessing}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                title="Attach files"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={`h-8 w-8 p-0 ${
                  isRecording ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={(!input.trim() && attachedFiles.length === 0) || isProcessing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};