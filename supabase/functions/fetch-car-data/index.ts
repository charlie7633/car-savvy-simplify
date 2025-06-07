
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { registration } = await req.json();
    
    if (!registration) {
      throw new Error('Registration number is required');
    }

    // Clean registration number (remove spaces and convert to uppercase)
    const cleanReg = registration.replace(/\s+/g, '').toUpperCase();
    console.log('Cleaned registration:', cleanReg);

    const apiKey = Deno.env.get('DVLA_API_KEY');
    if (!apiKey) {
      throw new Error('DVLA API key not configured');
    }

    console.log('Making request to DVLA API...');

    // Fetch vehicle data from DVLA API
    const vehicleResponse = await fetch(`https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        registrationNumber: cleanReg
      })
    });

    console.log('DVLA API response status:', vehicleResponse.status);

    if (!vehicleResponse.ok) {
      const errorText = await vehicleResponse.text();
      console.log('DVLA API error response:', errorText);
      
      if (vehicleResponse.status === 404) {
        throw new Error('Vehicle not found. Please check the registration number.');
      } else if (vehicleResponse.status === 403) {
        throw new Error('API access denied. Please check your DVLA API key and ensure it has the correct permissions.');
      } else if (vehicleResponse.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error(`DVLA API error: ${vehicleResponse.status} - ${errorText}`);
    }

    const vehicleData = await vehicleResponse.json();
    console.log('DVLA API response data:', JSON.stringify(vehicleData, null, 2));

    // Extract relevant information
    const carInfo = {
      registration: cleanReg,
      make: vehicleData.make || null,
      model: vehicleData.model || null,
      year: vehicleData.yearOfManufacture || null,
      engine_size: vehicleData.engineCapacity ? `${vehicleData.engineCapacity}cc` : null,
      fuel_type: vehicleData.fuelType || null,
      is_taxed: vehicleData.taxStatus === 'Taxed',
      tax_expiry_date: vehicleData.taxDueDate || null,
      mot_valid: vehicleData.motStatus === 'Valid',
      mot_expiry_date: vehicleData.motExpiryDate || null,
      // Default tyre information (would need separate API for this)
      tyre_size: null,
      tyre_pressure: null
    };

    console.log('Processed car info:', JSON.stringify(carInfo, null, 2));

    return new Response(JSON.stringify(carInfo), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching car data:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch car data' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
