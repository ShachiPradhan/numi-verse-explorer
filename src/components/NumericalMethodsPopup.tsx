
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, Zap, Brain, Star } from 'lucide-react';

interface PopupData {
  id: string;
  type: 'tip' | 'fact' | 'meme' | 'quote';
  title: string;
  content: string;
  emoji: string;
  color: string;
}

const numericalMethodsPopups: PopupData[] = [
  {
    id: '1',
    type: 'meme',
    title: 'When Newton's Method Works',
    content: "Newton's Method be like: 'I am inevitable!' *snaps fingers and finds the root instantly* 🫰",
    emoji: '⚡',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: '2',
    type: 'fact',
    title: 'Mind-Blowing Fact!',
    content: "The Runge-Kutta method was developed during WWI but wasn't published until after the war. Talk about classified numerical algorithms! 🕵️‍♂️",
    emoji: '🤯',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: '3',
    type: 'tip',
    title: 'Pro Tip from the Matrix',
    content: "When doing Gaussian elimination, always check for zero pivots. Even Neo can't divide by zero! 🕶️",
    emoji: '💊',
    color: 'from-green-500 to-teal-500'
  },
  {
    id: '4',
    type: 'meme',
    title: 'Bisection Method Reality',
    content: "Bisection Method: 'I'll find that root even if it takes me 1000 iterations!' *Slowly but surely gets there* 🐌",
    emoji: '🎯',
    color: 'from-pink-500 to-red-500'
  },
  {
    id: '5',
    type: 'quote',
    title: 'Ancient Math Wisdom',
    content: "\"With great convergence comes great responsibility.\" - Uncle Ben (if he was a mathematician) 🕷️",
    emoji: '🧙‍♂️',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: '6',
    type: 'fact',
    title: 'Taylor Series Fun Fact',
    content: "Taylor series can approximate sin(x) so well that your calculator uses it! You've been using Taylor series all along! 🤖",
    emoji: '📱',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: '7',
    type: 'meme',
    title: 'When Euler\'s Method Acts Up',
    content: "Euler's Method with large step size: 'I'm about to ruin this function's whole career!' 📈💥",
    emoji: '😅',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '8',
    type: 'tip',
    title: 'Avengers-Level Advice',
    content: "Assemble your numerical methods like the Avengers: Use Newton for speed, Bisection for reliability, and RK4 for precision! 🦸‍♂️",
    emoji: '🛡️',
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: '9',
    type: 'fact',
    title: 'Simpson\'s Rule Secret',
    content: "Simpson's 1/3 rule is so accurate because it uses parabolas instead of straight lines. Curves > Lines! 📊",
    emoji: '🎪',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '10',
    type: 'meme',
    title: 'Matrix Decomposition Mood',
    content: "LU Decomposition: 'I'm gonna break this matrix down like it's a dance battle!' 💃🕺",
    emoji: '🔥',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: '11',
    type: 'tip',
    title: 'Jedi Master Tip',
    content: "Young Padawan, always check convergence criteria. A method without stopping conditions leads to the dark side... of infinite loops! ⚫",
    emoji: '⚔️',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: '12',
    type: 'fact',
    title: 'Historical Easter Egg',
    content: "Gauss eliminated equations so efficiently, they named the method after him. Talk about leaving a mathematical legacy! 👑",
    emoji: '👨‍🎓',
    color: 'from-yellow-500 to-green-500'
  }
];

const NumericalMethodsPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);

  useEffect(() => {
    // Show popup after a short delay when component mounts (page refresh)
    const timer = setTimeout(() => {
      const randomPopup = numericalMethodsPopups[Math.floor(Math.random() * numericalMethodsPopups.length)];
      setCurrentPopup(randomPopup);
      setIsOpen(true);
    }, 1500); // 1.5 second delay for better UX

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip': return <Lightbulb className="w-6 h-6" />;
      case 'fact': return <Brain className="w-6 h-6" />;
      case 'meme': return <Zap className="w-6 h-6" />;
      case 'quote': return <Star className="w-6 h-6" />;
      default: return <Lightbulb className="w-6 h-6" />;
    }
  };

  if (!currentPopup) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentPopup.color} opacity-5 rounded-lg`}></div>
        
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gradient-to-r ${currentPopup.color} text-white`}>
                {getIcon(currentPopup.type)}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  {currentPopup.title}
                  <span className="text-2xl">{currentPopup.emoji}</span>
                </DialogTitle>
                <div className="text-sm text-gray-500 capitalize">{currentPopup.type}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative mt-4">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            {currentPopup.content}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleClose}
            className={`bg-gradient-to-r ${currentPopup.color} text-white font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg`}
          >
            Awesome! Let's Learn! 🚀
          </Button>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">💡 Refresh the page for more numerical wisdom!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NumericalMethodsPopup;
