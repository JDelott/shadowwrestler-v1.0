'use client';

import { SequenceProvider } from '../context/SequenceContext';
import Header from './Header';
import MoveSelector from './MoveSelector';
import WorkoutPlayer from './WorkoutPlayer';
import SavedSequences from './SavedSequences';
import Footer from './Footer';

export default function AppContent() {
  return (
    <SequenceProvider>
      <div className="min-h-screen bg-white text-black">
        <Header />
        <MoveSelector />
        <WorkoutPlayer />
        <SavedSequences />
        <Footer />
      </div>
    </SequenceProvider>
  );
} 
