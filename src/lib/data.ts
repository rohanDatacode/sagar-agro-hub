// Product data store - can be connected to backend later
export interface Product {
  id: string;
  name: string;
  category: 'water-soluble' | 'micronutrients' | 'organic' | 'herbal';
  description: string;
  usage: string;
  benefits: string[];
  price: number;
  image?: string;
}

export const categoryLabels: Record<Product['category'], string> = {
  'water-soluble': 'Water Soluble Fertilizers',
  'micronutrients': 'Micronutrients (100% Water Soluble)',
  'organic': 'Organic Products',
  'herbal': 'Herbal Products',
};

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'AgroGrow NPK 19-19-19',
    category: 'water-soluble',
    description: 'A balanced water-soluble fertilizer providing essential nutrients for all stages of plant growth. Perfect for foliar application and fertigation.',
    usage: 'Dissolve 2-3 grams per liter of water. Apply through foliar spray or drip irrigation every 10-15 days during the growing season.',
    benefits: ['Balanced nutrition for healthy growth', 'Quick absorption by plants', 'Suitable for all crops', 'Improves yield quality'],
    price: 450,
  },
  {
    id: '2',
    name: 'RootMax Bio Stimulant',
    category: 'micronutrients',
    description: 'Advanced root development formula enriched with natural growth hormones and beneficial microorganisms for stronger root systems.',
    usage: 'Apply 2ml per liter of water as soil drench during transplanting and early vegetative stage.',
    benefits: ['Enhanced root development', 'Improved nutrient uptake', 'Stress resistance', 'Better transplant survival'],
    price: 680,
  },
  {
    id: '3',
    name: 'BioNitro Plus',
    category: 'organic',
    description: 'Nitrogen-fixing biofertilizer containing Azotobacter and Azospirillum for sustainable nitrogen supply to crops.',
    usage: 'Mix 200ml with 50kg of FYM or apply directly to soil at 1L per acre.',
    benefits: ['Natural nitrogen fixation', 'Improves soil health', 'Eco-friendly', 'Reduces chemical fertilizer need'],
    price: 320,
  },
  {
    id: '4',
    name: 'CalMag Booster',
    category: 'water-soluble',
    description: 'Calcium and Magnesium supplement for preventing deficiency disorders and improving fruit quality.',
    usage: 'Dissolve 1-2 grams per liter. Apply as foliar spray during flowering and fruiting stages.',
    benefits: ['Prevents blossom end rot', 'Strengthens cell walls', 'Improves fruit firmness', 'Enhanced shelf life'],
    price: 520,
  },
  {
    id: '5',
    name: 'PhytoZyme Growth',
    category: 'micronutrients',
    description: 'Enzyme-based growth promoter derived from seaweed extracts for enhanced photosynthesis and plant vigor.',
    usage: 'Apply 1ml per liter of water as foliar spray every 15 days.',
    benefits: ['Increased chlorophyll content', 'Better flowering', 'Improved fruit set', 'Natural stress tolerance'],
    price: 750,
  },
  {
    id: '6',
    name: 'PhosphoBac',
    category: 'organic',
    description: 'Phosphate solubilizing bacteria (PSB) that unlock bound phosphorus in soil for better crop utilization.',
    usage: 'Apply 200ml mixed with organic matter per acre during soil preparation.',
    benefits: ['Releases locked phosphorus', 'Improves root growth', 'Sustainable agriculture', 'Cost-effective'],
    price: 280,
  },
  {
    id: '7',
    name: 'MicroMix Complete',
    category: 'water-soluble',
    description: 'Complete micronutrient mixture containing Zinc, Iron, Manganese, Copper, Boron, and Molybdenum.',
    usage: 'Dissolve 0.5-1 gram per liter. Apply as foliar spray 2-3 times during crop cycle.',
    benefits: ['Corrects multiple deficiencies', 'Improves crop quality', 'Essential for enzyme activation', 'Better yields'],
    price: 380,
  },
  {
    id: '8',
    name: 'FlowerMax Pro',
    category: 'micronutrients',
    description: 'Specialized flowering promoter with cytokinin-based formula for increased flower production and retention.',
    usage: 'Apply 0.5ml per liter at bud initiation stage and repeat after 10 days.',
    benefits: ['More flowers per plant', 'Reduced flower drop', 'Uniform flowering', 'Higher fruit set'],
    price: 890,
  },
  {
    id: '9',
    name: 'PotashBio K',
    category: 'organic',
    description: 'Potash mobilizing bacteria that enhance potassium availability from soil reserves.',
    usage: 'Apply 250ml per acre through drip or mixed with irrigation water.',
    benefits: ['Mobilizes soil potassium', 'Improves fruit quality', 'Better disease resistance', 'Sustainable farming'],
    price: 340,
  },
];

// Company information
export const companyInfo = {
  name: 'Sagar Raj Green Agro Biotech Company',
  tagline: 'Growing Tomorrow, Naturally',
  location: 'Indore, Madhya Pradesh',
  address: '138, Shiv Sagar Colony, Bijapur, Rau, Indore (M.P)',
  phone: '+91 98765 43210',
  email: 'info@sagarrajagro.com',
  natureOfBusiness: 'Wholesaler / Distributor',
  legalStatus: 'Proprietorship',
  gstRegistrationDate: '01-07-2017',
  gstNumber: '23ARUPP5876C1ZB',
  foundedYear: 2017,
  stats: {
    farmers: '1L+',
    dealers: '400+',
  }
};
