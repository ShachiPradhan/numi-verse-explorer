
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, PlayCircle, Star } from 'lucide-react';

interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xpRequired: number;
  completed: boolean;
  icon: string;
  concepts: string[];
  meme?: string;
}

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  onClick: () => void;
}

const LevelCard = ({ level, isUnlocked, onClick }: LevelCardProps) => {
  const difficultyColors = {
    Padawan: 'bg-green-500/20 text-green-300 border-green-500/30',
    Avenger: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Chosen One': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Math Lord': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Math Wizard': 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer group ${
        isUnlocked 
          ? 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 hover:shadow-2xl hover:shadow-purple-500/20' 
          : 'bg-gray-800/50 backdrop-blur-md border-gray-600/30'
      }`}
      onClick={onClick}
    >
      {/* Animated border effect */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <div className="text-gray-400 text-sm">Level Locked</div>
          </div>
        </div>
      )}
      
      <CardHeader className="text-center relative z-20">
        <div className="text-5xl mb-3 animate-bounce">{level.icon}</div>
        <CardTitle className="text-white flex items-center justify-center gap-2 text-xl">
          {level.title}
          {level.completed && <CheckCircle className="h-5 w-5 text-green-400 animate-pulse" />}
        </CardTitle>
        <CardDescription className="text-gray-300 text-lg">
          {level.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 relative z-20">
        <div className="flex justify-center">
          <Badge className={difficultyColors[level.difficulty as keyof typeof difficultyColors] + ' text-sm px-3 py-1'}>
            {level.difficulty}
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-400 font-semibold">What you'll master:</p>
          <div className="flex flex-wrap gap-2">
            {level.concepts.map((concept, index) => (
              <Badge key={index} variant="outline" className="text-xs border-blue-400/30 text-blue-300 hover:bg-blue-400/10">
                {concept}
              </Badge>
            ))}
          </div>
        </div>

        {level.xpRequired > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>Requires {level.xpRequired} XP</span>
          </div>
        )}

        {level.meme && isUnlocked && (
          <div className="bg-black/30 p-3 rounded-lg text-center">
            <p className="text-yellow-300 text-sm italic">{level.meme}</p>
          </div>
        )}

        <Button 
          className={`w-full text-lg py-3 font-bold transition-all duration-300 ${
            isUnlocked 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          disabled={!isUnlocked}
        >
          {level.completed ? (
            <>
              <CheckCircle className="mr-2 h-5 w-5" />
              Replay Epic Level
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Adventure!
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
