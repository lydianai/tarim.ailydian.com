// Comprehensive Agricultural Crops Database
// Based on USDA, FAO, and global agricultural data

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: 'grain' | 'vegetable' | 'fruit' | 'legume' | 'oilseed' | 'fiber' | 'tuber' | 'specialty';
  growingSeasonDays: number;
  waterRequirement: 'low' | 'medium' | 'high' | 'very_high';
  soilPH: { min: number; max: number };
  temperatureRange: { min: number; max: number }; // Fahrenheit
  majorProducers: string[];
  yieldPerAcre: { min: number; max: number; unit: string };
  commonPests: string[];
  commonDiseases: string[];
  nutrientRequirements: {
    nitrogen: 'low' | 'medium' | 'high';
    phosphorus: 'low' | 'medium' | 'high';
    potassium: 'low' | 'medium' | 'high';
  };
}

export const CROPS_DATABASE: Crop[] = [
  // GRAINS
  {
    id: 'corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    category: 'grain',
    growingSeasonDays: 90,
    waterRequirement: 'medium',
    soilPH: { min: 5.8, max: 7.0 },
    temperatureRange: { min: 50, max: 86 },
    majorProducers: ['USA', 'China', 'Brazil', 'Argentina'],
    yieldPerAcre: { min: 150, max: 220, unit: 'bushels' },
    commonPests: ['Corn rootworm', 'European corn borer', 'Fall armyworm'],
    commonDiseases: ['Gray leaf spot', 'Northern corn leaf blight', 'Common rust'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'grain',
    growingSeasonDays: 120,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 40, max: 75 },
    majorProducers: ['China', 'India', 'Russia', 'USA'],
    yieldPerAcre: { min: 40, max: 80, unit: 'bushels' },
    commonPests: ['Hessian fly', 'Wheat stem sawfly', 'Aphids'],
    commonDiseases: ['Wheat rust', 'Powdery mildew', 'Fusarium head blight'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'low' }
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'grain',
    growingSeasonDays: 105,
    waterRequirement: 'very_high',
    soilPH: { min: 5.0, max: 7.0 },
    temperatureRange: { min: 68, max: 95 },
    majorProducers: ['China', 'India', 'Indonesia', 'Bangladesh'],
    yieldPerAcre: { min: 6000, max: 9000, unit: 'lbs' },
    commonPests: ['Rice weevil', 'Stem borer', 'Brown planthopper'],
    commonDiseases: ['Rice blast', 'Bacterial leaf blight', 'Sheath blight'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'barley',
    name: 'Barley',
    scientificName: 'Hordeum vulgare',
    category: 'grain',
    growingSeasonDays: 90,
    waterRequirement: 'low',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 40, max: 70 },
    majorProducers: ['Russia', 'Germany', 'France', 'Canada'],
    yieldPerAcre: { min: 50, max: 90, unit: 'bushels' },
    commonPests: ['Aphids', 'Wireworms', 'Grasshoppers'],
    commonDiseases: ['Net blotch', 'Powdery mildew', 'Barley yellow dwarf virus'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'medium', potassium: 'low' }
  },
  {
    id: 'oats',
    name: 'Oats',
    scientificName: 'Avena sativa',
    category: 'grain',
    growingSeasonDays: 110,
    waterRequirement: 'medium',
    soilPH: { min: 5.5, max: 7.0 },
    temperatureRange: { min: 40, max: 75 },
    majorProducers: ['Russia', 'Canada', 'Poland', 'Finland'],
    yieldPerAcre: { min: 60, max: 120, unit: 'bushels' },
    commonPests: ['Aphids', 'Armyworms', 'Cereal leaf beetle'],
    commonDiseases: ['Crown rust', 'Stem rust', 'Septoria leaf blotch'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'low', potassium: 'low' }
  },

  // OILSEEDS
  {
    id: 'soybeans',
    name: 'Soybeans',
    scientificName: 'Glycine max',
    category: 'oilseed',
    growingSeasonDays: 100,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 60, max: 86 },
    majorProducers: ['USA', 'Brazil', 'Argentina', 'China'],
    yieldPerAcre: { min: 40, max: 70, unit: 'bushels' },
    commonPests: ['Soybean aphid', 'Bean leaf beetle', 'Japanese beetle'],
    commonDiseases: ['Sudden death syndrome', 'White mold', 'Soybean rust'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    category: 'oilseed',
    growingSeasonDays: 85,
    waterRequirement: 'low',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 64, max: 95 },
    majorProducers: ['Russia', 'Ukraine', 'Argentina', 'Romania'],
    yieldPerAcre: { min: 1500, max: 2500, unit: 'lbs' },
    commonPests: ['Sunflower beetle', 'Sunflower moth', 'Seed weevil'],
    commonDiseases: ['Downy mildew', 'Rust', 'Verticillium wilt'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'high', potassium: 'medium' }
  },
  {
    id: 'canola',
    name: 'Canola (Rapeseed)',
    scientificName: 'Brassica napus',
    category: 'oilseed',
    growingSeasonDays: 95,
    waterRequirement: 'medium',
    soilPH: { min: 5.5, max: 7.0 },
    temperatureRange: { min: 50, max: 75 },
    majorProducers: ['Canada', 'China', 'India', 'France'],
    yieldPerAcre: { min: 1800, max: 3000, unit: 'lbs' },
    commonPests: ['Flea beetle', 'Cabbage seedpod weevil', 'Diamondback moth'],
    commonDiseases: ['Blackleg', 'Sclerotinia stem rot', 'Clubroot'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
  },
  {
    id: 'peanuts',
    name: 'Peanuts',
    scientificName: 'Arachis hypogaea',
    category: 'oilseed',
    growingSeasonDays: 130,
    waterRequirement: 'medium',
    soilPH: { min: 5.9, max: 6.5 },
    temperatureRange: { min: 68, max: 95 },
    majorProducers: ['China', 'India', 'Nigeria', 'USA'],
    yieldPerAcre: { min: 3500, max: 5500, unit: 'lbs' },
    commonPests: ['Lesser cornstalk borer', 'Thrips', 'Aphids'],
    commonDiseases: ['Early leaf spot', 'Late leaf spot', 'White mold'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'medium', potassium: 'high' }
  },

  // VEGETABLES
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    growingSeasonDays: 75,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 6.8 },
    temperatureRange: { min: 60, max: 85 },
    majorProducers: ['China', 'India', 'USA', 'Turkey'],
    yieldPerAcre: { min: 25000, max: 60000, unit: 'lbs' },
    commonPests: ['Tomato hornworm', 'Aphids', 'Whiteflies'],
    commonDiseases: ['Early blight', 'Late blight', 'Fusarium wilt'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    category: 'vegetable',
    growingSeasonDays: 45,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 45, max: 75 },
    majorProducers: ['China', 'USA', 'India', 'Spain'],
    yieldPerAcre: { min: 20000, max: 35000, unit: 'lbs' },
    commonPests: ['Aphids', 'Cutworms', 'Slugs'],
    commonDiseases: ['Downy mildew', 'Lettuce drop', 'Bottom rot'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
  },
  {
    id: 'peppers',
    name: 'Peppers (Bell & Hot)',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    growingSeasonDays: 80,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 65, max: 85 },
    majorProducers: ['China', 'Mexico', 'Turkey', 'Indonesia'],
    yieldPerAcre: { min: 15000, max: 35000, unit: 'lbs' },
    commonPests: ['Aphids', 'Pepper weevil', 'Thrips'],
    commonDiseases: ['Bacterial leaf spot', 'Phytophthora blight', 'Anthracnose'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'onions',
    name: 'Onions',
    scientificName: 'Allium cepa',
    category: 'vegetable',
    growingSeasonDays: 110,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 55, max: 75 },
    majorProducers: ['China', 'India', 'USA', 'Turkey'],
    yieldPerAcre: { min: 30000, max: 60000, unit: 'lbs' },
    commonPests: ['Onion thrips', 'Onion maggot', 'Cutworms'],
    commonDiseases: ['Purple blotch', 'Downy mildew', 'Botrytis leaf blight'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'carrots',
    name: 'Carrots',
    scientificName: 'Daucus carota',
    category: 'vegetable',
    growingSeasonDays: 70,
    waterRequirement: 'medium',
    soilPH: { min: 5.5, max: 7.0 },
    temperatureRange: { min: 45, max: 85 },
    majorProducers: ['China', 'Uzbekistan', 'USA', 'Russia'],
    yieldPerAcre: { min: 25000, max: 45000, unit: 'lbs' },
    commonPests: ['Carrot rust fly', 'Aphids', 'Wireworms'],
    commonDiseases: ['Alternaria leaf blight', 'Cercospora leaf spot', 'Cavity spot'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'cabbage',
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'vegetable',
    growingSeasonDays: 85,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 45, max: 75 },
    majorProducers: ['China', 'India', 'Russia', 'South Korea'],
    yieldPerAcre: { min: 30000, max: 55000, unit: 'lbs' },
    commonPests: ['Cabbage worm', 'Aphids', 'Flea beetles'],
    commonDiseases: ['Black rot', 'Clubroot', 'Downy mildew'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'medium' }
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    scientificName: 'Brassica oleracea var. italica',
    category: 'vegetable',
    growingSeasonDays: 70,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 45, max: 75 },
    majorProducers: ['China', 'India', 'USA', 'Mexico'],
    yieldPerAcre: { min: 10000, max: 20000, unit: 'lbs' },
    commonPests: ['Cabbage looper', 'Aphids', 'Flea beetles'],
    commonDiseases: ['Downy mildew', 'Black rot', 'Clubroot'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'cucumbers',
    name: 'Cucumbers',
    scientificName: 'Cucumis sativus',
    category: 'vegetable',
    growingSeasonDays: 55,
    waterRequirement: 'high',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 60, max: 90 },
    majorProducers: ['China', 'Turkey', 'Russia', 'Ukraine'],
    yieldPerAcre: { min: 15000, max: 30000, unit: 'lbs' },
    commonPests: ['Cucumber beetle', 'Aphids', 'Spider mites'],
    commonDiseases: ['Powdery mildew', 'Downy mildew', 'Angular leaf spot'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' }
  },

  // FRUITS
  {
    id: 'apples',
    name: 'Apples',
    scientificName: 'Malus domestica',
    category: 'fruit',
    growingSeasonDays: 150,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 32, max: 80 },
    majorProducers: ['China', 'USA', 'Turkey', 'Poland'],
    yieldPerAcre: { min: 15000, max: 40000, unit: 'lbs' },
    commonPests: ['Codling moth', 'Apple maggot', 'Aphids'],
    commonDiseases: ['Apple scab', 'Fire blight', 'Powdery mildew'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'low', potassium: 'medium' }
  },
  {
    id: 'oranges',
    name: 'Oranges',
    scientificName: 'Citrus × sinensis',
    category: 'fruit',
    growingSeasonDays: 270,
    waterRequirement: 'high',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 55, max: 100 },
    majorProducers: ['Brazil', 'USA', 'China', 'India'],
    yieldPerAcre: { min: 20000, max: 50000, unit: 'lbs' },
    commonPests: ['Citrus leafminer', 'Asian citrus psyllid', 'Aphids'],
    commonDiseases: ['Citrus greening (HLB)', 'Citrus canker', 'Alternaria brown spot'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    category: 'fruit',
    growingSeasonDays: 165,
    waterRequirement: 'medium',
    soilPH: { min: 5.5, max: 7.0 },
    temperatureRange: { min: 50, max: 95 },
    majorProducers: ['China', 'Italy', 'USA', 'Spain'],
    yieldPerAcre: { min: 6000, max: 15000, unit: 'lbs' },
    commonPests: ['Grape phylloxera', 'Japanese beetle', 'Grape berry moth'],
    commonDiseases: ['Powdery mildew', 'Downy mildew', 'Botrytis bunch rot'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    scientificName: 'Fragaria × ananassa',
    category: 'fruit',
    growingSeasonDays: 90,
    waterRequirement: 'high',
    soilPH: { min: 5.5, max: 6.5 },
    temperatureRange: { min: 60, max: 80 },
    majorProducers: ['China', 'USA', 'Mexico', 'Turkey'],
    yieldPerAcre: { min: 15000, max: 35000, unit: 'lbs' },
    commonPests: ['Spider mites', 'Aphids', 'Strawberry bud weevil'],
    commonDiseases: ['Gray mold', 'Powdery mildew', 'Verticillium wilt'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'high', potassium: 'high' }
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    scientificName: 'Vaccinium corymbosum',
    category: 'fruit',
    growingSeasonDays: 120,
    waterRequirement: 'high',
    soilPH: { min: 4.5, max: 5.5 },
    temperatureRange: { min: 40, max: 85 },
    majorProducers: ['USA', 'Canada', 'Peru', 'Chile'],
    yieldPerAcre: { min: 6000, max: 15000, unit: 'lbs' },
    commonPests: ['Blueberry maggot', 'Cranberry fruitworm', 'Aphids'],
    commonDiseases: ['Mummy berry', 'Anthracnose', 'Botrytis blight'],
    nutrientRequirements: { nitrogen: 'medium', phosphorus: 'low', potassium: 'medium' }
  },

  // TUBERS
  {
    id: 'potatoes',
    name: 'Potatoes',
    scientificName: 'Solanum tuberosum',
    category: 'tuber',
    growingSeasonDays: 90,
    waterRequirement: 'medium',
    soilPH: { min: 4.8, max: 6.5 },
    temperatureRange: { min: 45, max: 75 },
    majorProducers: ['China', 'India', 'Ukraine', 'Russia'],
    yieldPerAcre: { min: 25000, max: 50000, unit: 'lbs' },
    commonPests: ['Colorado potato beetle', 'Aphids', 'Wireworms'],
    commonDiseases: ['Late blight', 'Early blight', 'Common scab'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'sweet_potatoes',
    name: 'Sweet Potatoes',
    scientificName: 'Ipomoea batatas',
    category: 'tuber',
    growingSeasonDays: 100,
    waterRequirement: 'medium',
    soilPH: { min: 5.0, max: 6.5 },
    temperatureRange: { min: 65, max: 95 },
    majorProducers: ['China', 'Malawi', 'Nigeria', 'Tanzania'],
    yieldPerAcre: { min: 15000, max: 35000, unit: 'lbs' },
    commonPests: ['Sweet potato weevil', 'Wireworms', 'Flea beetles'],
    commonDiseases: ['Fusarium wilt', 'Black rot', 'Scurf'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'medium', potassium: 'high' }
  },

  // LEGUMES
  {
    id: 'peas',
    name: 'Peas',
    scientificName: 'Pisum sativum',
    category: 'legume',
    growingSeasonDays: 60,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 40, max: 75 },
    majorProducers: ['China', 'India', 'Canada', 'France'],
    yieldPerAcre: { min: 2000, max: 4000, unit: 'lbs' },
    commonPests: ['Pea aphid', 'Pea weevil', 'Cutworms'],
    commonDiseases: ['Powdery mildew', 'Root rot', 'Bacterial blight'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'medium', potassium: 'medium' }
  },
  {
    id: 'beans',
    name: 'Beans (Dry)',
    scientificName: 'Phaseolus vulgaris',
    category: 'legume',
    growingSeasonDays: 65,
    waterRequirement: 'medium',
    soilPH: { min: 6.0, max: 7.0 },
    temperatureRange: { min: 60, max: 85 },
    majorProducers: ['India', 'Myanmar', 'Brazil', 'USA'],
    yieldPerAcre: { min: 1500, max: 3000, unit: 'lbs' },
    commonPests: ['Mexican bean beetle', 'Bean leaf beetle', 'Aphids'],
    commonDiseases: ['Anthracnose', 'Bacterial blight', 'White mold'],
    nutrientRequirements: { nitrogen: 'low', phosphorus: 'medium', potassium: 'medium' }
  },

  // FIBER CROPS
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'fiber',
    growingSeasonDays: 150,
    waterRequirement: 'high',
    soilPH: { min: 5.5, max: 8.0 },
    temperatureRange: { min: 60, max: 95 },
    majorProducers: ['India', 'China', 'USA', 'Brazil'],
    yieldPerAcre: { min: 700, max: 1200, unit: 'lbs lint' },
    commonPests: ['Boll weevil', 'Cotton bollworm', 'Aphids'],
    commonDiseases: ['Verticillium wilt', 'Fusarium wilt', 'Bacterial blight'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },

  // SPECIALTY CROPS
  {
    id: 'coffee',
    name: 'Coffee',
    scientificName: 'Coffea arabica',
    category: 'specialty',
    growingSeasonDays: 270,
    waterRequirement: 'high',
    soilPH: { min: 6.0, max: 6.5 },
    temperatureRange: { min: 60, max: 75 },
    majorProducers: ['Brazil', 'Vietnam', 'Colombia', 'Indonesia'],
    yieldPerAcre: { min: 1500, max: 3000, unit: 'lbs green beans' },
    commonPests: ['Coffee berry borer', 'Leaf miner', 'Scale insects'],
    commonDiseases: ['Coffee rust', 'Coffee berry disease', 'Root rot'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    category: 'specialty',
    growingSeasonDays: 365,
    waterRequirement: 'very_high',
    soilPH: { min: 6.0, max: 7.5 },
    temperatureRange: { min: 70, max: 95 },
    majorProducers: ['Brazil', 'India', 'China', 'Thailand'],
    yieldPerAcre: { min: 30, max: 60, unit: 'tons' },
    commonPests: ['Sugarcane borer', 'Aphids', 'Whiteflies'],
    commonDiseases: ['Red rot', 'Smut', 'Rust'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  },
  {
    id: 'tobacco',
    name: 'Tobacco',
    scientificName: 'Nicotiana tabacum',
    category: 'specialty',
    growingSeasonDays: 90,
    waterRequirement: 'medium',
    soilPH: { min: 5.5, max: 7.0 },
    temperatureRange: { min: 65, max: 85 },
    majorProducers: ['China', 'India', 'Brazil', 'USA'],
    yieldPerAcre: { min: 2000, max: 3500, unit: 'lbs' },
    commonPests: ['Tobacco hornworm', 'Aphids', 'Budworms'],
    commonDiseases: ['Blue mold', 'Black shank', 'Tobacco mosaic virus'],
    nutrientRequirements: { nitrogen: 'high', phosphorus: 'medium', potassium: 'high' }
  }
];

// Helper functions
export function getCropsByCategory(category: Crop['category']): Crop[] {
  return CROPS_DATABASE.filter(crop => crop.category === category);
}

export function getCropById(id: string): Crop | undefined {
  return CROPS_DATABASE.find(crop => crop.id === id);
}

export function searchCrops(query: string): Crop[] {
  const lowerQuery = query.toLowerCase();
  return CROPS_DATABASE.filter(crop =>
    crop.name.toLowerCase().includes(lowerQuery) ||
    crop.scientificName.toLowerCase().includes(lowerQuery)
  );
}

export function getCropsByWaterRequirement(requirement: Crop['waterRequirement']): Crop[] {
  return CROPS_DATABASE.filter(crop => crop.waterRequirement === requirement);
}

export function getCropsBySoilPH(pH: number): Crop[] {
  return CROPS_DATABASE.filter(crop => pH >= crop.soilPH.min && pH <= crop.soilPH.max);
}
