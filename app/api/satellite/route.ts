import { NextResponse } from 'next/server';

// Farmonaut API for satellite data
const FARMONAUT_API_BASE = 'https://api.farmonaut.com/api/v1';
const FARMONAUT_API_KEY = process.env.FARMONAUT_API_KEY || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '39.9334'; // Ankara coordinates
  const lon = searchParams.get('lon') || '32.8597';
  const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

  try {
    // If real API key exists, use it
    if (FARMONAUT_API_KEY && FARMONAUT_API_KEY !== '') {
      const satelliteUrl = `${FARMONAUT_API_BASE}/satellite-data?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}`;

      const response = await fetch(satelliteUrl, {
        headers: {
          'Authorization': `Bearer ${FARMONAUT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          success: true,
          data,
          source: 'Farmonaut API',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Fallback to realistic mock data based on research
    const mockData = generateRealisticSatelliteData(lat, lon, startDate, endDate);

    return NextResponse.json({
      success: true,
      data: mockData,
      source: 'Mock Satellite Data (Farmonaut Format)',
      timestamp: new Date().toISOString(),
      note: 'Add FARMONAUT_API_KEY to .env for real satellite data. Visit: https://farmonaut.com/api'
    });

  } catch (error) {
    console.error('Satellite API Error:', error);

    const mockData = generateRealisticSatelliteData(lat, lon, startDate, endDate);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch satellite data',
      data: mockData,
      source: 'Fallback Mock Data',
      timestamp: new Date().toISOString()
    });
  }
}

function generateRealisticSatelliteData(lat: string, lon: string, startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const dataPoints = [];

  for (let i = 0; i < Math.min(days, 30); i += 3) { // Data every 3 days (satellite revisit time)
    const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);

    // Realistic NDVI progression over growing season
    const seasonProgress = i / days;
    const baseNDVI = 0.3 + seasonProgress * 0.5; // Grows from 0.3 to 0.8
    const ndvi = Math.min(0.95, Math.max(0.2, baseNDVI + (Math.random() - 0.5) * 0.1));

    // Related indices
    const evi = ndvi * 0.85 + (Math.random() - 0.5) * 0.05; // Enhanced Vegetation Index
    const savi = ndvi * 0.9 + (Math.random() - 0.5) * 0.05; // Soil Adjusted Vegetation Index
    const msavi = ndvi * 0.88 + (Math.random() - 0.5) * 0.05; // Modified SAVI

    // Soil moisture estimate (correlation with NDVI)
    const soilMoisture = 30 + ndvi * 40 + (Math.random() - 0.5) * 10;

    // Chlorophyll content
    const chlorophyll = ndvi * 100 + (Math.random() - 0.5) * 10;

    dataPoints.push({
      date: date.toISOString().split('T')[0],
      timestamp: date.toISOString(),
      location: {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      },
      indices: {
        ndvi: {
          value: parseFloat(ndvi.toFixed(3)),
          interpretation: ndvi > 0.7 ? 'Excellent' : ndvi > 0.5 ? 'Good' : ndvi > 0.3 ? 'Moderate' : 'Poor',
          color: ndvi > 0.7 ? 'green' : ndvi > 0.5 ? 'yellow-green' : ndvi > 0.3 ? 'yellow' : 'red'
        },
        evi: {
          value: parseFloat(evi.toFixed(3)),
          description: 'Enhanced Vegetation Index - Better for high biomass areas'
        },
        savi: {
          value: parseFloat(savi.toFixed(3)),
          description: 'Soil Adjusted Vegetation Index - Minimizes soil brightness'
        },
        msavi: {
          value: parseFloat(msavi.toFixed(3)),
          description: 'Modified SAVI - Improved for low vegetation cover'
        },
        ndwi: {
          value: parseFloat((0.2 + Math.random() * 0.3).toFixed(3)),
          description: 'Normalized Difference Water Index - Water content in vegetation'
        },
        gndvi: {
          value: parseFloat((ndvi * 0.92).toFixed(3)),
          description: 'Green NDVI - More sensitive to chlorophyll'
        }
      },
      soilMoisture: {
        percentage: parseFloat(soilMoisture.toFixed(1)),
        status: soilMoisture > 60 ? 'Optimal' : soilMoisture > 40 ? 'Adequate' : soilMoisture > 25 ? 'Low' : 'Critical',
        recommendation: soilMoisture < 40 ? 'Irrigation recommended' : 'Moisture levels adequate'
      },
      chlorophyll: {
        content: parseFloat(chlorophyll.toFixed(1)),
        unit: 'µg/cm²',
        status: chlorophyll > 70 ? 'High' : chlorophyll > 50 ? 'Normal' : 'Low'
      },
      biomass: {
        estimate: parseFloat((ndvi * 15 + Math.random() * 2).toFixed(2)),
        unit: 'tons/hectare',
        confidence: 0.85
      },
      cloudCover: {
        percentage: Math.floor(Math.random() * 30),
        quality: Math.random() > 0.3 ? 'Good' : 'Fair'
      },
      satellite: {
        name: i % 2 === 0 ? 'Sentinel-2' : 'Landsat-8',
        resolution: i % 2 === 0 ? '10m' : '30m',
        bands: i % 2 === 0 ? ['B2', 'B3', 'B4', 'B8'] : ['B2', 'B3', 'B4', 'B5']
      }
    });
  }

  return {
    field: {
      location: { lat: parseFloat(lat), lon: parseFloat(lon) },
      area: 250, // hectares
      crop: 'Wheat',
      growingSeason: {
        start: startDate,
        end: endDate,
        stage: 'Vegetative Growth'
      }
    },
    timeSeriesData: dataPoints,
    summary: {
      averageNDVI: parseFloat((dataPoints.reduce((sum, d) => sum + d.indices.ndvi.value, 0) / dataPoints.length).toFixed(3)),
      trend: 'Increasing',
      healthStatus: 'Good',
      alerts: [
        {
          type: 'info',
          message: 'Vegetation index showing positive growth trend',
          date: new Date().toISOString()
        }
      ],
      recommendations: [
        'Continue current irrigation schedule',
        'Monitor for pest activity in high NDVI areas',
        'Consider nutrient application in low NDVI zones'
      ]
    },
    metadata: {
      dataPoints: dataPoints.length,
      dateRange: { start: startDate, end: endDate },
      updateFrequency: '3 days',
      coverage: 'Full field coverage',
      provider: 'Farmonaut-Compatible Satellite Data'
    }
  };
}
