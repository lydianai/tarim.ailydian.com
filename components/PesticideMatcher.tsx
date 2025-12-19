'use client';

import { useState } from 'react';
import { CROPS_DATABASE } from '@/lib/crops-database';
import { PESTICIDES_DATABASE, getPesticidesByCrop } from '@/lib/pesticides-database';
import { Sprout, Droplet, AlertTriangle, CheckCircle2, Shield, Leaf } from 'lucide-react';

export default function PesticideMatcher() {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedPest, setSelectedPest] = useState('');
  const [filterOrganic, setFilterOrganic] = useState(false);

  const crop = CROPS_DATABASE.find(c => c.id === selectedCrop);
  const recommendedPesticides = selectedCrop ? getPesticidesByCrop(selectedCrop) : [];

  const filteredPesticides = recommendedPesticides.filter(p => {
    const matchesPest = !selectedPest || p.targetPests.some(tp =>
      tp.toLowerCase().includes(selectedPest.toLowerCase())
    );
    const matchesOrganic = !filterOrganic || p.chemicalClass === 'Biological' || p.chemicalClass === 'Botanical';
    return matchesPest && matchesOrganic;
  });

  const getToxicityColor = (category: string) => {
    const colors = {
      'I': 'bg-red-100 text-red-800 border-red-300',
      'II': 'bg-orange-100 text-orange-800 border-orange-300',
      'III': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'IV': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getEnvironmentalColor = (impact: string) => {
    const colors = {
      'low': 'text-green-600',
      'moderate': 'text-yellow-600',
      'high': 'text-orange-600',
      'severe': 'text-red-600'
    };
    return colors[impact as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Smart Pesticide Matcher</h3>
            <p className="text-sm text-gray-600">AI-powered crop protection recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Choose Crop --</option>
              {CROPS_DATABASE.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pest/Disease Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Pest/Disease
            </label>
            <select
              value={selectedPest}
              onChange={(e) => setSelectedPest(e.target.value)}
              disabled={!selectedCrop}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
            >
              <option value="">All Pests & Diseases</option>
              {crop && [...crop.commonPests, ...crop.commonDiseases].map((pest, idx) => (
                <option key={idx} value={pest}>
                  {pest}
                </option>
              ))}
            </select>
          </div>

          {/* Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filters
            </label>
            <button
              onClick={() => setFilterOrganic(!filterOrganic)}
              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                filterOrganic
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Leaf className="w-4 h-4" />
              Organic Only
            </button>
          </div>
        </div>
      </div>

      {selectedCrop && crop && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2">{crop.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Common Pests:</span>
                  <div className="font-semibold text-gray-800">{crop.commonPests.length}</div>
                </div>
                <div>
                  <span className="text-gray-600">Common Diseases:</span>
                  <div className="font-semibold text-gray-800">{crop.commonDiseases.length}</div>
                </div>
                <div>
                  <span className="text-gray-600">Solutions Found:</span>
                  <div className="font-semibold text-green-600">{filteredPesticides.length}</div>
                </div>
                <div>
                  <span className="text-gray-600">Organic Options:</span>
                  <div className="font-semibold text-green-600">
                    {recommendedPesticides.filter(p => p.chemicalClass === 'Biological' || p.chemicalClass === 'Botanical').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pesticide Recommendations */}
      <div className="space-y-4">
        {filteredPesticides.length > 0 ? (
          filteredPesticides.map((pesticide) => (
            <div
              key={pesticide.id}
              className="border-2 border-gray-200 rounded-lg p-5 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">{pesticide.productName}</h4>
                    {(pesticide.chemicalClass === 'Biological' || pesticide.chemicalClass === 'Botanical') && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-300 font-semibold flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        ORGANIC
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Active Ingredient:</span> {pesticide.activeIngredient}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getToxicityColor(pesticide.toxicityCategory)}`}>
                      Category {pesticide.toxicityCategory}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold uppercase">
                      {pesticide.type}
                    </span>
                    {pesticide.restrictedUse && (
                      <span className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        RESTRICTED USE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Target Pests:</div>
                    <div className="flex flex-wrap gap-1">
                      {pesticide.targetPests.slice(0, 6).map((pest, idx) => (
                        <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-200">
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Application Rate:</div>
                    <div className="text-sm font-bold text-gray-800">
                      {pesticide.applicationRate.min} - {pesticide.applicationRate.max} {pesticide.applicationRate.unit}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-50 rounded p-2">
                      <div className="text-xs text-gray-600">Pre-Harvest</div>
                      <div className="font-bold text-blue-700">{pesticide.preharvestInterval} days</div>
                    </div>
                    <div className="bg-purple-50 rounded p-2">
                      <div className="text-xs text-gray-600">Re-Entry</div>
                      <div className="font-bold text-purple-700">{pesticide.reentryInterval} hours</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Environmental Impact:</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Overall Impact:</span>
                        <span className={`font-semibold uppercase ${getEnvironmentalColor(pesticide.environmentalImpact)}`}>
                          {pesticide.environmentalImpact}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Soil Persistence:</span>
                        <span className="font-semibold text-gray-800 capitalize">{pesticide.soilPersistence}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Water Solubility:</span>
                        <span className="font-semibold text-gray-800 capitalize">{pesticide.waterSolubility}</span>
                      </div>
                      {pesticide.bioaccumulation && (
                        <div className="flex items-center gap-1 text-orange-700 mt-2">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="font-semibold">Bioaccumulation Risk</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                <div>
                  <span className="font-semibold">Manufacturer:</span> {pesticide.manufacturer}
                </div>
                <div>
                  <span className="font-semibold">Mode of Action:</span> {pesticide.modeOfAction}
                </div>
              </div>
            </div>
          ))
        ) : selectedCrop ? (
          <div className="text-center py-12 text-gray-500">
            <Shield className="w-16 h-16 mx-auto mb-3 text-gray-300" />
            <p className="font-semibold">No pesticides found matching your criteria</p>
            <p className="text-sm">Try adjusting your filters or pest selection</p>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Sprout className="w-20 h-20 mx-auto mb-4" />
            <p className="text-lg font-semibold">Select a crop to get started</p>
            <p className="text-sm">Choose from {CROPS_DATABASE.length} crops in our database</p>
          </div>
        )}
      </div>

      {selectedCrop && filteredPesticides.length > 0 && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <div className="font-semibold mb-1">Important Safety Information</div>
              <ul className="space-y-1 text-xs">
                <li>• Always read and follow label instructions</li>
                <li>• Use appropriate personal protective equipment (PPE)</li>
                <li>• Respect pre-harvest and re-entry intervals</li>
                <li>• Consider integrated pest management (IPM) practices</li>
                <li>• Consult with certified crop advisors for specific recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
