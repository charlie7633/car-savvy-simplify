
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Car, Calendar, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import Navigation from '@/components/Navigation';
import { CarData } from '@/hooks/useCarData';
import { useAuth } from '@/contexts/AuthContext';

const CarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [carData, setCarData] = useState<CarData | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { carData: locationCarData } = location.state || {};
    if (locationCarData) {
      setCarData(locationCarData);
    } else {
      // If no car data in state, redirect to home
      navigate('/');
    }
  }, [location.state, navigate, user]);

  if (!carData) {
    return (
      <div className="app-container">
        <BackgroundDecoration />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading car details...</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

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
                  <h3 className="text-neon-pink font-semibold">REGISTRATION</h3>
                  <p className="text-white text-xl">{carData.registration}</p>
                </div>

                <div>
                  <h3 className="text-neon-pink font-semibold">YEAR, MAKE AND MODEL</h3>
                  <p className="text-white text-xl">
                    {carData.year ? `Made in ${carData.year}` : 'Year unknown'}
                  </p>
                  <p className="text-white text-xl">
                    {carData.make || 'Make unknown'} {carData.model || 'Model unknown'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold">ENGINE SPECIFICS</h3>
                  <p className="text-white">
                    Engine: {carData.engine_size || 'Unknown size'}
                  </p>
                  <p className="text-white">
                    Fuel type: {carData.fuel_type || 'Unknown'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold">TYRES</h3>
                  <p className="text-white">
                    Tyre pressure: {carData.tyre_pressure || 'Not available - check manufacturer specs'}
                  </p>
                  <p className="text-white">
                    Tyre size: {carData.tyre_size || 'Not available - check tyre sidewall'}
                  </p>
                </div>
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
                  <h3 className="text-neon-pink font-semibold mb-3">TAX STATUS</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {carData.is_taxed ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                    <p className="text-white">
                      Vehicle is currently {carData.is_taxed ? 'taxed' : 'not taxed'}
                    </p>
                  </div>
                  {carData.tax_expiry_date && (
                    <p className="text-white">
                      Tax expires: {formatDate(carData.tax_expiry_date)}
                    </p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-neon-pink font-semibold mb-3">MOT STATUS</h3>
                  <div className="flex items-center gap-2 mb-2">
                    {carData.mot_valid ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                    <p className="text-white">
                      MOT is {carData.mot_valid ? 'valid' : 'expired or not found'}
                    </p>
                  </div>
                  {carData.mot_expiry_date && (
                    <p className="text-white">
                      MOT expires: {formatDate(carData.mot_expiry_date)}
                    </p>
                  )}
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
