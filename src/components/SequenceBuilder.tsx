"use client"
import { useState } from 'react';
import { useSequence } from '../context/SequenceContext';

export default function SequenceBuilder() {
  const {
    availableMoves,
    selectedMoves,
    workoutDuration,
    playbackSpeed,
    clearSelectedMoves,
    toggleMoveSelection,
    setPlaybackSpeed,
    setWorkoutDuration,
    addCustomMove
  } = useSequence();
  
  const [customMoveName, setCustomMoveName] = useState('');
  const [customMoveDuration, setCustomMoveDuration] = useState(3);
  
  const handleAddCustomMove = () => {
    if (customMoveName.trim()) {
      addCustomMove(customMoveName, customMoveDuration);
      setCustomMoveName('');
    }
  };
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-8">Sequence Builder</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="border border-gray-200 p-4 rounded-sm">
              <h3 className="text-lg font-bold mb-4">Available Moves</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {availableMoves.map((move) => (
                  <button 
                    key={move.id}
                    onClick={() => toggleMoveSelection(move.id)}
                    className={`border py-2 px-3 text-sm hover:bg-gray-100 transition-colors text-left ${
                      move.selected ? 'border-black bg-gray-50' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{move.name}</span>
                      {move.selected && <span>✓</span>}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{move.duration}s</div>
                  </button>
                ))}
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-bold mb-2">Custom Move</h4>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Enter move name" 
                    className="w-full border border-gray-300 p-2 text-sm"
                    value={customMoveName}
                    onChange={(e) => setCustomMoveName(e.target.value)}
                  />
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Duration:</span>
                    <input 
                      type="number" 
                      min="1"
                      max="10"
                      value={customMoveDuration}
                      onChange={(e) => setCustomMoveDuration(parseInt(e.target.value))}
                      className="w-16 border border-gray-300 p-2 text-sm"
                    />
                    <span className="text-sm ml-1">seconds</span>
                  </div>
                  <button 
                    onClick={handleAddCustomMove}
                    className="bg-black text-white px-4 py-2 text-sm w-full"
                    disabled={!customMoveName.trim()}
                  >
                    Add Custom Move
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="border border-gray-200 p-4 rounded-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Selected Moves</h3>
                <button 
                  onClick={clearSelectedMoves}
                  className="text-sm text-gray-500 hover:text-black"
                  disabled={selectedMoves.length === 0}
                >
                  Clear All
                </button>
              </div>
              
              {selectedMoves.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Select moves from the left panel to build your workout</p>
                </div>
              ) : (
                <div className="space-y-2 mb-6">
                  {selectedMoves.map((move, index) => (
                    <div key={move.id} className="flex items-center border border-gray-200 p-3">
                      <span className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full mr-3">
                        {index + 1}
                      </span>
                      <span className="flex-1">{move.name}</span>
                      <span className="text-sm text-gray-500 mr-3">
                        {(move.duration / playbackSpeed).toFixed(1)}s
                      </span>
                      <button 
                        onClick={() => toggleMoveSelection(move.id)}
                        className="text-gray-400 hover:text-black"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-bold mb-3">Workout Controls</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Speed</label>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">0.5x</span>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="2" 
                        step="0.1" 
                        value={playbackSpeed}
                        onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm ml-2">2x</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Workout Duration</label>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        min="1"
                        max="60"
                        value={workoutDuration}
                        onChange={(e) => setWorkoutDuration(parseInt(e.target.value))}
                        className="w-16 border border-gray-300 p-2 text-sm"
                      />
                      <span className="text-sm ml-1">minutes</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <SaveSequenceForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaveSequenceForm() {
  const [sequenceName, setSequenceName] = useState('');
  const { selectedMoves, saveSelectedMovesAsSequence, startWorkout } = useSequence();
  
  const handleSave = () => {
    if (sequenceName.trim()) {
      saveSelectedMovesAsSequence(sequenceName);
      setSequenceName('');
    }
  };
  
  return (
    <div className="mt-6 space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Sequence name"
          className="flex-1 border border-gray-300 p-2"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-gray-200 px-4 py-2 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
          disabled={!sequenceName.trim() || selectedMoves.length === 0}
        >
          Save
        </button>
      </div>
      <button
        onClick={startWorkout}
        className="w-full bg-black text-white py-3 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={selectedMoves.length === 0}
      >
        START WORKOUT
      </button>
    </div>
  );
} 
