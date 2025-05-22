
import React from "react";
import { Link } from "react-router-dom";
import { Car, Settings, Home, BookOpen } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-purple-dark bg-opacity-80 backdrop-blur-md md:top-0 md:bottom-auto z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="hidden md:flex items-center gap-2 text-white font-bold text-xl neon-text"
          >
            <Car className="h-6 w-6 text-neon-pink" />
            SimplifyMyCar
          </Link>
          
          <div className="flex justify-around md:justify-end w-full md:w-auto gap-8">
            <Link 
              to="/" 
              className="flex flex-col items-center text-white hover:text-neon-pink transition-colors"
            >
              <Home className="h-6 w-6" />
              <span className="text-xs md:text-sm">Home</span>
            </Link>
            
            <Link 
              to="/car-details" 
              className="flex flex-col items-center text-white hover:text-neon-pink transition-colors"
            >
              <Car className="h-6 w-6" />
              <span className="text-xs md:text-sm">My Car</span>
            </Link>
            
            <Link 
              to="/tutorials" 
              className="flex flex-col items-center text-white hover:text-neon-pink transition-colors"
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-xs md:text-sm">Tutorials</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex flex-col items-center text-white hover:text-neon-pink transition-colors"
            >
              <Settings className="h-6 w-6" />
              <span className="text-xs md:text-sm">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
