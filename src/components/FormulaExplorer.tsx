
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, BookOpen, Eye, Heart, TrendingUp } from 'lucide-react';

const FormulaExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormula, setSelectedFormula] = useState(null);

  const formulas = [
    {
      id: 1,
      name: "Bisection Method",
      category: "Root Finding",
      difficulty: "Beginner",
      formula: "f(a)·f(b) < 0, c = (a+b)/2",
      description: "Find roots by repeatedly bisecting intervals",
      analogy: "Like playing hot/cold - keep narrowing down where the treasure is hidden! 🏴‍☠️",
      visualization: "Zooming in on a graph until you find where it crosses zero",
      steps: [
        "Check that f(a) and f(b) have opposite signs",
        "Calculate midpoint c = (a + b) / 2",
        "If f(c) = 0, you found the root!",
        "If f(c) has same sign as f(a), set a = c",
        "Otherwise, set b = c",
        "Repeat until convergence"
      ],
      funFact: "Named after cutting things in half - because mathematicians love being precise! ✂️"
    },
    {
      id: 2,
      name: "Newton-Raphson Method",
      category: "Root Finding",
      difficulty: "Intermediate",
      formula: "x₁ = x₀ - f(x₀)/f'(x₀)",
      description: "Fast convergence using derivatives",
      analogy: "Like a GPS recalculating the fastest route to your destination! 🗺️",
      visualization: "Drawing tangent lines that point toward the root",
      steps: [
        "Start with an initial guess x₀",
        "Calculate f(x₀) and f'(x₀)",
        "Update: x₁ = x₀ - f(x₀)/f'(x₀)",
        "Repeat with x₁ as new guess",
        "Continue until |x₁ - x₀| < tolerance"
      ],
      funFact: "Sir Isaac Newton would be amazed that his method helps us find Netflix passwords! 📺"
    },
    {
      id: 3,
      name: "Trapezoidal Rule",
      category: "Integration",
      difficulty: "Beginner",
      formula: "∫f(x)dx ≈ (h/2)[f(a) + 2∑f(xᵢ) + f(b)]",
      description: "Approximate integration using trapezoids",
      analogy: "Like measuring the area under a roller coaster by stacking trapezoid-shaped blocks! 🎢",
      visualization: "Cutting the area under a curve into trapezoid slices",
      steps: [
        "Divide interval [a,b] into n equal parts",
        "Calculate h = (b-a)/n",
        "Evaluate f(x) at each point",
        "Apply trapezoidal formula",
        "Sum all trapezoid areas"
      ],
      funFact: "Ancient Greeks used this to calculate the area of irregular fields! 🏛️"
    },
    {
      id: 4,
      name: "Simpson's 1/3 Rule",
      category: "Integration",
      difficulty: "Intermediate",
      formula: "∫f(x)dx ≈ (h/3)[f(a) + 4∑f(odd) + 2∑f(even) + f(b)]",
      description: "More accurate integration using parabolic approximation",
      analogy: "Like the trapezoidal rule's smarter cousin who went to engineering school! 🎓",
      visualization: "Fitting smooth parabolas through points instead of straight lines",
      steps: [
        "Ensure n is even (Simpson's rule requirement)",
        "Calculate h = (b-a)/n",
        "Apply 1-4-2-4-2...-4-1 pattern",
        "Multiply by h/3",
        "This gives you a more accurate result!"
      ],
      funFact: "Named after Thomas Simpson, who definitely knew how to party with parabolas! 🎉"
    }
  ];

  const filteredFormulas = formulas.filter(formula =>
    formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formula.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formula.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-300 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Advanced: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">🔍 Formula Explorer</h2>
        <p className="text-blue-200 mb-6">Discover, visualize, and master numerical methods with fun analogies!</p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search formulas (e.g., 'bisection', 'integration')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map((formula) => (
          <Card key={formula.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{formula.name}</CardTitle>
                  <CardDescription className="text-gray-300 mt-1">
                    {formula.description}
                  </CardDescription>
                </div>
                <Badge className={difficultyColors[formula.difficulty as keyof typeof difficultyColors]}>
                  {formula.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-black/30 p-3 rounded-lg font-mono text-blue-300 text-sm overflow-x-auto">
                {formula.formula}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <BookOpen className="h-4 w-4" />
                <span>{formula.category}</span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Eye className="mr-2 h-4 w-4" />
                    Explore Formula
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {formula.name}
                      <Badge className={difficultyColors[formula.difficulty as keyof typeof difficultyColors]}>
                        {formula.difficulty}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                      {formula.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-blue-300 mb-2">📚 Real-World Analogy</h4>
                      <p className="text-gray-300 bg-blue-900/20 p-3 rounded-lg">
                        {formula.analogy}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-300 mb-2">👁️ Visualization</h4>
                      <p className="text-gray-300 bg-green-900/20 p-3 rounded-lg">
                        {formula.visualization}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-300 mb-2">📋 Step-by-Step Process</h4>
                      <ol className="space-y-2 bg-purple-900/20 p-3 rounded-lg">
                        {formula.steps.map((step, index) => (
                          <li key={index} className="text-gray-300 flex gap-2">
                            <span className="text-purple-400 font-semibold">{index + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-300 mb-2">🎉 Fun Fact</h4>
                      <p className="text-gray-300 bg-yellow-900/20 p-3 rounded-lg">
                        {formula.funFact}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Try Interactive Demo
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <Heart className="mr-2 h-4 w-4" />
                        Add to Favorites
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-400">No formulas found matching "{searchQuery}"</p>
          <p className="text-gray-500 mt-2">Try searching for "bisection", "newton", or "integration"</p>
        </div>
      )}
    </div>
  );
};

export default FormulaExplorer;
