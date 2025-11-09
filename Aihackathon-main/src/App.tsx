import { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { TasksView } from './components/TasksView';
import { TaskTableView } from './components/TaskTableView';
import { ChallengesView } from './components/ChallengesView';
import { MapView } from './components/MapView';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'taskTable' | 'challenges' | 'map' | 'community'>('dashboard');

  const handleNavigate = (view: string) => {
    setCurrentView(view as any);
  };

  const handleBack = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'dashboard' && <DashboardView onNavigate={handleNavigate} />}
      {currentView === 'tasks' && <TasksView onBack={handleBack} />}
      {currentView === 'taskTable' && <TaskTableView onBack={handleBack} />}
      {currentView === 'challenges' && <ChallengesView onBack={handleBack} />}
      {(currentView === 'map' || currentView === 'community') && <MapView onBack={handleBack} />}
    </div>
  );
}
