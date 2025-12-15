import { NextResponse } from 'next/server';

// USDA NASS QuickStats API
const NASS_API_BASE = 'https://quickstats.nass.usda.gov/api';
const NASS_API_KEY = process.env.NEXT_PUBLIC_NASS_API_KEY || 'YOUR_API_KEY';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const commodity = searchParams.get('commodity') || 'CORN';
  const state = searchParams.get('state') || 'IOWA';
  const year = searchParams.get('year') || '2023';

  try {
    const params = new URLSearchParams({
      key: NASS_API_KEY,
      commodity_desc: commodity,
      state_alpha: state,
      year: year,
      statisticcat_desc: 'YIELD',
      format: 'JSON'
    });

    const response = await fetch(`${NASS_API_BASE}/api_GET/?${params}`);

    if (!response.ok) {
      throw new Error('NASS API request failed');
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data.data || [],
      source: 'USDA NASS QuickStats API',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('USDA NASS API Error:', error);

    // Mock data for demonstration
    return NextResponse.json({
      success: true,
      data: [
        {
          year: 2023,
          state_name: 'IOWA',
          commodity_desc: 'CORN',
          statisticcat_desc: 'YIELD',
          short_desc: 'CORN, GRAIN - YIELD, MEASURED IN BU / ACRE',
          Value: '203.5',
          unit_desc: 'BU / ACRE'
        },
        {
          year: 2022,
          state_name: 'IOWA',
          commodity_desc: 'CORN',
          statisticcat_desc: 'YIELD',
          short_desc: 'CORN, GRAIN - YIELD, MEASURED IN BU / ACRE',
          Value: '201.2',
          unit_desc: 'BU / ACRE'
        },
        {
          year: 2021,
          state_name: 'IOWA',
          commodity_desc: 'CORN',
          statisticcat_desc: 'YIELD',
          short_desc: 'CORN, GRAIN - YIELD, MEASURED IN BU / ACRE',
          Value: '198.8',
          unit_desc: 'BU / ACRE'
        }
      ],
      source: 'Mock Data (USDA NASS Format)',
      timestamp: new Date().toISOString(),
      note: 'Using mock data. Add NEXT_PUBLIC_NASS_API_KEY to .env for real data'
    });
  }
}
