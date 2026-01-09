'use client';

import { Code, Database, Zap, Shield, TrendingUp, Globe, Check, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function AdvancedApiDocs() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiCapabilities = [
    {
      icon: Database,
      title: 'Real-Time USDA Data',
      description: 'Live access to USDA NASS QuickStats, commodity prices, and agricultural statistics',
      color: 'agri'
    },
    {
      icon: TrendingUp,
      title: 'Commodity Futures',
      description: 'Real-time futures market data for corn, wheat, soybeans, and livestock',
      color: 'harvest'
    },
    {
      icon: Globe,
      title: 'Weather & Satellite',
      description: 'NASA POWER weather data and Sentinel-2 satellite imagery for precision agriculture',
      color: 'sky'
    },
    {
      icon: Shield,
      title: 'EPA Pesticide Database',
      description: 'Comprehensive pesticide product labels and safety data (PPLS)',
      color: 'forest'
    },
    {
      icon: Zap,
      title: 'E-Commerce Integration',
      description: 'B2B marketplace API for agricultural equipment, seeds, fertilizers, and supplies',
      color: 'sunset'
    },
    {
      icon: Code,
      title: 'RESTful & JSON',
      description: 'Modern REST API with JSON responses, webhooks, and real-time WebSocket support',
      color: 'earth'
    }
  ];

  const realTimeApis = [
    {
      name: 'USDA NASS QuickStats API',
      endpoint: 'https://quickstats.nass.usda.gov/api',
      method: 'GET',
      description: 'Official USDA agricultural statistics - crop yields, livestock, prices',
      authentication: 'API Key Required',
      rateLimit: '1000 requests/day',
      documentation: 'https://quickstats.nass.usda.gov/api',
      example: `curl -X GET "https://quickstats.nass.usda.gov/api/api_GET/?key=YOUR_KEY&commodity_desc=CORN&year=2024&statisticcat_desc=YIELD"`,
      response: {
        data: [
          {
            year: 2024,
            commodity_desc: "CORN",
            statisticcat_desc: "YIELD",
            short_desc: "CORN, GRAIN - YIELD, MEASURED IN BU / ACRE",
            Value: "177.3"
          }
        ]
      }
    },
    {
      name: 'Commodities Price API',
      endpoint: 'https://commodities-api.com/api',
      method: 'GET',
      description: 'Real-time commodity futures - corn, wheat, soybeans, cattle, hogs',
      authentication: 'API Key',
      rateLimit: '60 sec intervals, 10,000/month',
      documentation: 'https://commodities-api.com/documentation',
      example: `curl -X GET "https://commodities-api.com/api/latest?access_key=YOUR_KEY&base=USD&symbols=CORN,WHEAT,SOYBEAN"`,
      response: {
        success: true,
        timestamp: 1735488000,
        base: "USD",
        data: {
          rates: {
            CORN: 4.25,
            WHEAT: 5.87,
            SOYBEAN: 10.12
          }
        }
      }
    },
    {
      name: 'USDA AMS Market News',
      endpoint: 'https://marsapi.ams.usda.gov/services/v1.2',
      method: 'GET',
      description: 'Agricultural Marketing Service - live market prices, livestock auctions',
      authentication: 'Open Access',
      rateLimit: 'Unlimited',
      documentation: 'https://marsapi.ams.usda.gov/',
      example: `curl -X GET "https://marsapi.ams.usda.gov/services/v1.2/reports?q=commodity:corn"`,
      response: {
        results: [
          {
            slug_name: "corn_grain_central_il",
            published_date: "2024-12-29",
            report_title: "Corn Grain Central IL Daily",
            market_types: ["Cash"]
          }
        ]
      }
    },
    {
      name: 'NASA POWER Weather API',
      endpoint: 'https://power.larc.nasa.gov/api',
      method: 'GET',
      description: 'Agricultural weather data - temperature, precipitation, solar radiation',
      authentication: 'Open Access',
      rateLimit: 'Unlimited',
      documentation: 'https://power.larc.nasa.gov/docs/',
      example: `curl -X GET "https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M,PRECTOTCORR&latitude=41.85&longitude=-87.65&start=20240101&end=20241231&format=JSON"`,
      response: {
        parameters: {
          T2M: {
            "20241229": 2.5
          },
          PRECTOTCORR: {
            "20241229": 0.0
          }
        }
      }
    },
    {
      name: 'EPA PPLS Pesticide API',
      endpoint: 'https://ordspub.epa.gov/ords/pesticides/ppls',
      method: 'GET',
      description: 'EPA Pesticide Product Label System - safety data, active ingredients',
      authentication: 'Open Access',
      rateLimit: 'Fair use',
      documentation: 'https://www.epa.gov/pesticide-registration',
      example: `curl -X GET "https://ordspub.epa.gov/ords/pesticides/ppls/f?p=PPLS:1"`,
      response: {
        products: [
          {
            epa_reg_number: "100-1234",
            product_name: "Agricultural Fungicide XL",
            active_ingredients: ["Chlorothalonil 54.0%"]
          }
        ]
      }
    }
  ];

  const colorMap: Record<string, string> = {
    agri: 'from-agri-500 to-forest-600',
    harvest: 'from-harvest-500 to-sunset-600',
    sky: 'from-sky-500 to-sky-700',
    forest: 'from-forest-600 to-agri-700',
    sunset: 'from-sunset-500 to-sunset-700',
    earth: 'from-earth-600 to-earth-800'
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-earth-900 rounded-2xl shadow-agri-lg border-l-4 border-agri-600 p-8">
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-br from-agri-500 to-forest-600 p-4 rounded-xl shadow-agri">
            <Code className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-display font-bold text-agri-900 mb-3">
              Lydian AgriTech API Platform
            </h1>
            <p className="text-lg text-earth-700 mb-4">
              Enterprise-grade agricultural intelligence APIs with real-time USDA data, commodity futures, weather analytics, and e-commerce integration
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-agri-50 px-4 py-2 rounded-lg border border-agri-200">
                <div className="w-2 h-2 bg-agri-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-agri-900">99.9% Uptime</span>
              </div>
              <div className="bg-sky-50 px-4 py-2 rounded-lg border border-sky-200">
                <span className="text-sm font-semibold text-sky-900">&lt;100ms Response</span>
              </div>
              <div className="bg-harvest-50 px-4 py-2 rounded-lg border border-harvest-200">
                <span className="text-sm font-semibold text-harvest-900">18+ Data Sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Capabilities */}
      <div>
        <h2 className="text-2xl font-display font-bold text-agri-900 mb-6">API Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiCapabilities.map((capability, idx) => {
            const Icon = capability.icon;
            return (
              <div key={idx} className="bg-earth-900 rounded-xl p-6 shadow-lg hover:shadow-agri-lg transition-all border border-gray-100">
                <div className={`bg-gradient-to-br ${colorMap[capability.color]} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{capability.title}</h3>
                <p className="text-sm text-gray-400">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time API Endpoints */}
      <div>
        <h2 className="text-2xl font-display font-bold text-agri-900 mb-6">Real-Time API Endpoints</h2>
        <div className="space-y-6">
          {realTimeApis.map((api, idx) => (
            <div key={idx} className="bg-earth-900 rounded-xl shadow-lg border-l-4 border-agri-500 overflow-hidden">
              {/* API Header */}
              <div className="bg-gradient-to-r from-agri-50 to-forest-50 p-6 border-b border-agri-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-agri-900 mb-2">{api.name}</h3>
                    <p className="text-sm text-earth-700 mb-3">{api.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-agri-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {api.method}
                      </span>
                      <span className="bg-sky-100 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full border border-sky-300">
                        {api.authentication}
                      </span>
                      <span className="bg-harvest-100 text-harvest-800 text-xs font-semibold px-3 py-1 rounded-full border border-harvest-300">
                        {api.rateLimit}
                      </span>
                    </div>
                  </div>
                  <a
                    href={api.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-agri-700 hover:text-agri-900 text-sm font-semibold"
                  >
                    Docs <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Endpoint URL */}
                <div className="bg-earth-900 rounded-lg p-3 border border-earth-200 font-mono text-sm break-all">
                  <span className="text-gray-400">{api.endpoint}</span>
                </div>
              </div>

              {/* Code Example */}
              <div className="p-6 bg-gray-900">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-agri-400 font-semibold text-sm">cURL Example</span>
                  <button
                    onClick={() => copyToClipboard(api.example, api.name)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {copiedEndpoint === api.name ? (
                      <>
                        <Check className="w-4 h-4 text-agri-500" />
                        <span className="text-agri-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs text-gray-300 overflow-x-auto">
                  <code>{api.example}</code>
                </pre>
              </div>

              {/* Response Example */}
              <div className="p-6 bg-earth-900 border-t border-earth-700">
                <span className="text-earth-800 font-semibold text-sm mb-3 block">Example Response (JSON)</span>
                <pre className="bg-earth-900 rounded-lg p-4 border border-earth-200 text-xs text-white overflow-x-auto">
                  <code>{JSON.stringify(api.response, null, 2)}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Support */}
      <div className="bg-gradient-to-br from-agri-500 via-forest-600 to-sky-700 rounded-2xl p-8 text-white shadow-agri-lg">
        <div className="text-center max-w-3xl mx-auto">
          <Zap className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Integrate?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get instant access to real-time agricultural data, commodity prices, and e-commerce APIs.
            Free tier available with 1,000 requests/day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-earth-900 text-agri-700 font-bold px-8 py-3 rounded-lg hover:bg-earth-900 transition-all shadow-lg">
              Get API Key
            </button>
            <button className="bg-earth-900/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-lg border-2 border-white hover:bg-earth-900/30 transition-all">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border-t-4 border-agri-500">
          <Database className="w-8 h-8 text-agri-600 mb-3" />
          <h3 className="font-bold text-lg text-white mb-2">Data Sources</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-agri-500" /> USDA NASS</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-agri-500" /> USDA AMS</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-agri-500" /> NASA POWER</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-agri-500" /> EPA PPLS</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-agri-500" /> Commodities API</li>
          </ul>
        </div>

        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border-t-4 border-sky-500">
          <Shield className="w-8 h-8 text-sky-600 mb-3" />
          <h3 className="font-bold text-lg text-white mb-2">Security & Auth</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> API Key Authentication</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> HTTPS/TLS 1.3</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Rate Limiting</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> Request Signing</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-sky-500" /> IP Whitelisting</li>
          </ul>
        </div>

        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border-t-4 border-harvest-500">
          <TrendingUp className="w-8 h-8 text-harvest-600 mb-3" />
          <h3 className="font-bold text-lg text-white mb-2">Performance</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-harvest-500" /> &lt;100ms Latency</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-harvest-500" /> 99.9% Uptime SLA</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-harvest-500" /> Global CDN</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-harvest-500" /> WebSocket Support</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-harvest-500" /> Batch Processing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
