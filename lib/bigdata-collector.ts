// Big Data Collection & Aggregation System
// Designed for real-time agricultural data collection from multiple sources

export interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'satellite' | 'iot' | 'manual' | 'calculated';
  endpoint?: string;
  updateFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  dataFormat: 'json' | 'xml' | 'csv' | 'geojson' | 'raster';
  authentication: 'api_key' | 'oauth' | 'none';
  reliability: number; // 0-100
  cost: 'free' | 'freemium' | 'paid';
}

export const DATA_SOURCES: DataSource[] = [
  // USDA Data Sources
  {
    id: 'usda_nass_quickstats',
    name: 'USDA NASS QuickStats API',
    type: 'api',
    endpoint: 'https://quickstats.nass.usda.gov/api',
    updateFrequency: 'weekly',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 95,
    cost: 'free'
  },
  {
    id: 'usda_cropland_cdl',
    name: 'USDA Cropland Data Layer',
    type: 'satellite',
    endpoint: 'https://nassgeodata.gmu.edu/CropScape/',
    updateFrequency: 'monthly',
    dataFormat: 'raster',
    authentication: 'none',
    reliability: 92,
    cost: 'free'
  },
  {
    id: 'usda_crop_casma',
    name: 'Crop-CASMA Soil Moisture',
    type: 'satellite',
    endpoint: 'https://nassgeo.csiss.gmu.edu/CropCASMA/',
    updateFrequency: 'daily',
    dataFormat: 'geojson',
    authentication: 'none',
    reliability: 90,
    cost: 'free'
  },

  // NASA & Satellite Data
  {
    id: 'nasa_modis',
    name: 'NASA MODIS Vegetation Indices',
    type: 'satellite',
    endpoint: 'https://modis.gsfc.nasa.gov/data/',
    updateFrequency: 'daily',
    dataFormat: 'raster',
    authentication: 'none',
    reliability: 98,
    cost: 'free'
  },
  {
    id: 'nasa_smap',
    name: 'NASA SMAP Soil Moisture',
    type: 'satellite',
    endpoint: 'https://smap.jpl.nasa.gov/data/',
    updateFrequency: 'daily',
    dataFormat: 'raster',
    authentication: 'none',
    reliability: 96,
    cost: 'free'
  },
  {
    id: 'sentinel2',
    name: 'Copernicus Sentinel-2',
    type: 'satellite',
    endpoint: 'https://scihub.copernicus.eu/dhus',
    updateFrequency: 'weekly',
    dataFormat: 'raster',
    authentication: 'api_key',
    reliability: 97,
    cost: 'free'
  },
  {
    id: 'landsat',
    name: 'USGS Landsat 8/9',
    type: 'satellite',
    endpoint: 'https://earthexplorer.usgs.gov/',
    updateFrequency: 'weekly',
    dataFormat: 'raster',
    authentication: 'api_key',
    reliability: 95,
    cost: 'free'
  },

  // Weather & Climate
  {
    id: 'openweather',
    name: 'OpenWeatherMap API',
    type: 'api',
    endpoint: 'https://api.openweathermap.org/data/2.5',
    updateFrequency: 'hourly',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 94,
    cost: 'freemium'
  },
  {
    id: 'agromonitoring',
    name: 'Agromonitoring Agro API',
    type: 'api',
    endpoint: 'https://api.agromonitoring.com/agro/1.0',
    updateFrequency: 'daily',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 92,
    cost: 'freemium'
  },
  {
    id: 'noaa_climate',
    name: 'NOAA Climate Data Online',
    type: 'api',
    endpoint: 'https://www.ncdc.noaa.gov/cdo-web/api/v2',
    updateFrequency: 'daily',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 98,
    cost: 'free'
  },

  // Soil Data
  {
    id: 'ssurgo',
    name: 'USDA SSURGO Soil Database',
    type: 'api',
    endpoint: 'https://SDMDataAccess.nrcs.usda.gov/',
    updateFrequency: 'monthly',
    dataFormat: 'json',
    authentication: 'none',
    reliability: 97,
    cost: 'free'
  },
  {
    id: 'isric_soilgrids',
    name: 'ISRIC SoilGrids',
    type: 'api',
    endpoint: 'https://rest.isric.org/soilgrids/v2.0',
    updateFrequency: 'monthly',
    dataFormat: 'json',
    authentication: 'none',
    reliability: 90,
    cost: 'free'
  },

  // Pesticides & Chemicals
  {
    id: 'epa_ppls',
    name: 'EPA Pesticide Product Label System',
    type: 'api',
    endpoint: 'https://ordspub.epa.gov/ords/pesticides/ppls',
    updateFrequency: 'daily',
    dataFormat: 'json',
    authentication: 'none',
    reliability: 96,
    cost: 'free'
  },

  // International Data
  {
    id: 'fao_stat',
    name: 'FAO FAOSTAT',
    type: 'api',
    endpoint: 'https://fenixservices.fao.org/faostat/api/v1',
    updateFrequency: 'monthly',
    dataFormat: 'json',
    authentication: 'none',
    reliability: 94,
    cost: 'free'
  },
  {
    id: 'world_bank_agri',
    name: 'World Bank Agriculture Data',
    type: 'api',
    endpoint: 'https://api.worldbank.org/v2/indicator',
    updateFrequency: 'monthly',
    dataFormat: 'json',
    authentication: 'none',
    reliability: 93,
    cost: 'free'
  },

  // Market & Economic Data
  {
    id: 'usda_ams',
    name: 'USDA Agricultural Marketing Service',
    type: 'api',
    endpoint: 'https://marsapi.ams.usda.gov/services/v1.2',
    updateFrequency: 'daily',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 95,
    cost: 'free'
  },

  // IoT & Sensor Data (Placeholder for future integration)
  {
    id: 'farm_sensors',
    name: 'On-Farm IoT Sensors',
    type: 'iot',
    updateFrequency: 'realtime',
    dataFormat: 'json',
    authentication: 'api_key',
    reliability: 85,
    cost: 'paid'
  }
];

export interface DataCollectionMetrics {
  totalSources: number;
  activeSources: number;
  dataPointsCollected: number;
  lastUpdated: Date;
  storageUsed: number; // GB
  averageLatency: number; // ms
  errorRate: number; // %
}

export interface DataPipeline {
  stage: 'collection' | 'validation' | 'transformation' | 'storage' | 'analysis';
  status: 'active' | 'paused' | 'error';
  throughput: number; // records/second
  lastRun: Date;
}

// Big Data Collection Strategy
export const COLLECTION_STRATEGY = {
  // Priority levels for data sources
  priority: {
    critical: ['usda_nass_quickstats', 'openweather', 'sentinel2'],
    high: ['nasa_modis', 'ssurgo', 'epa_ppls'],
    medium: ['fao_stat', 'noaa_climate', 'agromonitoring'],
    low: ['world_bank_agri', 'usda_ams']
  },

  // Data retention policies
  retention: {
    realtime: 7, // days
    hourly: 30,
    daily: 365,
    weekly: 730,
    monthly: 3650
  },

  // Quality thresholds
  quality: {
    minReliability: 85,
    maxLatency: 5000, // ms
    maxErrorRate: 5 // %
  }
};

// Machine Learning Data Preparation
export interface MLDataset {
  id: string;
  name: string;
  purpose: 'yield_prediction' | 'disease_detection' | 'price_forecast' | 'soil_classification';
  features: string[];
  targetVariable: string;
  recordCount: number;
  splitRatio: { train: number; validation: number; test: number };
  lastUpdated: Date;
}

export const ML_DATASETS: MLDataset[] = [
  {
    id: 'yield_prediction_corn',
    name: 'Corn Yield Prediction Dataset',
    purpose: 'yield_prediction',
    features: [
      'soil_pH',
      'soil_nitrogen',
      'soil_phosphorus',
      'soil_potassium',
      'rainfall',
      'temperature_avg',
      'temperature_min',
      'temperature_max',
      'ndvi',
      'planting_date',
      'previous_yield',
      'fertilizer_amount'
    ],
    targetVariable: 'yield_bu_per_acre',
    recordCount: 150000,
    splitRatio: { train: 0.7, validation: 0.15, test: 0.15 },
    lastUpdated: new Date()
  },
  {
    id: 'disease_detection_tomato',
    name: 'Tomato Disease Detection Dataset',
    purpose: 'disease_detection',
    features: [
      'leaf_color_r',
      'leaf_color_g',
      'leaf_color_b',
      'spot_count',
      'discoloration_percentage',
      'temperature',
      'humidity',
      'soil_moisture',
      'days_since_planting'
    ],
    targetVariable: 'disease_type',
    recordCount: 50000,
    splitRatio: { train: 0.8, validation: 0.1, test: 0.1 },
    lastUpdated: new Date()
  },
  {
    id: 'soil_classification',
    name: 'Soil Type Classification Dataset',
    purpose: 'soil_classification',
    features: [
      'sand_percentage',
      'silt_percentage',
      'clay_percentage',
      'organic_matter',
      'pH',
      'cation_exchange_capacity',
      'bulk_density',
      'water_holding_capacity'
    ],
    targetVariable: 'soil_texture_class',
    recordCount: 75000,
    splitRatio: { train: 0.75, validation: 0.125, test: 0.125 },
    lastUpdated: new Date()
  }
];

// Real-time Data Streaming Configuration
export const STREAMING_CONFIG = {
  kafka: {
    topics: ['weather-updates', 'soil-sensors', 'satellite-imagery', 'market-prices'],
    partitions: 10,
    replicationFactor: 3
  },
  redis: {
    channels: ['alerts', 'notifications', 'realtime-metrics'],
    ttl: 3600 // seconds
  },
  websockets: {
    maxConnections: 10000,
    heartbeatInterval: 30000 // ms
  }
};

// Data Quality Monitoring
export function assessDataQuality(sourceId: string): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const source = DATA_SOURCES.find(s => s.id === sourceId);

  if (!source) {
    return {
      score: 0,
      issues: ['Source not found'],
      recommendations: ['Verify source ID']
    };
  }

  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  if (source.reliability < COLLECTION_STRATEGY.quality.minReliability) {
    issues.push('Reliability below threshold');
    recommendations.push('Consider alternative data source');
    score -= 20;
  }

  if (source.cost === 'paid') {
    recommendations.push('Evaluate ROI of paid data source');
    score -= 5;
  }

  if (source.type === 'manual') {
    issues.push('Manual data entry prone to errors');
    recommendations.push('Implement validation rules');
    score -= 15;
  }

  return { score, issues, recommendations };
}

// Helper function to simulate data collection
export async function collectData(sourceId: string): Promise<any> {
  const source = DATA_SOURCES.find(s => s.id === sourceId);

  if (!source) {
    throw new Error(`Data source ${sourceId} not found`);
  }

  // In production, this would make actual API calls
  // For now, return simulated data structure
  return {
    sourceId,
    timestamp: new Date(),
    status: 'success',
    recordsCollected: Math.floor(Math.random() * 1000),
    dataQuality: source.reliability
  };
}

// Data aggregation function
export function aggregateMultiSourceData(sourceIds: string[]): {
  totalRecords: number;
  sources: number;
  averageQuality: number;
  lastUpdate: Date;
} {
  const sources = DATA_SOURCES.filter(s => sourceIds.includes(s.id));

  return {
    totalRecords: sources.length * 500, // simulated
    sources: sources.length,
    averageQuality: sources.reduce((acc, s) => acc + s.reliability, 0) / sources.length,
    lastUpdate: new Date()
  };
}
