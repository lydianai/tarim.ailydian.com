// Comprehensive Agricultural Pesticides Database
// Based on EPA PPLS and international agricultural data

export interface Pesticide {
  id: string;
  productName: string;
  activeIngredient: string;
  chemicalClass: string;
  type: 'herbicide' | 'insecticide' | 'fungicide' | 'nematicide' | 'rodenticide' | 'growth_regulator';
  modeOfAction: string;
  toxicityCategory: 'I' | 'II' | 'III' | 'IV'; // I=Danger, II=Warning, III=Caution, IV=Minimal
  restrictedUse: boolean;
  targetCrops: string[];
  targetPests: string[];
  applicationRate: { min: number; max: number; unit: string };
  preharvest

Interval: number; // days
  reentryInterval: number; // hours
  manufacturer: string;
  environmentalImpact: 'low' | 'moderate' | 'high' | 'severe';
  soilPersistence: 'low' | 'moderate' | 'high'; // degradation time
  waterSolubility: 'low' | 'moderate' | 'high';
  bioaccumulation: boolean;
}

export const PESTICIDES_DATABASE: Pesticide[] = [
  // HERBICIDES
  {
    id: 'glyphosate',
    productName: 'Roundup PowerMAX',
    activeIngredient: 'Glyphosate 48.7%',
    chemicalClass: 'Glycine',
    type: 'herbicide',
    modeOfAction: 'Inhibits EPSP synthase enzyme',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['corn', 'soybeans', 'wheat', 'cotton', 'canola'],
    targetPests: ['Annual weeds', 'Perennial weeds', 'Grasses', 'Broadleaf weeds'],
    applicationRate: { min: 22, max: 32, unit: 'fl oz/acre' },
    preharvestInterval: 7,
    reentryInterval: 4,
    manufacturer: 'Bayer CropScience',
    environmentalImpact: 'moderate',
    soilPersistence: 'moderate',
    waterSolubility: 'high',
    bioaccumulation: false
  },
  {
    id: 'atrazine',
    productName: 'Atrazine 4L',
    activeIngredient: 'Atrazine 42.0%',
    chemicalClass: 'Triazine',
    type: 'herbicide',
    modeOfAction: 'Inhibits photosynthesis',
    toxicityCategory: 'III',
    restrictedUse: true,
    targetCrops: ['corn', 'sorghum', 'sugarcane'],
    targetPests: ['Broadleaf weeds', 'Annual grasses', 'Pigweed', 'Lambsquarters'],
    applicationRate: { min: 1.5, max: 2.5, unit: 'lbs ai/acre' },
    preharvestInterval: 60,
    reentryInterval: 12,
    manufacturer: 'Syngenta Crop Protection',
    environmentalImpact: 'moderate',
    soilPersistence: 'high',
    waterSolubility: 'moderate',
    bioaccumulation: false
  },
  {
    id: '24d',
    productName: '2,4-D Amine',
    activeIngredient: '2,4-D 46.8%',
    chemicalClass: 'Phenoxy',
    type: 'herbicide',
    modeOfAction: 'Synthetic auxin hormone',
    toxicityCategory: 'II',
    restrictedUse: false,
    targetCrops: ['wheat', 'barley', 'oats', 'corn'],
    targetPests: ['Broadleaf weeds', 'Dandelion', 'Clover', 'Thistle'],
    applicationRate: { min: 0.5, max: 2.0, unit: 'lbs ae/acre' },
    preharvestInterval: 14,
    reentryInterval: 48,
    manufacturer: 'Multiple manufacturers',
    environmentalImpact: 'moderate',
    soilPersistence: 'low',
    waterSolubility: 'high',
    bioaccumulation: false
  },
  {
    id: 'dicamba',
    productName: 'Clarity',
    activeIngredient: 'Dicamba 57.6%',
    chemicalClass: 'Benzoic acid',
    type: 'herbicide',
    modeOfAction: 'Synthetic auxin',
    toxicityCategory: 'III',
    restrictedUse: true,
    targetCrops: ['corn', 'soybeans', 'wheat', 'sorghum'],
    targetPests: ['Broadleaf weeds', 'Pigweed', 'Waterhemp', 'Marestail'],
    applicationRate: { min: 0.5, max: 1.0, unit: 'lbs ae/acre' },
    preharvestInterval: 30,
    reentryInterval: 24,
    manufacturer: 'BASF',
    environmentalImpact: 'high',
    soilPersistence: 'low',
    waterSolubility: 'high',
    bioaccumulation: false
  },
  {
    id: 'paraquat',
    productName: 'Gramoxone SL',
    activeIngredient: 'Paraquat 43.8%',
    chemicalClass: 'Bipyridylium',
    type: 'herbicide',
    modeOfAction: 'Photosystem I inhibitor',
    toxicityCategory: 'I',
    restrictedUse: true,
    targetCrops: ['corn', 'soybeans', 'cotton', 'wheat'],
    targetPests: ['Annual grasses', 'Broadleaf weeds', 'Emerged weeds'],
    applicationRate: { min: 2.5, max: 4.0, unit: 'pts/acre' },
    preharvestInterval: 90,
    reentryInterval: 12,
    manufacturer: 'Syngenta',
    environmentalImpact: 'severe',
    soilPersistence: 'moderate',
    waterSolubility: 'high',
    bioaccumulation: false
  },

  // INSECTICIDES
  {
    id: 'chlorpyrifos',
    productName: 'Lorsban Advanced',
    activeIngredient: 'Chlorpyrifos 44.9%',
    chemicalClass: 'Organophosphate',
    type: 'insecticide',
    modeOfAction: 'Acetylcholinesterase inhibitor',
    toxicityCategory: 'II',
    restrictedUse: true,
    targetCrops: ['corn', 'soybeans', 'wheat', 'apples', 'grapes'],
    targetPests: ['Cutworms', 'Rootworms', 'Aphids', 'Corn borer', 'Wireworms'],
    applicationRate: { min: 1.0, max: 2.0, unit: 'pts/acre' },
    preharvestInterval: 35,
    reentryInterval: 24,
    manufacturer: 'Corteva Agriscience',
    environmentalImpact: 'high',
    soilPersistence: 'moderate',
    waterSolubility: 'low',
    bioaccumulation: true
  },
  {
    id: 'lambda_cyhalothrin',
    productName: 'Warrior II',
    activeIngredient: 'Lambda-Cyhalothrin 11.8%',
    chemicalClass: 'Pyrethroid',
    type: 'insecticide',
    modeOfAction: 'Sodium channel modulator',
    toxicityCategory: 'II',
    restrictedUse: true,
    targetCrops: ['corn', 'soybeans', 'wheat', 'cotton', 'vegetables'],
    targetPests: ['Beetles', 'Caterpillars', 'Stink bugs', 'Aphids', 'Thrips'],
    applicationRate: { min: 2.56, max: 3.84, unit: 'fl oz/acre' },
    preharvestInterval: 21,
    reentryInterval: 24,
    manufacturer: 'Syngenta',
    environmentalImpact: 'moderate',
    soilPersistence: 'low',
    waterSolubility: 'low',
    bioaccumulation: false
  },
  {
    id: 'imidacloprid',
    productName: 'Admire Pro',
    activeIngredient: 'Imidacloprid 42.8%',
    chemicalClass: 'Neonicotinoid',
    type: 'insecticide',
    modeOfAction: 'Nicotinic acetylcholine receptor agonist',
    toxicityCategory: 'II',
    restrictedUse: false,
    targetCrops: ['corn', 'soybeans', 'cotton', 'potatoes', 'vegetables'],
    targetPests: ['Aphids', 'Whiteflies', 'Thrips', 'Colorado potato beetle', 'Leafhoppers'],
    applicationRate: { min: 7, max: 10.5, unit: 'fl oz/acre' },
    preharvestInterval: 21,
    reentryInterval: 12,
    manufacturer: 'Bayer CropScience',
    environmentalImpact: 'high',
    soilPersistence: 'high',
    waterSolubility: 'moderate',
    bioaccumulation: false
  },
  {
    id: 'spinosad',
    productName: 'Entrust SC',
    activeIngredient: 'Spinosad 22.5%',
    chemicalClass: 'Spinosyn',
    type: 'insecticide',
    modeOfAction: 'Nicotinic acetylcholine receptor allosteric activator',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['vegetables', 'fruit', 'cotton', 'tobacco'],
    targetPests: ['Thrips', 'Leafminers', 'Caterpillars', 'Beetles'],
    applicationRate: { min: 4, max: 10, unit: 'fl oz/acre' },
    preharvestInterval: 1,
    reentryInterval: 4,
    manufacturer: 'Corteva Agriscience',
    environmentalImpact: 'low',
    soilPersistence: 'low',
    waterSolubility: 'high',
    bioaccumulation: false
  },
  {
    id: 'bifenthrin',
    productName: 'Brigade WSB',
    activeIngredient: 'Bifenthrin 80%',
    chemicalClass: 'Pyrethroid',
    type: 'insecticide',
    modeOfAction: 'Sodium channel modulator',
    toxicityCategory: 'II',
    restrictedUse: true,
    targetCrops: ['corn', 'wheat', 'soybeans', 'cotton'],
    targetPests: ['Cutworms', 'Armyworms', 'Grasshoppers', 'Beetles'],
    applicationRate: { min: 6.4, max: 16, unit: 'oz/acre' },
    preharvestInterval: 30,
    reentryInterval: 12,
    manufacturer: 'FMC Corporation',
    environmentalImpact: 'high',
    soilPersistence: 'high',
    waterSolubility: 'low',
    bioaccumulation: true
  },

  // FUNGICIDES
  {
    id: 'azoxystrobin',
    productName: 'Quadris',
    activeIngredient: 'Azoxystrobin 22.9%',
    chemicalClass: 'Strobilurin',
    type: 'fungicide',
    modeOfAction: 'Quinone outside inhibitor (QoI)',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['wheat', 'corn', 'soybeans', 'vegetables', 'fruit'],
    targetPests: ['Powdery mildew', 'Rust', 'Leaf spots', 'Anthracnose'],
    applicationRate: { min: 6, max: 15.5, unit: 'fl oz/acre' },
    preharvestInterval: 0,
    reentryInterval: 4,
    manufacturer: 'Syngenta',
    environmentalImpact: 'moderate',
    soilPersistence: 'moderate',
    waterSolubility: 'low',
    bioaccumulation: false
  },
  {
    id: 'propiconazole',
    productName: 'Tilt',
    activeIngredient: 'Propiconazole 41.8%',
    chemicalClass: 'Triazole',
    type: 'fungicide',
    modeOfAction: 'Sterol biosynthesis inhibitor (DMI)',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['wheat', 'barley', 'oats', 'rice', 'peanuts'],
    targetPests: ['Rust', 'Powdery mildew', 'Leaf spot', 'Scab'],
    applicationRate: { min: 4, max: 6, unit: 'fl oz/acre' },
    preharvestInterval: 14,
    reentryInterval: 12,
    manufacturer: 'Syngenta',
    environmentalImpact: 'moderate',
    soilPersistence: 'moderate',
    waterSolubility: 'low',
    bioaccumulation: false
  },
  {
    id: 'mancozeb',
    productName: 'Dithane M-45',
    activeIngredient: 'Mancozeb 80%',
    chemicalClass: 'Dithiocarbamate',
    type: 'fungicide',
    modeOfAction: 'Multi-site contact activity',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['tomatoes', 'potatoes', 'grapes', 'apples', 'wheat'],
    targetPests: ['Early blight', 'Late blight', 'Downy mildew', 'Anthracnose'],
    applicationRate: { min: 1.5, max: 3.0, unit: 'lbs/acre' },
    preharvestInterval: 5,
    reentryInterval: 24,
    manufacturer: 'Corteva Agriscience',
    environmentalImpact: 'moderate',
    soilPersistence: 'low',
    waterSolubility: 'low',
    bioaccumulation: false
  },
  {
    id: 'chlorothalonil',
    productName: 'Bravo Weather Stik',
    activeIngredient: 'Chlorothalonil 54%',
    chemicalClass: 'Chloronitrile',
    type: 'fungicide',
    modeOfAction: 'Multi-site contact activity',
    toxicityCategory: 'II',
    restrictedUse: false,
    targetCrops: ['peanuts', 'vegetables', 'turf', 'ornamentals'],
    targetPests: ['Leaf spot', 'Anthracnose', 'Downy mildew', 'Botrytis'],
    applicationRate: { min: 1.5, max: 3.0, unit: 'pts/acre' },
    preharvestInterval: 7,
    reentryInterval: 12,
    manufacturer: 'Syngenta',
    environmentalImpact: 'high',
    soilPersistence: 'moderate',
    waterSolubility: 'low',
    bioaccumulation: true
  },
  {
    id: 'copper_hydroxide',
    productName: 'Kocide 3000',
    activeIngredient: 'Copper Hydroxide 46.1%',
    chemicalClass: 'Inorganic',
    type: 'fungicide',
    modeOfAction: 'Multi-site contact activity',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['tomatoes', 'peppers', 'citrus', 'grapes', 'vegetables'],
    targetPests: ['Bacterial spot', 'Downy mildew', 'Anthracnose', 'Leaf blight'],
    applicationRate: { min: 1.25, max: 3.5, unit: 'lbs/acre' },
    preharvestInterval: 0,
    reentryInterval: 24,
    manufacturer: 'Certis USA',
    environmentalImpact: 'moderate',
    soilPersistence: 'high',
    waterSolubility: 'low',
    bioaccumulation: false
  },

  // BIOLOGICAL/ORGANIC OPTIONS
  {
    id: 'bacillus_thuringiensis',
    productName: 'DiPel DF',
    activeIngredient: 'Bacillus thuringiensis var. kurstaki',
    chemicalClass: 'Biological',
    type: 'insecticide',
    modeOfAction: 'Bacterial protein toxin',
    toxicityCategory: 'IV',
    restrictedUse: false,
    targetCrops: ['vegetables', 'fruit', 'cotton', 'soybeans'],
    targetPests: ['Caterpillars', 'Cabbage looper', 'Corn earworm', 'Tomato hornworm'],
    applicationRate: { min: 0.5, max: 2.0, unit: 'lbs/acre' },
    preharvestInterval: 0,
    reentryInterval: 4,
    manufacturer: 'Valent BioSciences',
    environmentalImpact: 'low',
    soilPersistence: 'low',
    waterSolubility: 'moderate',
    bioaccumulation: false
  },
  {
    id: 'neem_oil',
    productName: 'Trilogy',
    activeIngredient: 'Neem Oil 70%',
    chemicalClass: 'Botanical',
    type: 'insecticide',
    modeOfAction: 'Antifeedant and growth regulator',
    toxicityCategory: 'III',
    restrictedUse: false,
    targetCrops: ['vegetables', 'fruit', 'ornamentals', 'herbs'],
    targetPests: ['Aphids', 'Whiteflies', 'Spider mites', 'Thrips'],
    applicationRate: { min: 0.5, max: 2.0, unit: 'gals/100 gals water' },
    preharvestInterval: 0,
    reentryInterval: 4,
    manufacturer: 'Certis USA',
    environmentalImpact: 'low',
    soilPersistence: 'low',
    waterSolubility: 'low',
    bioaccumulation: false
  }
];

// Helper functions
export function getPesticidesByType(type: Pesticide['type']): Pesticide[] {
  return PESTICIDES_DATABASE.filter(p => p.type === type);
}

export function getPesticidesByCrop(cropId: string): Pesticide[] {
  return PESTICIDES_DATABASE.filter(p => p.targetCrops.includes(cropId));
}

export function getPesticidesForPest(pest: string): Pesticide[] {
  return PESTICIDES_DATABASE.filter(p =>
    p.targetPests.some(tp => tp.toLowerCase().includes(pest.toLowerCase()))
  );
}

export function getOrganicPesticides(): Pesticide[] {
  return PESTICIDES_DATABASE.filter(p =>
    p.chemicalClass === 'Biological' || p.chemicalClass === 'Botanical'
  );
}

export function getPesticidesByToxicity(category: Pesticide['toxicityCategory']): Pesticide[] {
  return PESTICIDES_DATABASE.filter(p => p.toxicityCategory === category);
}

export function searchPesticides(query: string): Pesticide[] {
  const lowerQuery = query.toLowerCase();
  return PESTICIDES_DATABASE.filter(p =>
    p.productName.toLowerCase().includes(lowerQuery) ||
    p.activeIngredient.toLowerCase().includes(lowerQuery) ||
    p.targetPests.some(pest => pest.toLowerCase().includes(lowerQuery))
  );
}
