import { useState } from 'react';
import { Scene, GameMode } from './types';
import TitleScene from './components/TitleScene';
import GameScene from './components/GameScene';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('TITLE');
  const [gameMode, setGameMode] = useState<GameMode>('PRACTICE');

  const startNewGame = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentScene('GAME');
  };

  const goToTitle = () => {
    setCurrentScene('TITLE');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === 'TITLE' ? (
          <div key="title">
            <TitleScene onStart={startNewGame} />
          </div>
        ) : (
          <div key="game">
            <GameScene mode={gameMode} onExit={goToTitle} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
