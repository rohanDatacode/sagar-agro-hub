const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
    {
        name: 'AgroGrow NPK 19-19-19',
        category: 'water-soluble',
        description: 'A balanced water-soluble fertilizer providing essential nutrients for all stages of plant growth. Perfect for foliar application and fertigation.',
        usage: 'Dissolve 2-3 grams per liter of water. Apply through foliar spray or drip irrigation every 10-15 days during the growing season.',
        benefits: ['Balanced nutrition for healthy growth', 'Quick absorption by plants', 'Suitable for all crops', 'Improves yield quality'],
        price: 450,
    },
    {
        name: 'RootMax Bio Stimulant',
        category: 'growth-promoter',
        description: 'Advanced root development formula enriched with natural growth hormones and beneficial microorganisms for stronger root systems.',
        usage: 'Apply 2ml per liter of water as soil drench during transplanting and early vegetative stage.',
        benefits: ['Enhanced root development', 'Improved nutrient uptake', 'Stress resistance', 'Better transplant survival'],
        price: 680,
    },
    {
        name: 'BioNitro Plus',
        category: 'bio-fertilizer',
        description: 'Nitrogen-fixing biofertilizer containing Azotobacter and Azospirillum for sustainable nitrogen supply to crops.',
        usage: 'Mix 200ml with 50kg of FYM or apply directly to soil at 1L per acre.',
        benefits: ['Natural nitrogen fixation', 'Improves soil health', 'Eco-friendly', 'Reduces chemical fertilizer need'],
        price: 320,
    },
    {
        name: 'CalMag Booster',
        category: 'water-soluble',
        description: 'Calcium and Magnesium supplement for preventing deficiency disorders and improving fruit quality.',
        usage: 'Dissolve 1-2 grams per liter. Apply as foliar spray during flowering and fruiting stages.',
        benefits: ['Prevents blossom end rot', 'Strengthens cell walls', 'Improves fruit firmness', 'Enhanced shelf life'],
        price: 520,
    },
    {
        name: 'PhytoZyme Growth',
        category: 'growth-promoter',
        description: 'Enzyme-based growth promoter derived from seaweed extracts for enhanced photosynthesis and plant vigor.',
        usage: 'Apply 1ml per liter of water as foliar spray every 15 days.',
        benefits: ['Increased chlorophyll content', 'Better flowering', 'Improved fruit set', 'Natural stress tolerance'],
        price: 750,
    },
    {
        name: 'PhosphoBac',
        category: 'bio-fertilizer',
        description: 'Phosphate solubilizing bacteria (PSB) that unlock bound phosphorus in soil for better crop utilization.',
        usage: 'Apply 200ml mixed with organic matter per acre during soil preparation.',
        benefits: ['Releases locked phosphorus', 'Improves root growth', 'Sustainable agriculture', 'Cost-effective'],
        price: 280,
    },
    {
        name: 'MicroMix Complete',
        category: 'water-soluble',
        description: 'Complete micronutrient mixture containing Zinc, Iron, Manganese, Copper, Boron, and Molybdenum.',
        usage: 'Dissolve 0.5-1 gram per liter. Apply as foliar spray 2-3 times during crop cycle.',
        benefits: ['Corrects multiple deficiencies', 'Improves crop quality', 'Essential for enzyme activation', 'Better yields'],
        price: 380,
    },
    {
        name: 'FlowerMax Pro',
        category: 'growth-promoter',
        description: 'Specialized flowering promoter with cytokinin-based formula for increased flower production and retention.',
        usage: 'Apply 0.5ml per liter at bud initiation stage and repeat after 10 days.',
        benefits: ['More flowers per plant', 'Reduced flower drop', 'Uniform flowering', 'Higher fruit set'],
        price: 890,
    },
    {
        name: 'PotashBio K',
        category: 'bio-fertilizer',
        description: 'Potash mobilizing bacteria that enhance potassium availability from soil reserves.',
        usage: 'Apply 250ml per acre through drip or mixed with irrigation water.',
        benefits: ['Mobilizes soil potassium', 'Improves fruit quality', 'Better disease resistance', 'Sustainable farming'],
        price: 340,
    },
];

async function seed() {
    try {
        const adminSecret = process.env.ADMIN_SECRET;
        if (!adminSecret) {
            console.error("ADMIN_SECRET not found in .env");
            return;
        }

        const res = await axios.post('http://localhost:5000/api/products/seed', {
            adminSecret,
            products
        });

        console.log(res.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

seed();
