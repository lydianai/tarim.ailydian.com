// Global Agricultural Technology & Innovation Insights
// Based on research from Netherlands, Israel, Japan, and other agricultural leaders

export interface CountryAgriProfile {
  country: string;
  code: string;
  rank: number;
  innovationScore: number; // 0-100
  keyTechnologies: string[];
  majorAchievements: string[];
  agriculturalGDP: number; // billions USD
  arableLandPercentage: number;
  farmProductivity: number; // yield per hectare index
  waterEfficiency: number; // % recycled
  automationLevel: number; // % automated
  exportValue: number; // billions USD
  sustainabilityScore: number; // 0-100
  rdInvestment: number; // billions USD annually
}

export const GLOBAL_AGRI_LEADERS: CountryAgriProfile[] = [
  {
    country: 'Netherlands',
    code: 'NL',
    rank: 1,
    innovationScore: 98,
    keyTechnologies: [
      'Precision Agriculture',
      'Vertical Farming',
      'Advanced Greenhouses',
      'AI-powered Crop Management',
      'Drone Monitoring',
      'LED Growing Systems',
      'Hyperspectral Sensing',
      'Water Recirculation Systems'
    ],
    majorAchievements: [
      '2nd largest agricultural exporter globally',
      '90% less water usage in greenhouses',
      '25% productivity increase through precision farming',
      'Zero pesticide vertical farms in Amsterdam',
      '€17.28B agtech market value (2025)',
      'World leader in floriculture technology'
    ],
    agriculturalGDP: 104.8,
    arableLandPercentage: 25.8,
    farmProductivity: 195, // index: global average = 100
    waterEfficiency: 90,
    automationLevel: 85,
    exportValue: 111.0,
    sustainabilityScore: 92,
    rdInvestment: 1.0
  },
  {
    country: 'Israel',
    code: 'IL',
    rank: 2,
    innovationScore: 96,
    keyTechnologies: [
      'Drip Irrigation',
      'Desert Agriculture',
      'Wastewater Recycling',
      'Desalination Integration',
      'Precision Irrigation',
      'Biological Pest Control',
      'Heat-resistant Crop Varieties',
      'Smart Sensors & IoT'
    ],
    majorAchievements: [
      'Invented drip irrigation (1960s)',
      '90% wastewater recycled for agriculture (highest globally)',
      '70% less water, 150% more crops with drip irrigation',
      '300 tonnes/hectare tomato yield (vs 50t global avg)',
      '40% of crops grown in desert',
      'Volcani Center world-class R&D'
    ],
    agriculturalGDP: 7.2,
    arableLandPercentage: 13.7,
    farmProductivity: 280, // extremely high due to technology
    waterEfficiency: 90,
    automationLevel: 75,
    exportValue: 2.4,
    sustainabilityScore: 88,
    rdInvestment: 0.5
  },
  {
    country: 'Japan',
    code: 'JP',
    rank: 3,
    innovationScore: 94,
    keyTechnologies: [
      'Agricultural Robotics',
      'Autonomous Tractors',
      'AI Disease Detection',
      'Indoor Vertical Farms',
      'Smart Greenhouses',
      'IoT Sensor Networks',
      'Computer Vision Systems',
      'Automated Harvesting'
    ],
    majorAchievements: [
      'Leader in agricultural robotics',
      'Fully automated rice farms',
      'AI-powered yield prediction systems',
      'Advanced indoor farming facilities',
      'Kubota & Yanmar robotic innovations',
      'Addressing aging farmer population with technology'
    ],
    agriculturalGDP: 41.5,
    arableLandPercentage: 11.5,
    farmProductivity: 165,
    waterEfficiency: 70,
    automationLevel: 80,
    exportValue: 4.2,
    sustainabilityScore: 85,
    rdInvestment: 1.5
  },
  {
    country: 'USA',
    code: 'US',
    rank: 4,
    innovationScore: 90,
    keyTechnologies: [
      'Satellite-based Monitoring',
      'GPS-guided Equipment',
      'Variable Rate Application',
      'Big Data Analytics',
      'Crop Yield Modeling',
      'Genetic Engineering',
      'Precision Livestock Farming',
      'Blockchain Traceability'
    ],
    majorAchievements: [
      'Largest agricultural exporter',
      'Leader in crop genetics and GMO',
      'Advanced precision agriculture adoption',
      'Silicon Valley agtech hub',
      'NASA satellite data for agriculture',
      'USDA extensive research network'
    ],
    agriculturalGDP: 164.8,
    arableLandPercentage: 16.8,
    farmProductivity: 155,
    waterEfficiency: 45,
    automationLevel: 65,
    exportValue: 177.0,
    sustainabilityScore: 72,
    rdInvestment: 3.5
  },
  {
    country: 'Denmark',
    code: 'DK',
    rank: 5,
    innovationScore: 89,
    keyTechnologies: [
      'Sustainable Livestock Management',
      'Organic Farming Technology',
      'Renewable Energy Integration',
      'Precision Nitrogen Management',
      'Biogas from Agricultural Waste',
      'Digital Farm Management',
      'Animal Welfare Sensors',
      'Carbon Neutral Farming'
    ],
    majorAchievements: [
      'World leader in organic agriculture',
      '50% reduction in pesticide use',
      'Carbon-neutral farming by 2030 goal',
      'Advanced pig production technology',
      'Integration of renewables in farming',
      'Circular economy agriculture model'
    ],
    agriculturalGDP: 8.9,
    arableLandPercentage: 58.9,
    farmProductivity: 175,
    waterEfficiency: 75,
    automationLevel: 70,
    exportValue: 23.4,
    sustainabilityScore: 94,
    rdInvestment: 0.4
  },
  {
    country: 'Singapore',
    code: 'SG',
    rank: 6,
    innovationScore: 87,
    keyTechnologies: [
      'Urban Vertical Farming',
      'Rooftop Agriculture',
      'Hydroponic Systems',
      'Aquaponics',
      'LED Lighting Technology',
      'Climate Control Systems',
      'Space-efficient Design',
      'Alternative Proteins'
    ],
    majorAchievements: [
      'Leader in urban agriculture',
      '30% food self-sufficiency by 2030 goal',
      'Sky Greens vertical farm innovation',
      'High-tech greenhouse complexes',
      'Limited land maximized through technology',
      'Fish & vegetable integration systems'
    ],
    agriculturalGDP: 0.04,
    arableLandPercentage: 0.9,
    farmProductivity: 320, // extremely efficient due to urban tech
    waterEfficiency: 85,
    automationLevel: 90,
    exportValue: 0.5,
    sustainabilityScore: 86,
    rdInvestment: 0.2
  },
  {
    country: 'Germany',
    code: 'DE',
    rank: 7,
    innovationScore: 86,
    keyTechnologies: [
      'Industry 4.0 Agriculture',
      'Smart Farming Platforms',
      'Agricultural Drones',
      'Soil Sensors',
      'Farm Management Software',
      'Biotech Crop Protection',
      'Renewable Energy Farms',
      'Digital Twin Technology'
    ],
    majorAchievements: [
      'Leader in agricultural engineering',
      'Advanced farm machinery',
      'Integration of AI in crop management',
      'Strong organic farming sector',
      'BASF & Bayer innovation centers',
      'Digital agriculture standardization'
    ],
    agriculturalGDP: 24.8,
    arableLandPercentage: 33.1,
    farmProductivity: 170,
    waterEfficiency: 65,
    automationLevel: 75,
    exportValue: 84.5,
    sustainabilityScore: 83,
    rdInvestment: 1.2
  },
  {
    country: 'China',
    code: 'CN',
    rank: 8,
    innovationScore: 82,
    keyTechnologies: [
      'E-commerce Agriculture',
      'Mobile Payment Integration',
      'Blockchain Traceability',
      'Large-scale Automation',
      'Facial Recognition for Livestock',
      'Big Data Crop Insurance',
      'Smart Irrigation Networks',
      '5G-enabled Farms'
    ],
    majorAchievements: [
      'Largest agricultural producer globally',
      'Rapid agtech adoption',
      'E-commerce revolutionizing rural farming',
      'Massive investments in automation',
      'Leading rice and wheat production',
      'AI-powered pig farming'
    ],
    agriculturalGDP: 1352.0,
    arableLandPercentage: 11.3,
    farmProductivity: 125,
    waterEfficiency: 55,
    automationLevel: 50,
    exportValue: 79.5,
    sustainabilityScore: 65,
    rdInvestment: 5.8
  }
];

export interface TechnologyComparison {
  technology: string;
  description: string;
  adoptionRate: {
    usa: number;
    netherlands: number;
    israel: number;
    japan: number;
    global: number;
  };
  impactOnYield: number; // % increase
  impactOnWaterUsage: number; // % reduction
  impactOnCosts: number; // % change (negative = cost increase)
  readinessLevel: string; // 'Research', 'Pilot', 'Commercial', 'Mature'
}

export const TECHNOLOGY_COMPARISONS: TechnologyComparison[] = [
  {
    technology: 'Precision Irrigation',
    description: 'Drip irrigation and smart watering systems with sensor feedback',
    adoptionRate: { usa: 45, netherlands: 90, israel: 95, japan: 70, global: 25 },
    impactOnYield: 15,
    impactOnWaterUsage: -70,
    impactOnCosts: 20,
    readinessLevel: 'Mature'
  },
  {
    technology: 'Autonomous Tractors & Machinery',
    description: 'Self-driving agricultural equipment with GPS and AI',
    adoptionRate: { usa: 35, netherlands: 60, israel: 40, japan: 75, global: 15 },
    impactOnYield: 10,
    impactOnWaterUsage: 0,
    impactOnCosts: 25,
    readinessLevel: 'Commercial'
  },
  {
    technology: 'Vertical Farming',
    description: 'Indoor multi-layer crop production with LED lighting',
    adoptionRate: { usa: 20, netherlands: 85, israel: 30, japan: 65, global: 8 },
    impactOnYield: 300,
    impactOnWaterUsage: -95,
    impactOnCosts: -40,
    readinessLevel: 'Commercial'
  },
  {
    technology: 'AI Crop Disease Detection',
    description: 'Computer vision and machine learning for early disease identification',
    adoptionRate: { usa: 25, netherlands: 70, israel: 60, japan: 80, global: 12 },
    impactOnYield: 20,
    impactOnWaterUsage: 0,
    impactOnCosts: 15,
    readinessLevel: 'Commercial'
  },
  {
    technology: 'Satellite & Drone Monitoring',
    description: 'NDVI and multispectral imaging for crop health assessment',
    adoptionRate: { usa: 55, netherlands: 80, israel: 75, japan: 60, global: 20 },
    impactOnYield: 12,
    impactOnWaterUsage: -5,
    impactOnCosts: 18,
    readinessLevel: 'Mature'
  },
  {
    technology: 'Blockchain Traceability',
    description: 'Supply chain transparency from farm to consumer',
    adoptionRate: { usa: 15, netherlands: 45, israel: 25, japan: 35, global: 8 },
    impactOnYield: 0,
    impactOnWaterUsage: 0,
    impactOnCosts: 5,
    readinessLevel: 'Pilot'
  },
  {
    technology: 'Gene Editing (CRISPR)',
    description: 'Precision breeding for disease resistance and climate adaptation',
    adoptionRate: { usa: 40, netherlands: 35, israel: 50, japan: 30, global: 10 },
    impactOnYield: 25,
    impactOnWaterUsage: -15,
    impactOnCosts: 30,
    readinessLevel: 'Commercial'
  },
  {
    technology: 'IoT Sensor Networks',
    description: 'Real-time monitoring of soil, weather, and crop conditions',
    adoptionRate: { usa: 40, netherlands: 85, israel: 80, japan: 75, global: 18 },
    impactOnYield: 18,
    impactOnWaterUsage: -25,
    impactOnCosts: 22,
    readinessLevel: 'Mature'
  },
  {
    technology: 'Robotic Harvesting',
    description: 'Automated picking and sorting of fruits and vegetables',
    adoptionRate: { usa: 12, netherlands: 40, israel: 20, japan: 55, global: 5 },
    impactOnYield: 8,
    impactOnWaterUsage: 0,
    impactOnCosts: 35,
    readinessLevel: 'Commercial'
  },
  {
    technology: 'Biological Pest Control',
    description: 'Beneficial insects and microorganisms instead of chemicals',
    adoptionRate: { usa: 30, netherlands: 75, israel: 85, japan: 50, global: 20 },
    impactOnYield: 5,
    impactOnWaterUsage: 0,
    impactOnCosts: 10,
    readinessLevel: 'Mature'
  }
];

// Helper functions
export function getTopAgriCountries(limit: number = 10): CountryAgriProfile[] {
  return GLOBAL_AGRI_LEADERS.sort((a, b) => a.rank - b.rank).slice(0, limit);
}

export function getCountryByCode(code: string): CountryAgriProfile | undefined {
  return GLOBAL_AGRI_LEADERS.find(c => c.code === code);
}

export function compareCountries(code1: string, code2: string) {
  const country1 = getCountryByCode(code1);
  const country2 = getCountryByCode(code2);

  if (!country1 || !country2) return null;

  return {
    country1: country1.country,
    country2: country2.country,
    innovationGap: country1.innovationScore - country2.innovationScore,
    productivityGap: country1.farmProductivity - country2.farmProductivity,
    sustainabilityGap: country1.sustainabilityScore - country2.sustainabilityScore,
    automationGap: country1.automationLevel - country2.automationLevel,
    waterEfficiencyGap: country1.waterEfficiency - country2.waterEfficiency
  };
}

export function getTechnologyAdoptionGap(country: string, technology: string) {
  const tech = TECHNOLOGY_COMPARISONS.find(t => t.technology === technology);
  if (!tech) return null;

  const countryRate = tech.adoptionRate[country.toLowerCase() as keyof typeof tech.adoptionRate];
  return countryRate ? countryRate - tech.adoptionRate.global : null;
}

export function getHighImpactTechnologies(minYieldIncrease: number = 15) {
  return TECHNOLOGY_COMPARISONS.filter(t => t.impactOnYield >= minYieldIncrease);
}
