import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface ImpactStatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
}

export function ImpactStatCard({ icon: Icon, value, label, color }: ImpactStatCardProps) {
  return (
    <Card className={`p-6 rounded-2xl border-2 ${color} bg-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-')}/10`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
        </div>
        <div>
          <div className="text-gray-600 text-sm">{label}</div>
        </div>
      </div>
    </Card>
  );
}
