export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Shadow Wrestler</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-black">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 
