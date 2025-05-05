'use client';

import { useSequence } from '../context/SequenceContext';

export default function SavedSequences() {
  const { savedSequences, loadSequence } = useSequence();
  
  if (savedSequences.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8">Saved Move Sets</h2>
          <div className="text-center py-8 text-gray-500 border border-gray-200 p-4">
            <p>No saved move sets yet. Select moves and save them to see them here.</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Saved Move Sets</h2>
          {savedSequences.length > 3 && (
            <button className="text-sm underline">View All</button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedSequences.map(sequence => (
            <div key={sequence.id} className="border border-gray-200 p-4 hover:border-black transition-colors">
              <h3 className="font-bold mb-2">{sequence.name}</h3>
              <div className="text-sm text-gray-500 mb-4">
                {sequence.moves.length} {sequence.moves.length === 1 ? 'move' : 'moves'}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {sequence.moves.map((move, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-1 text-xs">
                    {move.name}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <button 
                  className="text-sm border border-black py-1 px-3 flex-1 hover:bg-black hover:text-white transition-colors"
                  onClick={() => loadSequence(sequence.id)}
                >
                  Load
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
