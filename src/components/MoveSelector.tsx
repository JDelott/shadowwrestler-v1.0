'use client';

import { useState } from 'react';
import { useSequence } from '../context/SequenceContext';

export default function MoveSelector() {
  const {
    availableMoves,
    selectedMoves,
    workoutDuration,
    playbackSpeed,
    clearSelectedMoves,
    toggleMoveSelection,
    setPlaybackSpeed,
    setWorkoutDuration,
    addCustomMove,
    startWorkout,
    pauseWorkout,
    isPlaying
  } = useSequence();
  
  const [customMoveName, setCustomMoveName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const handleAddCustomMove = () => {
    if (customMoveName.trim()) {
      // Use default duration of 3 seconds
      addCustomMove(customMoveName, 3);
      setCustomMoveName('');
    }
  };
  
  // Function to handle workout start/pause with smooth transition
  const handleWorkoutControl = () => {
    if (isPlaying) {
      // If already playing, pause the workout
      pauseWorkout();
    } else {
      // Start the workout 
      startWorkout();
      
      // Smooth scroll to the workout view if this is the initial start
      const workoutPlayerSection = document.getElementById('workout-player');
      if (workoutPlayerSection) {
        workoutPlayerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <section className="px-4 py-6 md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Shadow Wrestler</h2>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        
        {/* Workout Ready/In Progress Indicator */}
        {selectedMoves.length > 0 && (
          <div className="bg-black text-white p-4 rounded-xl mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wide opacity-75 mb-1">
                {isPlaying ? "Workout In Progress" : "Workout Ready"}
              </div>
              <div className="font-medium">{selectedMoves.length} moves · {workoutDuration} min</div>
            </div>
            <button 
              onClick={handleWorkoutControl}
              className="bg-white text-black h-12 w-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              {isPlaying ? (
                // Pause icon when workout is playing
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                // Play icon when workout is not playing
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>
        )}
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
            <h3 className="font-bold text-sm md:text-base mb-4">Workout Settings</h3>
            
            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Workout Duration</label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="1"
                    max="30"
                    value={workoutDuration}
                    onChange={(e) => setWorkoutDuration(parseInt(e.target.value))}
                    className="flex-1 mr-3"
                  />
                  <span className="text-sm w-16 text-right font-medium">{workoutDuration} min</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Move Speed</label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2" 
                    step="0.1" 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="flex-1 mr-3"
                  />
                  <span className="text-sm w-16 text-right font-medium">{playbackSpeed}x</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Grid */}
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Left Column - Selected Moves */}
          <div className="md:col-span-1 mb-6 md:mb-0">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm md:text-base">Selected Moves</h3>
                <div className="text-xs text-gray-500">
                  {selectedMoves.length} {selectedMoves.length === 1 ? 'move' : 'moves'} selected
                </div>
              </div>
              
              {selectedMoves.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm h-48 flex items-center justify-center">
                  <p>Select moves to build your workout</p>
                </div>
              ) : (
                <div className="h-48 overflow-y-auto mb-4">
                  <div className="space-y-2">
                    {selectedMoves.map((move) => (
                      <div key={move.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="font-medium">{move.name}</div>
                        <button 
                          onClick={() => toggleMoveSelection(move.id)}
                          className="text-gray-400 hover:text-black"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="15" y1="9" x2="9" y2="15"></line>
                            <line x1="9" y1="9" x2="15" y2="15"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedMoves.length > 0 && (
                <div className="flex justify-between">
                  <button 
                    onClick={clearSelectedMoves}
                    className="text-xs text-gray-500 hover:text-black"
                  >
                    Clear All
                  </button>
                </div>
              )}
              
              {/* Custom Move Creator (Mobile Layout) */}
              <div className="mt-6 pt-6 border-t border-gray-100 md:hidden">
                <h3 className="font-bold text-sm mb-3">Add Custom Move</h3>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Enter move name" 
                    className="w-full border border-gray-200 p-2 text-sm rounded"
                    value={customMoveName}
                    onChange={(e) => setCustomMoveName(e.target.value)}
                  />
                  <button 
                    onClick={handleAddCustomMove}
                    className="bg-black text-white p-2 text-sm w-full rounded"
                    disabled={!customMoveName.trim()}
                  >
                    Add Custom Move
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Available Moves */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
              <h3 className="font-bold text-sm md:text-base mb-4">Available Moves</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableMoves.map((move) => (
                  <button 
                    key={move.id}
                    onClick={() => toggleMoveSelection(move.id)}
                    className={`border rounded p-3 text-left transition-colors ${
                      move.selected ? 'border-black bg-gray-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{move.name}</span>
                      {move.selected && <span>✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add Custom Move Section (Desktop Layout) */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 hidden md:block">
              <h3 className="font-bold text-sm md:text-base mb-4">Add Custom Move</h3>
              <div className="md:flex md:space-x-4 md:items-end">
                <div className="flex-1 mb-3 md:mb-0">
                  <label className="block text-xs text-gray-500 mb-1">Move Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter move name" 
                    className="w-full border border-gray-200 p-2 text-sm rounded"
                    value={customMoveName}
                    onChange={(e) => setCustomMoveName(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleAddCustomMove}
                  className="bg-black text-white p-2 text-sm w-full md:w-auto md:px-4 rounded"
                  disabled={!customMoveName.trim()}
                >
                  Add Custom Move
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
