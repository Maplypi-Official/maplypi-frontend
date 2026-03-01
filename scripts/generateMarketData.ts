import fs from 'fs';
import path from 'path';

const generateGalacticData = () => {
  const products: any[] = [];
  
  const categories = [
    'Legendary', 'Mythic', 'CyberTech', 'GalacticRealEstate', 
    'BioEnhancement', 'ExoticRelics', 'EnergyCells', 'Transport', 
    'ExoSuits', 'Classified'
  ];

  // قاموس الأسماء لإعطاء طابع "العالم المفتوح"
  const namingMatrix: Record<string, string[]> = {
    'EnergyCells': ['Dark Matter Cell', 'Plasma Core', 'Pi-Fusion Battery'],
    'Transport': ['Nebula Drifter', 'Void Clipper', 'Quantum Speedster'],
    'ExoSuits': ['Titanium Skin v4', 'Ghost Stealth Suit', 'Alpha Commander Plate'],
    'Classified': ['Encrypted Data Fragment', 'Void Key', 'Shadow Protocol'],
    'GalacticRealEstate': ['Moon Crater Plot', 'Saturn Ring Outpost', 'Digital Oasis']
  };

  // توليد 50,000 منتج كبداية (قابلة للزيادة لمليون)
  for (let i = 1; i <= 50000; i++) {
    let category = categories[Math.floor(Math.random() * categories.length)];
    let stock = Math.floor(Math.random() * 500);
    let price = parseFloat((Math.random() * 1000).toFixed(4));
    let quality = Math.floor(Math.random() * 41) + 60;

    // قوانين الندرة (Scarcity Rules)
    if (i === 1) {
       category = 'Legendary';
       stock = 1; // القطعة الوحيدة في الوجود
       price = 314159.26;
    } else if (i <= 11) {
       category = 'Mythic';
       stock = 10;
       price = Math.floor(Math.random() * 10000) + 5000;
    }

    const baseName = namingMatrix[category] 
      ? namingMatrix[category][Math.floor(Math.random() * namingMatrix[category].length)]
      : `${category} Unit`;

    products.push({
      id: `pi-asset-${i}`,
      name: `${baseName} ${i > 11 ? '#' + (i + 1024).toString(16).toUpperCase() : ''}`,
      price: price,
      category: category,
      stock: stock,
      quality: quality,
      durability: Math.floor(Math.random() * 100),
      image: `/Resources/Products/${category}/item-${(i % 5) + 1}.webp`,
      description: `Authentic ${category} asset. Certified for cross-border trade in the Pi ecosystem.`
    });
  }

  const dir = './public/data';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'market_products.json'), JSON.stringify(products, null, 2));
  
  console.log("🌌 THE OMNIVERSE IS READY: 50,000 Galactic Assets Created!");
};

generateGalacticData();

