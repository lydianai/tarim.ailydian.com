import { NextResponse } from 'next/server';

// EPA PPLS API
const EPA_API_BASE = 'https://ordspub.epa.gov/ords/pesticides/ppls';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || 'atrazine';

  try {
    // EPA PPLS API endpoint for product search
    const response = await fetch(`${EPA_API_BASE}/products?search=${searchTerm}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('EPA API request failed');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      source: 'EPA PPLS API',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('EPA API Error:', error);

    // Mock data for demonstration with common agricultural pesticides
    return NextResponse.json({
      success: true,
      data: [
        {
          pc_code: '80301',
          product_name: 'Atrazine 4L Herbicide',
          company_name: 'Syngenta Crop Protection',
          active_ingredients: 'Atrazine 42.0%',
          registration_status: 'Active',
          toxicity_category: 'III - Caution',
          formulation_type: 'Liquid',
          site_use: 'Agricultural - Corn, Sorghum',
          pest_type: 'Broadleaf weeds, Annual grasses',
          application_rate: '1.5-2.5 lbs ai/acre',
          preharvest_interval: '60 days',
          restricted_use: 'Yes'
        },
        {
          pc_code: '12345',
          product_name: 'Roundup PowerMAX',
          company_name: 'Bayer CropScience',
          active_ingredients: 'Glyphosate 48.7%',
          registration_status: 'Active',
          toxicity_category: 'III - Caution',
          formulation_type: 'Liquid Concentrate',
          site_use: 'Agricultural - Multiple crops',
          pest_type: 'Annual and perennial weeds',
          application_rate: '22-32 fl oz/acre',
          preharvest_interval: '7 days',
          restricted_use: 'No'
        },
        {
          pc_code: '67890',
          product_name: 'Chlorpyrifos 4E',
          company_name: 'Corteva Agriscience',
          active_ingredients: 'Chlorpyrifos 44.9%',
          registration_status: 'Active',
          toxicity_category: 'II - Warning',
          formulation_type: 'Emulsifiable Concentrate',
          site_use: 'Agricultural - Corn, Soybeans, Wheat',
          pest_type: 'Cutworms, Rootworms, Aphids',
          application_rate: '1-2 pints/acre',
          preharvest_interval: '35 days',
          restricted_use: 'Yes'
        },
        {
          pc_code: '54321',
          product_name: 'Lambda-Cyhalothrin 1EC',
          company_name: 'FMC Corporation',
          active_ingredients: 'Lambda-Cyhalothrin 11.8%',
          registration_status: 'Active',
          toxicity_category: 'II - Warning',
          formulation_type: 'Emulsifiable Concentrate',
          site_use: 'Agricultural - Vegetables, Field crops',
          pest_type: 'Beetles, Caterpillars, Stink bugs',
          application_rate: '2.56-3.84 fl oz/acre',
          preharvest_interval: '21 days',
          restricted_use: 'Yes'
        }
      ],
      source: 'Mock Data (EPA PPLS Format)',
      timestamp: new Date().toISOString(),
      note: 'Mock data based on common agricultural pesticides'
    });
  }
}
