export default function Features() {
  return (
    <section className="py-16 px-4 bg-gray-100 text-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-16 uppercase tracking-wide">Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="border-t-2 border-black pt-4">
            <h3 className="text-xl font-bold mb-3 uppercase">Technique</h3>
            <p className="text-gray-700">Perfect your form with our detailed technique breakdowns and visual guides.</p>
          </div>
          <div className="border-t-2 border-black pt-4">
            <h3 className="text-xl font-bold mb-3 uppercase">Conditioning</h3>
            <p className="text-gray-700">Build wrestling-specific strength and endurance with targeted workout programs.</p>
          </div>
          <div className="border-t-2 border-black pt-4">
            <h3 className="text-xl font-bold mb-3 uppercase">Strategy</h3>
            <p className="text-gray-700">Develop match intelligence and tactical awareness through scenario training.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 
