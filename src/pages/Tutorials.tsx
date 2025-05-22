
import React from 'react';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import Navigation from '@/components/Navigation';

type TutorialCardProps = {
  title: string;
  thumbnail?: string;
  duration: string;
  onClick: () => void;
};

const TutorialCard: React.FC<TutorialCardProps> = ({ 
  title, 
  thumbnail, 
  duration, 
  onClick 
}) => (
  <div 
    className="card-glow cursor-pointer overflow-hidden"
    onClick={onClick}
  >
    <div className="aspect-video bg-purple-dark relative">
      {thumbnail ? (
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-radial from-purple to-purple-dark">
          <span className="text-5xl opacity-30">▶️</span>
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
        {duration}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-white text-lg line-clamp-2">{title}</h3>
    </div>
  </div>
);

const tutorials = [
  {
    id: 1,
    title: "How Do I Check My Tyre Pressure?",
    thumbnail: undefined,
    duration: "1:05"
  },
  {
    id: 2,
    title: "Understanding MOT Requirements",
    thumbnail: undefined,
    duration: "3:22"
  },
  {
    id: 3,
    title: "Complete Guide to Car Insurance",
    thumbnail: undefined,
    duration: "5:17"
  },
  {
    id: 4,
    title: "How to Change Your Oil",
    thumbnail: undefined,
    duration: "7:45"
  },
  {
    id: 5,
    title: "Jump Starting Your Car Safely",
    thumbnail: undefined,
    duration: "2:33"
  },
  {
    id: 6,
    title: "What to Do After a Minor Accident",
    thumbnail: undefined,
    duration: "4:50"
  }
];

const Tutorials = () => {
  const handleTutorialClick = (id: number) => {
    console.log(`Viewing tutorial ${id}`);
    // In a real app, this would play the video or navigate to a detailed tutorial page
  };

  return (
    <div className="app-container">
      <BackgroundDecoration />
      
      <div className="container mx-auto px-4 pt-20 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white neon-text text-center mb-4">
          TUTORIALS
        </h1>
        
        <p className="text-lg text-center text-purple-light mb-12">
          Learn everything you need to know about your vehicle
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              title={tutorial.title}
              thumbnail={tutorial.thumbnail}
              duration={tutorial.duration}
              onClick={() => handleTutorialClick(tutorial.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 neon-box p-8 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 neon-text">
            HOW DO I CHECK MY TYRE PRESSURE?
          </h2>
          
          <div className="aspect-video rounded-xl bg-gradient-radial from-purple to-purple-dark flex items-center justify-center">
            <div className="text-7xl">▶️</div>
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Tutorials;
