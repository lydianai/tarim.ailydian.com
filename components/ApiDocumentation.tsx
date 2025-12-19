'use client';

import { Code, Book, Key, Zap, Shield, CheckCircle, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function ApiDocumentation() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const apiEndpoints = [
    {
      name: 'USDA NASS Data',
      method: 'GET',
      endpoint: '/api/usda-nass',
      description: 'Fetch agricultural statistics from USDA National Agricultural Statistics Service',
      params: [
        { name: 'commodity', type: 'string', required: false, description: 'Crop name (e.g., CORN, WHEAT)' },
        { name: 'state', type: 'string', required: false, description: 'US state code (e.g., IOWA, CALIFORNIA)' },
        { name: 'year', type: 'number', required: false, description: 'Year (e.g., 2024)' },
      ],
      example: `curl -X GET "https://tarim.ailydian.com/api/usda-nass?commodity=CORN&state=IOWA&year=2024"`,
      response: `{
  "data": {
    "commodity": "CORN",
    "state": "IOWA",
    "year": 2024,
    "acres": 12500000,
    "production": 2500000000,
    "yield": 200
  }
}`,
    },
    {
      name: 'Weather Data',
      method: 'GET',
      endpoint: '/api/weather',
      description: 'Get real-time weather data for agricultural locations',
      params: [
        { name: 'lat', type: 'number', required: true, description: 'Latitude coordinate' },
        { name: 'lon', type: 'number', required: true, description: 'Longitude coordinate' },
      ],
      example: `curl -X GET "https://tarim.ailydian.com/api/weather?lat=41.8781&lon=-93.0977"`,
      response: `{
  "temp": 22.5,
  "humidity": 65,
  "precipitation": 0,
  "wind_speed": 12.5,
  "conditions": "Partly Cloudy"
}`,
    },
    {
      name: 'EPA Pesticides',
      method: 'GET',
      endpoint: '/api/epa-pesticides',
      description: 'Search EPA-approved pesticides database',
      params: [
        { name: 'search', type: 'string', required: false, description: 'Search term for pesticide name' },
        { name: 'crop', type: 'string', required: false, description: 'Target crop' },
      ],
      example: `curl -X GET "https://tarim.ailydian.com/api/epa-pesticides?crop=tomato"`,
      response: `{
  "pesticides": [
    {
      "name": "Chlorothalonil",
      "epa_reg": "EPA-100-1234",
      "crops": ["tomato", "potato"],
      "activeIngredient": "Chlorothalonil 82.5%"
    }
  ]
}`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-earth-900/20 backdrop-blur-sm p-4 rounded-xl">
            <Code className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
            <p className="text-xl text-white/90">Complete API Reference for AgriTech Platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'API Endpoints', value: '18+', icon: Zap },
            { label: 'Request Limit', value: '1000/day', icon: Shield },
            { label: 'Response Time', value: '<100ms', icon: CheckCircle },
          ].map((stat, idx) => (
            <div key={idx} className="bg-earth-900/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-5 h-5" />
                <span className="text-sm opacity-90">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Key className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-earth-100">Authentication</h2>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-bold text-earth-100 mb-4 text-xl">API Key</h3>
          <p className="text-earth-300 mb-4">
            Most endpoints are publicly accessible. For higher rate limits and premium features, request an API key.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            <div className="flex items-center justify-between">
              <span>X-API-Key: your_api_key_here</span>
              <button
                onClick={() => copyToClipboard('X-API-Key: your_api_key_here', 'auth')}
                className="text-white hover:text-green-400 transition-colors"
              >
                {copiedEndpoint === 'auth' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Terminal className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-earth-100">API Endpoints</h2>
        </div>

        {apiEndpoints.map((api, idx) => (
          <div key={idx} className="bg-earth-900 rounded-xl p-8 shadow-lg border border-earth-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-earth-100">{api.name}</h3>
              <span className={`px-4 py-2 rounded-lg font-bold text-sm ${
                api.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                {api.method}
              </span>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <code className="text-green-400 font-mono text-sm">{api.endpoint}</code>
            </div>

            <p className="text-earth-300 mb-6">{api.description}</p>

            {/* Parameters */}
            <div className="mb-6">
              <h4 className="font-bold text-earth-100 mb-3">Parameters</h4>
              <div className="space-y-2">
                {api.params.map((param, pidx) => (
                  <div key={pidx} className="bg-earth-900 rounded-lg p-3 border border-earth-700">
                    <div className="flex items-center gap-3 mb-1">
                      <code className="text-purple-600 font-mono text-sm">{param.name}</code>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{param.type}</span>
                      {param.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-earth-300">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Request */}
            <div className="mb-6">
              <h4 className="font-bold text-earth-100 mb-3">Example Request</h4>
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{api.example}</pre>
                <button
                  onClick={() => copyToClipboard(api.example, api.endpoint)}
                  className="absolute top-3 right-3 text-white hover:text-green-400 transition-colors"
                >
                  {copiedEndpoint === api.endpoint ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Example Response */}
            <div>
              <h4 className="font-bold text-earth-100 mb-3">Example Response</h4>
              <div className="bg-gray-900 rounded-lg p-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{api.response}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rate Limits */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Shield className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-earth-100">Rate Limits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: 'Free', limit: '100 requests/day', price: '$0' },
            { tier: 'Professional', limit: '1,000 requests/day', price: '$49/mo' },
            { tier: 'Enterprise', limit: 'Unlimited', price: '$999/mo' },
          ].map((tier, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-300">
              <h3 className="font-bold text-blue-900 text-xl mb-2">{tier.tier}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">{tier.price}</div>
              <div className="text-sm text-earth-300">{tier.limit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center">
        <Book className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-xl mb-6 opacity-90">Our technical team is here to assist you</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-earth-900/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-90">Email Support</div>
            <div className="font-bold">api@agritech-platform.com</div>
          </div>
          <div className="bg-earth-900/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-90">Documentation</div>
            <div className="font-bold">docs.tarim.ailydian.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
