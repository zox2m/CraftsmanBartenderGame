import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameMode, Recipe, Technique, GlassType, Ingredient, ItemType, TaskState } from '../types';
import { RECIPES } from '../data/recipes';
import { ITEMS } from '../data/items';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Timer, 
  Info,
  Trash2,
  Wine,
  ChevronRight,
  Snowflake,
  Droplets,
  Beaker
} from 'lucide-react';

interface GameSceneProps {
  mode: GameMode;
  onExit: () => void;
}

export default function GameScene({ mode, onExit }: GameSceneProps) {
  // Initialize 3 random tasks
  const [tasks, setTasks] = useState<TaskState[]>(() => {
    const shuffled = [...RECIPES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(recipe => ({
      recipe,
      isCompleted: false,
      score: null,
      selectedGlass: null,
      isChilled: false,
      mixedIngredients: [],
      currentTechnique: null,
      selectedGarnish: null,
    }));
  });

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const currentTask = tasks[currentTaskIndex];

  const [selectedJiggerAmount, setSelectedJiggerAmount] = useState<number>(1.5);
  const [showRecipe, setShowRecipe] = useState(mode === 'PRACTICE');
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateCurrentTask = (updates: Partial<TaskState>) => {
    setTasks(prev => prev.map((t, i) => i === currentTaskIndex ? { ...t, ...updates } : t));
  };

  const handleAddItem = (itemId: string) => {
    if (!currentTask.selectedGlass) return;
    
    const item = ITEMS.find(i => i.id === itemId);
    if (!item) return;

    // Floating logic check
    if (currentTask.currentTechnique === Technique.FLOAT && currentTask.mixedIngredients.length > 0) {
      const lastIng = currentTask.mixedIngredients[currentTask.mixedIngredients.length - 1];
      const lastItem = ITEMS.find(i => i.id === lastIng.itemId);
      if (lastItem && item.density && lastItem.density && item.density > lastItem.density) {
        // Visual feedback for "sinking" or "mixing" could be added here
        console.log("Density warning: heavier liquid on top!");
      }
    }

    const newIng: Ingredient = { 
      itemId, 
      amount: selectedJiggerAmount, 
      unit: 'oz' 
    };
    updateCurrentTask({ mixedIngredients: [...currentTask.mixedIngredients, newIng] });
  };

  const handleChilling = () => {
    if (!currentTask.selectedGlass) return;
    updateCurrentTask({ isChilled: true });
  };

  const handleServe = () => {
    let calculatedScore = 100;

    // 1. Check Glass (10pts)
    if (currentTask.selectedGlass !== currentTask.recipe.glass) calculatedScore -= 10;

    // 2. Check Technique (20pts)
    if (currentTask.currentTechnique !== currentTask.recipe.technique) calculatedScore -= 20;

    // 3. Check Ingredients & Volume (50pts)
    const recipeItemIds = currentTask.recipe.ingredients.map(i => i.itemId).sort();
    const mixedItemIds = currentTask.mixedIngredients.map(i => i.itemId).sort();
    
    // Check if all required ingredients are present
    const missingItems = recipeItemIds.filter(id => !mixedItemIds.includes(id));
    const extraItems = mixedItemIds.filter(id => !recipeItemIds.includes(id));
    
    calculatedScore -= (missingItems.length * 10);
    calculatedScore -= (extraItems.length * 5);

    // 4. Check Garnish (10pts)
    if (currentTask.recipe.garnish && currentTask.selectedGarnish !== currentTask.recipe.garnish) {
      calculatedScore -= 10;
    }

    // 5. Chilling (10pts)
    if (currentTask.recipe.chillingRequired && !currentTask.isChilled) {
      calculatedScore -= 10;
    }

    const finalScore = Math.max(0, calculatedScore);
    updateCurrentTask({ score: finalScore, isCompleted: true });

    if (currentTaskIndex < 2) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const totalScore = tasks.reduce((acc, t) => acc + (t.score || 0), 0) / 3;

  return (
    <div className="h-screen flex flex-col bg-stone-950 text-stone-100">
      {/* Header */}
      <header className="h-20 border-b border-stone-800 flex items-center justify-between px-8 bg-stone-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-6">
          <button onClick={onExit} className="p-2 hover:bg-stone-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex gap-4">
            {tasks.map((task, idx) => (
              <div 
                key={idx}
                onClick={() => !isGameOver && setCurrentTaskIndex(idx)}
                className={`cursor-pointer px-4 py-2 rounded-xl border transition-all ${
                  currentTaskIndex === idx 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : task.isCompleted 
                      ? 'bg-stone-800 border-stone-700 text-stone-500' 
                      : 'bg-stone-900 border-stone-800 text-stone-600 hover:border-stone-700'
                }`}
              >
                <div className="text-[10px] uppercase font-mono tracking-tighter">Task {idx + 1}</div>
                <div className="text-sm font-bold truncate max-w-[120px]">{task.recipe.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 font-mono text-2xl">
            <Timer size={24} className={timeLeft < 60 ? 'text-rose-500' : 'text-stone-400'} />
            <span className={timeLeft < 60 ? 'text-rose-500 animate-pulse' : 'text-stone-200'}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowRecipe(!showRecipe)}
              className={`p-3 rounded-xl transition-all ${showRecipe ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
            >
              <Info size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left: Shelf */}
        <div className="w-96 border-r border-stone-800 flex flex-col bg-stone-900/40">
          <div className="flex border-b border-stone-800">
            <button className="flex-1 p-4 text-[10px] uppercase font-bold tracking-widest text-emerald-400 border-b-2 border-emerald-500">Inventory</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Jigger Selection */}
            <div className="bg-stone-800/50 p-4 rounded-2xl border border-stone-700/50">
              <h4 className="text-[10px] uppercase text-stone-500 mb-4 font-mono flex items-center gap-2">
                <Beaker size={12} /> Jigger Measurement (oz)
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {[0.5, 0.75, 1, 1.5].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setSelectedJiggerAmount(amt)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all ${selectedJiggerAmount === amt ? 'bg-emerald-500 text-white' : 'bg-stone-900 text-stone-400 hover:bg-stone-800'}`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Spirits */}
            <div>
              <h4 className="text-[10px] uppercase text-stone-600 mb-4 font-mono tracking-widest">Spirits</h4>
              <div className="grid grid-cols-2 gap-2">
                {ITEMS.filter(i => i.type === ItemType.SPIRIT).map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItem(item.id)}
                    className="group relative p-3 text-xs bg-stone-800/40 border border-stone-700/50 rounded-xl hover:border-emerald-500/50 transition-all text-left overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50" style={{ backgroundColor: item.color }} />
                    <span className="relative z-10">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Liqueurs */}
            <div>
              <h4 className="text-[10px] uppercase text-stone-600 mb-4 font-mono tracking-widest">Liqueurs</h4>
              <div className="grid grid-cols-2 gap-2">
                {ITEMS.filter(i => i.type === ItemType.LIQUEUR).map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleAddItem(item.id)}
                    className="group relative p-3 text-xs bg-stone-800/40 border border-stone-700/50 rounded-xl hover:border-emerald-500/50 transition-all text-left overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 opacity-50" style={{ backgroundColor: item.color }} />
                    <span className="relative z-10">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Garnishes */}
            <div>
              <h4 className="text-[10px] uppercase text-stone-600 mb-4 font-mono tracking-widest">Garnishes</h4>
              <div className="grid grid-cols-2 gap-2">
                {ITEMS.filter(i => i.type === ItemType.GARNISH).map(item => (
                  <button
                    key={item.id}
                    onClick={() => updateCurrentTask({ selectedGarnish: item.name })}
                    className={`p-3 text-xs border rounded-xl transition-all text-left ${currentTask.selectedGarnish === item.name ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-stone-800/40 border-stone-700/50 text-stone-300'}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Workstation */}
        <div className="flex-1 relative flex flex-col bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 to-stone-950">
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="w-full max-w-3xl aspect-[16/10] bg-stone-900/50 border border-stone-800 rounded-[3rem] relative overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Bar Surface */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-stone-800/30 border-t border-stone-700/50" />
              
              {/* Central Glass Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentTask.selectedGlass ? (
                    <motion.div
                      key={currentTask.selectedGlass}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className={`relative w-40 h-60 border-2 transition-all duration-700 ${currentTask.isChilled ? 'border-blue-400/50 shadow-[0_0_30px_rgba(96,165,250,0.2)]' : 'border-stone-600'} rounded-b-2xl flex flex-col justify-end overflow-hidden`}>
                        {/* Liquid Layers */}
                        <div className="absolute inset-0 flex flex-col-reverse">
                          {currentTask.mixedIngredients.map((ing, idx) => {
                            const item = ITEMS.find(i => i.id === ing.itemId);
                            return (
                              <motion.div 
                                key={idx}
                                initial={{ height: 0 }}
                                animate={{ height: '15%' }}
                                className="w-full"
                                style={{ backgroundColor: item?.color || '#fff', opacity: 0.8 }}
                              />
                            );
                          })}
                        </div>
                        {currentTask.isChilled && (
                          <div className="absolute inset-0 bg-blue-400/10 backdrop-blur-[1px] pointer-events-none" />
                        )}
                      </div>
                      <div className="mt-6 flex flex-col items-center gap-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black">{currentTask.selectedGlass}</span>
                        {currentTask.isChilled && <span className="text-[8px] uppercase text-blue-400 font-bold flex items-center gap-1"><Snowflake size={8} /> Chilled</span>}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-8 text-stone-700">
                      <div className="grid grid-cols-4 gap-4">
                        {Object.values(GlassType).slice(0, 8).map(glass => (
                          <button
                            key={glass}
                            onClick={() => updateCurrentTask({ selectedGlass: glass })}
                            className="w-20 h-20 bg-stone-800/50 border border-stone-700 rounded-2xl flex items-center justify-center hover:border-emerald-500/50 hover:bg-stone-800 transition-all group"
                          >
                            <Wine size={32} className="group-hover:text-emerald-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                      <p className="text-xs font-mono uppercase tracking-[0.3em] animate-pulse">Select Appropriate Glassware</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technique Controls */}
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <h5 className="text-[10px] uppercase text-stone-600 font-mono text-right mb-2">Technique</h5>
                {Object.values(Technique).map(tech => (
                  <button
                    key={tech}
                    onClick={() => updateCurrentTask({ currentTechnique: tech })}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentTask.currentTechnique === tech ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-stone-800/80 text-stone-500 hover:bg-stone-700'}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>

              {/* Utility Controls */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <button
                  onClick={handleChilling}
                  disabled={!currentTask.selectedGlass || currentTask.isChilled}
                  className={`p-4 rounded-2xl transition-all flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest ${currentTask.isChilled ? 'bg-blue-500 text-white' : 'bg-stone-800 text-stone-500 hover:bg-stone-700 disabled:opacity-30'}`}
                >
                  <Snowflake size={18} />
                  Chilling
                </button>
                <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/50 min-w-[160px]">
                  <h5 className="text-[10px] uppercase text-stone-600 font-mono mb-3">Current Mix</h5>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                    {currentTask.mixedIngredients.map((ing, idx) => (
                      <div key={idx} className="text-[9px] flex justify-between text-stone-400 border-b border-stone-700/50 pb-1">
                        <span>{ITEMS.find(i => i.id === ing.itemId)?.name}</span>
                        <span className="text-emerald-400">{ing.amount}oz</span>
                      </div>
                    ))}
                    {currentTask.mixedIngredients.length === 0 && <p className="text-[9px] text-stone-600 italic">Empty</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="h-28 border-t border-stone-800 bg-stone-900/80 backdrop-blur-md flex items-center justify-center gap-6 px-12">
            <button
              onClick={() => updateCurrentTask({ mixedIngredients: [], currentTechnique: null, selectedGarnish: null, isChilled: false })}
              className="flex items-center gap-3 px-8 py-4 bg-stone-800 text-stone-400 rounded-2xl hover:bg-rose-500/10 hover:text-rose-400 transition-all uppercase text-[10px] font-black tracking-widest border border-stone-700"
            >
              <Trash2 size={18} />
              Reset Task
            </button>
            <button
              onClick={handleServe}
              disabled={!currentTask.selectedGlass || currentTask.mixedIngredients.length === 0}
              className="flex-1 max-w-md flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all uppercase text-[10px] font-black tracking-widest disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-emerald-900/20"
            >
              <CheckCircle2 size={18} />
              Submit {currentTask.recipe.name}
            </button>
          </div>
        </div>

        {/* Right: Recipe Reference */}
        <AnimatePresence>
          {showRecipe && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-96 border-l border-stone-800 bg-stone-900/90 backdrop-blur-2xl p-8 overflow-y-auto z-30"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Recipe Reference</h3>
                <button onClick={() => setShowRecipe(false)} className="text-stone-500 hover:text-stone-300">
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-stone-800/30 p-6 rounded-3xl border border-stone-700/50">
                  <h4 className="text-xl font-bold mb-1">{currentTask.recipe.name}</h4>
                  <p className="text-[10px] uppercase text-stone-500 font-mono tracking-widest">Standard Recipe</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-800/20 p-4 rounded-2xl border border-stone-800">
                    <h5 className="text-[9px] uppercase text-stone-600 mb-1 font-mono">Technique</h5>
                    <p className="text-xs font-bold">{currentTask.recipe.technique}</p>
                  </div>
                  <div className="bg-stone-800/20 p-4 rounded-2xl border border-stone-800">
                    <h5 className="text-[9px] uppercase text-stone-600 mb-1 font-mono">Glass</h5>
                    <p className="text-xs font-bold">{currentTask.recipe.glass}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] uppercase text-stone-500 mb-4 font-mono tracking-widest flex items-center gap-2">
                    <Droplets size={12} /> Ingredients
                  </h5>
                  <div className="space-y-3">
                    {currentTask.recipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs border-b border-stone-800 pb-2">
                        <span className="text-stone-300">{ITEMS.find(i => i.id === ing.itemId)?.name}</span>
                        <span className="font-mono text-emerald-400 font-bold">{ing.amount} {ing.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {currentTask.recipe.garnish && (
                  <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
                    <h5 className="text-[9px] uppercase text-emerald-500/50 mb-1 font-mono">Garnish</h5>
                    <p className="text-xs font-bold text-emerald-400">{currentTask.recipe.garnish}</p>
                  </div>
                )}
                
                {currentTask.recipe.chillingRequired && (
                  <div className="bg-blue-500/5 p-4 rounded-2xl border border-blue-500/20 flex items-center gap-3">
                    <Snowflake size={16} className="text-blue-400" />
                    <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest">Chilling Required</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Result Modal */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-stone-900 border border-stone-800 p-16 rounded-[4rem] max-w-2xl w-full text-center shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <h2 className="text-stone-500 uppercase tracking-[0.4em] font-mono text-xs mb-8">Exam Performance Report</h2>
              
              <div className="flex justify-center gap-8 mb-12">
                {tasks.map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black ${t.score === 100 ? 'bg-emerald-500 text-white' : 'bg-stone-800 text-stone-400'}`}>
                      {t.score}
                    </div>
                    <span className="text-[8px] uppercase font-bold text-stone-600 tracking-widest truncate max-w-[80px]">{t.recipe.name}</span>
                  </div>
                ))}
              </div>

              <div className="text-8xl font-black mb-4 italic tracking-tighter text-emerald-400">
                {Math.round(totalScore)}<span className="text-3xl text-stone-600"> Avg</span>
              </div>
              
              <p className="text-stone-400 text-sm mb-12 max-w-sm mx-auto leading-relaxed">
                {totalScore >= 60 ? "Congratulations! You passed the simulation. Your muscle memory is developing well." : "Focus on precision and speed. The standard recipes require absolute accuracy."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20"
                >
                  New Exam
                  <RotateCcw size={20} />
                </button>
                <button
                  onClick={onExit}
                  className="py-5 bg-stone-800 text-stone-400 rounded-3xl font-black uppercase tracking-widest hover:bg-stone-700 transition-all border border-stone-700"
                >
                  Title Screen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
