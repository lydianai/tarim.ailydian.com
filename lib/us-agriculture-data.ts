// US Agriculture Data Structures and Regulations
// Comprehensive data for US farming operations

export interface USCropType {
  id: string;
  name: string;
  commonName: string;
  category: 'grain' | 'oilseed' | 'fiber' | 'vegetable' | 'fruit' | 'forage';
  growingRegions: string[]; // US States
  growingSeason: {
    plantingStart: number; // month (1-12)
    plantingEnd: number;
    harvestStart: number;
    harvestEnd: number;
  };
  averageYield: {
    value: number;
    unit: 'bu/acre' | 'tons/acre' | 'lbs/acre';
  };
  waterRequirement: 'low' | 'medium' | 'high';
  pesticideApplications: number; // typical number per season
  cropInsuranceAvailable: boolean;
}

export const US_CROP_TYPES: USCropType[] = [
  {
    id: 'corn',
    name: 'Corn (Maize)',
    commonName: 'Corn',
    category: 'grain',
    growingRegions: ['IA', 'IL', 'NE', 'MN', 'IN', 'SD', 'OH', 'WI', 'MO', 'KS'],
    growingSeason: {
      plantingStart: 4, // April
      plantingEnd: 6,   // June
      harvestStart: 9,  // September
      harvestEnd: 11    // November
    },
    averageYield: {
      value: 177,
      unit: 'bu/acre'
    },
    waterRequirement: 'medium',
    pesticideApplications: 3,
    cropInsuranceAvailable: true
  },
  {
    id: 'soybeans',
    name: 'Soybeans',
    commonName: 'Soybeans',
    category: 'oilseed',
    growingRegions: ['IL', 'IA', 'MN', 'NE', 'IN', 'MO', 'OH', 'SD', 'ND', 'AR'],
    growingSeason: {
      plantingStart: 5,
      plantingEnd: 6,
      harvestStart: 9,
      harvestEnd: 10
    },
    averageYield: {
      value: 52,
      unit: 'bu/acre'
    },
    waterRequirement: 'medium',
    pesticideApplications: 2,
    cropInsuranceAvailable: true
  },
  {
    id: 'wheat_winter',
    name: 'Winter Wheat',
    commonName: 'Wheat',
    category: 'grain',
    growingRegions: ['KS', 'MT', 'ND', 'WA', 'OK', 'TX', 'CO', 'SD', 'NE', 'ID'],
    growingSeason: {
      plantingStart: 9,
      plantingEnd: 11,
      harvestStart: 6,
      harvestEnd: 8
    },
    averageYield: {
      value: 52,
      unit: 'bu/acre'
    },
    waterRequirement: 'medium',
    pesticideApplications: 2,
    cropInsuranceAvailable: true
  },
  {
    id: 'cotton',
    name: 'Cotton',
    commonName: 'Cotton',
    category: 'fiber',
    growingRegions: ['TX', 'GA', 'AR', 'MS', 'NC', 'CA', 'AL', 'LA', 'TN', 'SC'],
    growingSeason: {
      plantingStart: 4,
      plantingEnd: 6,
      harvestStart: 9,
      harvestEnd: 11
    },
    averageYield: {
      value: 900,
      unit: 'lbs/acre'
    },
    waterRequirement: 'high',
    pesticideApplications: 5,
    cropInsuranceAvailable: true
  },
  {
    id: 'rice',
    name: 'Rice',
    commonName: 'Rice',
    category: 'grain',
    growingRegions: ['AR', 'CA', 'LA', 'MS', 'MO', 'TX'],
    growingSeason: {
      plantingStart: 3,
      plantingEnd: 6,
      harvestStart: 8,
      harvestEnd: 10
    },
    averageYield: {
      value: 7500,
      unit: 'lbs/acre'
    },
    waterRequirement: 'high',
    pesticideApplications: 3,
    cropInsuranceAvailable: true
  },
  {
    id: 'alfalfa',
    name: 'Alfalfa',
    commonName: 'Alfalfa',
    category: 'forage',
    growingRegions: ['CA', 'ID', 'MT', 'SD', 'WI', 'NE', 'NM', 'NV', 'CO', 'WY'],
    growingSeason: {
      plantingStart: 3,
      plantingEnd: 9,
      harvestStart: 5,
      harvestEnd: 10
    },
    averageYield: {
      value: 4.5,
      unit: 'tons/acre'
    },
    waterRequirement: 'high',
    pesticideApplications: 1,
    cropInsuranceAvailable: true
  }
];

// FAA Part 107 Drone Regulations for Agriculture
export interface FAARegulation {
  rule: string;
  description: string;
  requirement: string;
  penalty: string;
}

export const FAA_PART_107_REGULATIONS: FAARegulation[] = [
  {
    rule: '107.31 - Visual Line of Sight',
    description: 'Drone must remain within visual line of sight of operator',
    requirement: 'Maximum distance: typically 1/2 mile',
    penalty: 'Up to $1,100 civil penalty per violation'
  },
  {
    rule: '107.51 - Operating Limitations',
    description: 'Maximum altitude and speed restrictions',
    requirement: 'Max altitude: 400ft AGL, Max speed: 100mph',
    penalty: 'Civil penalties and potential license suspension'
  },
  {
    rule: '107.19 - Remote Pilot Certification',
    description: 'Operator must hold valid remote pilot certificate',
    requirement: 'Pass FAA aeronautical knowledge test',
    penalty: 'Criminal penalties for operating without certificate'
  },
  {
    rule: '107.39 - Daylight Operations',
    description: 'Operations only during daylight or civil twilight',
    requirement: 'Night operations require waiver and anti-collision lighting',
    penalty: 'Up to $1,100 civil penalty per violation'
  },
  {
    rule: '107.41 - No Flight Over People',
    description: 'Restrictions on flying over humans',
    requirement: 'Category-specific requirements based on drone weight/design',
    penalty: 'Civil and criminal penalties possible'
  }
];

// EPA Pesticide Application Requirements
export interface EPAPesticideRequirement {
  regulation: string;
  description: string;
  applicationType: 'aerial' | 'ground' | 'both';
  recordKeeping: string;
}

export const EPA_PESTICIDE_REQUIREMENTS: EPAPesticideRequirement[] = [
  {
    regulation: 'FIFRA Section 3',
    description: 'Pesticide Registration Requirements',
    applicationType: 'both',
    recordKeeping: 'Maintain EPA registration number for all pesticides'
  },
  {
    regulation: 'WPS - Worker Protection Standard',
    description: 'Protects agricultural workers from pesticide exposure',
    applicationType: 'both',
    recordKeeping: 'Record application date, time, location, pesticide used, applicator name'
  },
  {
    regulation: 'Drift Reduction Technology',
    description: 'Requirements for minimizing pesticide drift',
    applicationType: 'aerial',
    recordKeeping: 'Document wind speed, direction, temperature, humidity at application time'
  },
  {
    regulation: 'REI - Restricted Entry Interval',
    description: 'Time period after application before workers can enter field',
    applicationType: 'both',
    recordKeeping: 'Post warning signs, record REI period for each pesticide'
  }
];

// State-Specific Drone Regulations
export interface StateRegulation {
  state: string;
  stateCode: string;
  additionalRequirements: string[];
  restrictions: string[];
  permitRequired: boolean;
}

export const STATE_DRONE_REGULATIONS: StateRegulation[] = [
  {
    state: 'California',
    stateCode: 'CA',
    additionalRequirements: [
      'Commercial operators must register with CDFA',
      'Maintain liability insurance minimum $1 million'
    ],
    restrictions: [
      'No flights over critical infrastructure',
      'Special permits required for National Parks'
    ],
    permitRequired: true
  },
  {
    state: 'Iowa',
    stateCode: 'IA',
    additionalRequirements: [
      'Register commercial ag drone operations with Iowa DOT',
      'Report all flights over 1000 acres'
    ],
    restrictions: [
      'Restricted operations near livestock facilities',
      '500ft buffer from residential areas'
    ],
    permitRequired: true
  },
  {
    state: 'Texas',
    stateCode: 'TX',
    additionalRequirements: [
      'Commercial applicators need TDA license',
      'Minimum $100,000 liability coverage'
    ],
    restrictions: [
      'No operations over private property without consent',
      'Restricted near oil/gas facilities'
    ],
    permitRequired: true
  },
  {
    state: 'Kansas',
    stateCode: 'KS',
    additionalRequirements: [
      'Register with Kansas Department of Agriculture',
      'Complete state-specific training program'
    ],
    restrictions: [
      '1000ft from schools during school hours',
      'Restricted near feedlots'
    ],
    permitRequired: false
  }
];

// USDA Field Data Formats
export interface USDAFieldData {
  fieldId: string;
  farmId: string;
  county: string;
  state: string;
  acreage: number;
  legalDescription: {
    township: string;
    range: string;
    section: string;
  };
  soilType: string;
  cropHistory: {
    year: number;
    crop: string;
    yield: number;
    unit: string;
  }[];
  conservationPractices: string[];
}

// Drone Activity Log for Compliance
export interface DroneActivityLog {
  timestamp: Date;
  droneId: string;
  operatorName: string;
  operatorCertificate: string; // FAA Part 107 certificate number
  activityType: 'survey' | 'spray' | 'monitoring' | 'inspection';
  location: {
    lat: number;
    lng: number;
    fieldId?: string;
    county: string;
    state: string;
  };
  flightDuration: number; // minutes
  areaCovered: number; // acres
  maxAltitude: number; // feet AGL
  maxSpeed: number; // mph
  cropType: string;
  dataCollected: {
    images: number;
    ndviReadings: number;
    thermalImages: number;
    multispectralImages: number;
  };
  chemicals?: {
    type: string;
    epaRegistrationNumber: string;
    amount: number;
    unit: 'gallons' | 'liters' | 'pounds';
    applicationRate: number;
    windSpeed: number; // mph
    windDirection: number; // degrees
    temperature: number; // F
    humidity: number; // %
    targetPest?: string;
  };
  weatherConditions: {
    temperature: number; // F
    humidity: number;
    windSpeed: number; // mph
    windDirection: number; // degrees
    precipitation: number; // inches
    visibility: number; // miles
  };
  safetyChecks: {
    preFlightInspection: boolean;
    batteryCheck: boolean;
    weatherAssessment: boolean;
    airspaceCleared: boolean;
    noFlightZoneCheck: boolean;
  };
  incidents: string[];
  notes: string;
}

// Helper functions
export function getCropByState(stateCode: string): USCropType[] {
  return US_CROP_TYPES.filter(crop =>
    crop.growingRegions.includes(stateCode)
  );
}

export function getCurrentSeasonCrops(stateCode: string, month: number): USCropType[] {
  const stateCrops = getCropByState(stateCode);
  return stateCrops.filter(crop => {
    const { plantingStart, plantingEnd, harvestStart, harvestEnd } = crop.growingSeason;

    // Check if in planting season
    if (plantingStart <= plantingEnd) {
      if (month >= plantingStart && month <= plantingEnd) return true;
    } else {
      if (month >= plantingStart || month <= plantingEnd) return true;
    }

    // Check if in harvest season
    if (harvestStart <= harvestEnd) {
      if (month >= harvestStart && month <= harvestEnd) return true;
    } else {
      if (month >= harvestStart || month <= harvestEnd) return true;
    }

    return false;
  });
}

export function validateDroneOperation(log: Partial<DroneActivityLog>): {
  valid: boolean;
  violations: string[];
  warnings: string[];
} {
  const violations: string[] = [];
  const warnings: string[] = [];

  // Check altitude
  if (log.maxAltitude && log.maxAltitude > 400) {
    violations.push('Maximum altitude exceeds 400ft AGL (FAA 107.51)');
  }

  // Check speed
  if (log.maxSpeed && log.maxSpeed > 100) {
    violations.push('Maximum speed exceeds 100mph (FAA 107.51)');
  }

  // Check chemical application conditions
  if (log.chemicals) {
    if (log.chemicals.windSpeed > 10) {
      violations.push('Wind speed too high for pesticide application (EPA guidelines)');
    }
    if (log.chemicals.temperature > 90) {
      warnings.push('High temperature may affect pesticide effectiveness');
    }
    if (!log.chemicals.epaRegistrationNumber) {
      violations.push('Missing EPA registration number for pesticide');
    }
  }

  // Check safety
  if (log.safetyChecks) {
    const allChecks = Object.values(log.safetyChecks).every(check => check === true);
    if (!allChecks) {
      violations.push('Not all pre-flight safety checks completed');
    }
  }

  // Check operator certification
  if (log.operatorCertificate && !log.operatorCertificate.match(/^\d+$/)) {
    warnings.push('Operator certificate number format may be invalid');
  }

  return {
    valid: violations.length === 0,
    violations,
    warnings
  };
}

// Convert hectares to acres
export function hectaresToAcres(hectares: number): number {
  return hectares * 2.47105;
}

// Convert acres to hectares
export function acresToHectares(acres: number): number {
  return acres / 2.47105;
}

// Convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

// Convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}
