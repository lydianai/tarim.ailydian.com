'use client';

import { useState } from 'react';
import { Package, MapPin, Leaf, Thermometer, Truck, Store, Shield, Award, TrendingDown, Droplet, CheckCircle, QrCode, Hash } from 'lucide-react';
import { SUPPLY_CHAIN_RECORDS, SupplyChainTraceability } from '@/lib/supply-chain-model';

export default function SupplyChainTracker() {
  const [selectedProduct, setSelectedProduct] = useState<SupplyChainTraceability>(SUPPLY_CHAIN_RECORDS[0]);
  const [activeStage, setActiveStage] = useState<'farm' | 'harvest' | 'processing' | 'distribution' | 'retail'>('farm');

  const stages = [
    { id: 'farm', label: 'Farm Origin', icon: Leaf, color: 'from-green-500 to-emerald-600' },
    { id: 'harvest', label: 'Harvest', icon: Package, color: 'from-amber-500 to-orange-600' },
    { id: 'processing', label: 'Processing', icon: Shield, color: 'from-blue-500 to-indigo-600' },
    { id: 'distribution', label: 'Distribution', icon: Truck, color: 'from-purple-500 to-pink-600' },
    { id: 'retail', label: 'Retail', icon: Store, color: 'from-red-500 to-rose-600' }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Supply Chain Traceability</h2>
            <p className="text-white/90">Farm-to-Consumer Transparency with Blockchain Verification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Transparency Score', value: selectedProduct.transparencyScore + '%', icon: Award },
            { label: 'Carbon Footprint', value: selectedProduct.sustainability.totalCarbonFootprint.toFixed(2) + ' kg CO2e', icon: TrendingDown },
            { label: 'Food Miles', value: selectedProduct.sustainability.foodMiles + ' mi', icon: Truck },
            { label: 'Water Footprint', value: selectedProduct.sustainability.waterFootprint + ' gal', icon: Droplet }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-white" />
                <span className="text-xs text-white/80">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Selector */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-blue-600" />
          Select Product to Track
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPLY_CHAIN_RECORDS.map((record) => (
            <button
              key={record.traceabilityId}
              onClick={() => setSelectedProduct(record)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedProduct.traceabilityId === record.traceabilityId
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-bold text-gray-900 mb-1">{record.product.name}</div>
              <div className="text-sm text-gray-600">{record.journey.farm.farmName}</div>
              <div className="text-xs text-gray-500 mt-2">ID: {record.traceabilityId}</div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${record.transparencyScore}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-green-600">{record.transparencyScore}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Journey Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Product Journey Timeline</h3>
        <div className="flex items-center justify-between mb-6 overflow-x-auto">
          {stages.map((stage, idx) => (
            <div key={stage.id} className="flex items-center flex-1 min-w-[120px]">
              <button
                onClick={() => setActiveStage(stage.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                  activeStage === stage.id
                    ? 'bg-gradient-to-br ' + stage.color + ' text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <stage.icon className="w-6 h-6" />
                <span className="text-xs font-semibold text-center">{stage.label}</span>
              </button>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-1 bg-gradient-to-r from-gray-300 to-gray-400 mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Stage Details */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
          {activeStage === 'farm' && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-600" />
                Farm Origin
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Farm Name</div>
                    <div className="font-bold text-gray-900">{selectedProduct.journey.farm.farmName}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Location
                    </div>
                    <div className="text-gray-800">{selectedProduct.journey.farm.location.address}</div>
                    <div className="text-sm text-gray-600">
                      {selectedProduct.journey.farm.location.county}, {selectedProduct.journey.farm.location.state}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {selectedProduct.journey.farm.location.coordinates.lat.toFixed(4)}°N,
                      {selectedProduct.journey.farm.location.coordinates.lon.toFixed(4)}°W
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Certifications
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.journey.farm.certifications.map((cert, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                    <h5 className="font-semibold text-gray-800 mb-3">Soil Health Metrics</h5>
                    <div className="space-y-2">
                      {[
                        { label: 'Organic Matter', value: selectedProduct.journey.farm.soilHealth.organicMatter + '%', color: 'green' },
                        { label: 'pH Level', value: selectedProduct.journey.farm.soilHealth.pH.toFixed(1), color: 'blue' },
                        { label: 'Nitrogen (N)', value: selectedProduct.journey.farm.soilHealth.nitrogen + ' ppm', color: 'purple' },
                        { label: 'Phosphorus (P)', value: selectedProduct.journey.farm.soilHealth.phosphorus + ' ppm', color: 'orange' },
                        { label: 'Potassium (K)', value: selectedProduct.journey.farm.soilHealth.potassium + ' ppm', color: 'pink' },
                        { label: 'Carbon Sequestration', value: selectedProduct.journey.farm.soilHealth.carbonSequestration + ' t CO2/ac/yr', color: 'emerald' }
                      ].map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{metric.label}</span>
                          <span className={`text-sm font-bold text-${metric.color}-600`}>{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">Farming Practices</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.journey.farm.practices.map((practice, idx) => (
                        <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStage === 'harvest' && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-amber-600" />
                Harvest Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Harvest ID</div>
                    <div className="font-bold text-gray-900">{selectedProduct.journey.harvest.harvestId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Crop & Variety</div>
                    <div className="font-bold text-gray-900">{selectedProduct.journey.harvest.cropType}</div>
                    <div className="text-sm text-gray-600">{selectedProduct.journey.harvest.varietyName}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Planting Date</div>
                      <div className="text-gray-900">{new Date(selectedProduct.journey.harvest.plantingDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Harvest Date</div>
                      <div className="text-gray-900">{new Date(selectedProduct.journey.harvest.harvestDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Quantity</div>
                      <div className="font-bold text-gray-900">
                        {selectedProduct.journey.harvest.quantity.toLocaleString()} {selectedProduct.journey.harvest.unit}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Quality Grade</div>
                      <div className="font-bold text-green-600">{selectedProduct.journey.harvest.qualityGrade}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-blue-600" />
                      Irrigation Data
                    </h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Water Used</span>
                        <span className="font-bold text-blue-600">
                          {selectedProduct.journey.harvest.irrigationData.totalWaterUsed.toLocaleString()} gal
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Efficiency</span>
                        <span className="font-bold text-green-600">{selectedProduct.journey.harvest.irrigationData.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Method</span>
                        <span className="text-sm capitalize font-semibold text-gray-800">
                          {selectedProduct.journey.harvest.irrigationData.method}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedProduct.journey.harvest.pesticidesUsed.length === 0 ? (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">No Pesticides Used</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">Grown using organic methods</p>
                    </div>
                  ) : (
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <h5 className="font-semibold text-amber-900 mb-2">Pesticides Used</h5>
                      {selectedProduct.journey.harvest.pesticidesUsed.map((pesticide, idx) => (
                        <div key={idx} className="text-sm text-amber-800">• {pesticide.productName}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeStage === 'processing' && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Processing & Quality Control
              </h4>
              {selectedProduct.journey.processing.map((proc, procIdx) => (
                <div key={procIdx} className="mb-6 last:mb-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Facility</div>
                        <div className="font-bold text-gray-900">{proc.facilityName}</div>
                        <div className="text-sm text-gray-600">{proc.facilityLocation}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Batch Number</div>
                        <div className="font-mono text-sm text-gray-900">{proc.batchNumber}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Received</div>
                          <div className="text-sm text-gray-900">{new Date(proc.receivedDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Processed</div>
                          <div className="text-sm text-gray-900">{new Date(proc.processedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Certifications</div>
                        <div className="flex flex-wrap gap-2">
                          {proc.certifications.map((cert, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-red-600" />
                          Temperature Log
                        </h5>
                        <div className="space-y-2">
                          {proc.temperatureLog.map((log, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                              <span className="font-semibold text-blue-600">{log.temperature}°F | {log.humidity}% RH</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">Quality Tests Passed</h5>
                        <div className="space-y-1">
                          {proc.qualityTests.map((test, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-green-800">
                              <CheckCircle className="w-4 h-4" />
                              <span>{test.testType}: {test.result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeStage === 'distribution' && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-purple-600" />
                Distribution & Cold Chain
              </h4>
              {selectedProduct.journey.distribution.map((dist, distIdx) => (
                <div key={distIdx} className="mb-6 last:mb-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Distributor</div>
                        <div className="font-bold text-gray-900">{dist.distributorName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Vehicle ID</div>
                          <div className="text-sm font-mono text-gray-900">{dist.vehicleId}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Driver</div>
                          <div className="text-sm text-gray-900">{dist.driverName}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Route
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="text-sm text-gray-900">{dist.route.origin}</div>
                          </div>
                          <div className="border-l-2 border-dashed border-gray-300 ml-1.5 h-4"></div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="text-sm text-gray-900">{dist.route.destination}</div>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">Distance: {dist.route.distance} miles</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-blue-600" />
                          Cold Chain Monitoring
                        </h5>
                        <div className="space-y-2">
                          {dist.coldChainTracking.slice(0, 3).map((track, idx) => (
                            <div key={idx} className="bg-blue-50 rounded p-2">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{new Date(track.timestamp).toLocaleString()}</span>
                                <span className={`font-semibold ${track.doorStatus === 'closed' ? 'text-green-600' : 'text-amber-600'}`}>
                                  {track.doorStatus}
                                </span>
                              </div>
                              <div className="text-sm font-bold text-blue-600">
                                {track.temperature}°F | {track.humidity}% RH
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">Environmental Impact</h5>
                        <div className="text-sm text-purple-800">
                          Fuel Efficiency: <span className="font-bold">{dist.fuelEfficiency} mpg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeStage === 'retail' && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Store className="w-6 h-6 text-red-600" />
                Retail & Pricing Transparency
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Store Name</div>
                    <div className="font-bold text-gray-900">{selectedProduct.journey.retail.storeName}</div>
                    <div className="text-sm text-gray-600">{selectedProduct.journey.retail.storeLocation}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Shelf Date</div>
                      <div className="text-sm text-gray-900">
                        {new Date(selectedProduct.journey.retail.shelfDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Best By</div>
                      <div className="text-sm text-gray-900">
                        {new Date(selectedProduct.journey.retail.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-3">Storage Conditions</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature</span>
                        <span className="font-bold text-blue-600">{selectedProduct.journey.retail.storageConditions.temperature}°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Humidity</span>
                        <span className="font-bold text-blue-600">{selectedProduct.journey.retail.storageConditions.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="capitalize text-gray-900">{selectedProduct.journey.retail.storageConditions.location.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                    <h5 className="font-semibold text-gray-800 mb-4">Pricing Transparency</h5>
                    <div className="text-3xl font-bold text-green-600 mb-4">
                      ${selectedProduct.journey.retail.price.toFixed(2)}
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Farm Gate Price', value: selectedProduct.journey.retail.priceBreakdown.farmGate, color: 'green', percent: (selectedProduct.journey.retail.priceBreakdown.farmGate / selectedProduct.journey.retail.price * 100).toFixed(0) },
                        { label: 'Processing Cost', value: selectedProduct.journey.retail.priceBreakdown.processingCost, color: 'blue', percent: (selectedProduct.journey.retail.priceBreakdown.processingCost / selectedProduct.journey.retail.price * 100).toFixed(0) },
                        { label: 'Distribution Cost', value: selectedProduct.journey.retail.priceBreakdown.distributionCost, color: 'purple', percent: (selectedProduct.journey.retail.priceBreakdown.distributionCost / selectedProduct.journey.retail.price * 100).toFixed(0) },
                        { label: 'Retail Markup', value: selectedProduct.journey.retail.priceBreakdown.retailMarkup, color: 'orange', percent: (selectedProduct.journey.retail.priceBreakdown.retailMarkup / selectedProduct.journey.retail.price * 100).toFixed(0) }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{item.label}</span>
                            <span className={`font-bold text-${item.color}-600`}>${item.value.toFixed(2)} ({item.percent}%)</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blockchain Verification */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Hash className="w-6 h-6" />
          Blockchain Verification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Transaction Hash</div>
            <div className="font-mono text-xs text-white break-all">{selectedProduct.blockchain[0].transactionHash}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Data Hash (SHA-256)</div>
            <div className="font-mono text-xs text-white break-all">{selectedProduct.blockchain[0].dataHash}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Verified By</div>
            <div className="text-sm text-white font-semibold">{selectedProduct.blockchain[0].verifier}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-xs text-white/70 mb-1">Verification Status</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-bold text-green-400">Verified & Immutable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Certifications */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Compliance & Certifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'FDA FSMA 204', value: selectedProduct.compliance.fsmaCertified, desc: 'Food Traceability' },
            { label: 'GS1 Compliant', value: selectedProduct.compliance.gs1Compliant, desc: 'Global Standards' },
            { label: 'USDA Organic', value: selectedProduct.compliance.organicCertified, desc: 'Organic Certified' },
            { label: 'Fair Trade', value: selectedProduct.compliance.fairTradeCertified, desc: 'Fair Trade Certified' }
          ].map((cert, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                cert.value ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {cert.value ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                )}
                <span className={`text-sm font-bold ${cert.value ? 'text-green-700' : 'text-gray-600'}`}>
                  {cert.label}
                </span>
              </div>
              <div className="text-xs text-gray-600">{cert.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
