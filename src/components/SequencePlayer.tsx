'use client';


import { useSequence } from '../context/SequenceContext';
import { Move } from '../types';

export default function SequencePlayer() {
  const {
    selectedMoves,
    currentMove,
    playbackSpeed,
    isPlaying,
    workoutDuration,
    elapsedTime,
    startWorkout,
    pauseWorkout,
    resetWorkout
  } = useSequence();
  
  // Calculate global workout progress
  const calculateWorkoutProgress = () => {
    return (elapsedTime / (workoutDuration * 60)) * 100;
  };
  
  // Format elapsed time as MM:SS
  const formatElapsedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Format remaining time as MM:SS
  const formatRemainingTime = () => {
    const remainingSeconds = (workoutDuration * 60) - elapsedTime;
    if (remainingSeconds <= 0) return "00:00";
    
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (selectedMoves.length === 0) {
    return (
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Workout Player</h2>
          <div className="bg-white border border-gray-200 rounded-sm p-6 text-center py-12 text-gray-500">
            <p>Select moves to start your workout</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-8">Workout Player</h2>
        
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Elapsed: {formatElapsedTime(elapsedTime)}</span>
              <span className="text-sm">Remaining: {formatRemainingTime()}</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300" 
                style={{ width: `${calculateWorkoutProgress()}%` }}
              ></div>
            </div>
            <div className="text-center mt-1 text-xs text-gray-500">
              {selectedMoves.length} moves • {workoutDuration} min workout
            </div>
          </div>
          
          <div className="text-center mb-12">
            <div className="text-6xl font-bold mb-2">
              {currentMove ? currentMove.name.toUpperCase() : 'READY'}
            </div>
            {currentMove && (
              <div className="text-2xl text-gray-500">
                {(currentMove.duration / playbackSpeed).toFixed(1)}s
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-4">
            {isPlaying ? (
              <button 
                className="bg-black hover:bg-gray-800 p-3 rounded-full text-white"
                onClick={pauseWorkout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              </button>
            ) : (
              <button 
                className="bg-black hover:bg-gray-800 p-3 rounded-full text-white"
                onClick={startWorkout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            )}
          </div>
          
          <div className="text-center mt-6">
            <button 
              onClick={resetWorkout}
              className="text-sm text-gray-500 hover:text-black"
            >
              Reset Workout
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold mb-2">Selected Moves</h3>
            <div className="flex flex-wrap gap-2">
              {selectedMoves.map((move: Move,) => (
                <span key={move.id} className="bg-gray-100 px-2 py-1 text-xs">
                  {move.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
