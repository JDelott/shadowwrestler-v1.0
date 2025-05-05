'use client';

import { useEffect } from 'react';
import { useSequence } from '../context/SequenceContext';
import { Move } from '../types';

export default function WorkoutPlayer() {
  const {
    selectedMoves,
    currentMove,
    isPlaying,
    workoutDuration,
    elapsedTime,
    startWorkout,
    pauseWorkout,
    resetWorkout
  } = useSequence();
  
  // Speak the move name whenever currentMove changes
  useEffect(() => {
    // Only speak if we're playing and have a move
    if (isPlaying && currentMove) {
      speakMove(currentMove.name);
    }
    
    // Cleanup function
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentMove, isPlaying]);
  
  // Simple function to speak the move name
  function speakMove(text: string) {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance with default voice
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
  
  // Calculate global workout progress
  const calculateWorkoutProgress = () => {
    return (elapsedTime / (workoutDuration * 60)) * 100;
  };
  
  // Format elapsed time as MM:SS
  const formatElapsedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Format remaining time as MM:SS
  const formatRemainingTime = () => {
    const remainingSeconds = (workoutDuration * 60) - elapsedTime;
    if (remainingSeconds <= 0) return "00:00";
    
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseWorkout();
    } else {
      startWorkout();
    }
  };
  
  if (selectedMoves.length === 0) {
    return (
      <section id="workout-player" className="px-4 py-6 md:py-12">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Workout Player</h2>
          <p className="text-gray-500 mb-6">Select moves to start your workout</p>
          <a 
            href="#top"
            className="inline-block bg-black text-white py-3 px-6 rounded-lg"
          >
            Go to Move Selection
          </a>
        </div>
      </section>
    );
  }
  
  // If nothing is playing yet, show a pre-workout screen with big play button
  if (!isPlaying && elapsedTime === 0) {
    return (
      <section id="workout-player" className="px-4 py-6 md:py-12">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to Work Out</h2>
          <p className="text-gray-500 mb-8">{selectedMoves.length} moves · {workoutDuration} min</p>
          
          <div className="flex justify-center mb-8">
            <button 
              onClick={startWorkout}
              className="bg-black text-white h-24 w-24 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {selectedMoves.map((move: Move) => (
              <span key={move.id} className="px-2 py-1 text-xs rounded-full bg-gray-100">
                {move.name}
              </span>
            ))}
          </div>
          
          <a 
            href="#top"
            className="text-sm text-gray-500 hover:text-black inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to move selection
          </a>
        </div>
      </section>
    );
  }
  
  // Main workout UI when playing or paused
  return (
    <section id="workout-player" className="px-4 py-6 md:py-12">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="sr-only">Workout Player</h2>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Progress Bar Section */}
          <div className="w-full bg-gray-100 h-2">
            <div 
              className="bg-black h-2 transition-all duration-100" 
              style={{ width: `${calculateWorkoutProgress()}%` }}
            ></div>
          </div>
          
          {/* Timer Section */}
          <div className="flex justify-between items-center px-4 md:px-6 pt-4 text-sm">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>{formatElapsedTime(elapsedTime)}</span>
            </div>
            <div className="text-xs text-gray-500">
              {workoutDuration} min workout
            </div>
            <div className="flex items-center space-x-1 font-medium">
              <span>{formatRemainingTime()}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Current Move Display - Fixed Height Container */}
          <div className="px-4 md:px-6 py-12 md:py-16 flex flex-col items-center">
            {/* Fixed height container to prevent layout shifts */}
            <div className="h-32 md:h-40 flex items-center justify-center mb-6">
              <div className="text-5xl md:text-7xl font-bold text-center max-w-full break-words">
                {currentMove ? currentMove.name.toUpperCase() : 'READY'}
              </div>
            </div>
            
            {/* Speak Button */}
            {currentMove && (
              <button 
                onClick={() => currentMove && speakMove(currentMove.name)}
                className="inline-flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-black bg-gray-100 rounded-full py-2 px-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>Say Move</span>
              </button>
            )}
          </div>
          
          {/* Control Buttons */}
          <div className="p-4 md:p-6 border-t border-gray-100">
            <div className="flex justify-center items-center">
              <button 
                className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-md"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            </div>
            
            {/* Only show Reset button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={resetWorkout}
                className="text-gray-500 hover:text-black flex items-center justify-center space-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v6h6"></path>
                  <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
                </svg>
                <span className="text-sm">Reset</span>
              </button>
            </div>
          </div>
          
          {/* Current Sequence Preview - Fixed Height Container */}
          <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100 pt-4">
            <div className="text-xs font-medium text-gray-500 mb-2">SELECTED MOVES:</div>
            {/* Fixed height container with overflow scroll for selected moves */}
            <div className="h-16 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {selectedMoves.map((move: Move) => (
                  <span 
                    key={move.id} 
                    className={`px-2 py-1 text-xs rounded-full ${
                      currentMove && currentMove.id === move.id 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    {move.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
