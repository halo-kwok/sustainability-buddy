import { useState } from 'react';
import { Bike, Salad, Droplet, Recycle, Lightbulb, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Button } from './ui/button';

interface Task {
  id: string;
  label: string;
  icon: any;
  points: number;
  completed: boolean;
}

interface TasksViewProps {
  onBack: () => void;
}

export function TasksView({ onBack }: TasksViewProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', label: 'Bike/walk to work', icon: Bike, points: 15, completed: true },
    { id: '2', label: 'Meatless meal', icon: Salad, points: 10, completed: true },
    { id: '3', label: 'Short shower (< 5 min)', icon: Droplet, points: 8, completed: true },
    { id: '4', label: 'Recycle packaging', icon: Recycle, points: 5, completed: false },
    { id: '5', label: 'Use natural light', icon: Lightbulb, points: 5, completed: false },
  ]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
  const progressPercent = (completedTasks / tasks.length) * 100;

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-500 to-blue-800 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="rounded-xl"
          >
            ← Back
          </Button>
          <h1 className="text-gray-800">Daily Tasks</h1>
        </div>

        {/* Today's Impact Summary */}
        <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-emerald-800">Today's Impact</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span className="text-emerald-600">{totalPoints} leaves</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={progressPercent} className="h-4 bg-emerald-200" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{completedTasks} of {tasks.length} tasks completed</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Reward Banner */}
        {completedTasks >= 3 && (
          <Card className="p-6 rounded-2xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-sm animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <div className="text-yellow-900">Nice! You saved 2 kg CO₂ today! 🎉</div>
                <div className="text-sm text-yellow-700">Keep up the amazing work!</div>
              </div>
            </div>
          </Card>
        )}

        {/* Task List */}
        <Card className="p-6 rounded-2xl border-2 border-blue-200 bg-white shadow-sm">
          <div className="space-y-4">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-md ${
                    task.completed
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-gray-50 border-gray-200 hover:border-emerald-200'
                  }`}
                  onClick={() => toggleTask(task.id)}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="w-6 h-6 border-2"
                  />
                  
                  <div className={`p-2 rounded-lg ${
                    task.completed ? 'bg-emerald-100' : 'bg-gray-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      task.completed ? 'text-emerald-600' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className={task.completed ? 'text-emerald-900' : 'text-gray-700'}>
                      {task.label}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-lg">🌱</span>
                    <span className={`text-sm ${
                      task.completed ? 'text-emerald-600' : 'text-gray-500'
                    }`}>
                      +{task.points}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Daily Streak */}
        <Card className="p-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-600 text-sm">Daily Streak</div>
              <div className="text-2xl text-purple-600">7 days 🔥</div>
            </div>
            <div className="text-4xl">🏆</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
