
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BackgroundDecoration } from '@/components/DecorativeElements';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [registration, setRegistration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registration.trim()) {
      toast.error("Please enter a registration number");
      return;
    }
    
    // In a real app, you would validate the registration format here
    
    // Simulate fetching car data
    toast.success("Car details found!");
    navigate("/car-details", { state: { registration } });
  };

  return (
    <div className="app-container">
      <BackgroundDecoration />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-24 min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-8 animate-float">
          <Car className="h-16 w-16 text-neon-pink mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-white neon-text text-center mb-2">
            SIMPLIFY MY CAR
          </h1>
          <p className="text-lg text-purple-light text-center max-w-md">
            "WANT TO KNOW ABOUT YOUR CAR?"
          </p>
        </div>
        
        <div className="w-full max-w-md bg-purple-dark bg-opacity-40 backdrop-blur-lg rounded-3xl p-8 border border-purple-light shadow-neon">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center text-white mb-2">
              PLEASE ENTER CAR REGISTRATION
            </h2>
            
            <div className="flex flex-col gap-6">
              <Input 
                value={registration}
                onChange={(e) => setRegistration(e.target.value)} 
                className="pill-input text-lg text-center uppercase tracking-wider"
                placeholder="e.g. AB12CDE"
                autoComplete="off"
              />
              
              <Button 
                type="submit" 
                className="pill-button flex items-center justify-center gap-2 h-14 text-lg"
              >
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Index;
