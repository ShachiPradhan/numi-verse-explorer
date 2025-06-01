
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Play, RotateCcw, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SolverInterface = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [equation, setEquation] = useState('');
  const [parameters, setParameters] = useState({
    a: '',
    b: '',
    tolerance: '0.0001',
    maxIterations: '50'
  });
  const [solution, setSolution] = useState(null);
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const methods = [
    {
      id: 'bisection',
      name: 'Bisection Method',
      description: 'Find roots by interval halving',
      category: 'Root Finding',
      requiredParams: ['a', 'b', 'tolerance'],
      emoji: '🎯'
    },
    {
      id: 'newton',
      name: 'Newton-Raphson',
      description: 'Fast convergence using derivatives',
      category: 'Root Finding',
      requiredParams: ['x0', 'tolerance'],
      emoji: '⚡'
    },
    {
      id: 'trapezoidal',
      name: 'Trapezoidal Rule',
      description: 'Numerical integration',
      category: 'Integration',
      requiredParams: ['a', 'b', 'n'],
      emoji: '📊'
    },
    {
      id: 'simpson',
      name: "Simpson's 1/3 Rule",
      description: 'Accurate numerical integration',
      category: 'Integration',
      requiredParams: ['a', 'b', 'n'],
      emoji: '📈'
    }
  ];

  const sampleProblems = [
    {
      method: 'bisection',
      equation: 'x^3 - x - 1',
      params: { a: '1', b: '2' },
      description: 'Find the root of x³ - x - 1 = 0'
    },
    {
      method: 'newton',
      equation: 'x^2 - 4',
      params: { x0: '1' },
      description: 'Find √4 using Newton-Raphson'
    },
    {
      method: 'trapezoidal',
      equation: 'x^2',
      params: { a: '0', b: '1', n: '4' },
      description: 'Integrate x² from 0 to 1'
    }
  ];

  const simulateSolving = () => {
    if (!selectedMethod || !equation) {
      toast({
        title: "Missing Information!",
        description: "Please select a method and enter an equation.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation process
    setTimeout(() => {
      const mockSteps = [
        { iteration: 1, value: 1.5, error: 0.5, status: 'continuing' },
        { iteration: 2, value: 1.25, error: 0.25, status: 'continuing' },
        { iteration: 3, value: 1.375, error: 0.125, status: 'continuing' },
        { iteration: 4, value: 1.3125, error: 0.0625, status: 'continuing' },
        { iteration: 5, value: 1.32031, error: 0.00781, status: 'continuing' },
        { iteration: 6, value: 1.32422, error: 0.00391, status: 'converged' }
      ];

      setSteps(mockSteps);
      setSolution({
        result: 1.32422,
        iterations: 6,
        finalError: 0.00391,
        method: selectedMethod
      });
      
      setIsCalculating(false);
      
      toast({
        title: "Solution Found! 🎉",
        description: `Converged in 6 iterations with result ≈ 1.32422`,
      });
    }, 2000);
  };

  const loadSampleProblem = (sample: any) => {
    setSelectedMethod(sample.method);
    setEquation(sample.equation);
    setParameters({ ...parameters, ...sample.params });
    toast({
      title: "Sample Problem Loaded!",
      description: sample.description,
    });
  };

  const reset = () => {
    setSelectedMethod('');
    setEquation('');
    setParameters({ a: '', b: '', tolerance: '0.0001', maxIterations: '50' });
    setSolution(null);
    setSteps([]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">🧮 Step-by-Step Solver</h2>
        <p className="text-blue-200 mb-6">Solve numerical problems with detailed explanations and visualizations!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Problem Setup
            </CardTitle>
            <CardDescription className="text-gray-300">
              Choose a method and enter your problem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Method</label>
              <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a numerical method" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {methods.map((method) => (
                    <SelectItem key={method.id} value={method.id} className="text-white">
                      <div className="flex items-center gap-2">
                        <span>{method.emoji}</span>
                        <div>
                          <div>{method.name}</div>
                          <div className="text-xs text-gray-400">{method.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Equation/Function</label>
              <Input
                placeholder="e.g., x^3 - x - 1"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
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
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Solve!
                  </>
                )}
              </Button>
              <Button onClick={reset} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Solution & Steps
            </CardTitle>
            <CardDescription className="text-gray-300">
              Detailed breakdown of the solution process
            </CardDescription>
          </CardHeader>
          <CardContent>
            {solution ? (
              <div className="space-y-4">
                <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                  <h4 className="text-green-300 font-semibold mb-2">🎉 Solution Found!</h4>
                  <div className="space-y-1 text-white">
                    <p><strong>Result:</strong> {solution.result}</p>
                    <p><strong>Iterations:</strong> {solution.iterations}</p>
                    <p><strong>Final Error:</strong> {solution.finalError}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Iteration Steps:</h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {steps.map((step, index) => (
                      <div key={index} className="bg-black/30 rounded p-3 flex justify-between items-center">
                        <div className="text-white">
                          <span className="font-mono">Iteration {step.iteration}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-300 font-mono">{step.value}</div>
                          <div className="text-xs text-gray-400">Error: {step.error}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Enter a problem and click "Solve!" to see the solution steps</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sample Problems */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Try These Sample Problems
          </CardTitle>
          <CardDescription className="text-gray-300">
            Quick start with pre-configured examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleProblems.map((sample, index) => (
              <Card key={index} className="bg-black/20 border-gray-600/30 hover:bg-black/30 transition-colors cursor-pointer"
                    onClick={() => loadSampleProblem(sample)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                      {methods.find(m => m.id === sample.method)?.name}
                    </Badge>
                  </div>
                  <p className="text-white text-sm font-mono mb-2">{sample.equation}</p>
                  <p className="text-gray-400 text-xs">{sample.description}</p>
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
