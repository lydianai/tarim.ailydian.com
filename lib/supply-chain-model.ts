// Supply Chain Traceability Model - Farm to Consumer
// Based on FDA FSMA 204, GS1 Standards, and Blockchain Best Practices

export interface FarmOrigin {
  farmId: string;
  farmName: string;
  location: {
    address: string;
    county: string;
    state: string;
    coordinates: { lat: number; lon: number };
  };
  certifications: string[]; // USDA Organic, GAP, Rainforest Alliance, etc.
  soilHealth: {
    organicMatter: number; // percentage
    pH: number;
    nitrogen: number; // ppm
    phosphorus: number; // ppm
    potassium: number; // ppm
    carbonSequestration: number; // tons CO2/acre/year
  };
  practices: ('organic' | 'regenerative' | 'precision' | 'conventional')[];
  waterSource: string;
}

export interface CropHarvest {
  harvestId: string;
  cropType: string;
  varietyName: string;
  plantingDate: string;
  harvestDate: string;
  quantity: number;
  unit: 'lbs' | 'tons' | 'bushels';
  qualityGrade: 'A' | 'B' | 'C' | 'Premium';
  pesticidesUsed: {
    productName: string;
    activeIngredient: string;
    applicationDate: string;
    daysToHarvest: number;
  }[];
  fertilizersUsed: {
    type: string;
    applicationRate: number;
    applicationDate: string;
  }[];
  irrigationData: {
    totalWaterUsed: number; // gallons
    efficiency: number; // percentage
    method: 'drip' | 'sprinkler' | 'flood' | 'precision';
  };
}

export interface ProcessingStage {
  processingId: string;
  facilityName: string;
  facilityLocation: string;
  certifications: string[]; // HACCP, SQF, BRC, etc.
  receivedDate: string;
  processedDate: string;
  processType: 'washing' | 'sorting' | 'packaging' | 'cold_storage' | 'processing';
  temperatureLog: {
    timestamp: string;
    temperature: number; // Fahrenheit
    humidity: number; // percentage
  }[];
  batchNumber: string;
  outputQuantity: number;
  qualityTests: {
    testType: string;
    result: string;
    passedDate: string;
  }[];
}

export interface DistributionStage {
  distributionId: string;
  distributorName: string;
  vehicleId: string;
  driverName: string;
  departureDate: string;
  arrivalDate: string;
  route: {
    origin: string;
    destination: string;
    distance: number; // miles
  };
  coldChainTracking: {
    timestamp: string;
    location: { lat: number; lon: number };
    temperature: number;
    humidity: number;
    doorStatus: 'open' | 'closed';
  }[];
  fuelEfficiency: number; // mpg for carbon footprint
}

export interface RetailStage {
  retailerId: string;
  storeName: string;
  storeLocation: string;
  receivedDate: string;
  shelfDate: string;
  expirationDate: string;
  storageConditions: {
    temperature: number;
    humidity: number;
    location: 'produce_section' | 'freezer' | 'cooler' | 'shelf';
  };
  price: number;
  priceBreakdown: {
    farmGate: number; // what farmer received
    processingCost: number;
    distributionCost: number;
    retailMarkup: number;
  };
}

export interface BlockchainRecord {
  blockchainId: string;
  transactionHash: string;
  timestamp: string;
  previousHash: string;
  dataHash: string; // SHA-256 hash of all data
  verified: boolean;
  verifier: string; // third-party auditor
}

export interface SupplyChainTraceability {
  traceabilityId: string; // GS1 GTIN or similar
  qrCode: string; // for consumer scanning
  product: {
    name: string;
    category: string;
    varietyName: string;
    packageSize: number;
    unit: string;
  };

  // Complete journey from farm to consumer
  journey: {
    farm: FarmOrigin;
    harvest: CropHarvest;
    processing: ProcessingStage[];
    distribution: DistributionStage[];
    retail: RetailStage;
  };

  // Sustainability metrics
  sustainability: {
    totalCarbonFootprint: number; // kg CO2e
    waterFootprint: number; // gallons
    foodMiles: number; // total distance traveled
    packagingRecyclability: number; // percentage
    carbonCreditsEarned: number; // from regenerative practices
  };

  // Blockchain verification
  blockchain: BlockchainRecord[];

  // Compliance
  compliance: {
    fsmaCertified: boolean;
    gs1Compliant: boolean;
    organicCertified: boolean;
    fairTradeCertified: boolean;
  };

  // Transparency score (0-100)
  transparencyScore: number;

  createdAt: string;
  lastUpdated: string;
}

// Sample data generation for demonstration
export function generateSampleSupplyChain(): SupplyChainTraceability {
  return {
    traceabilityId: 'GS1-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
    qrCode: 'QR-' + Math.random().toString(36).substr(2, 16).toUpperCase(),
    product: {
      name: 'Organic Heirloom Tomatoes',
      category: 'Vegetables',
      varietyName: 'Brandywine',
      packageSize: 2,
      unit: 'lbs'
    },
    journey: {
      farm: {
        farmId: 'FARM-CA-001',
        farmName: 'Green Valley Organic Farm',
        location: {
          address: '1234 Farm Road',
          county: 'Monterey County',
          state: 'California',
          coordinates: { lat: 36.5731, lon: -121.5101 }
        },
        certifications: ['USDA Organic', 'Certified Naturally Grown', 'Regenerative Organic Certified'],
        soilHealth: {
          organicMatter: 5.8,
          pH: 6.5,
          nitrogen: 45,
          phosphorus: 38,
          potassium: 210,
          carbonSequestration: 2.3
        },
        practices: ['organic', 'regenerative', 'precision'],
        waterSource: 'Groundwater with drip irrigation'
      },
      harvest: {
        harvestId: 'HRV-2025-001',
        cropType: 'Tomatoes',
        varietyName: 'Brandywine Heirloom',
        plantingDate: '2025-03-15',
        harvestDate: '2025-07-20',
        quantity: 5000,
        unit: 'lbs',
        qualityGrade: 'Premium',
        pesticidesUsed: [],
        fertilizersUsed: [
          {
            type: 'Compost (OMRI Listed)',
            applicationRate: 2,
            applicationDate: '2025-04-01'
          }
        ],
        irrigationData: {
          totalWaterUsed: 125000,
          efficiency: 92,
          method: 'drip'
        }
      },
      processing: [
        {
          processingId: 'PROC-001',
          facilityName: 'Central Valley Pack House',
          facilityLocation: 'Salinas, CA',
          certifications: ['HACCP', 'SQF Level 3', 'USDA Organic Handler'],
          receivedDate: '2025-07-20T14:30:00Z',
          processedDate: '2025-07-20T18:00:00Z',
          processType: 'washing',
          temperatureLog: [
            { timestamp: '2025-07-20T14:30:00Z', temperature: 38, humidity: 85 },
            { timestamp: '2025-07-20T16:00:00Z', temperature: 37, humidity: 86 },
            { timestamp: '2025-07-20T18:00:00Z', temperature: 38, humidity: 85 }
          ],
          batchNumber: 'BATCH-2025-07-20-A',
          outputQuantity: 4950,
          qualityTests: [
            { testType: 'E.coli', result: 'Negative', passedDate: '2025-07-20' },
            { testType: 'Salmonella', result: 'Negative', passedDate: '2025-07-20' },
            { testType: 'Pesticide Residue', result: 'None Detected', passedDate: '2025-07-20' }
          ]
        }
      ],
      distribution: [
        {
          distributionId: 'DIST-001',
          distributorName: 'Fresh Produce Logistics',
          vehicleId: 'TRUCK-345',
          driverName: 'John Smith (CDL #CA-12345)',
          departureDate: '2025-07-21T06:00:00Z',
          arrivalDate: '2025-07-22T14:30:00Z',
          route: {
            origin: 'Salinas, CA',
            destination: 'Los Angeles, CA',
            distance: 315
          },
          coldChainTracking: [
            { timestamp: '2025-07-21T06:00:00Z', location: { lat: 36.6777, lon: -121.6555 }, temperature: 36, humidity: 85, doorStatus: 'closed' },
            { timestamp: '2025-07-21T12:00:00Z', location: { lat: 35.3733, lon: -119.0187 }, temperature: 37, humidity: 84, doorStatus: 'closed' },
            { timestamp: '2025-07-22T14:30:00Z', location: { lat: 34.0522, lon: -118.2437 }, temperature: 36, humidity: 85, doorStatus: 'open' }
          ],
          fuelEfficiency: 6.8
        }
      ],
      retail: {
        retailerId: 'RETAIL-001',
        storeName: 'Whole Foods Market - Santa Monica',
        storeLocation: 'Santa Monica, CA',
        receivedDate: '2025-07-22T14:30:00Z',
        shelfDate: '2025-07-22T18:00:00Z',
        expirationDate: '2025-07-29',
        storageConditions: {
          temperature: 38,
          humidity: 85,
          location: 'produce_section'
        },
        price: 6.99,
        priceBreakdown: {
          farmGate: 2.50,
          processingCost: 0.75,
          distributionCost: 1.25,
          retailMarkup: 2.49
        }
      }
    },
    sustainability: {
      totalCarbonFootprint: 0.85, // kg CO2e per lb
      waterFootprint: 25, // gallons per lb
      foodMiles: 315,
      packagingRecyclability: 95,
      carbonCreditsEarned: 0.15 // from regenerative practices
    },
    blockchain: [
      {
        blockchainId: 'BLOCK-001',
        transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
        timestamp: '2025-07-20T14:30:00Z',
        previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        dataHash: 'SHA256-' + Math.random().toString(36).substr(2, 64).toUpperCase(),
        verified: true,
        verifier: 'FarmTrust Certification (Third-Party)'
      }
    ],
    compliance: {
      fsmaCertified: true,
      gs1Compliant: true,
      organicCertified: true,
      fairTradeCertified: false
    },
    transparencyScore: 98,
    createdAt: '2025-07-20T14:30:00Z',
    lastUpdated: '2025-07-22T18:00:00Z'
  };
}

// Generate multiple supply chain records
export const SUPPLY_CHAIN_RECORDS: SupplyChainTraceability[] = [
  generateSampleSupplyChain(),
  // Add more diverse examples
  {
    ...generateSampleSupplyChain(),
    traceabilityId: 'GS1-CORN-002',
    product: {
      name: 'Non-GMO Sweet Corn',
      category: 'Vegetables',
      varietyName: 'Silver Queen',
      packageSize: 6,
      unit: 'ears'
    },
    journey: {
      ...generateSampleSupplyChain().journey,
      farm: {
        ...generateSampleSupplyChain().journey.farm,
        farmId: 'FARM-IA-002',
        farmName: 'Heartland Family Farm',
        location: {
          address: '5678 County Road 12',
          county: 'Story County',
          state: 'Iowa',
          coordinates: { lat: 42.0267, lon: -93.6203 }
        },
        certifications: ['Non-GMO Project Verified', 'Certified Humane'],
        practices: ['precision', 'conventional']
      }
    },
    transparencyScore: 92
  },
  {
    ...generateSampleSupplyChain(),
    traceabilityId: 'GS1-APPLE-003',
    product: {
      name: 'Honeycrisp Apples',
      category: 'Fruits',
      varietyName: 'Honeycrisp',
      packageSize: 3,
      unit: 'lbs'
    },
    journey: {
      ...generateSampleSupplyChain().journey,
      farm: {
        ...generateSampleSupplyChain().journey.farm,
        farmId: 'FARM-WA-003',
        farmName: 'Cascade Orchards',
        location: {
          address: '9012 Orchard Lane',
          county: 'Yakima County',
          state: 'Washington',
          coordinates: { lat: 46.6021, lon: -120.5059 }
        },
        certifications: ['IPM Certified', 'SureHarvest Certified'],
        practices: ['precision']
      }
    },
    sustainability: {
      ...generateSampleSupplyChain().sustainability,
      totalCarbonFootprint: 0.45,
      waterFootprint: 18,
      foodMiles: 1120
    },
    transparencyScore: 95
  }
];
