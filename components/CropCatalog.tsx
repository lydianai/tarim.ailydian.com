'use client';

import { useState } from 'react';
import { CROPS_DATABASE, type Crop } from '@/lib/crops-database';
import { Search, Sprout, Droplets, Thermometer, FlaskConical, Bug, Activity } from 'lucide-react';

export default function CropCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const categories = ['all', ...Array.from(new Set(CROPS_DATABASE.map(c => c.category)))];

  const filteredCrops = CROPS_DATABASE.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getWaterIcon = (requirement: string) => {
    const colors = {
      low: 'text-yellow-600',
      medium: 'text-blue-500',
      high: 'text-blue-700',
      very_high: 'text-indigo-700'
    };
    return colors[requirement as keyof typeof colors] || 'text-gray-500';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      grain: 'bg-amber-100 text-amber-800 border-amber-300',
      vegetable: 'bg-green-100 text-green-800 border-green-300',
      fruit: 'bg-red-100 text-red-800 border-red-300',
      legume: 'bg-purple-100 text-purple-800 border-purple-300',
      oilseed: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      fiber: 'bg-blue-100 text-blue-800 border-blue-300',
      tuber: 'bg-orange-100 text-orange-800 border-orange-300',
      specialty: 'bg-pink-100 text-pink-800 border-pink-300'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Sprout className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="text-2xl font-bold text-earth-100">Global Crop Catalog</h3>
            <p className="text-sm text-earth-300">30+ Agricultural Crops with Detailed Information</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search crops by name or scientific name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-earth-800 border border-earth-700 text-earth-100 placeholder-earth-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-earth-800 text-earth-200 hover:bg-earth-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crops List */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {filteredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCrop?.id === crop.id
                  ? 'border-green-500 bg-earth-800 shadow-md'
                  : 'border-earth-700 hover:border-green-300 hover:shadow bg-earth-850'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-earth-100">{crop.name}</h4>
                  <p className="text-xs italic text-earth-300 mb-2">{crop.scientificName}</p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(crop.category)}`}>
                      {crop.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-earth-300">
                      <Droplets className={`w-3 h-3 ${getWaterIcon(crop.waterRequirement)}`} />
                      <span>{crop.waterRequirement} water</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-earth-300">
                      <Activity className="w-3 h-3" />
                      <span>{crop.growingSeasonDays} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredCrops.length === 0 && (
            <div className="text-center py-12 text-earth-400">
              <Sprout className="w-16 h-16 mx-auto mb-3 text-earth-600" />
              <p>No crops found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Crop Details */}
        <div className="bg-earth-800 rounded-lg p-6 sticky top-0">
          {selectedCrop ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-earth-100 mb-1">{selectedCrop.name}</h3>
                <p className="text-sm italic text-earth-300 mb-3">{selectedCrop.scientificName}</p>
                <span className={`text-sm px-3 py-1 rounded-full border ${getCategoryColor(selectedCrop.category)}`}>
                  {selectedCrop.category}
                </span>
              </div>

              {/* Growing Conditions */}
              <div className="bg-earth-900 rounded-lg p-4 border border-earth-700">
                <h4 className="font-semibold text-earth-100 mb-3 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-600" />
                  Growing Conditions
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth-300">Growing Season:</span>
                    <span className="font-semibold text-earth-100">{selectedCrop.growingSeasonDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-300">Water Requirement:</span>
                    <span className="font-semibold text-earth-100 capitalize">{selectedCrop.waterRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-300">Soil pH:</span>
                    <span className="font-semibold text-earth-100">{selectedCrop.soilPH.min} - {selectedCrop.soilPH.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-300">Temperature:</span>
                    <span className="font-semibold text-earth-100">{selectedCrop.temperatureRange.min}°F - {selectedCrop.temperatureRange.max}°F</span>
                  </div>
                </div>
              </div>

              {/* Yield */}
              <div className="bg-earth-900 rounded-lg p-4 border border-earth-700">
                <h4 className="font-semibold text-earth-100 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  Expected Yield
                </h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {selectedCrop.yieldPerAcre.min}-{selectedCrop.yieldPerAcre.max}
                  </div>
                  <div className="text-sm text-earth-300">{selectedCrop.yieldPerAcre.unit} per acre</div>
                </div>
              </div>

              {/* Nutrients */}
              <div className="bg-earth-900 rounded-lg p-4 border border-earth-700">
                <h4 className="font-semibold text-earth-100 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-purple-600" />
                  Nutrient Requirements
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-blue-900 rounded p-2">
                    <div className="font-semibold text-blue-400">N</div>
                    <div className="text-xs text-earth-300 capitalize">{selectedCrop.nutrientRequirements.nitrogen}</div>
                  </div>
                  <div className="bg-purple-900 rounded p-2">
                    <div className="font-semibold text-purple-400">P</div>
                    <div className="text-xs text-earth-300 capitalize">{selectedCrop.nutrientRequirements.phosphorus}</div>
                  </div>
                  <div className="bg-pink-900 rounded p-2">
                    <div className="font-semibold text-pink-400">K</div>
                    <div className="text-xs text-earth-300 capitalize">{selectedCrop.nutrientRequirements.potassium}</div>
                  </div>
                </div>
              </div>

              {/* Pests & Diseases */}
              <div className="bg-earth-900 rounded-lg p-4 border border-earth-700">
                <h4 className="font-semibold text-earth-100 mb-3 flex items-center gap-2">
                  <Bug className="w-4 h-4 text-red-600" />
                  Common Pests & Diseases
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-earth-300 mb-1">Pests:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCrop.commonPests.slice(0, 4).map((pest, idx) => (
                        <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-earth-300 mb-1">Diseases:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedCrop.commonDiseases.slice(0, 4).map((disease, idx) => (
                        <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                          {disease}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Major Producers */}
              <div className="bg-earth-900 rounded-lg p-4 border border-earth-700">
                <h4 className="font-semibold text-earth-100 mb-2">Major Producers</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCrop.majorProducers.map((country, idx) => (
                    <span key={idx} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-earth-400">
              <Sprout className="w-20 h-20 mx-auto mb-4 text-earth-600" />
              <p>Select a crop to view details</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-earth-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="text-3xl font-bold text-green-700">{CROPS_DATABASE.length}</div>
            <div className="text-xs text-green-600 font-semibold">Total Crops</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="text-3xl font-bold text-blue-700">{categories.length - 1}</div>
            <div className="text-xs text-blue-600 font-semibold">Categories</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="text-3xl font-bold text-purple-700">15+</div>
            <div className="text-xs text-purple-600 font-semibold">Countries</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="text-3xl font-bold text-orange-700">100+</div>
            <div className="text-xs text-orange-600 font-semibold">Pests Tracked</div>
          </div>
        </div>
      </div>
    </div>
  );
}
