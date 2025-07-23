import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { TaskStatus } from '../types';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  Clock, 
  CheckCircle, 
  Circle, 
  AlertCircle, 
  Pause,
  Play,
  BarChart3,
  TrendingUp
} from 'lucide-react';

const statusIcons = {
  [TaskStatus.PENDING]: Circle,
  [TaskStatus.RUNNING]: Play,
  [TaskStatus.COMPLETED]: CheckCircle,
  [TaskStatus.FAILED]: AlertCircle,
  [TaskStatus.PAUSED]: Pause
};

const statusColors = {
  [TaskStatus.PENDING]: 'bg-gray-500/20 text-gray-300',
  [TaskStatus.RUNNING]: 'bg-blue-500/20 text-blue-300',
  [TaskStatus.COMPLETED]: 'bg-green-500/20 text-green-300',
  [TaskStatus.FAILED]: 'bg-red-500/20 text-red-300',
  [TaskStatus.PAUSED]: 'bg-yellow-500/20 text-yellow-300'
};

export const ProgressTracker: React.FC = () => {
  const { currentTasks, currentProject } = useAppStore();

  const activeTasks = currentTasks.filter(task => 
    task.status === TaskStatus.RUNNING || task.status === TaskStatus.PENDING
  );
  
  const completedTasks = currentTasks.filter(task => 
    task.status === TaskStatus.COMPLETED
  );

  const failedTasks = currentTasks.filter(task => 
    task.status === TaskStatus.FAILED
  );

  const overallProgress = currentTasks.length > 0 
    ? (completedTasks.length / currentTasks.length) * 100 
    : 0;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  if (currentTasks.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">No Active Tasks</h2>
          <p className="text-gray-400 max-w-md">
            Start a conversation in the chat to begin working on tasks. 
            Progress will be tracked here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Progress Tracker</h1>
          <p className="text-gray-400">
            {currentProject ? `Project: ${currentProject.name}` : 'No project selected'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</div>
            <div className="text-sm text-gray-400">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Tasks</p>
                <p className="text-2xl font-bold text-white">{activeTasks.length}</p>
              </div>
              <Play className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-white">{failedTasks.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {currentTasks.length > 0 
                    ? Math.round((completedTasks.length / (completedTasks.length + failedTasks.length || 1)) * 100)
                    : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Project Completion</span>
              <span className="text-white">{Math.round(overallProgress)}%</span>
            </div>
            <Progress 
              value={overallProgress} 
              className="progress-glow"
            />
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tasks */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Active Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {activeTasks.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No active tasks</p>
                ) : (
                  activeTasks.map((task) => {
                    const StatusIcon = statusIcons[task.status];
                    return (
                      <div key={task.id} className="glass-card p-3 border border-white/5">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <StatusIcon className="h-4 w-4 text-blue-400" />
                              <span className="font-medium text-white">{task.name}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                            <div className="space-y-2">
                              <Progress value={task.progress} className="h-2" />
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">{task.progress}% complete</span>
                                {task.estimatedTime && (
                                  <span className="text-gray-400 flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatTime(task.estimatedTime)}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge className={statusColors[task.status]}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Completed Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {completedTasks.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No completed tasks</p>
                ) : (
                  completedTasks.map((task) => (
                    <div key={task.id} className="glass-card p-3 border border-white/5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="font-medium text-white">{task.name}</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                          {task.completedAt && (
                            <div className="text-xs text-gray-500">
                              Completed: {task.completedAt.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <Badge className={statusColors[task.status]}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};