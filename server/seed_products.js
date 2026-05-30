const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const { Sequelize } = require('sequelize');

dotenv.config({ path: path.join(__dirname, '.env') });

const categories = [
    { name: 'water-soluble', description: 'Water Soluble Fertilizers' },
    { name: 'growth-promoter', description: 'Growth Promoters' },
    { name: 'bio-fertilizer', description: 'Bio Fertilizers' },
    { name: 'micronutrients', description: 'Micronutrients' },
    { name: 'organic', description: 'Organic Products' },
    { name: 'herbal', description: 'Herbal Products' }
];

const products = [
    {
        name: 'AgroGrow NPK 19-19-19',
        category: 'water-soluble',
        description: 'A balanced water-soluble fertilizer providing essential nutrients for all stages of plant growth. Perfect for foliar application and fertigation.',
        usage: 'Dissolve 2-3 grams per liter of water. Apply through foliar spray or drip irrigation every 10-15 days during the growing season.',
        benefits: ['Balanced nutrition for healthy growth', 'Quick absorption by plants', 'Suitable for all crops', 'Improves yield quality'],
        price: '450',
        status: 'Available'
    },
    {
        name: 'RootMax Bio Stimulant',
        category: 'growth-promoter',
        description: 'Advanced root development formula enriched with natural growth hormones and beneficial microorganisms for stronger root systems.',
        usage: 'Apply 2ml per liter of water as soil drench during transplanting and early vegetative stage.',
        benefits: ['Enhanced root development', 'Improved nutrient uptake', 'Stress resistance', 'Better transplant survival'],
        price: '680',
        status: 'Available'
    },
    {
        name: 'BioNitro Plus',
        category: 'bio-fertilizer',
        description: 'Nitrogen-fixing biofertilizer containing Azotobacter and Azospirillum for sustainable nitrogen supply to crops.',
        usage: 'Mix 200ml with 50kg of FYM or apply directly to soil at 1L per acre.',
        benefits: ['Natural nitrogen fixation', 'Improves soil health', 'Eco-friendly', 'Reduces chemical fertilizer need'],
        price: '320',
        status: 'Available'
    },
    {
        name: 'CalMag Booster',
        category: 'water-soluble',
        description: 'Calcium and Magnesium supplement for preventing deficiency disorders and improving fruit quality.',
        usage: 'Dissolve 1-2 grams per liter. Apply as foliar spray during flowering and fruiting stages.',
        benefits: ['Prevents blossom end rot', 'Strengthens cell walls', 'Improves fruit firmness', 'Enhanced shelf life'],
        price: '520',
        status: 'Available'
    },
    {
        name: 'PhytoZyme Growth',
        category: 'growth-promoter',
        description: 'Enzyme-based growth promoter derived from seaweed extracts for enhanced photosynthesis and plant vigor.',
        usage: 'Apply 1ml per liter of water as foliar spray every 15 days.',
        benefits: ['Increased chlorophyll content', 'Better flowering', 'Improved fruit set', 'Natural stress tolerance'],
        price: '750',
        status: 'Available'
    },
    {
        name: 'PhosphoBac',
        category: 'bio-fertilizer',
        description: 'Phosphate solubilizing bacteria (PSB) that unlock bound phosphorus in soil for better crop utilization.',
        usage: 'Apply 200ml mixed with organic matter per acre during soil preparation.',
        benefits: ['Releases locked phosphorus', 'Improves root growth', 'Sustainable agriculture', 'Cost-effective'],
        price: '280',
        status: 'Available'
    },
    {
        name: 'MicroMix Complete',
        category: 'water-soluble',
        description: 'Complete micronutrient mixture containing Zinc, Iron, Manganese, Copper, Boron, and Molybdenum.',
        usage: 'Dissolve 0.5-1 gram per liter. Apply as foliar spray 2-3 times during crop cycle.',
        benefits: ['Corrects multiple deficiencies', 'Improves crop quality', 'Essential for enzyme activation', 'Better yields'],
        price: '380',
        status: 'Available'
    },
    {
        name: 'FlowerMax Pro',
        category: 'growth-promoter',
        description: 'Specialized flowering promoter with cytokinin-based formula for increased flower production and retention.',
        usage: 'Apply 0.5ml per liter at bud initiation stage and repeat after 10 days.',
        benefits: ['More flowers per plant', 'Reduced flower drop', 'Uniform flowering', 'Higher fruit set'],
        price: '890',
        status: 'Available'
    },
    {
        name: 'PotashBio K',
        category: 'bio-fertilizer',
        description: 'Potash mobilizing bacteria that enhance potassium availability from soil reserves.',
        usage: 'Apply 250ml per acre through drip or mixed with irrigation water.',
        benefits: ['Mobilizes soil potassium', 'Improves fruit quality', 'Better disease resistance', 'Sustainable farming'],
        price: '340',
        status: 'Available'
    },
];

async function seed() {
    try {
        const Category = require('./models/Category');
        const Product = require('./models/Product');
        const sequelize = require('./config/database');

        console.log('Syncing database...');
        await sequelize.sync();

        console.log('Seeding categories...');
        for (const cat of categories) {
            await Category.findOrCreate({
                where: { name: cat.name },
                defaults: cat
            });
        }

        console.log('Seeding products...');
        await Product.bulkCreate(products);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
