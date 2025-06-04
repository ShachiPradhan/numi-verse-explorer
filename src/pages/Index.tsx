import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calculator, Trophy, Target, Zap, Star, Search, ArrowRight, Sparkles, Gamepad2, Brain, Rocket } from 'lucide-react';
import LevelCard from '@/components/LevelCard';
import FormulaExplorer from '@/components/FormulaExplorer';
import SolverInterface from '@/components/SolverInterface';
import NumericalMethodsPopup from '@/components/NumericalMethodsPopup';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [xp, setXp] = useState(1250);
  const [badges, setBadges] = useState(['bisection-master', 'newton-rookie']);
  const [streak, setStreak] = useState(7);

  const motivationalQuotes = [
    "You're doing great! Even Newton had to start somewhere! 🍎",
    "Math is like a good meme - it gets better when you understand it! 😄",
    "Level up like you're in a video game, but with calculus! 🎮",
    "Error 404: Math anxiety not found! You got this! 💪",
    "Plot twist: You're actually good at this! 📈"
  ];

  const levels = [
    {
      id: 1,
      title: "Bisection Bootcamp",
      description: "Start your journey like a Jedi Padawan! 🌟",
      difficulty: "Padawan",
      xpRequired: 0,
      completed: true,
      icon: "🎯",
      concepts: ["Bisection Method", "Convergence", "Error Analysis"],
      meme: "When you finally find the root: 'It's free real estate!' 🏠"
    },
    {
      id: 2,
      title: "Newton's Playground",
      description: "Channel your inner Tony Stark! ⚡",
      difficulty: "Avenger",
      xpRequired: 500,
      completed: true,
      icon: "🚀",
      concepts: ["Newton-Raphson", "Secant Method", "Derivative Power"],
      meme: "Newton's method be like: 'I am speed!' ⚡"
    },
    {
      id: 3,
      title: "Matrix Mayhem",
      description: "Welcome to the Matrix, Neo! 🕶️",
      difficulty: "Chosen One",
      xpRequired: 1000,
      completed: false,
      icon: "🔮",
      concepts: ["Gaussian Elimination", "LU Decomposition", "Matrix Magic"],
      meme: "There is no spoon... only linear algebra! 🥄"
    },
    {
      id: 4,
      title: "Integration Station",
      description: "Integrate like a Boss! 📈",
      difficulty: "Math Lord",
      xpRequired: 1500,
      completed: false,
      icon: "👑",
      concepts: ["Trapezoidal Rule", "Simpson's Rule", "Gaussian Quadrature"],
      meme: "Integration by parts? More like integration by heart! ❤️"
    },
    {
      id: 5,
      title: "ODE Odyssey",
      description: "Space Odyssey but with differential equations! 🌌",
      difficulty: "Math Wizard",
      xpRequired: 2000,
      completed: false,
      icon: "🧙‍♂️",
      concepts: ["Euler's Method", "Runge-Kutta", "Taylor Series"],
      meme: "ODEs: Ordinary? More like EXTRAordinary! ✨"
    }
  ];

  const handleLevelSelect = (level: any) => {
    if (level.xpRequired <= xp) {
      setCurrentLevel(level.id);
      toast({
        title: `🎮 Level ${level.id} Activated!`,
        description: level.meme,
      });
    } else {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      toast({
        title: "🔒 Level Locked!",
        description: `You need ${level.xpRequired - xp} more XP! ${randomQuote}`,
        variant: "destructive",
      });
    }
  };

  const handleDailyChallenge = () => {
    const challenges = [
      "Find the root of x³ - 2x - 5 = 0 faster than The Flash! ⚡",
      "Integrate sin(x) from 0 to π like you're collecting Infinity Stones! 💎",
      "Solve this matrix like you're cracking the Da Vinci Code! 🔍"
    ];
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    toast({
      title: "🔥 Daily Challenge Accepted!",
      description: randomChallenge,
    });
  };

  const getPlayerTitle = () => {
    if (xp >= 2000) return "Math Wizard 🧙‍♂️";
    if (xp >= 1500) return "Math Lord 👑";
    if (xp >= 1000) return "Chosen One 🕶️";
    if (xp >= 500) return "Avenger ⚡";
    return "Padawan 🌟";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Add the popup component */}
      <NumericalMethodsPopup />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        <div className="relative px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-4 mb-4">
                <h1 className="text-6xl font-bold text-white animate-fade-in">
                  NumeriCraft
                </h1>
                <div className="text-4xl animate-bounce">🧙‍♂️</div>
              </div>
              <p className="text-2xl text-blue-200 max-w-3xl mx-auto mb-4">
                Where Math Meets Marvel! Transform into a numerical ninja! 🥷
              </p>
              <div className="flex justify-center gap-4 text-lg">
                <span className="text-green-300">✓ More fun than TikTok</span>
                <span className="text-yellow-300">✓ Cooler than Netflix</span>
                <span className="text-pink-300">✓ Smarter than ChatGPT</span>
              </div>
            </div>

            {/* Enhanced Player Stats */}
            <div className="flex justify-center mb-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:scale-105 transition-transform">
                <CardContent className="flex items-center gap-8 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                      🏆
                    </div>
                    <div>
                      <div className="font-bold text-lg">{getPlayerTitle()}</div>
                      <div className="text-sm text-gray-300">Level {Math.floor(xp / 500) + 1}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="font-semibold text-lg">{xp} XP</div>
                      <div className="text-xs text-gray-300">Power Level</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-purple-400" />
                    <div>
                      <div className="font-semibold text-lg">{badges.length} Badges</div>
                      <div className="text-xs text-gray-300">Achievements</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="font-semibold text-lg">{streak} Days</div>
                      <div className="text-xs text-gray-300">Streak 🔥</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 pb-12">
        <Tabs defaultValue="levels" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border-white/20 h-14">
            <TabsTrigger value="levels" className="text-white data-[state=active]:bg-white/20 flex items-center gap-2 text-lg">
              <Gamepad2 className="w-5 h-5" />
              Epic Levels
            </TabsTrigger>
            <TabsTrigger value="explorer" className="text-white data-[state=active]:bg-white/20 flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5" />
              Formula Lab
            </TabsTrigger>
            <TabsTrigger value="solver" className="text-white data-[state=active]:bg-white/20 flex items-center gap-2 text-lg">
              <Rocket className="w-5 h-5" />
              Math Solver
            </TabsTrigger>
          </TabsList>

          <TabsContent value="levels" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                Choose Your Mathematical Adventure! 
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </h2>
              <div className="max-w-2xl mx-auto">
                <Progress value={(xp / 2000) * 100} className="h-4 mb-4" />
                <p className="text-blue-200 text-xl">
                  Progress to Math Wizard: {Math.round((xp / 2000) * 100)}% 
                  {xp >= 1500 && " - You're almost there, young grasshopper! 🥋"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <LevelCard
                  key={level.id}
                  level={level}
                  isUnlocked={level.xpRequired <= xp}
                  onClick={() => handleLevelSelect(level)}
                />
              ))}
            </div>

            {/* Motivational Section */}
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md border-green-300/30 mt-8">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  🎯 Today's Motivation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-200 text-xl text-center">
                  {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explorer">
            <FormulaExplorer />
          </TabsContent>

          <TabsContent value="solver">
            <SolverInterface />
          </TabsContent>
        </Tabs>

        {/* Enhanced Daily Challenge Banner */}
        <Card className="mt-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border-orange-300/30 hover:scale-105 transition-transform">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  🔥 Daily Challenge: "Mission Impossible - Math Edition"
                </CardTitle>
                <CardDescription className="text-orange-200 text-lg">
                  Solve today's problem faster than Tom Cruise runs! Get bonus XP + bragging rights! 🏃‍♂️💨
                </CardDescription>
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 text-lg hover:scale-110 transition-transform"
                onClick={handleDailyChallenge}
              >
                Accept Mission!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Fun Stats Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🤯</div>
              <div className="text-white font-bold">Mind = Blown</div>
              <div className="text-gray-300 text-sm">42,069 times</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">☕</div>
              <div className="text-white font-bold">Coffee Consumed</div>
              <div className="text-gray-300 text-sm">∞ cups (literally infinite)</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-white font-bold">IQ Points Gained</div>
              <div className="text-gray-300 text-sm">Over 9000!</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
