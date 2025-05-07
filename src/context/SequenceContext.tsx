'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Move, Sequence } from '../types';

interface SequenceContextType {
  availableMoves: Move[];
  selectedMoves: Move[];
  currentMove: Move | null;
  savedSequences: Sequence[];
  playbackSpeed: number;
  isPlaying: boolean;
  workoutDuration: number;
  elapsedTime: number;
  toggleMoveSelection: (moveId: number) => void;
  clearSelectedMoves: () => void;
  setPlaybackSpeed: (speed: number) => void;
  saveSelectedMovesAsSequence: (name: string) => void;
  loadSequence: (sequenceId: number) => void;
  startWorkout: () => void;
  pauseWorkout: () => void;
  resetWorkout: () => void;
  setWorkoutDuration: (minutes: number) => void;
  addCustomMove: (name: string, duration: number) => void;
  updateMoveQuantity: (moveId: number, quantity: number | "auto") => void;
  getMoveCompletedCount: (moveId: number) => number;
}

const SequenceContext = createContext<SequenceContextType | undefined>(undefined);

export function SequenceProvider({ children }: { children: ReactNode }) {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([
    { id: 1, name: "Shoot", duration: 3, selected: false, quantity: "auto" },
    { id: 2, name: "Block", duration: 2, selected: false, quantity: "auto" },
    { id: 3, name: "Sprawl", duration: 3, selected: false, quantity: "auto" },
    { id: 4, name: "Double Leg", duration: 4, selected: false, quantity: "auto" },
    { id: 5, name: "Single Leg", duration: 4, selected: false, quantity: "auto" },
    { id: 6, name: "Arm Drag", duration: 3, selected: false, quantity: "auto" },
    { id: 7, name: "Duck Under", duration: 3, selected: false, quantity: "auto" },
    { id: 8, name: "Penetration Step", duration: 2, selected: false, quantity: "auto" },
    { id: 9, name: "Post", duration: 2, selected: false, quantity: "auto" },
    { id: 10, name: "Snap", duration: 2, selected: false, quantity: "auto" }
  ]);
  
  const [savedSequences, setSavedSequences] = useState<Sequence[]>([
    { 
      id: 1, 
      name: "Defensive Takedown Counter", 
      moves: [
        { id: 2, name: "Block", duration: 2 },
        { id: 3, name: "Sprawl", duration: 3 },
        { id: 9, name: "Go Behind", duration: 3 }
      ]
    },
    { 
      id: 2, 
      name: "Offensive Chain", 
      moves: [
        { id: 1, name: "Shoot", duration: 3 },
        { id: 4, name: "Double Leg", duration: 4 },
        { id: 10, name: "Lift", duration: 3 }
      ]
    }
  ]);
  
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [workoutDuration, setWorkoutDuration] = useState<number>(5); // Default to 5 minutes
  
  // Track the number of times each move has been executed in the workout
  const [moveCompletionCounts, setMoveCompletionCounts] = useState<Record<number, number>>({});
  
  // Refs to store values that persist across renders but don't trigger re-renders
  const moveTimerRef = useRef<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get selected moves
  const selectedMoves = availableMoves.filter(move => move.selected);
  
  // Pick a random move
  function getRandomMove(): Move | null {
    if (selectedMoves.length === 0) return null;
    
    console.log("Getting random move from", selectedMoves.length, "selected moves");
    
    let randomIndex = Math.floor(Math.random() * selectedMoves.length);
    
    // Try to avoid showing the same move twice in a row
    if (selectedMoves.length > 1 && currentMove) {
      let attempts = 0;
      while (selectedMoves[randomIndex].id === currentMove.id && attempts < 3) {
        randomIndex = Math.floor(Math.random() * selectedMoves.length);
        attempts++;
      }
    }
    
    return selectedMoves[randomIndex];
  }
  
  // Track the active timeout to prevent race conditions
  const timeoutActiveRef = useRef<boolean>(false);
  
  // Handle move changes
  useEffect(() => {
    // Only proceed if we're playing and have a current move
    if (!isPlaying || !currentMove) return;
    
    // Prevent re-entry if we're already setting up a timeout
    if (timeoutActiveRef.current) return;
    timeoutActiveRef.current = true;
    
    console.log(`Setting up timer for ${currentMove.name} - ${currentMove.duration / playbackSpeed}s`);
    
    // Duration in milliseconds
    const duration = (currentMove.duration / playbackSpeed) * 1000;
    
    // Clear any existing timeout
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    
    // Set a timeout to change to the next move
    intervalIdRef.current = setTimeout(() => {
      console.log(`Time's up for ${currentMove.name}`);
      
      // Update completion count for the current move
      setMoveCompletionCounts(prev => {
        const newCounts = {
          ...prev,
          [currentMove.id]: (prev[currentMove.id] || 0) + 1
        };
        
        // Log current completion towards goals
        const currentCount = newCounts[currentMove.id];
        const targetCount = typeof currentMove.quantity === 'number' ? currentMove.quantity : 'auto';
        console.log(`${currentMove.name}: ${currentCount}/${targetCount}`);
        
        return newCounts;
      });
      
      // Get the next move
      const nextMove = getRandomMove();
      
      // Mark timeout as inactive before setting any state
      timeoutActiveRef.current = false;
      
      if (nextMove) {
        console.log(`Next move: ${nextMove.name}`);
        setCurrentMove(nextMove);
      } else {
        console.log("No moves available, stopping workout");
        setIsPlaying(false);
      }
    }, duration);
    
    // Cleanup when component unmounts or dependencies change
    return () => {
      if (intervalIdRef.current) {
        clearTimeout(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      timeoutActiveRef.current = false;
    };
  }, [currentMove, isPlaying, playbackSpeed]);
  
  // Global workout timer
  useEffect(() => {
    if (!isPlaying) return;
    
    // Set initial move if none exists
    if (!currentMove && selectedMoves.length > 0) {
      const move = getRandomMove();
      if (move) {
        console.log("Initial move:", move.name);
        setCurrentMove(move);
      } else {
        // No valid moves, pause workout
        setIsPlaying(false);
      }
    }
    
    // Start timer that updates every second
    const timerId = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        
        // Check if workout duration has been reached
        if (newTime >= workoutDuration * 60) {
          console.log("Workout complete");
          setIsPlaying(false);
          setCurrentMove(null);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);
    
    // Cleanup
    return () => clearInterval(timerId);
  }, [isPlaying, selectedMoves, workoutDuration, currentMove]);
  
  const toggleMoveSelection = (moveId: number) => {
    setAvailableMoves(moves => 
      moves.map(move => 
        move.id === moveId 
          ? { ...move, selected: !move.selected } 
          : move
      )
    );
  };
  
  const clearSelectedMoves = () => {
    setAvailableMoves(moves => 
      moves.map(move => ({ ...move, selected: false }))
    );
    resetWorkout();
  };
  
  const saveSelectedMovesAsSequence = (name: string) => {
    if (selectedMoves.length === 0 || !name) return;
    
    const newSequence: Sequence = {
      id: Date.now(),
      name,
      moves: [...selectedMoves]
    };
    
    setSavedSequences([...savedSequences, newSequence]);
  };
  
  const loadSequence = (sequenceId: number) => {
    const sequence = savedSequences.find(seq => seq.id === sequenceId);
    if (sequence) {
      // First, deselect all moves
      setAvailableMoves(moves => 
        moves.map(move => ({ ...move, selected: false }))
      );
      
      // Then, mark the moves from the sequence as selected
      setAvailableMoves(moves => 
        moves.map(move => {
          const foundInSequence = sequence.moves.some(seqMove => seqMove.id === move.id);
          return foundInSequence ? { ...move, selected: true } : move;
        })
      );
      
      resetWorkout();
    }
  };
  
  const startWorkout = () => {
    if (selectedMoves.length === 0) return;
    console.log("Starting workout with", selectedMoves.length, "moves");
    setIsPlaying(true);
  };
  
  const pauseWorkout = () => {
    setIsPlaying(false);
  };
  
  const resetWorkout = () => {
    setIsPlaying(false);
    setCurrentMove(null);
    setElapsedTime(0);
    moveTimerRef.current = 0;
    setMoveCompletionCounts({}); // Clear all completion counts
    
    if (intervalIdRef.current) {
      clearTimeout(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };
  
  const addCustomMove = (name: string, duration: number) => {
    if (!name || duration <= 0) return;
    
    const newMove: Move = {
      id: Date.now(),
      name,
      duration,
      selected: true,
      quantity: "auto" // Default to auto
    };
    
    setAvailableMoves([...availableMoves, newMove]);
  };
  
  // Update to handle string values
  const updateMoveQuantity = (moveId: number, quantity: number | "auto") => {
    if (typeof quantity === "number" && quantity < 1) return; // Ensure quantity is at least 1
    
    setAvailableMoves(moves => 
      moves.map(move => 
        move.id === moveId 
          ? { ...move, quantity } 
          : move
      )
    );
  };
  
  // Add function to get completion count for a move
  const getMoveCompletedCount = (moveId: number): number => {
    return moveCompletionCounts[moveId] || 0;
  };
  
  return (
    <SequenceContext.Provider value={{
      availableMoves,
      selectedMoves,
      currentMove,
      savedSequences,
      playbackSpeed,
      isPlaying,
      workoutDuration,
      elapsedTime,
      toggleMoveSelection,
      clearSelectedMoves,
      setPlaybackSpeed,
      saveSelectedMovesAsSequence,
      loadSequence,
      startWorkout,
      pauseWorkout,
      resetWorkout,
      setWorkoutDuration,
      addCustomMove,
      updateMoveQuantity,
      getMoveCompletedCount
    }}>
      {children}
    </SequenceContext.Provider>
  );
}

export function useSequence() {
  const context = useContext(SequenceContext);
  if (context === undefined) {
    throw new Error('useSequence must be used within a SequenceProvider');
  }
  return context;
} 
