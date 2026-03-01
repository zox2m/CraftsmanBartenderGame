import { motion } from 'motion/react';
import { GameMode } from '../types';
import { Martini, BookOpen, Trophy } from 'lucide-react';

interface TitleSceneProps {
  onStart: (mode: GameMode) => void;
}

export default function TitleScene({ onStart }: TitleSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800 to-stone-950 p-6"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-4">
          <Martini size={64} className="text-emerald-400" />
        </div>
        <h1 className="text-5xl font-bold tracking-tighter mb-2 uppercase italic">
          Craftsman Bartender
        </h1>
        <p className="text-stone-400 font-mono text-sm tracking-widest uppercase">
          Standard Recipe Master
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => onStart('PRACTICE')}
          className="group relative flex flex-col items-center p-8 bg-stone-900 border border-stone-800 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <BookOpen size={32} className="mb-4 text-emerald-400" />
          <h2 className="text-xl font-bold mb-2">Practice Mode</h2>
          <p className="text-stone-500 text-sm text-center">
            View recipes and practice without time pressure.
          </p>
        </button>

        <button
          onClick={() => onStart('REAL')}
          className="group relative flex flex-col items-center p-8 bg-stone-900 border border-stone-800 rounded-2xl hover:border-rose-500/50 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Trophy size={32} className="mb-4 text-rose-400" />
          <h2 className="text-xl font-bold mb-2">Real Mode</h2>
          <p className="text-stone-500 text-sm text-center">
            Complete orders within the time limit. Scoring applied.
          </p>
        </button>
      </div>

      <div className="mt-16 text-stone-600 text-[10px] uppercase tracking-widest font-mono">
        Based on HRDK Standard Recipes
      </div>
    </motion.div>
  );
}
