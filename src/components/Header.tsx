'use client';

export default function Header() {
  return (
    <header className="py-6 px-4 border-b border-gray-200">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">SHADOW WRESTLER</h1>
        <nav>
          <ul className="flex space-x-8">
            <li><a href="#" className="text-sm uppercase hover:underline">Sequences</a></li>
            <li><a href="#" className="text-sm uppercase hover:underline">Moves</a></li>
            <li><a href="#" className="text-sm uppercase hover:underline">Profile</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 
