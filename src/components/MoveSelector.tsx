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
    isPlaying,
    updateMoveQuantity,
    getMoveCompletedCount
  } = useSequence();
  
  const [customMoveName, setCustomMoveName] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const handleAddCustomMove = () => {
    if (customMoveName.trim()) {
      // Use default duration of 3 seconds
      addCustomMove(customMoveName, 3);
      setCustomMoveName('');
      
      // Restore scroll position and reset zoom
      setTimeout(() => {
        window.scrollTo(0, window.scrollY);
      }, 100);
    }
  };
  
  const handleInputBlur = () => {
    // Force document to scroll back to a sane position
    window.scrollTo(0, window.scrollY);
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
        {/* Combined Header with Play Banner */}
        <div className={`flex justify-between items-center mb-6 p-4 rounded-xl ${selectedMoves.length > 0 ? 'bg-black text-white' : ''}`}>
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold">Shadow Wrestler</h2>
            {selectedMoves.length > 0 && (
              <div className="text-sm opacity-90 mt-1">
                {selectedMoves.length} moves · {workoutDuration} min
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {selectedMoves.length > 0 && (
              <button 
                onClick={handleWorkoutControl}
                className="bg-white text-black h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>
            )}
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-full hover:bg-gray-100 ${selectedMoves.length > 0 ? 'text-white hover:text-black' : 'text-gray-500 hover:text-black'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
            <h3 className="font-bold text-sm md:text-base mb-4">Workout Settings</h3>
            
            <div className="space-y-6">
              <div className="md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6">
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
              
              {/* Selected Moves - Now in settings panel with quantity input */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-sm md:text-base">Selected Moves</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">
                      {selectedMoves.length} {selectedMoves.length === 1 ? 'move' : 'moves'} selected
                    </div>
                    {selectedMoves.length > 0 && (
                      <button 
                        onClick={clearSelectedMoves}
                        className="text-xs text-gray-500 hover:text-black"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                
                {selectedMoves.length === 0 ? (
                  <div className="text-center py-4 text-gray-500 text-sm flex items-center justify-center">
                    <p>Select moves to build your workout</p>
                  </div>
                ) : (
                  <div className="max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {selectedMoves.map((move) => (
                        <div key={move.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <div className="font-medium truncate mr-2">{move.name}</div>
                          <div className="flex items-center space-x-2">
                            {/* Fixed-width container for the entire goal section */}
                            <div className="flex items-center w-36"> 
                              {/* Fixed-width label */}
                              <span className="text-xs text-gray-600 w-8">Goal:</span>
                              
                              {/* Fixed-width control container */}
                              <div className="flex border border-gray-200 rounded h-7 overflow-hidden w-20">
                                {/* Auto/Number toggle */}
                                <button
                                  onClick={() => updateMoveQuantity(move.id, move.quantity === "auto" ? 1 : "auto")}
                                  className={`w-10 h-full text-xs border-r border-gray-200 flex items-center justify-center ${
                                    move.quantity === "auto" ? "bg-gray-100 text-black" : "text-gray-400"
                                  }`}
                                >
                                  Auto
                                </button>
                                
                                {/* Number input - simpler version */}
                                <div className="w-10">
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    disabled={move.quantity === "auto"}
                                    value={move.quantity === "auto" ? "" : move.quantity?.toString() || ""}
                                    onFocus={(e) => {
                                      // Clear the input when focused for easier entry
                                      if (move.quantity !== "auto") {
                                        e.target.value = "";
                                      }
                                    }}
                                    onChange={(e) => {
                                      const value = e.target.value.trim();
                                      
                                      // Allow empty input while typing
                                      if (value === "") return;
                                      
                                      // Only update if it's a valid number
                                      const numValue = parseInt(value);
                                      if (!isNaN(numValue) && numValue >= 1 && numValue <= 999) {
                                        updateMoveQuantity(move.id, numValue);
                                      }
                                    }}
                                    onBlur={(e) => {
                                      // When input loses focus, ensure there's a valid value
                                      const value = e.target.value.trim();
                                      
                                      if (value === "" || isNaN(parseInt(value))) {
                                        // If empty or invalid on blur, set to 1
                                        updateMoveQuantity(move.id, 1);
                                      }
                                    }}
                                    className={`w-full h-full text-xs text-center border-0 ${
                                      move.quantity === "auto" ? "bg-gray-50 text-gray-400" : "bg-white"
                                    }`}
                                    maxLength={3} // Simple way to limit to 3 digits
                                  />
                                </div>
                              </div>
                              
                              {/* Fixed-width counter - now always visible with appropriate format */}
                              <div className="w-8 text-right">
                                <span className="text-xs text-gray-500 ml-1">
                                  {move.quantity === "auto" ? (
                                    // For auto: just show the count
                                    getMoveCompletedCount(move.id)
                                  ) : (
                                    // For numeric goals: show count/total format
                                    `${getMoveCompletedCount(move.id)}/${move.quantity}`
                                  )}
                                </span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => toggleMoveSelection(move.id)}
                              className="text-gray-400 hover:text-black flex-shrink-0"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Grid - Now without Selected Moves section */}
        <div>
          {/* Available Moves */}
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
        </div>
        
        {/* Add Custom Move Section (Placed below move selection containers) */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-6">
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
                onBlur={handleInputBlur}
                autoComplete="off"
                style={{ fontSize: '16px' }}
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
    </section>
  );
} 
