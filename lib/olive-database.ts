// Comprehensive Turkish Olive Cultivation Database
// Based on real-world data from Turkey's olive industry (2024-2025)

export interface OliveVariety {
  id: string;
  name: string;
  nameTr: string;
  region: string[];
  oilContent: number; // percentage
  characteristics: string[];
  bestFor: 'oil' | 'table' | 'dual';
  maturityPeriod: string;
  yieldPerTree: number; // kg
  resistantTo: string[];
  susceptibleTo: string[];
  optimalTemp: { min: number; max: number };
  waterRequirement: 'low' | 'medium' | 'high';
  soilType: string[];
}

export interface OliveDisease {
  id: string;
  name: string;
  nameTr: string;
  scientificName: string;
  type: 'fungal' | 'bacterial' | 'viral';
  symptoms: string[];
  affectedParts: string[];
  spreadMethod: string[];
  economicImpact: number; // percentage loss
  seasonalRisk: {
    spring: 'low' | 'medium' | 'high';
    summer: 'low' | 'medium' | 'high';
    fall: 'low' | 'medium' | 'high';
    winter: 'low' | 'medium' | 'high';
  };
  prevention: string[];
  treatment: string[];
  organicControl: string[];
}

export interface OlivePest {
  id: string;
  name: string;
  nameTr: string;
  scientificName: string;
  type: 'insect' | 'mite' | 'nematode';
  lifecycle: string;
  damageType: string[];
  economicImpact: number; // percentage loss
  peakActivity: string[];
  detection: string[];
  prevention: string[];
  biologicalControl: string[];
  chemicalControl: string[];
  threshold: string;
}

export const TURKISH_OLIVE_VARIETIES: OliveVariety[] = [
  {
    id: 'ayvalik',
    name: 'Ayvalık',
    nameTr: 'Ayvalık',
    region: ['Aegean', 'Balıkesir', 'Çanakkale', 'İzmir'],
    oilContent: 22.5,
    characteristics: [
      'High quality oil',
      'Fruity aroma',
      'Low acidity',
      'Excellent for cold press',
      'Medium-sized fruit'
    ],
    bestFor: 'oil',
    maturityPeriod: 'October-December',
    yieldPerTree: 35,
    resistantTo: ['Cold', 'Drought'],
    susceptibleTo: ['Peacock Spot', 'Olive Fruit Fly'],
    optimalTemp: { min: -5, max: 38 },
    waterRequirement: 'medium',
    soilType: ['Clay-loam', 'Sandy-loam', 'Calcareous']
  },
  {
    id: 'gemlik',
    name: 'Gemlik',
    nameTr: 'Gemlik',
    region: ['Marmara', 'Bursa', 'Balıkesir'],
    oilContent: 28,
    characteristics: [
      'Excellent table olive',
      'High oil content',
      'Small to medium fruit',
      'Black ripe processing',
      'Dual-purpose'
    ],
    bestFor: 'dual',
    maturityPeriod: 'November-December',
    yieldPerTree: 40,
    resistantTo: ['Cold', 'Wind'],
    susceptibleTo: ['Verticillium Wilt', 'Olive Moth'],
    optimalTemp: { min: -8, max: 35 },
    waterRequirement: 'medium',
    soilType: ['Deep soil', 'Well-drained']
  },
  {
    id: 'memecik',
    name: 'Memecik',
    nameTr: 'Memecik',
    region: ['Aegean', 'Muğla', 'Aydın'],
    oilContent: 25,
    characteristics: [
      'High quality oil',
      'Large fruit',
      'High yield',
      'Late maturity',
      'Excellent flavor'
    ],
    bestFor: 'oil',
    maturityPeriod: 'December-January',
    yieldPerTree: 50,
    resistantTo: ['Heat', 'Drought'],
    susceptibleTo: ['Olive Fruit Fly', 'Anthracnose'],
    optimalTemp: { min: -3, max: 40 },
    waterRequirement: 'low',
    soilType: ['Rocky', 'Calcareous', 'Poor soil']
  },
  {
    id: 'domat',
    name: 'Domat',
    nameTr: 'Domat',
    region: ['Mediterranean', 'Hatay'],
    oilContent: 18,
    characteristics: [
      'Large fruit',
      'Excellent table olive',
      'Thick flesh',
      'Green processing',
      'High market value'
    ],
    bestFor: 'table',
    maturityPeriod: 'September-October',
    yieldPerTree: 45,
    resistantTo: ['Heat'],
    susceptibleTo: ['Peacock Spot', 'Olive Scale'],
    optimalTemp: { min: 0, max: 42 },
    waterRequirement: 'high',
    soilType: ['Deep soil', 'Fertile']
  },
  {
    id: 'memeli',
    name: 'Memeli',
    nameTr: 'Memeli',
    region: ['Aegean', 'İzmir'],
    oilContent: 24,
    characteristics: [
      'Dual-purpose',
      'Medium-large fruit',
      'Good oil quality',
      'Early maturity',
      'Consistent yield'
    ],
    bestFor: 'dual',
    maturityPeriod: 'October-November',
    yieldPerTree: 38,
    resistantTo: ['Wind', 'Drought'],
    susceptibleTo: ['Olive Fruit Fly'],
    optimalTemp: { min: -4, max: 38 },
    waterRequirement: 'medium',
    soilType: ['Clay-loam', 'Limestone']
  }
];

export const OLIVE_DISEASES: OliveDisease[] = [
  {
    id: 'peacock-spot',
    name: 'Peacock Spot Disease',
    nameTr: 'Halka Hastalığı',
    scientificName: 'Spilocaea oleaginea (Cycloconium oleaginum)',
    type: 'fungal',
    symptoms: [
      'Circular spots on leaves (peacock eye pattern)',
      'Yellow halo around spots',
      'Premature leaf drop',
      'Reduced photosynthesis',
      'Fruit lesions in severe cases'
    ],
    affectedParts: ['Leaves', 'Fruit', 'Young shoots'],
    spreadMethod: ['Rain splash', 'Wind', 'Irrigation water'],
    economicImpact: 15,
    seasonalRisk: {
      spring: 'high',
      summer: 'medium',
      fall: 'high',
      winter: 'medium'
    },
    prevention: [
      'Proper pruning for air circulation',
      'Avoid overhead irrigation',
      'Remove infected leaves',
      'Copper-based preventive sprays',
      'Maintain tree vigor'
    ],
    treatment: [
      'Copper oxychloride spray (autumn and spring)',
      'Bordeaux mixture application',
      'Systemic fungicides (severe cases)',
      'Remove and destroy infected material'
    ],
    organicControl: [
      'Copper sulfate (certified organic)',
      'Sulfur-based products',
      'Neem oil spray',
      'Bacillus subtilis biocontrol'
    ]
  },
  {
    id: 'verticillium-wilt',
    name: 'Verticillium Wilt',
    nameTr: 'Verticillium Solgunluğu',
    scientificName: 'Verticillium dahliae',
    type: 'fungal',
    symptoms: [
      'Sudden wilting of branches',
      'Brown discoloration in vascular tissue',
      'Leaf yellowing and drop',
      'Branch dieback',
      'Tree death in severe cases'
    ],
    affectedParts: ['Roots', 'Vascular system', 'Branches', 'Entire tree'],
    spreadMethod: ['Soil-borne', 'Infected plant material', 'Water', 'Tools'],
    economicImpact: 25,
    seasonalRisk: {
      spring: 'high',
      summer: 'high',
      fall: 'medium',
      winter: 'low'
    },
    prevention: [
      'Use resistant varieties',
      'Avoid planting in infected soil',
      'Soil solarization before planting',
      'Proper drainage',
      'Avoid water stress'
    ],
    treatment: [
      'Remove and destroy infected trees',
      'Soil fumigation (severe cases)',
      'Improve drainage',
      'Reduce stress factors',
      'No chemical cure available'
    ],
    organicControl: [
      'Trichoderma harzianum soil amendment',
      'Compost tea applications',
      'Mycorrhizal fungi inoculation',
      'Crop rotation (if possible)'
    ]
  },
  {
    id: 'olive-knot',
    name: 'Olive Knot Disease',
    nameTr: 'Zeytin Ur Hastalığı',
    scientificName: 'Pseudomonas savastanoi pv. savastanoi',
    type: 'bacterial',
    symptoms: [
      'Rough galls on branches and trunk',
      'Swollen knots on stems',
      'Reduced vigor',
      'Branch die back',
      'Reduced fruit production'
    ],
    affectedParts: ['Branches', 'Trunk', 'Twigs'],
    spreadMethod: ['Pruning wounds', 'Frost damage', 'Hail injury', 'Rain'],
    economicImpact: 12,
    seasonalRisk: {
      spring: 'high',
      summer: 'low',
      fall: 'medium',
      winter: 'high'
    },
    prevention: [
      'Prune during dry weather',
      'Disinfect pruning tools',
      'Avoid frost damage',
      'Copper sprays before rain',
      'Remove infected branches'
    ],
    treatment: [
      'Prune out infected wood',
      'Copper-based bactericides',
      'Streptomycin sprays (where permitted)',
      'Improve tree health'
    ],
    organicControl: [
      'Copper soap sprays',
      'Bacillus subtilis treatments',
      'Sanitation and pruning',
      'Bordeaux mixture'
    ]
  },
  {
    id: 'anthracnose',
    name: 'Anthracnose',
    nameTr: 'Antraknoz',
    scientificName: 'Colletotrichum gloeosporioides',
    type: 'fungal',
    symptoms: [
      'Fruit rot near harvest',
      'Circular sunken spots on fruit',
      'Premature fruit drop',
      'Mummified fruit',
      'Reduced oil quality'
    ],
    affectedParts: ['Fruit', 'Leaves', 'Young shoots'],
    spreadMethod: ['Rain', 'Infected fruit', 'Wind', 'Insects'],
    economicImpact: 18,
    seasonalRisk: {
      spring: 'medium',
      summer: 'low',
      fall: 'high',
      winter: 'medium'
    },
    prevention: [
      'Harvest before full ripeness',
      'Remove mummified fruit',
      'Proper canopy management',
      'Copper sprays in fall',
      'Avoid fruit damage'
    ],
    treatment: [
      'Copper-based fungicides',
      'Azoxystrobin applications',
      'Prompt harvest',
      'Sanitation'
    ],
    organicControl: [
      'Copper sulfate sprays',
      'Potassium bicarbonate',
      'Sulfur-based products',
      'Trichoderma spp. treatments'
    ]
  }
];

export const OLIVE_PESTS: OlivePest[] = [
  {
    id: 'olive-fruit-fly',
    name: 'Olive Fruit Fly',
    nameTr: 'Zeytin Sineği',
    scientificName: 'Bactrocera oleae',
    type: 'insect',
    lifecycle: '30-40 days (egg to adult)',
    damageType: [
      'Larvae tunnel in fruit',
      'Premature fruit drop',
      'Reduced oil quality',
      'Secondary infections',
      'Unmarketable fruit'
    ],
    economicImpact: 30,
    peakActivity: ['Late summer', 'Early fall', 'September-November'],
    detection: [
      'McPhail traps monitoring',
      'Yellow sticky traps',
      'Fruit sampling',
      'Exit holes on fruit',
      'Larvae presence'
    ],
    prevention: [
      'Early harvest',
      'Kaolin clay sprays',
      'Mass trapping',
      'Sanitation',
      'Remove fallen fruit'
    ],
    biologicalControl: [
      'Psyttalia concolor parasitoid release',
      'Spinosad bait sprays',
      'Attract-and-kill systems',
      'Entomopathogenic fungi'
    ],
    chemicalControl: [
      'Spinosad protein bait',
      'Dimethoate (restricted)',
      'Alpha-cypermethrin',
      'Lambda-cyhalothrin'
    ],
    threshold: '1-2 flies per trap per day'
  },
  {
    id: 'olive-moth',
    name: 'Olive Moth',
    nameTr: 'Zeytin Güvesi',
    scientificName: 'Prays oleae',
    type: 'insect',
    lifecycle: '3 generations per year',
    damageType: [
      'Flower feeding (1st generation)',
      'Fruit pit damage (2nd generation)',
      'Leaf mining (3rd generation)',
      'Reduced fruit set',
      'Fruit drop'
    ],
    economicImpact: 15,
    peakActivity: ['Spring (flowers)', 'Summer (fruit)', 'Fall (leaves)'],
    detection: [
      'Pheromone traps',
      'Flower inspection',
      'Fruit examination',
      'Leaf mines',
      'Adult moth monitoring'
    ],
    prevention: [
      'Pheromone confusion',
      'Pruning for light penetration',
      'Natural enemy conservation',
      'Proper irrigation'
    ],
    biologicalControl: [
      'Bacillus thuringiensis (Bt)',
      'Trichogramma spp. parasitoids',
      'Chrysoperla carnea predators',
      'Pheromone mating disruption'
    ],
    chemicalControl: [
      'Spinosad',
      'Chlorpyrifos (restricted)',
      'Deltamethrin',
      'Timing critical for each generation'
    ],
    threshold: '5-10 moths per trap per week'
  },
  {
    id: 'olive-scale',
    name: 'Olive Black Scale',
    nameTr: 'Zeytin Kabuklu Biti',
    scientificName: 'Saissetia oleae',
    type: 'insect',
    lifecycle: '1 generation per year',
    damageType: [
      'Sap sucking',
      'Honeydew production',
      'Sooty mold growth',
      'Weakened trees',
      'Reduced photosynthesis'
    ],
    economicImpact: 10,
    peakActivity: ['Late spring', 'Early summer'],
    detection: [
      'Visual inspection',
      'Black scales on twigs',
      'Sooty mold presence',
      'Honeydew on leaves',
      'Ant activity'
    ],
    prevention: [
      'Avoid excessive nitrogen',
      'Proper pruning',
      'Natural enemy conservation',
      'Avoid dust accumulation'
    ],
    biologicalControl: [
      'Metaphycus bartletti parasitoid',
      'Scutellista caerulea parasitoid',
      'Chilocorus bipustulatus predator',
      'Horticultural oil sprays'
    ],
    chemicalControl: [
      'Imidacloprid (systemic)',
      'Summer oil sprays',
      'Spirotetramat',
      'Target crawler stage'
    ],
    threshold: '10% of twigs infested'
  }
];

// Climate-based recommendation system
export interface ClimateRecommendation {
  temperature: { min: number; max: number };
  rainfall: number; // mm
  humidity: number; // %
  recommendedActions: string[];
  diseaseRisk: string[];
  pestRisk: string[];
}

export function getClimateRecommendations(
  temp: number,
  rainfall: number,
  humidity: number
): ClimateRecommendation {
  const recommendations: string[] = [];
  const diseaseRisk: string[] = [];
  const pestRisk: string[] = [];

  // Temperature-based recommendations
  if (temp < 5) {
    recommendations.push('Risk of frost damage - consider frost protection');
    diseaseRisk.push('Olive Knot (wounds from frost)');
  }
  if (temp > 35) {
    recommendations.push('Heat stress - increase irrigation');
    recommendations.push('Monitor for sunburn on fruit');
  }

  // Rainfall/Humidity-based disease risk
  if (rainfall > 50 && humidity > 70) {
    diseaseRisk.push('High Peacock Spot risk');
    diseaseRisk.push('Anthracnose risk on fruit');
    recommendations.push('Apply copper-based fungicide');
  }
  if (humidity > 80) {
    diseaseRisk.push('Verticillium Wilt conditions favorable');
    recommendations.push('Improve drainage');
  }

  // Pest activity predictions
  if (temp >= 20 && temp <= 30) {
    pestRisk.push('Olive Fruit Fly activity peak');
    recommendations.push('Deploy McPhail traps');
    recommendations.push('Consider bait sprays');
  }
  if (temp >= 18 && temp <= 28) {
    pestRisk.push('Olive Moth generation active');
    recommendations.push('Monitor pheromone traps');
  }

  return {
    temperature: { min: temp - 2, max: temp + 2 },
    rainfall,
    humidity,
    recommendedActions: recommendations,
    diseaseRisk,
    pestRisk
  };
}
