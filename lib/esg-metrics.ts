// ESG (Environmental, Social, Governance) Metrics for Agriculture
// Based on Verra VCS, Gold Standard, and industry best practices

export interface CarbonCreditData {
  creditId: string;
  farmId: string;
  farmName: string;
  methodology: 'Verra VCS' | 'Gold Standard' | 'Climate Action Reserve' | 'American Carbon Registry';
  projectType: 'Soil Carbon Sequestration' | 'Avoided Deforestation' | 'Renewable Energy' | 'Methane Reduction';
  verificationStandard: string;
  creditsGenerated: number; // tons CO2e
  creditPrice: number; // USD per ton
  totalValue: number; // USD
  verificationDate: string;
  expiryDate: string;
  status: 'Active' | 'Retired' | 'Pending';
  buyer?: string;
}

export interface EnvironmentalMetrics {
  carbonFootprint: {
    scope1: number; // Direct emissions (farm operations)
    scope2: number; // Indirect emissions (purchased electricity)
    scope3: number; // Value chain emissions
    total: number; // tons CO2e
    reduction: number; // percentage vs baseline
  };
  waterUsage: {
    totalUsed: number; // gallons
    efficiency: number; // percentage
    savedVsBaseline: number; // gallons
    cwp: number; // Crop Water Productivity (kg/m³)
  };
  soilHealth: {
    organicMatterIncrease: number; // percentage
    erosionReduction: number; // percentage
    biodiversityIndex: number; // 0-100 score
    carbonSequestered: number; // tons CO2/year
  };
  biodiversity: {
    nativePollinator: number; // count
    birdSpecies: number; // count
    beneficialInsects: number; // count
    habitatAcres: number;
  };
}

export interface SocialMetrics {
  employment: {
    totalEmployees: number;
    fullTime: number;
    seasonal: number;
    womenEmployment: number; // percentage
    minorityEmployment: number; // percentage
  };
  laborPractices: {
    fairWages: boolean;
    safetyCertification: string;
    trainingHours: number;
    incidentRate: number; // per 100 workers
  };
  communityImpact: {
    localSourcing: number; // percentage
    communityInvestment: number; // USD
    foodDonations: number; // lbs
    educationPrograms: number;
  };
  farmWorkerWellbeing: {
    healthInsuranceProvided: boolean;
    housingQuality: 'Standard' | 'Above Average' | 'Excellent';
    childcareAvailable: boolean;
    satisfactionScore: number; // 0-100
  };
}

export interface GovernanceMetrics {
  certifications: string[];
  auditFrequency: 'Monthly' | 'Quarterly' | 'Annual';
  lastAuditDate: string;
  auditScore: number; // 0-100
  transparencyLevel: 'Basic' | 'Standard' | 'Advanced' | 'Full';
  dataSharing: boolean;
  traceability: {
    blockchainEnabled: boolean;
    qrCodeTracking: boolean;
    thirdPartyVerified: boolean;
  };
  compliance: {
    fsma: boolean;
    gap: boolean; // Good Agricultural Practices
    gfsi: boolean; // Global Food Safety Initiative
    organic: boolean;
  };
}

export interface ESGScore {
  environmental: number; // 0-100
  social: number; // 0-100
  governance: number; // 0-100
  overall: number; // 0-100
  rating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C';
}

export interface ComprehensiveESG {
  farmId: string;
  farmName: string;
  reportingPeriod: string;
  environmental: EnvironmentalMetrics;
  social: SocialMetrics;
  governance: GovernanceMetrics;
  carbonCredits: CarbonCreditData[];
  esgScore: ESGScore;
  benchmarkComparison: {
    industryAverage: number;
    topPerformer: number;
    percentile: number;
  };
  investmentAttractiveness: {
    score: number; // 0-100
    risks: string[];
    opportunities: string[];
  };
}

// Sample ESG data for demonstration
export const SAMPLE_ESG_DATA: ComprehensiveESG[] = [
  {
    farmId: 'FARM-CA-001',
    farmName: 'Green Valley Organic Farm',
    reportingPeriod: '2025-Q3',
    environmental: {
      carbonFootprint: {
        scope1: 125,
        scope2: 45,
        scope3: 180,
        total: 350,
        reduction: 28
      },
      waterUsage: {
        totalUsed: 850000,
        efficiency: 92,
        savedVsBaseline: 175000,
        cwp: 4.2
      },
      soilHealth: {
        organicMatterIncrease: 15,
        erosionReduction: 65,
        biodiversityIndex: 87,
        carbonSequestered: 3.5
      },
      biodiversity: {
        nativePollinator: 45,
        birdSpecies: 23,
        beneficialInsects: 156,
        habitatAcres: 12
      }
    },
    social: {
      employment: {
        totalEmployees: 48,
        fullTime: 28,
        seasonal: 20,
        womenEmployment: 42,
        minorityEmployment: 35
      },
      laborPractices: {
        fairWages: true,
        safetyCertification: 'OSHA Compliant',
        trainingHours: 120,
        incidentRate: 0.8
      },
      communityImpact: {
        localSourcing: 78,
        communityInvestment: 45000,
        foodDonations: 12500,
        educationPrograms: 6
      },
      farmWorkerWellbeing: {
        healthInsuranceProvided: true,
        housingQuality: 'Above Average',
        childcareAvailable: true,
        satisfactionScore: 88
      }
    },
    governance: {
      certifications: ['USDA Organic', 'Regenerative Organic Certified', 'Fair Trade', 'B Corp'],
      auditFrequency: 'Quarterly',
      lastAuditDate: '2025-09-15',
      auditScore: 94,
      transparencyLevel: 'Full',
      dataSharing: true,
      traceability: {
        blockchainEnabled: true,
        qrCodeTracking: true,
        thirdPartyVerified: true
      },
      compliance: {
        fsma: true,
        gap: true,
        gfsi: true,
        organic: true
      }
    },
    carbonCredits: [
      {
        creditId: 'VCS-2025-001',
        farmId: 'FARM-CA-001',
        farmName: 'Green Valley Organic Farm',
        methodology: 'Verra VCS',
        projectType: 'Soil Carbon Sequestration',
        verificationStandard: 'VCS Standard v4.3',
        creditsGenerated: 450,
        creditPrice: 25,
        totalValue: 11250,
        verificationDate: '2025-07-01',
        expiryDate: '2030-06-30',
        status: 'Active',
        buyer: 'Microsoft Carbon Removal Program'
      },
      {
        creditId: 'GS-2025-002',
        farmId: 'FARM-CA-001',
        farmName: 'Green Valley Organic Farm',
        methodology: 'Gold Standard',
        projectType: 'Renewable Energy',
        verificationStandard: 'Gold Standard for the Global Goals',
        creditsGenerated: 180,
        creditPrice: 28,
        totalValue: 5040,
        verificationDate: '2025-08-15',
        expiryDate: '2030-08-14',
        status: 'Active'
      }
    ],
    esgScore: {
      environmental: 92,
      social: 88,
      governance: 94,
      overall: 91,
      rating: 'AAA'
    },
    benchmarkComparison: {
      industryAverage: 68,
      topPerformer: 95,
      percentile: 89
    },
    investmentAttractiveness: {
      score: 93,
      risks: ['Climate variability', 'Market price fluctuations'],
      opportunities: ['Carbon credit revenue', 'Premium organic pricing', 'ESG-focused investors', 'Government incentives']
    }
  },
  {
    farmId: 'FARM-IA-002',
    farmName: 'Heartland Family Farm',
    reportingPeriod: '2025-Q3',
    environmental: {
      carbonFootprint: {
        scope1: 280,
        scope2: 95,
        scope3: 320,
        total: 695,
        reduction: 12
      },
      waterUsage: {
        totalUsed: 1250000,
        efficiency: 78,
        savedVsBaseline: 95000,
        cwp: 3.1
      },
      soilHealth: {
        organicMatterIncrease: 8,
        erosionReduction: 45,
        biodiversityIndex: 72,
        carbonSequestered: 1.8
      },
      biodiversity: {
        nativePollinator: 28,
        birdSpecies: 15,
        beneficialInsects: 89,
        habitatAcres: 7
      }
    },
    social: {
      employment: {
        totalEmployees: 32,
        fullTime: 18,
        seasonal: 14,
        womenEmployment: 31,
        minorityEmployment: 22
      },
      laborPractices: {
        fairWages: true,
        safetyCertification: 'OSHA Compliant',
        trainingHours: 85,
        incidentRate: 1.2
      },
      communityImpact: {
        localSourcing: 65,
        communityInvestment: 28000,
        foodDonations: 8500,
        educationPrograms: 4
      },
      farmWorkerWellbeing: {
        healthInsuranceProvided: true,
        housingQuality: 'Standard',
        childcareAvailable: false,
        satisfactionScore: 79
      }
    },
    governance: {
      certifications: ['Non-GMO Project Verified', 'Certified Humane', 'USDA GAP'],
      auditFrequency: 'Annual',
      lastAuditDate: '2025-03-20',
      auditScore: 82,
      transparencyLevel: 'Standard',
      dataSharing: true,
      traceability: {
        blockchainEnabled: false,
        qrCodeTracking: true,
        thirdPartyVerified: true
      },
      compliance: {
        fsma: true,
        gap: true,
        gfsi: false,
        organic: false
      }
    },
    carbonCredits: [
      {
        creditId: 'CAR-2025-003',
        farmId: 'FARM-IA-002',
        farmName: 'Heartland Family Farm',
        methodology: 'Climate Action Reserve',
        projectType: 'Soil Carbon Sequestration',
        verificationStandard: 'CAR Soil Enrichment Protocol',
        creditsGenerated: 215,
        creditPrice: 22,
        totalValue: 4730,
        verificationDate: '2025-06-10',
        expiryDate: '2030-06-09',
        status: 'Active'
      }
    ],
    esgScore: {
      environmental: 76,
      social: 78,
      governance: 82,
      overall: 79,
      rating: 'A'
    },
    benchmarkComparison: {
      industryAverage: 68,
      topPerformer: 95,
      percentile: 72
    },
    investmentAttractiveness: {
      score: 78,
      risks: ['Limited certifications', 'Water efficiency improvements needed', 'Blockchain adoption pending'],
      opportunities: ['Precision agriculture adoption', 'Carbon credit expansion', 'Organic transition potential']
    }
  }
];

// Investment ROI Metrics
export interface InvestmentROI {
  category: string;
  investmentAmount: number; // USD
  annualReturn: number; // USD
  roi: number; // percentage
  paybackPeriod: number; // years
  npv: number; // Net Present Value
  irr: number; // Internal Rate of Return (percentage)
}

export const INVESTMENT_ROI_DATA: InvestmentROI[] = [
  {
    category: 'Precision Agriculture (IoT Sensors)',
    investmentAmount: 125000,
    annualReturn: 45000,
    roi: 36,
    paybackPeriod: 2.8,
    npv: 185000,
    irr: 28
  },
  {
    category: 'Drip Irrigation System',
    investmentAmount: 85000,
    annualReturn: 38000,
    roi: 45,
    paybackPeriod: 2.2,
    npv: 210000,
    irr: 35
  },
  {
    category: 'Carbon Credit Program',
    investmentAmount: 45000,
    annualReturn: 28000,
    roi: 62,
    paybackPeriod: 1.6,
    npv: 165000,
    irr: 48
  },
  {
    category: 'Regenerative Practices',
    investmentAmount: 95000,
    annualReturn: 42000,
    roi: 44,
    paybackPeriod: 2.3,
    npv: 195000,
    irr: 36
  },
  {
    category: 'Blockchain Traceability',
    investmentAmount: 65000,
    annualReturn: 32000,
    roi: 49,
    paybackPeriod: 2.0,
    npv: 175000,
    irr: 40
  }
];
