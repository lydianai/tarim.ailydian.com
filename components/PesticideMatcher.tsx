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
      'I': 'bg-red-900/50 text-red-300 border-red-700',
      'II': 'bg-orange-900/50 text-orange-300 border-orange-700',
      'III': 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      'IV': 'bg-green-900/50 text-green-300 border-green-700'
    };
    return colors[category as keyof typeof colors] || 'bg-earth-800 text-earth-200';
  };

  const getEnvironmentalColor = (impact: string) => {
    const colors = {
      'low': 'text-green-400',
      'moderate': 'text-yellow-400',
      'high': 'text-orange-400',
      'severe': 'text-red-400'
    };
    return colors[impact as keyof typeof colors] || 'text-earth-300';
  };

  return (
    <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="text-2xl font-bold text-earth-100">Smart Pesticide Matcher</h3>
            <p className="text-sm text-earth-300">AI-powered crop protection recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-semibold text-earth-200 mb-2">
              Select Crop
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-4 py-2 bg-earth-800 border border-earth-600 text-earth-100 rounded-lg focus:ring-2 focus:ring-purple-500"
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
            <label className="block text-sm font-semibold text-earth-200 mb-2">
              Target Pest/Disease
            </label>
            <select
              value={selectedPest}
              onChange={(e) => setSelectedPest(e.target.value)}
              disabled={!selectedCrop}
              className="w-full px-4 py-2 bg-earth-800 border border-earth-600 text-earth-100 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:bg-earth-900 disabled:opacity-50"
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
            <label className="block text-sm font-semibold text-earth-200 mb-2">
              Filters
            </label>
            <button
              onClick={() => setFilterOrganic(!filterOrganic)}
              className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                filterOrganic
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-earth-800 text-earth-200 hover:bg-earth-700 border border-earth-600'
              }`}
            >
              <Leaf className="w-4 h-4" />
              Organic Only
            </button>
          </div>
        </div>
      </div>

      {selectedCrop && crop && (
        <div className="mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-blue-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-earth-100 mb-2">{crop.name}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-earth-300">Common Pests:</span>
                  <div className="font-semibold text-earth-100">{crop.commonPests.length}</div>
                </div>
                <div>
                  <span className="text-earth-300">Common Diseases:</span>
                  <div className="font-semibold text-earth-100">{crop.commonDiseases.length}</div>
                </div>
                <div>
                  <span className="text-earth-300">Solutions Found:</span>
                  <div className="font-semibold text-green-400">{filteredPesticides.length}</div>
                </div>
                <div>
                  <span className="text-earth-300">Organic Options:</span>
                  <div className="font-semibold text-green-400">
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
              className="bg-earth-800/30 border border-earth-700 rounded-lg p-5 hover:border-purple-600 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg text-earth-100">{pesticide.productName}</h4>
                    {(pesticide.chemicalClass === 'Biological' || pesticide.chemicalClass === 'Botanical') && (
                      <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded-full border border-green-700 font-semibold flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        ORGANIC
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-earth-300 mb-2">
                    <span className="font-semibold">Active Ingredient:</span> {pesticide.activeIngredient}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getToxicityColor(pesticide.toxicityCategory)}`}>
                      Category {pesticide.toxicityCategory}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700 font-semibold uppercase">
                      {pesticide.type}
                    </span>
                    {pesticide.restrictedUse && (
                      <span className="text-xs px-3 py-1 rounded-full bg-red-900/50 text-red-300 border border-red-700 font-semibold flex items-center gap-1">
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
                  <div className="bg-earth-800/50 rounded p-3 border border-earth-700">
                    <div className="text-xs font-semibold text-earth-300 mb-2">Target Pests:</div>
                    <div className="flex flex-wrap gap-1">
                      {pesticide.targetPests.slice(0, 6).map((pest, idx) => (
                        <span key={idx} className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded border border-orange-700">
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-earth-800/50 rounded p-3 border border-earth-700">
                    <div className="text-xs font-semibold text-earth-300 mb-2">Application Rate:</div>
                    <div className="text-sm font-bold text-earth-100">
                      {pesticide.applicationRate.min} - {pesticide.applicationRate.max} {pesticide.applicationRate.unit}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-blue-900/30 rounded p-2 border border-blue-700">
                      <div className="text-xs text-earth-300">Pre-Harvest</div>
                      <div className="font-bold text-blue-400">{pesticide.preharvestInterval} days</div>
                    </div>
                    <div className="bg-purple-900/30 rounded p-2 border border-purple-700">
                      <div className="text-xs text-earth-300">Re-Entry</div>
                      <div className="font-bold text-purple-400">{pesticide.reentryInterval} hours</div>
                    </div>
                  </div>

                  <div className="bg-earth-800/50 rounded p-3 border border-earth-700">
                    <div className="text-xs font-semibold text-earth-300 mb-2">Environmental Impact:</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-earth-300">Overall Impact:</span>
                        <span className={`font-semibold uppercase ${getEnvironmentalColor(pesticide.environmentalImpact)}`}>
                          {pesticide.environmentalImpact}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-earth-300">Soil Persistence:</span>
                        <span className="font-semibold text-earth-100 capitalize">{pesticide.soilPersistence}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-earth-300">Water Solubility:</span>
                        <span className="font-semibold text-earth-100 capitalize">{pesticide.waterSolubility}</span>
                      </div>
                      {pesticide.bioaccumulation && (
                        <div className="flex items-center gap-1 text-orange-400 mt-2">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="font-semibold">Bioaccumulation Risk</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-earth-700 flex items-center justify-between text-xs text-earth-300">
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
          <div className="text-center py-12 text-earth-400">
            <Shield className="w-16 h-16 mx-auto mb-3 text-earth-600" />
            <p className="font-semibold">No pesticides found matching your criteria</p>
            <p className="text-sm">Try adjusting your filters or pest selection</p>
          </div>
        ) : (
          <div className="text-center py-12 text-earth-400">
            <Sprout className="w-20 h-20 mx-auto mb-4 text-earth-600" />
            <p className="text-lg font-semibold">Select a crop to get started</p>
            <p className="text-sm">Choose from {CROPS_DATABASE.length} crops in our database</p>
          </div>
        )}
      </div>

      {selectedCrop && filteredPesticides.length > 0 && (
        <div className="mt-6 p-4 bg-amber-900/30 rounded-lg border border-amber-700">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200">
              <div className="font-semibold mb-1">Important Safety Information</div>
              <ul className="space-y-1 text-xs text-amber-300">
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
