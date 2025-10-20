export const crops = [
  { name: 'Rice', soilTypes: ['clay', 'loamy'], minRainfall: 100, maxRainfall: 200, season: 'Kharif' },
  { name: 'Wheat', soilTypes: ['loamy', 'sandy'], minRainfall: 50, maxRainfall: 100, season: 'Rabi' },
  { name: 'Cotton', soilTypes: ['black', 'loamy'], minRainfall: 50, maxRainfall: 100, season: 'Kharif' },
  { name: 'Sugarcane', soilTypes: ['loamy', 'clay'], minRainfall: 100, maxRainfall: 150, season: 'Year-round' },
  { name: 'Maize', soilTypes: ['loamy', 'sandy'], minRainfall: 50, maxRainfall: 100, season: 'Kharif' },
  { name: 'Pulses', soilTypes: ['black', 'loamy'], minRainfall: 40, maxRainfall: 80, season: 'Rabi' },
  { name: 'Groundnut', soilTypes: ['sandy', 'loamy'], minRainfall: 50, maxRainfall: 100, season: 'Kharif' },
  { name: 'Chilli', soilTypes: ['loamy', 'black'], minRainfall: 60, maxRainfall: 120, season: 'Kharif' },
];

export const marketPrices = [
  { crop: 'Rice', price: 2200, change: 5.2, trend: 'up', unit: 'quintal' },
  { crop: 'Wheat', price: 2050, change: -2.1, trend: 'down', unit: 'quintal' },
  { crop: 'Cotton', price: 6500, change: 8.5, trend: 'up', unit: 'quintal' },
  { crop: 'Sugarcane', price: 310, change: 3.2, trend: 'up', unit: 'quintal' },
  { crop: 'Maize', price: 1850, change: 1.5, trend: 'up', unit: 'quintal' },
  { crop: 'Pulses', price: 5500, change: -1.8, trend: 'down', unit: 'quintal' },
  { crop: 'Groundnut', price: 5200, change: 4.3, trend: 'up', unit: 'quintal' },
  { crop: 'Chilli', price: 12000, change: 12.5, trend: 'up', unit: 'quintal' },
];

export const pests = [
  {
    name: 'Stem Borer',
    crops: ['Rice', 'Sugarcane'],
    symptoms: ['Dead heart', 'White ear head', 'Holes in stem'],
    treatment: 'Apply Cartap hydrochloride or Chlorantraniliprole',
  },
  {
    name: 'Aphids',
    crops: ['Cotton', 'Chilli', 'Pulses'],
    symptoms: ['Curling leaves', 'Honeydew secretion', 'Stunted growth'],
    treatment: 'Spray Imidacloprid or Thiamethoxam',
  },
  {
    name: 'Leaf Blight',
    crops: ['Rice', 'Wheat'],
    symptoms: ['Brown spots', 'Leaf wilting', 'Reduced yield'],
    treatment: 'Apply Mancozeb or Copper oxychloride fungicide',
  },
  {
    name: 'Bollworm',
    crops: ['Cotton'],
    symptoms: ['Damaged bolls', 'Larvae in flowers', 'Reduced yield'],
    treatment: 'Use Bacillus thuringiensis or Spinosad',
  },
];

export const weatherAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Heavy Rainfall Expected',
    description: 'Heavy to very heavy rainfall expected in coastal districts for next 48 hours',
    district: 'Guntur',
    severity: 'high',
    validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    type: 'advisory',
    title: 'Pest Attack Warning',
    description: 'Favorable conditions for aphid infestation. Farmers advised to monitor crops',
    district: 'Krishna',
    severity: 'medium',
    validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const priceHistory = {
  Rice: [2100, 2150, 2180, 2120, 2200, 2220, 2200],
  Wheat: [2100, 2080, 2050, 2030, 2050, 2070, 2050],
  Cotton: [6000, 6200, 6300, 6400, 6450, 6500, 6500],
  Maize: [1820, 1830, 1840, 1850, 1850, 1860, 1850],
};

export const districts = [
  'Guntur', 'Krishna', 'Visakhapatnam', 'East Godavari', 'West Godavari',
  'Prakasam', 'Nellore', 'Chittoor', 'Kadapa', 'Anantapur', 'Kurnool'
];

export const soilTypes = ['Clay', 'Loamy', 'Sandy', 'Black', 'Red', 'Alluvial'];

export const translations = {
  en: {
    welcome: 'Welcome to Smart Crop Advisory',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    cropRecommendation: 'Crop Recommendation',
    pestDetection: 'Pest Detection',
    marketPrices: 'Market Prices',
    weatherAlerts: 'Weather Alerts',
    chatbot: 'AI Assistant',
    logout: 'Logout',
  },
  te: {
    welcome: 'స్మార్ట్ పంట సలహా వ్యవస్థకు స్వాగతం',
    login: 'లాగిన్',
    register: 'నమోదు',
    dashboard: 'డాష్‌బోర్డ్',
    cropRecommendation: 'పంట సిఫార్సు',
    pestDetection: 'తెగులు గుర్తింపు',
    marketPrices: 'మార్కెట్ ధరలు',
    weatherAlerts: 'వాతావరణ హెచ్చరికలు',
    chatbot: 'AI సహాయకుడు',
    logout: 'లాగ్అవుట్',
  },
};