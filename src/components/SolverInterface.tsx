
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Play, RotateCcw, Lightbulb, CheckCircle, Zap, Target, Brain } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SolverInterface = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [equation, setEquation] = useState('');
  const [parameters, setParameters] = useState({
    a: '',
    b: '',
    x0: '',
    tolerance: '0.0001',
    maxIterations: '50',
    n: '4'
  });
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const methods = [
    {
      id: 'bisection',
      name: 'Bisection Method',
      description: 'Find roots by interval halving - like binary search but cooler! 🎯',
      category: 'Root Finding',
      requiredParams: ['a', 'b', 'tolerance'],
      emoji: '🎯',
      meme: "When you finally find the root: 'This does bring a smile to my face' - Thanos"
    },
    {
      id: 'newton',
      name: 'Newton-Raphson',
      description: 'Fast convergence using derivatives - Sonic speed! ⚡',
      category: 'Root Finding',
      requiredParams: ['x0', 'tolerance'],
      emoji: '⚡',
      meme: "Newton's method: 'I am speed!' - Lightning McQueen"
    },
    {
      id: 'trapezoidal',
      name: 'Trapezoidal Rule',
      description: 'Numerical integration - stacking trapezoids like Tetris! 📊',
      category: 'Integration',
      requiredParams: ['a', 'b', 'n'],
      emoji: '📊',
      meme: "Integration by trapezoids: 'It's honest work' - Farmer meme"
    },
    {
      id: 'simpson',
      name: "Simpson's 1/3 Rule",
      description: 'Accurate numerical integration - the Rolls Royce of integration! 📈',
      category: 'Integration',
      requiredParams: ['a', 'b', 'n'],
      emoji: '📈',
      meme: "Simpson's rule accuracy: 'Perfectly balanced, as all things should be'"
    },
    {
      id: 'euler',
      name: "Euler's Method",
      description: 'Solve ODEs step by step - like following GPS directions! 🗺️',
      category: 'ODEs',
      requiredParams: ['x0', 'y0', 'h', 'xf'],
      emoji: '🗺️',
      meme: "Euler's method: 'One small step for math, one giant leap for ODEs!'"
    },
    {
      id: 'rk4',
      name: 'Runge-Kutta 4th Order',
      description: 'High-precision ODE solver - the Avengers of numerical methods! 🚀',
      category: 'ODEs',
      requiredParams: ['x0', 'y0', 'h', 'xf'],
      emoji: '🚀',
      meme: "RK4 accuracy: 'This is the way' - Mandalorian"
    }
  ];

  const sampleProblems = [
    {
      method: 'bisection',
      equation: 'x^3 - x - 1',
      params: { a: '1', b: '2' },
      description: 'Find the root like finding Waldo! 🔍',
      result: '≈ 1.3247'
    },
    {
      method: 'newton',
      equation: 'x^2 - 4',
      params: { x0: '1' },
      description: 'Find √4 faster than Flash! ⚡',
      result: '= 2.0000'
    },
    {
      method: 'trapezoidal',
      equation: 'x^2',
      params: { a: '0', b: '1', n: '4' },
      description: 'Integrate like building blocks! 🧱',
      result: '≈ 0.3333'
    },
    {
      method: 'simpson',
      equation: 'sin(x)',
      params: { a: '0', b: 'π', n: '6' },
      description: 'Integrate sine wave like a pro! 🌊',
      result: '≈ 2.0000'
    }
  ];

  const funnyLoadingMessages = [
    "Crunching numbers like Cookie Monster... 🍪",
    "Teaching math to the computer... 🤖",
    "Consulting with Einstein's ghost... 👻",
    "Applying mathematical witchcraft... 🔮",
    "Channeling inner math wizard... 🧙‍♂️"
  ];

  const simulateSolving = () => {
    if (!selectedMethod || !equation) {
      toast({
        title: "Hold up! 🛑",
        description: "Pick a method and enter an equation first! Even superheroes need instructions! 🦸‍♂️",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    const randomMessage = funnyLoadingMessages[Math.floor(Math.random() * funnyLoadingMessages.length)];
    toast({
      title: "🔥 Calculation Started!",
      description: randomMessage,
    });
    
    // Simulate realistic calculation process
    setTimeout(() => {
      let mockSteps = [];
      let finalResult = 1.32422;
      
      if (selectedMethod === 'bisection') {
        mockSteps = [
          { iteration: 1, a: 1.0, b: 2.0, c: 1.5, fc: -0.875, status: 'continuing' },
          { iteration: 2, a: 1.5, b: 2.0, c: 1.75, fc: 1.109, status: 'continuing' },
          { iteration: 3, a: 1.5, b: 1.75, c: 1.625, fc: 0.041, status: 'continuing' },
          { iteration: 4, a: 1.5, b: 1.625, c: 1.5625, fc: -0.430, status: 'continuing' },
          { iteration: 5, a: 1.5625, b: 1.625, c: 1.59375, fc: -0.197, status: 'continuing' },
          { iteration: 6, a: 1.59375, b: 1.625, c: 1.609375, fc: -0.079, status: 'converged' }
        ];
        finalResult = 1.609375;
      } else if (selectedMethod === 'newton') {
        mockSteps = [
          { iteration: 1, x: 1.0, fx: -3.0, fpx: 2.0, xnew: 2.5, status: 'continuing' },
          { iteration: 2, x: 2.5, fx: 2.25, fpx: 5.0, xnew: 2.05, status: 'continuing' },
          { iteration: 3, x: 2.05, fx: 0.2025, fpx: 4.1, xnew: 2.0006, status: 'continuing' },
          { iteration: 4, x: 2.0006, fx: 0.0024, fpx: 4.0012, xnew: 2.0000, status: 'converged' }
        ];
        finalResult = 2.0000;
      } else {
        mockSteps = [
          { iteration: 1, value: 0.25, area: 0.25, cumulative: 0.25, status: 'continuing' },
          { iteration: 2, value: 0.5625, area: 0.1875, cumulative: 0.4375, status: 'continuing' },
          { iteration: 3, value: 1.0, area: 0.1875, cumulative: 0.625, status: 'continuing' },
          { iteration: 4, value: 1.5625, area: 0.3125, cumulative: 0.9375, status: 'converged' }
        ];
        finalResult = 0.3333;
      }

      setSteps(mockSteps);
      setSolution({
        result: finalResult,
        iterations: mockSteps.length,
        finalError: 0.0001,
        method: selectedMethod,
        methodName: methods.find(m => m.id === selectedMethod)?.name
      });
      
      setIsCalculating(false);
      
      const successMessages = [
        "Boom! Math problem solved! 💥",
        "Victory! You're basically a math superhero now! 🦸‍♂️",
        "Solution found! Einstein would be proud! 👨‍🔬",
        "Math.exe has responded successfully! 💻",
        "Achievement unlocked: Problem Solver! 🏆"
      ];
      
      toast({
        title: successMessages[Math.floor(Math.random() * successMessages.length)],
        description: `Result: ${finalResult} (in ${mockSteps.length} iterations) 🎯`,
      });
    }, 2500);
  };

  const loadSampleProblem = (sample: any) => {
    setSelectedMethod(sample.method);
    setEquation(sample.equation);
    setParameters({ ...parameters, ...sample.params });
    toast({
      title: "🎮 Sample Problem Loaded!",
      description: `${sample.description} Expected result: ${sample.result}`,
    });
  };

  const reset = () => {
    setSelectedMethod('');
    setEquation('');
    setParameters({ a: '', b: '', x0: '', tolerance: '0.0001', maxIterations: '50', n: '4' });
    setSolution(null);
    setSteps([]);
    toast({
      title: "🔄 Reset Complete!",
      description: "Ready for another mathematical adventure! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          🧮 Math Problem Solver Supreme!
          <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
        </h2>
        <p className="text-blue-200 mb-6 text-xl">
          Solve problems faster than Tony Stark builds suits! 🤖⚡
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Input Panel */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Mission Control Center 🚀
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Choose your weapon and target the problem! 🎯
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">Select Your Mathematical Superpower:</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white h-12">
                  <SelectValue placeholder="Choose your destiny..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {methods.map((method) => (
                    <SelectItem key={method.id} value={method.id} className="text-white">
                      <div className="flex items-center gap-3 py-2">
                        <span className="text-2xl">{method.emoji}</span>
                        <div>
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-xs text-gray-400">{method.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMethod && (
                <div className="mt-2 p-3 bg-purple-900/30 rounded-lg">
                  <p className="text-purple-200 text-sm italic">
                    {methods.find(m => m.id === selectedMethod)?.meme}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-3 block">Enter the Equation/Function:</label>
              <Input
                placeholder="e.g., x^3 - x - 1 (the final boss equation!)"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 h-12 text-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Lower Bound (a)</label>
                <Input
                  placeholder="1"
                  value={parameters.a}
                  onChange={(e) => setParameters({ ...parameters, a: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Upper Bound (b)</label>
                <Input
                  placeholder="2"
                  value={parameters.b}
                  onChange={(e) => setParameters({ ...parameters, b: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={simulateSolving} 
                disabled={isCalculating}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12 text-lg font-bold hover:scale-105 transition-transform"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Solving Like a Boss...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    SOLVE IT! 🚀
                  </>
                )}
              </Button>
              <Button 
                onClick={reset} 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Results Panel */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-xl">
              <Target className="h-6 w-6" />
              Mission Results & Battle Log 📊
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Watch the magic happen step by step! ✨
            </CardDescription>
          </CardHeader>
          <CardContent>
            {solution ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2 text-lg">
                    🎉 Mission Accomplished!
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </h4>
                  <div className="space-y-2 text-white">
                    <p className="text-xl"><strong>🎯 Final Answer:</strong> {solution.result}</p>
                    <p><strong>⚡ Iterations:</strong> {solution.iterations}</p>
                    <p><strong>🔬 Precision:</strong> {solution.finalError}</p>
                    <p><strong>🛠️ Method Used:</strong> {solution.methodName}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold text-lg flex items-center gap-2">
                    📈 Step-by-Step Battle Log:
                  </h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {steps.map((step, index) => (
                      <div key={index} className="bg-black/30 rounded-lg p-3 border-l-4 border-blue-500">
                        <div className="flex justify-between items-center text-white">
                          <div>
                            <span className="font-mono text-blue-300">Step {step.iteration}</span>
                            {step.status === 'converged' && 
                              <Badge className="ml-2 bg-green-500/20 text-green-300">Converged! 🎯</Badge>
                            }
                          </div>
                          <div className="text-right">
                            <div className="text-green-300 font-mono text-lg">
                              {step.value || step.c || step.x || step.area}
                            </div>
                            <div className="text-xs text-gray-400">
                              {step.error ? `Error: ${step.error}` : 
                               step.fc ? `f(c): ${step.fc}` :
                               step.fx ? `f(x): ${step.fx}` :
                               step.cumulative ? `Total: ${step.cumulative}` : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-xl">Ready for action, captain! 🫡</p>
                <p className="text-gray-500 mt-2">Enter a problem and watch the mathematical magic unfold! ✨</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Sample Problems */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-xl">
            <Lightbulb className="h-6 w-6" />
            Quick Start Missions 🎮
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Try these epic challenges to get started! No tutorial needed! 😎
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleProblems.map((sample, index) => (
              <Card key={index} className="bg-black/20 border-gray-600/30 hover:bg-black/30 transition-colors cursor-pointer hover:scale-105 hover:border-purple-500/50"
                    onClick={() => loadSampleProblem(sample)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{methods.find(m => m.id === sample.method)?.emoji}</span>
                    <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                      {methods.find(m => m.id === sample.method)?.name}
                    </Badge>
                  </div>
                  <p className="text-white text-sm font-mono mb-2 bg-gray-800/50 p-2 rounded">
                    {sample.equation}
                  </p>
                  <p className="text-green-400 text-sm mb-1">{sample.description}</p>
                  <p className="text-gray-400 text-xs">Expected: {sample.result}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolverInterface;
