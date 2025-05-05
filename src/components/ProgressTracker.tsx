import Image from 'next/image';

export default function ProgressTracker() {
  return (
    <section className="py-16 px-4 bg-gray-100 text-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-10 uppercase tracking-wide">Track Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="relative w-full h-[300px] border border-gray-200">
            <Image 
              src="/progress-chart.svg" 
              alt="Progress tracking chart" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Data-Driven Training</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-black mr-3 mt-1"></span>
                <span>Track workout completion and performance metrics</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-black mr-3 mt-1"></span>
                <span>Analyze technique improvements over time</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-black mr-3 mt-1"></span>
                <span>Receive personalized recommendations based on your progress</span>
              </li>
            </ul>
            <button className="mt-8 border border-black py-3 px-6 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors self-start">
              View Your Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
