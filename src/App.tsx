import React from 'react';
import { useAppStore } from './store/useAppStore';
import { MainTab } from './types';
import { LiquidGlassBackground } from './components/LiquidGlassBackground';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ProgressTracker } from './components/ProgressTracker';
import { FeaturesDashboard } from './components/FeaturesDashboard';
import { SettingsPanel } from './components/SettingsPanel';
import { AboutSection } from './components/AboutSection';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  const { currentTab } = useAppStore();

  const renderCurrentTab = () => {
    switch (currentTab) {
      case MainTab.CHAT:
        return <ChatInterface />;
      case MainTab.PROGRESS:
        return <ProgressTracker />;
      case MainTab.FEATURES:
        return <FeaturesDashboard />;
      case MainTab.SETTINGS:
        return <SettingsPanel />;
      case MainTab.ABOUT:
        return <AboutSection />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LiquidGlassBackground />
      
      <div className="relative z-10 flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <ErrorBoundary>
            {renderCurrentTab()}
          </ErrorBoundary>
        </main>
      </div>

      <FloatingActionButton />
      <Toaster />
    </div>
  );
}

export default App;