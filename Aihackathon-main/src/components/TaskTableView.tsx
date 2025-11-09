import { useState } from 'react';
import { Bike, Salad, Droplet, Recycle, Lightbulb, TreePine, ShoppingBag, Car, Zap, Trash2, Wind, Droplets } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';

interface Task {
  id: string;
  name: string;
  icon: any;
  category: 'carbon' | 'water';
  carbonSaved?: string;
  waterSaved?: string;
  description: string;
  completed: boolean;
}

interface TaskTableViewProps {
  onBack: () => void;
}

export function TaskTableView({ onBack }: TaskTableViewProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Bike to work',
      icon: Bike,
      category: 'carbon',
      carbonSaved: '2.5 kg',
      waterSaved: '0 L',
      description: 'Choose cycling over driving',
      completed: false,
    },
    {
      id: '2',
      name: 'Meatless meal',
      icon: Salad,
      category: 'carbon',
      carbonSaved: '1.8 kg',
      waterSaved: '120 L',
      description: 'Eat plant-based today',
      completed: false,
    },
    {
      id: '3',
      name: 'Short shower (< 5 min)',
      icon: Droplet,
      category: 'water',
      carbonSaved: '0.3 kg',
      waterSaved: '75 L',
      description: 'Reduce shower time',
      completed: false,
    },
    {
      id: '4',
      name: 'Recycle packaging',
      icon: Recycle,
      category: 'carbon',
      carbonSaved: '0.5 kg',
      waterSaved: '10 L',
      description: 'Sort and recycle waste',
      completed: false,
    },
    {
      id: '5',
      name: 'Use natural light',
      icon: Lightbulb,
      category: 'carbon',
      carbonSaved: '0.4 kg',
      waterSaved: '0 L',
      description: 'Avoid artificial lighting',
      completed: false,
    },
    {
      id: '6',
      name: 'Plant a tree',
      icon: TreePine,
      category: 'carbon',
      carbonSaved: '5.0 kg',
      waterSaved: '15 L',
      description: 'Contribute to reforestation',
      completed: false,
    },
    {
      id: '7',
      name: 'Reusable shopping bag',
      icon: ShoppingBag,
      category: 'carbon',
      carbonSaved: '0.2 kg',
      waterSaved: '8 L',
      description: 'Skip plastic bags',
      completed: false,
    },
    {
      id: '8',
      name: 'Carpool or rideshare',
      icon: Car,
      category: 'carbon',
      carbonSaved: '3.2 kg',
      waterSaved: '5 L',
      description: 'Share rides with others',
      completed: false,
    },
    {
      id: '9',
      name: 'Unplug devices',
      icon: Zap,
      category: 'carbon',
      carbonSaved: '0.6 kg',
      waterSaved: '0 L',
      description: 'Reduce phantom power',
      completed: false,
    },
    {
      id: '10',
      name: 'Compost food waste',
      icon: Trash2,
      category: 'carbon',
      carbonSaved: '0.8 kg',
      waterSaved: '20 L',
      description: 'Turn scraps into nutrients',
      completed: false,
    },
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const totalCarbonSaved = tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + parseFloat(t.carbonSaved || '0'), 0);

  const totalWaterSaved = tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + parseFloat(t.waterSaved || '0'), 0);

  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-500 to-blue-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack} 
              variant="outline" 
              className="rounded-xl"
            >
              ← Back
            </Button>
            <h1 className="text-gray-800">All Available Tasks</h1>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100">
                <Wind className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl text-emerald-600">{totalCarbonSaved.toFixed(1)} kg</div>
                <div className="text-gray-600 text-sm">CO₂ Saved Today</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-blue-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl text-blue-600">{totalWaterSaved.toFixed(0)} L</div>
                <div className="text-gray-600 text-sm">Water Saved Today</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-purple-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <div className="text-2xl text-purple-600">{completedTasks}/{tasks.length}</div>
                <div className="text-gray-600 text-sm">Tasks Completed</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tasks Table */}
        <Card className="rounded-2xl border-2 border-blue-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-emerald-50 to-blue-50 hover:from-emerald-50 hover:to-blue-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Wind className="w-4 h-4 text-emerald-600" />
                      <span>CO₂ Saved</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Water Saved</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <TableRow 
                      key={task.id}
                      className={`transition-colors ${
                        task.completed ? 'bg-emerald-50/50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <TableCell>
                        <div className={`p-2 rounded-lg inline-flex ${
                          task.completed ? 'bg-emerald-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            task.completed ? 'text-emerald-600' : 'text-gray-500'
                          }`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={task.completed ? 'text-emerald-900' : 'text-gray-800'}>
                            {task.name}
                          </span>
                          {task.completed && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 rounded-lg">
                              ✓ Done
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {task.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 rounded-lg px-3 py-1">
                          {task.carbonSaved}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-lg px-3 py-1">
                          {task.waterSaved}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => toggleTask(task.id)}
                          variant={task.completed ? "outline" : "default"}
                          className={`rounded-xl ${
                            task.completed
                              ? 'border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
                          }`}
                        >
                          {task.completed ? 'Undo' : 'Complete'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Impact Message */}
        {completedTasks > 0 && (
          <Card className="p-6 rounded-2xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-sm">
            <div className="text-center space-y-2">
              <div className="text-3xl">🎉</div>
              <h3 className="text-yellow-900">Amazing Impact!</h3>
              <p className="text-yellow-700">
                You've completed {completedTasks} task{completedTasks > 1 ? 's' : ''} and saved{' '}
                <span className="text-emerald-700">{totalCarbonSaved.toFixed(1)} kg CO₂</span> and{' '}
                <span className="text-blue-700">{totalWaterSaved.toFixed(0)} L of water</span> today!
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
