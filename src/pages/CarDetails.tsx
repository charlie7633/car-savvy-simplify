
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Car, Calendar, Info, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import Navigation from '@/components/Navigation';

// This would typically come from an API
const mockCarData = {
  make: 'Mazda',
  model: '2',
  year: '2014',
  engine: '1.5 Litres',
  fuelType: 'Petrol',
  tyres: {
    pressure: '32PSI',
    size: '85/65',
  },
  insurance: {
    provider: 'XXXXXXXX',
    validFrom: 'XXXX-XX-XX',
    validTo: 'XXXX-XX-XX',
  },
  mot: {
    valid: true,
    validUntil: 'XXXX-XX-XX',
  },
  tax: {
    valid: true,
  }
};

const CarDetails = () => {
  const location = useLocation();
  const { registration } = location.state || { registration: 'Unknown' };
  const carData = mockCarData;

  return (
    <div className="app-container">
      <BackgroundDecoration />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-24">
        {/* Car Overview Section */}
        <section className="mb-12">
          <div className="neon-box p-6 md:p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white neon-text mb-6">
              YOUR CAR
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 aspect-video bg-purple-dark rounded-xl flex items-center justify-center">
                {/* Car Image Placeholder */}
                <Car className="h-24 w-24 text-purple-light opacity-70" />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div>
                  <h3 className="text-neon-pink font-semibold">YOUR CARS YEAR MAKE AND MODEL</h3>
                  <p className="text-white text-xl">made in {carData.year}</p>
                  <p className="text-white text-xl">Model "{carData.model}"</p>
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold">ENGINE SPECIFICS</h3>
                  <p className="text-white">your cars engine is {carData.engine} and its fuel type is {carData.fuelType}</p>
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold">TYRES</h3>
                  <p className="text-white">Tyre pressure for the {carData.make} {carData.model} is {carData.tyres.pressure}</p>
                  <p className="text-white">Tyre size for the {carData.make} {carData.model} is {carData.tyres.size}</p>
                </div>
                
                <Button className="pill-button mt-4 self-start">
                  COMPARE PLANS
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Legal Checks Section */}
        <section>
          <div className="neon-box p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white neon-text mb-6">
              LEGAL CHECKS
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div>
                  <h3 className="text-neon-pink font-semibold">INSURANCE</h3>
                  <p className="text-white">currently insured with "{carData.insurance.provider}"</p>
                  <p className="text-white">date of insurance from "{carData.insurance.validFrom} to {carData.insurance.validTo}"</p>
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold">MOT AND TAX STATUS</h3>
                  <p className="text-white">MOT is valid until {carData.mot.validUntil}</p>
                  <p className="text-white">vehicle is currently {carData.tax.valid ? 'taxed' : 'not taxed'}</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 aspect-video bg-purple-dark rounded-xl flex items-center justify-center">
                {/* Car Image Placeholder */}
                <Car className="h-24 w-24 text-purple-light opacity-70" />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CarDetails;
