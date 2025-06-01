
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Calculator, Trophy, Target, Zap, Star, Search, ArrowRight } from 'lucide-react';
import LevelCard from '@/components/LevelCard';
import FormulaExplorer from '@/components/FormulaExplorer';
import SolverInterface from '@/components/SolverInterface';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(1250);
  const [badges, setBadges] = useState(['bisection-master', 'newton-rookie']);

  const levels = [
    {
      id: 1,
      title: "Root Finding Basics",
      description: "Master the Bisection Method",
      difficulty: "Beginner",
      xpRequired: 0,
      completed: true,
      icon: "🎯",
      concepts: ["Bisection Method", "Convergence", "Error Analysis"]
    },
    {
      id: 2,
      title: "Newton's Arsenal",
      description: "Newton-Raphson & Secant Methods",
      difficulty: "Intermediate",
      xpRequired: 500,
      completed: true,
      icon: "⚡",
      concepts: ["Newton-Raphson", "Secant Method", "Derivative Approximation"]
    },
    {
      id: 3,
      title: "Matrix Mayhem",
      description: "Linear Systems & LU Decomposition",
      difficulty: "Advanced",
      xpRequired: 1000,
      completed: false,
      icon: "🧮",
      concepts: ["Gaussian Elimination", "LU Decomposition", "Pivoting"]
    },
    {
      id: 4,
      title: "Integration Station",
      description: "Numerical Integration Techniques",
      difficulty: "Expert",
      xpRequired: 1500,
      completed: false,
      icon: "📈",
      concepts: ["Trapezoidal Rule", "Simpson's Rule", "Gaussian Quadrature"]
    }
  ];

  const handleLevelSelect = (level: any) => {
    if (level.xpRequired <= xp) {
      setCurrentLevel(level.id);
      toast({
        title: `Level ${level.id} Selected!`,
        description: `Ready to tackle ${level.title}? Let's go! 🚀`,
      });
    } else {
      toast({
        title: "Level Locked!",
        description: `You need ${level.xpRequired - xp} more XP to unlock this level.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
                NumeriCraft 🧙‍♂️
              </h1>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Master numerical methods through gamified learning, AR visualization, and interactive problem solving!
              </p>
            </div>

            {/* Player Stats */}
            <div className="flex justify-center mb-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardContent className="flex items-center gap-6 p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">Level {Math.floor(xp / 500) + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span>{xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-400" />
                    <span>{badges.length} Badges</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Tabs defaultValue="levels" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border-white/20">
            <TabsTrigger value="levels" className="text-white data-[state=active]:bg-white/20">
              🎮 Levels
            </TabsTrigger>
            <TabsTrigger value="explorer" className="text-white data-[state=active]:bg-white/20">
              🔍 Formula Explorer
            </TabsTrigger>
            <TabsTrigger value="solver" className="text-white data-[state=active]:bg-white/20">
              🧮 Solver
            </TabsTrigger>
          </TabsList>

          <TabsContent value="levels" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Adventure</h2>
              <Progress value={(xp / 2000) * 100} className="max-w-md mx-auto" />
              <p className="text-blue-200 mt-2">Progress to Master Level: {Math.round((xp / 2000) * 100)}%</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {levels.map((level) => (
                <LevelCard
                  key={level.id}
                  level={level}
                  isUnlocked={level.xpRequired <= xp}
                  onClick={() => handleLevelSelect(level)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="explorer">
            <FormulaExplorer />
          </TabsContent>

          <TabsContent value="solver">
            <SolverInterface />
          </TabsContent>
        </Tabs>

        {/* Daily Challenge Banner */}
        <Card className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border-orange-300/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  🔥 Daily Challenge
                </CardTitle>
                <CardDescription className="text-orange-200">
                  Solve today's problem for bonus XP!
                </CardDescription>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Start Challenge
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Index;
