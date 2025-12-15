# 🌾 AgriTech Platform - Smart Agriculture Analytics

A comprehensive web-based agricultural platform that integrates real-time data from multiple sources including USDA, EPA, and weather APIs to provide intelligent crop yield predictions, soil analysis, and pesticide recommendations.

## 🎯 Features

### 📊 Real-Time Data Integration
- **USDA NASS API** - Crop yield statistics and agricultural data
- **EPA PPLS API** - Pesticide product information and safety data
- **OpenWeather Agro API** - Weather forecasts and climate data
- **Mapbox Satellite** - Interactive agricultural mapping

### 🗺️ Interactive Map
- Satellite imagery with Mapbox GL JS
- Click anywhere to select farm locations
- Real-time coordinate display
- Agricultural zone highlighting

### 🌡️ Weather Dashboard
- Current weather conditions
- 5-day forecast
- Temperature, humidity, and wind speed
- Location-based weather data

### 📈 Crop Yield Analytics
- Historical yield trends (USDA data)
- Year-over-year comparisons
- Interactive charts with Recharts
- Statistical analysis (average, peak, latest)

### 🧪 Soil Analysis Module
- Soil properties (pH, texture, organic matter)
- Nutrient levels (N, P, K)
- Drainage and erosion assessment
- Crop recommendations based on soil type
- Radar charts for soil health visualization

### 💊 Pesticide Database
- EPA-registered agricultural chemicals
- Toxicity category indicators
- Active ingredients information
- Application rates and restrictions
- Searchable database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd ~/Desktop/agritech-platform
```

2. Install dependencies (already done):
```bash
npm install
```

3. Set up environment variables (optional):
Edit `.env.local` to add your API keys:
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Get from [Mapbox](https://www.mapbox.com/)
- `NEXT_PUBLIC_NASS_API_KEY` - Get from [USDA NASS](https://quickstats.nass.usda.gov/api)
- `NEXT_PUBLIC_OPENWEATHER_API_KEY` - Get from [OpenWeather](https://openweathermap.org/api)

**Note:** The app works with mock data if API keys are not provided.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
agritech-platform/
├── app/
│   ├── api/              # API routes
│   │   ├── usda-nass/    # USDA crop data endpoint
│   │   ├── weather/      # Weather data endpoint
│   │   └── epa-pesticides/ # Pesticide data endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles
├── components/
│   ├── AgriMap.tsx       # Interactive Mapbox map
│   ├── WeatherWidget.tsx # Weather display component
│   ├── CropYieldChart.tsx # Yield analytics charts
│   ├── SoilAnalysis.tsx  # Soil data visualization
│   └── PesticideTable.tsx # Pesticide database table
├── lib/
│   └── utils.ts          # Utility functions
└── package.json
```

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mapping:** Mapbox GL JS
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 🌐 API Integration

### USDA NASS QuickStats API
Provides agricultural statistics including:
- Crop yield data by state and year
- Production statistics
- Harvested area information

**Endpoint:** `/api/usda-nass?commodity=CORN&state=IOWA&year=2023`

### EPA Pesticide Product Label System (PPLS)
Access to EPA-registered pesticide information:
- Product names and manufacturers
- Active ingredients
- Toxicity categories
- Application rates
- Restricted use status

**Endpoint:** `/api/epa-pesticides?search=atrazine`

### OpenWeather API
Real-time and forecasted weather data:
- Current conditions
- 5-day forecast
- Temperature, humidity, wind
- Soil temperature (Agro API)

**Endpoint:** `/api/weather?lat=41.8781&lon=-93.0977`

## 🎨 UI Components

### Dashboard Tabs
- **Overview** - Map, weather, and yield trends
- **Soil Analysis** - Comprehensive soil health data
- **Pesticides** - Searchable chemical database

### Interactive Features
- Click map to select locations
- Real-time weather updates
- Searchable pesticide database
- Responsive sidebar navigation

## 📊 Data Visualization

- Line charts for yield trends
- Bar charts for nutrient comparisons
- Radar charts for soil health index
- Color-coded toxicity indicators
- Animated data cards

## 🔒 Environment Variables

Create a `.env.local` file with the following (optional):

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_NASS_API_KEY=your_usda_api_key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
```

## 📝 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Future Enhancements

- [ ] Machine Learning yield prediction models
- [ ] IoT sensor integration
- [ ] Mobile app (React Native)
- [ ] User authentication
- [ ] Farm management tools
- [ ] Real-time NDVI satellite analysis
- [ ] Crop disease detection
- [ ] Market price integration

## 📄 License

ISC

## 👨‍💻 Author

AgriTech Platform Development Team

---

**Built with real agricultural data from USDA, EPA, and OpenWeather APIs** 🌱
