import { useState } from 'react';
import { Trophy, Users, Target, Calendar, Award, TrendingUp, Leaf, Droplets, X, Info, Instagram } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'team' | 'personal' | 'community';
  progress: number;
  goal: number;
  unit: string;
  metric: string;
  daysLeft: number;
  participants?: number;
  reward: string;
  icon: any;
  color: string;
  fullDescription?: string;
  rules?: string[];
  startDate?: string;
  endDate?: string;
}

interface ChallengesViewProps {
  onBack: () => void;
}

export function ChallengesView({ onBack }: ChallengesViewProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Team Carbon Crusher',
      description: 'Work with your team to reduce 500 kg of CO₂ this month',
      type: 'team',
      progress: 342,
      goal: 500,
      unit: 'kg',
      metric: 'CO₂ reduced',
      daysLeft: 12,
      participants: 24,
      reward: '500 leaves + Team Badge',
      icon: Users,
      color: 'emerald',
      fullDescription: 'Join forces with your team members to make a significant environmental impact! This challenge encourages collective action to reduce carbon emissions through various sustainable practices. Track your team\'s progress and compete with other teams to see who can make the biggest difference.',
      rules: [
        'Log all carbon-saving activities daily',
        'Activities include: biking, public transit, plant-based meals, energy conservation',
        'Each team member\'s contributions count toward the team total',
        'Minimum 50% team participation required to complete the challenge',
      ],
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
    },
    {
      id: '2',
      title: '30-Day Bike Challenge',
      description: 'Bike to work for 20 out of 30 days',
      type: 'personal',
      progress: 14,
      goal: 20,
      unit: 'days',
      metric: 'Days completed',
      daysLeft: 16,
      reward: '300 leaves + Cyclist Badge',
      icon: Target,
      color: 'blue',
      fullDescription: 'Transform your daily commute into an eco-friendly adventure! This personal challenge pushes you to choose cycling over driving for most of the month. Not only will you reduce your carbon footprint, but you\'ll also improve your fitness and mental well-being.',
      rules: [
        'Bike to work (or main daily destination) at least 20 days',
        'Log each bike trip in the app',
        'Days don\'t need to be consecutive',
        'E-bikes and bike-shares count!',
      ],
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
    },
    {
      id: '3',
      title: 'Water Warrior',
      description: 'Save 1,000 liters of water this week',
      type: 'personal',
      progress: 680,
      goal: 1000,
      unit: 'L',
      metric: 'Water saved',
      daysLeft: 3,
      reward: '200 leaves',
      icon: Droplets,
      color: 'cyan',
      fullDescription: 'Water is our most precious resource! This intensive one-week challenge focuses on water conservation through mindful daily habits. Every drop you save contributes to a more sustainable future.',
      rules: [
        'Take shorter showers (under 5 minutes)',
        'Fix any leaky faucets',
        'Run dishwasher and washing machine only when full',
        'Use water-saving techniques when washing dishes',
      ],
      startDate: 'Nov 7, 2025',
      endDate: 'Nov 13, 2025',
    },
    {
      id: '4',
      title: 'Community Tree Planting',
      description: 'Help plant 100 trees in your local area',
      type: 'community',
      progress: 87,
      goal: 100,
      unit: 'trees',
      metric: 'Trees planted',
      daysLeft: 5,
      participants: 156,
      reward: '1000 leaves + Eco Hero Badge',
      icon: Leaf,
      color: 'green',
      fullDescription: 'Join 156 community members in a grassroots effort to reforest our local parks and neighborhoods! This hands-on challenge brings people together to create lasting environmental change. Each tree planted will absorb CO₂ for decades to come.',
      rules: [
        'Attend organized planting events (3 scheduled this month)',
        'Plant trees in designated community areas',
        'Each participant can plant multiple trees',
        'Proper planting techniques will be taught on-site',
      ],
      startDate: 'Nov 5, 2025',
      endDate: 'Nov 14, 2025',
    },
    {
      id: '5',
      title: 'Zero Waste Week',
      description: 'Produce zero landfill waste for 7 consecutive days',
      type: 'personal',
      progress: 4,
      goal: 7,
      unit: 'days',
      metric: 'Days completed',
      daysLeft: 3,
      reward: '250 leaves',
      icon: Trophy,
      color: 'purple',
      fullDescription: 'Take on the ultimate sustainability challenge! For one full week, eliminate all landfill waste by recycling, composting, and refusing single-use items. This intensive challenge will transform your relationship with consumption.',
      rules: [
        'All 7 days must be consecutive',
        'Recycle and compost everything possible',
        'Avoid single-use plastics and packaging',
        'Document your waste-free strategies in the app',
      ],
      startDate: 'Nov 7, 2025',
      endDate: 'Nov 13, 2025',
    },
    {
      id: '6',
      title: 'Regional Impact League',
      description: 'Compete with other regions to reduce emissions',
      type: 'team',
      progress: 1240,
      goal: 2000,
      unit: 'kg',
      metric: 'CO₂ reduced',
      daysLeft: 21,
      participants: 89,
      reward: '800 leaves + Regional Champion',
      icon: TrendingUp,
      color: 'orange',
      fullDescription: 'Your region is competing against 5 other areas in a friendly competition to reduce carbon emissions! Join 89 local participants in this exciting team effort. The winning region gets special recognition and bonus rewards.',
      rules: [
        'All eco-friendly activities count toward your regional total',
        'Weekly leaderboard updates',
        'Bonus points for team coordination and events',
        'Top 3 regions receive special badges',
      ],
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
    },
    {
      id: '7',
      title: 'Meatless March',
      description: 'Eat plant-based meals for 25 days this month',
      type: 'community',
      progress: 18,
      goal: 25,
      unit: 'days',
      metric: 'Days completed',
      daysLeft: 7,
      participants: 342,
      reward: '400 leaves + Plant Power Badge',
      icon: Award,
      color: 'pink',
      fullDescription: 'Join 342 community members in reducing our collective carbon footprint through diet! Animal agriculture is a major source of emissions, and this challenge helps you discover delicious plant-based alternatives while making a real impact.',
      rules: [
        'Eat at least one completely plant-based meal per day',
        'Days don\'t need to be consecutive',
        'Share your favorite recipes with the community',
        'Track meals in the app daily',
      ],
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
    },
    {
      id: '8',
      title: 'Public Transit Pioneer',
      description: 'Use public transportation for all commutes this month',
      type: 'personal',
      progress: 22,
      goal: 30,
      unit: 'trips',
      metric: 'Trips completed',
      daysLeft: 8,
      reward: '350 leaves',
      icon: Calendar,
      color: 'indigo',
      fullDescription: 'Ditch your car and embrace public transportation! This month-long challenge encourages you to use buses, trains, and other shared transit options for your daily commute. Save money on gas while reducing emissions.',
      rules: [
        'Use public transit for work/school commutes',
        'Can be combined with walking or biking to stations',
        'Carpooling doesn\'t count for this specific challenge',
        'Log each trip in the app',
      ],
      startDate: 'Nov 1, 2025',
      endDate: 'Nov 30, 2025',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; bg: string; text: string; progress: string }> = {
      emerald: { border: 'border-emerald-200', bg: 'bg-emerald-50', text: 'text-emerald-700', progress: 'bg-emerald-500' },
      blue: { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700', progress: 'bg-blue-500' },
      cyan: { border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-700', progress: 'bg-cyan-500' },
      green: { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', progress: 'bg-green-500' },
      purple: { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-700', progress: 'bg-purple-500' },
      orange: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700', progress: 'bg-orange-500' },
      pink: { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-700', progress: 'bg-pink-500' },
      indigo: { border: 'border-indigo-200', bg: 'bg-indigo-50', text: 'text-indigo-700', progress: 'bg-indigo-500' },
    };
    return colorMap[color] || colorMap.emerald;
  };

  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, { label: string; icon: string }> = {
      team: { label: 'Team Challenge', icon: '👥' },
      personal: { label: 'Personal Goal', icon: '🎯' },
      community: { label: 'Community Event', icon: '🌍' },
    };
    return typeMap[type] || typeMap.personal;
  };

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
            <h1 className="text-gray-800">My Challenges</h1>
          </div>
          <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 rounded-xl px-4 py-2">
            {challenges.length} Active Challenges
          </Badge>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl border-2 border-emerald-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100">
                <Trophy className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl text-emerald-600">{challenges.filter(c => (c.progress / c.goal) >= 1).length}</div>
                <div className="text-gray-600 text-sm">Completed</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-blue-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl text-blue-600">{challenges.filter(c => (c.progress / c.goal) < 1).length}</div>
                <div className="text-gray-600 text-sm">In Progress</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-2 border-purple-200 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl text-purple-600">3,450</div>
                <div className="text-gray-600 text-sm">Potential Leaves</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const colors = getColorClasses(challenge.color);
            const typeInfo = getTypeLabel(challenge.type);
            const progressPercent = (challenge.progress / challenge.goal) * 100;
            const isCompleted = progressPercent >= 100;

            return (
              <Card
                key={challenge.id}
                className={`p-6 rounded-2xl border-2 ${colors.border} bg-white shadow-sm hover:shadow-lg transition-all`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <Badge className={`${colors.bg} ${colors.text} border-0 rounded-lg px-3 py-1`}>
                      <span className="mr-1">{typeInfo.icon}</span>
                      {typeInfo.label}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-gray-800 mb-1">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{challenge.metric}</span>
                      <span className={`${colors.text}`}>
                        {challenge.progress} / {challenge.goal} {challenge.unit}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(progressPercent, 100)} 
                      className="h-3 bg-gray-200"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{Math.round(progressPercent)}% complete</span>
                      {isCompleted ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 rounded-lg">
                          ✓ Completed!
                        </Badge>
                      ) : (
                        <span>{challenge.daysLeft} days left</span>
                      )}
                    </div>
                  </div>

                  {/* Participants (if applicable) */}
                  {challenge.participants && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                  )}

                  {/* Reward */}
                  <div className={`p-3 rounded-xl ${colors.bg} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <Award className={`w-5 h-5 ${colors.text}`} />
                      <span className={`text-sm ${colors.text}`}>Reward</span>
                    </div>
                    <span className={`text-sm ${colors.text}`}>{challenge.reward}</span>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`w-full rounded-xl ${
                      isCompleted
                        ? 'bg-green-500 hover:bg-green-600'
                        : `bg-gradient-to-r from-${challenge.color}-500 to-${challenge.color}-600 hover:from-${challenge.color}-600 hover:to-${challenge.color}-700`
                    }`}
                  >
                    {isCompleted ? '🎉 Claim Reward' : 'View Details'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Browse More */}
        <Card className="p-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 shadow-sm text-center">
          <div className="space-y-4">
            <div className="text-4xl">🌟</div>
            <div>
              <h3 className="text-gray-800 mb-2">Looking for more challenges?</h3>
              <p className="text-gray-600 text-sm">Discover new ways to make an impact</p>
            </div>
            <Button className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
              Browse All Challenges
            </Button>
          </div>
        </Card>

        {/* Share Impact Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => {
              alert('Share your impact to Instagram! 🌍');
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <span>Share Impact</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Challenge Details Dialog */}
      <Dialog open={!!selectedChallenge} onOpenChange={(open) => !open && setSelectedChallenge(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
          {selectedChallenge && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-4 rounded-xl ${getColorClasses(selectedChallenge.color).bg}`}>
                    {(() => {
                      const Icon = selectedChallenge.icon;
                      return <Icon className={`w-8 h-8 ${getColorClasses(selectedChallenge.color).text}`} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedChallenge.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedChallenge.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Challenge Type & Participants */}
                <div className="flex flex-wrap gap-3">
                  <Badge className={`${getColorClasses(selectedChallenge.color).bg} ${getColorClasses(selectedChallenge.color).text} border-0 rounded-lg px-4 py-2`}>
                    <span className="mr-2">{getTypeLabel(selectedChallenge.type).icon}</span>
                    {getTypeLabel(selectedChallenge.type).label}
                  </Badge>
                  {selectedChallenge.participants && (
                    <Badge className="bg-purple-100 text-purple-700 border-0 rounded-lg px-4 py-2">
                      <Users className="w-4 h-4 mr-2" />
                      {selectedChallenge.participants} participants
                    </Badge>
                  )}
                  <Badge className="bg-blue-100 text-blue-700 border-0 rounded-lg px-4 py-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedChallenge.daysLeft} days left
                  </Badge>
                </div>

                {/* Progress */}
                <Card className={`p-4 rounded-xl border-2 ${getColorClasses(selectedChallenge.color).border} ${getColorClasses(selectedChallenge.color).bg}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`${getColorClasses(selectedChallenge.color).text}`}>
                        Your Progress
                      </span>
                      <span className={`${getColorClasses(selectedChallenge.color).text}`}>
                        {selectedChallenge.progress} / {selectedChallenge.goal} {selectedChallenge.unit}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((selectedChallenge.progress / selectedChallenge.goal) * 100, 100)}
                      className="h-3 bg-white/50"
                    />
                    <div className="text-sm text-center">
                      <span className={`${getColorClasses(selectedChallenge.color).text}`}>
                        {Math.round((selectedChallenge.progress / selectedChallenge.goal) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Full Description */}
                {selectedChallenge.fullDescription && (
                  <div>
                    <h3 className="text-gray-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      About This Challenge
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedChallenge.fullDescription}
                    </p>
                  </div>
                )}

                {/* Timeline */}
                {selectedChallenge.startDate && selectedChallenge.endDate && (
                  <div>
                    <h3 className="text-gray-800 mb-3">Timeline</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="text-sm text-gray-600 mb-1">Start Date</div>
                        <div className="text-gray-800">{selectedChallenge.startDate}</div>
                      </Card>
                      <Card className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                        <div className="text-sm text-gray-600 mb-1">End Date</div>
                        <div className="text-gray-800">{selectedChallenge.endDate}</div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Rules */}
                {selectedChallenge.rules && selectedChallenge.rules.length > 0 && (
                  <div>
                    <h3 className="text-gray-800 mb-3">Rules & Guidelines</h3>
                    <Card className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
                      <ul className="space-y-2">
                        {selectedChallenge.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className={`${getColorClasses(selectedChallenge.color).text} flex-shrink-0 mt-0.5`}>
                              ✓
                            </span>
                            <span className="text-gray-700 text-sm">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                )}

                {/* Reward */}
                <div>
                  <h3 className="text-gray-800 mb-3">Reward</h3>
                  <Card className={`p-4 rounded-xl border-2 ${getColorClasses(selectedChallenge.color).border} ${getColorClasses(selectedChallenge.color).bg}`}>
                    <div className="flex items-center gap-3">
                      <Award className={`w-6 h-6 ${getColorClasses(selectedChallenge.color).text}`} />
                      <span className={`${getColorClasses(selectedChallenge.color).text}`}>
                        {selectedChallenge.reward}
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setSelectedChallenge(null)}
                    variant="outline"
                    className="flex-1 rounded-xl"
                  >
                    Close
                  </Button>
                  <Button
                    className={`flex-1 rounded-xl bg-gradient-to-r from-${selectedChallenge.color}-500 to-${selectedChallenge.color}-600 hover:from-${selectedChallenge.color}-600 hover:to-${selectedChallenge.color}-700`}
                  >
                    Track Progress
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
