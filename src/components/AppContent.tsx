'use client';

import { SequenceProvider } from '../context/SequenceContext';
import MoveSelector from './MoveSelector';
import WorkoutPlayer from './WorkoutPlayer';
import { useEffect } from 'react';

export default function AppContent() {
  // Handle hash navigation for smooth scrolling
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      // Get the element with the ID that matches the hash
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        // Scroll to the element
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Handle clicks on hash links for smooth scrolling
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link?.hash && link.hash.startsWith('#')) {
        const element = document.getElementById(link.hash.substring(1));
        if (element) {
          event.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          // Update the URL
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleHashLinkClick);
    
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);
  
  return (
    <SequenceProvider>
      <div id="top" className="min-h-screen bg-gray-50 text-black">
        <MoveSelector />
        <WorkoutPlayer />
      </div>
    </SequenceProvider>
  );
} 
