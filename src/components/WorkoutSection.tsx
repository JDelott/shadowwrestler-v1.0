"use client"

export default function WorkoutSection() {
  const workouts = [
    {
      title: "Shadow Drilling",
      duration: "20 min",
      level: "Beginner",
      focus: "Technique"
    },
    {
      title: "Explosive Movement",
      duration: "30 min",
      level: "Intermediate",
      focus: "Conditioning"
    },
    {
      title: "Defense Tactics",
      duration: "25 min",
      level: "Advanced", 
      focus: "Strategy"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold mb-16 uppercase tracking-wide">Featured Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workouts.map((workout, index) => (
            <div key={index} className="border border-gray-200 p-6 hover:border-black transition-colors">
              <h3 className="text-xl font-bold mb-4">{workout.title}</h3>
              <div className="flex flex-col space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium">{workout.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Level:</span>
                  <span className="text-sm font-medium">{workout.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Focus:</span>
                  <span className="text-sm font-medium">{workout.focus}</span>
                </div>
              </div>
              <button className="w-full border border-black py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Start Workout
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
