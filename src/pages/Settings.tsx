
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BackgroundDecoration } from '@/components/DecorativeElements';
import Navigation from '@/components/Navigation';

const SettingsButton: React.FC<{ label: string; onClick?: () => void }> = ({ 
  label, 
  onClick 
}) => (
  <Button 
    variant="outline" 
    className="w-full h-14 rounded-full bg-purple bg-opacity-50 hover:bg-opacity-70 border-purple-light text-white font-medium text-lg"
    onClick={onClick}
  >
    {label}
  </Button>
);

const Settings = () => {
  const handleSettingsAction = (action: string) => {
    console.log(`Settings action: ${action}`);
    // In a real app, this would open modals or navigate to specific settings pages
  };

  return (
    <div className="app-container">
      <BackgroundDecoration />
      
      <div className="container mx-auto px-4 pt-20 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white neon-text text-center mb-12">
          SETTINGS
        </h1>
        
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1">
            <SettingsButton 
              label="change username" 
              onClick={() => handleSettingsAction('changeUsername')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="change email" 
              onClick={() => handleSettingsAction('changeEmail')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="change password" 
              onClick={() => handleSettingsAction('changePassword')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="language" 
              onClick={() => handleSettingsAction('language')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="units" 
              onClick={() => handleSettingsAction('units')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="contact us" 
              onClick={() => handleSettingsAction('contactUs')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="change car registration" 
              onClick={() => handleSettingsAction('changeCarRegistration')}
            />
          </div>
          
          <div className="md:col-span-1">
            <SettingsButton 
              label="terms and conditions" 
              onClick={() => handleSettingsAction('termsAndConditions')}
            />
          </div>
        </div>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Settings;
