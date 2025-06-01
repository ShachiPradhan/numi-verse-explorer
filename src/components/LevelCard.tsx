
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';

interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  xpRequired: number;
  completed: boolean;
  icon: string;
  concepts: string[];
}

interface LevelCardProps {
  level: Level;
  isUnlocked: boolean;
  onClick: () => void;
}

const LevelCard = ({ level, isUnlocked, onClick }: LevelCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Advanced: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Expert: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
        isUnlocked 
          ? 'bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15' 
          : 'bg-gray-800/50 backdrop-blur-md border-gray-600/30'
      }`}
      onClick={onClick}
    >
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-gray-400" />
        </div>
      )}
      
      <CardHeader className="text-center">
        <div className="text-4xl mb-2">{level.icon}</div>
        <CardTitle className="text-white flex items-center justify-center gap-2">
          {level.title}
          {level.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {level.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Badge className={difficultyColors[level.difficulty as keyof typeof difficultyColors]}>
          {level.difficulty}
        </Badge>

        <div className="space-y-2">
          <p className="text-sm text-gray-400">Concepts:</p>
          <div className="flex flex-wrap gap-1">
            {level.concepts.map((concept, index) => (
              <Badge key={index} variant="outline" className="text-xs border-blue-400/30 text-blue-300">
                {concept}
              </Badge>
            ))}
          </div>
        </div>

        {level.xpRequired > 0 && (
          <p className="text-xs text-gray-400">
            Requires {level.xpRequired} XP
          </p>
        )}

        <Button 
          className={`w-full ${
            isUnlocked 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
          disabled={!isUnlocked}
        >
          {level.completed ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Replay
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Level
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
