
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface CarData {
  id?: string;
  registration: string;
  make?: string;
  model?: string;
  year?: number;
  engine_size?: string;
  fuel_type?: string;
  tyre_size?: string;
  tyre_pressure?: string;
  is_taxed?: boolean;
  tax_expiry_date?: string;
  mot_valid?: boolean;
  mot_expiry_date?: string;
}

export const useCarData = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchAndStoreCar = async (registration: string): Promise<CarData | null> => {
    if (!user) {
      toast.error('You must be logged in to fetch car data');
      return null;
    }

    setLoading(true);
    
    try {
      // Clean registration number
      const cleanReg = registration.replace(/\s+/g, '').toUpperCase();
      
      // First, check if car already exists in database
      const { data: existingCars } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', user.id)
        .eq('registration', cleanReg);

      if (existingCars && existingCars.length > 0) {
        setLoading(false);
        return existingCars[0];
      }

      // Fetch from DVLA API via Edge Function
      const { data, error } = await supabase.functions.invoke('fetch-car-data', {
        body: { registration: cleanReg }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Store in database
      const { data: savedCar, error: saveError } = await supabase
        .from('cars')
        .insert({
          user_id: user.id,
          ...data
        })
        .select()
        .single();

      if (saveError) {
        console.error('Database save error:', saveError);
        throw new Error('Failed to save car data');
      }

      setLoading(false);
      return savedCar;

    } catch (error) {
      console.error('Error fetching car data:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to fetch car data');
      setLoading(false);
      return null;
    }
  };

  const getUserCars = async () => {
    if (!user) return [];

    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching user cars:', error);
      return [];
    }

    return data || [];
  };

  return {
    fetchAndStoreCar,
    getUserCars,
    loading
  };
};
