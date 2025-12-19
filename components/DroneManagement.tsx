'use client';

import React, { useState, useEffect } from 'react';
import { fetchDroneTelemetry, fetchWeather, fetchSatelliteData } from '@/lib/api-client';
import { useDroneContext } from '@/contexts/DroneContext';
import LiveDroneMap from './LiveDroneMap';
import {
  Plane,
  Battery,
  MapPin,
  Activity,
  Droplet,
  Wind,
  ThermometerSun,
  Sprout,
  AlertTriangle,
  CheckCircle,
  Radio,
  Camera,
  Scan,
  Navigation,
  Play,
  Pause,
  RotateCw,
  Home,
  Download,
  Upload,
  Zap,
  TrendingUp,
  TrendingDown,
  Layers,
  Target,
  Globe
} from 'lucide-react';

interface DroneManagementProps {
  language?: 'tr' | 'en';
}

interface DroneStatus {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'charging' | 'maintenance';
  battery: number;
  altitude: number;
  speed: number;
  position: { lat: number; lng: number };
  temperature: number;
  humidity: number;
  windSpeed: number;
  flightTime: number;
  coverage: number;
  lastUpdate: Date;
}

interface SensorData {
  ndvi: number;
  soilMoisture: number;
  cropHealth: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pestDetection: boolean;
  diseaseRisk: 'low' | 'medium' | 'high';
}

interface FlightMission {
  id: string;
  name: string;
  type: 'survey' | 'spray' | 'monitoring' | 'seeding';
  area: number;
  status: 'scheduled' | 'active' | 'completed' | 'paused';
  progress: number;
  droneId: string;
  startTime: Date;
  estimatedCompletion: Date;
}

export default function DroneManagement({ language = 'tr' }: DroneManagementProps) {
  // Use shared drone context
  const {
    drones: contextDrones,
    setDrones: setContextDrones,
    missions: contextMissions,
    setMissions: setContextMissions,
    sensorData: contextSensorData,
    setSensorData: setContextSensorData,
    realTimeData,
    setRealTimeData,
    selectedDrone,
    setSelectedDrone
  } = useDroneContext();

  const [activeTab, setActiveTab] = useState<'fleet' | 'missions' | 'sensors' | 'analytics'>('fleet');

  const t = {
    // Main Navigation
    droneFleet: language === 'tr' ? 'Drone Filosu' : 'Drone Fleet',
    missions: language === 'tr' ? 'Görevler' : 'Missions',
    sensors: language === 'tr' ? 'Sensörler' : 'Sensors',
    analytics: language === 'tr' ? 'Analitik' : 'Analytics',

    // Drone Status
    active: language === 'tr' ? 'Aktif' : 'Active',
    idle: language === 'tr' ? 'Beklemede' : 'Idle',
    charging: language === 'tr' ? 'Şarj Oluyor' : 'Charging',
    maintenance: language === 'tr' ? 'Bakımda' : 'Maintenance',

    // Flight Info
    altitude: language === 'tr' ? 'İrtifa' : 'Altitude',
    speed: language === 'tr' ? 'Hız' : 'Speed',
    battery: language === 'tr' ? 'Batarya' : 'Battery',
    flightTime: language === 'tr' ? 'Uçuş Süresi' : 'Flight Time',
    coverage: language === 'tr' ? 'Kapsama' : 'Coverage',
    temperature: language === 'tr' ? 'Sıcaklık' : 'Temperature',
    humidity: language === 'tr' ? 'Nem' : 'Humidity',
    windSpeed: language === 'tr' ? 'Rüzgar Hızı' : 'Wind Speed',

    // Sensors
    ndviIndex: language === 'tr' ? 'NDVI İndeksi' : 'NDVI Index',
    soilMoisture: language === 'tr' ? 'Toprak Nemi' : 'Soil Moisture',
    cropHealth: language === 'tr' ? 'Ürün Sağlığı' : 'Crop Health',
    nitrogenLevel: language === 'tr' ? 'Azot Seviyesi' : 'Nitrogen Level',
    phosphorusLevel: language === 'tr' ? 'Fosfor Seviyesi' : 'Phosphorus Level',
    potassiumLevel: language === 'tr' ? 'Potasyum Seviyesi' : 'Potassium Level',
    pestDetection: language === 'tr' ? 'Zararlı Tespit' : 'Pest Detection',
    diseaseRisk: language === 'tr' ? 'Hastalık Riski' : 'Disease Risk',

    // Mission Types
    survey: language === 'tr' ? 'Tarama' : 'Survey',
    spray: language === 'tr' ? 'İlaçlama' : 'Spray',
    monitoring: language === 'tr' ? 'İzleme' : 'Monitoring',
    seeding: language === 'tr' ? 'Ekim' : 'Seeding',

    // Mission Status
    scheduled: language === 'tr' ? 'Planlandı' : 'Scheduled',
    completed: language === 'tr' ? 'Tamamlandı' : 'Completed',
    paused: language === 'tr' ? 'Duraklatıldı' : 'Paused',

    // Actions
    startMission: language === 'tr' ? 'Görevi Başlat' : 'Start Mission',
    pauseMission: language === 'tr' ? 'Duraklat' : 'Pause',
    returnHome: language === 'tr' ? 'Eve Dön' : 'Return Home',
    downloadData: language === 'tr' ? 'Veri İndir' : 'Download Data',
    uploadMission: language === 'tr' ? 'Görev Yükle' : 'Upload Mission',

    // Risk Levels
    low: language === 'tr' ? 'Düşük' : 'Low',
    medium: language === 'tr' ? 'Orta' : 'Medium',
    high: language === 'tr' ? 'Yüksek' : 'High',

    // Real-time
    realTimeData: language === 'tr' ? 'Canlı Veri' : 'Real-Time Data',
    lastUpdate: language === 'tr' ? 'Son Güncelleme' : 'Last Update',
    liveStream: language === 'tr' ? 'Canlı Yayın' : 'Live Stream',

    // Stats
    totalDrones: language === 'tr' ? 'Toplam Drone' : 'Total Drones',
    activeMissions: language === 'tr' ? 'Aktif Görevler' : 'Active Missions',
    areaCovered: language === 'tr' ? 'Kaplanan Alan' : 'Area Covered',
    dataCollected: language === 'tr' ? 'Toplanan Veri' : 'Data Collected',
  };

  // Map context data to local interfaces
  const drones: DroneStatus[] = contextDrones.map(d => ({
    id: d.id,
    name: d.name,
    model: d.model,
    status: d.status,
    battery: d.battery,
    altitude: d.altitude,
    speed: d.speed,
    position: { lat: d.latitude, lng: d.longitude },
    temperature: d.temperature,
    humidity: d.humidity,
    windSpeed: d.windSpeed,
    flightTime: d.flightTime,
    coverage: d.coverage,
    lastUpdate: d.lastUpdate,
  }));

  const setDrones = (updater: DroneStatus[] | ((prev: DroneStatus[]) => DroneStatus[])) => {
    const newDrones = typeof updater === 'function' ? updater(drones) : updater;
    setContextDrones(newDrones.map(d => ({
      ...contextDrones.find(cd => cd.id === d.id)!,
      id: d.id,
      name: d.name,
      model: d.model,
      status: d.status,
      battery: d.battery,
      altitude: d.altitude,
      speed: d.speed,
      latitude: d.position.lat,
      longitude: d.position.lng,
      temperature: d.temperature,
      humidity: d.humidity,
      windSpeed: d.windSpeed,
      flightTime: d.flightTime,
      coverage: d.coverage,
      lastUpdate: d.lastUpdate,
    })));
  };

  const sensorData = contextSensorData;
  const setSensorData = (updater: SensorData | ((prev: SensorData) => SensorData)) => {
    if (typeof updater === 'function') {
      setContextSensorData(updater(contextSensorData));
    } else {
      setContextSensorData(updater);
    }
  };

  // Map missions from context (simplified mapping for now)
  const missions: FlightMission[] = contextMissions.map(m => ({
    id: m.id,
    name: m.name,
    type: m.type as 'survey' | 'spray' | 'monitoring' | 'seeding',
    area: m.area,
    status: m.status as 'scheduled' | 'active' | 'completed' | 'paused',
    progress: m.progress,
    droneId: m.droneId,
    startTime: new Date(m.startTime),
    estimatedCompletion: new Date(m.estimatedCompletion),
  }));

  const setMissions = (updater: FlightMission[] | ((prev: FlightMission[]) => FlightMission[])) => {
    const newMissions = typeof updater === 'function' ? updater(missions) : updater;
    setContextMissions(newMissions.map(m => ({
      id: m.id,
      name: m.name,
      type: m.type as 'mapping' | 'spraying' | 'monitoring' | 'inspection',
      droneId: m.droneId,
      status: m.status as 'active' | 'completed' | 'scheduled' | 'paused',
      progress: m.progress,
      area: m.area,
      startTime: m.startTime.toISOString().substring(11, 16),
      estimatedCompletion: m.estimatedCompletion.toISOString().substring(11, 16),
      priority: contextMissions.find(cm => cm.id === m.id)?.priority || 'medium',
    })));
  };

  // Context now handles initialization

  // Fetch real data from APIs
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Fetch drone telemetry from real API
        const telemetryData = await fetchDroneTelemetry();
        if (telemetryData?.success && telemetryData.data) {
          // Update drones with real API data
          const apiDrones = telemetryData.data.map((d: any) => ({
            id: d.droneInfo.id,
            name: d.droneInfo.name,
            model: d.droneInfo.model,
            status: d.status.current,
            battery: d.battery.level,
            altitude: d.position.altitude.relative,
            speed: d.velocity.horizontal,
            position: { lat: d.position.latitude, lng: d.position.longitude },
            temperature: d.weather.temperature,
            humidity: d.weather.humidity,
            windSpeed: d.weather.windSpeed,
            flightTime: d.flight.flightTime,
            coverage: d.flight.areaCovered,
            lastUpdate: new Date(d.metadata.timestamp),
          }));
          setDrones(apiDrones);

          // Update sensor data from multispectral drones
          const multispectralDrone = telemetryData.data.find((d: any) => d.sensors?.multispectral);
          if (multispectralDrone?.sensors) {
            setSensorData((prev: SensorData) => ({
              ...prev,
              ndvi: multispectralDrone.sensors.multispectral.ndvi.current,
              temperature: multispectralDrone.sensors.temperature.ground,
            }));
          }
        }

        // Fetch satellite data for additional NDVI and soil moisture
        const satelliteData = await fetchSatelliteData(39.9334, 32.8597, 7);
        if (satelliteData?.success && satelliteData.data?.timeSeriesData?.length > 0) {
          const latestSatellite = satelliteData.data.timeSeriesData[satelliteData.data.timeSeriesData.length - 1];
          setSensorData((prev: SensorData) => ({
            ...prev,
            ndvi: latestSatellite.indices.ndvi.value,
            soilMoisture: latestSatellite.soilMoisture.percentage,
            cropHealth: latestSatellite.chlorophyll.content,
          }));
        }

        // Fetch weather data
        const weatherData = await fetchWeather(39.9334, 32.8597);
        if (weatherData?.success && weatherData.current) {
          setSensorData((prev: SensorData) => ({
            ...prev,
            temperature: (weatherData.current.main.temp - 32) * 5/9, // F to C
          }));
        }
      } catch (error) {
        console.error('Error fetching real data:', error);
      }
    };

    // Fetch immediately
    fetchRealData();

    // Then fetch every 10 seconds if real-time is enabled
    if (realTimeData) {
      const interval = setInterval(fetchRealData, 10000);
      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  // Simulate real-time data updates (for smooth animations between API calls)
  useEffect(() => {
    if (!realTimeData) return;

    const interval = setInterval(() => {
      setDrones((prev: DroneStatus[]) => prev.map(drone => {
        if (drone.status === 'active') {
          return {
            ...drone,
            battery: Math.max(0, drone.battery - Math.random() * 0.1),
            altitude: drone.altitude + (Math.random() - 0.5) * 2,
            speed: Math.max(0, drone.speed + (Math.random() - 0.5) * 0.5),
            flightTime: drone.flightTime + 1/60,
            coverage: drone.coverage + Math.random() * 0.2,
            lastUpdate: new Date(),
          };
        }
        return { ...drone, lastUpdate: new Date() };
      }));

      setSensorData((prev: SensorData) => ({
        ...prev,
        soilMoisture: Math.max(0, Math.min(100, prev.soilMoisture + (Math.random() - 0.5) * 0.5)),
        cropHealth: Math.max(0, Math.min(100, prev.cropHealth + (Math.random() - 0.5) * 0.3)),
      }));

      setMissions((prev: FlightMission[]) => prev.map(mission => {
        if (mission.status === 'active') {
          const newProgress = Math.min(100, mission.progress + Math.random() * 0.5);
          return {
            ...mission,
            progress: newProgress,
            status: newProgress >= 100 ? 'completed' : 'active',
          };
        }
        return mission;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'idle': return 'text-agri-700 bg-agri-50 border-agri-200';
      case 'charging': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'maintenance': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'scheduled': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'paused': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getNDVIColor = (ndvi: number) => {
    if (ndvi > 0.7) return 'text-green-600';
    if (ndvi > 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-forest-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-600 via-forest-600 to-agri-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  {language === 'tr' ? 'Akıllı Drone Yönetim Sistemi' : 'Smart Drone Management System'}
                </h1>
                <p className="text-white/90 text-sm">
                  {language === 'tr'
                    ? 'Gerçek Zamanlı Tarımsal İzleme ve Kontrol Platformu'
                    : 'Real-Time Agricultural Monitoring & Control Platform'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${realTimeData ? 'bg-green-500' : 'bg-gray-500'}`}>
                <Radio className={`w-5 h-5 ${realTimeData ? 'animate-pulse' : ''}`} />
                <span className="font-semibold">{t.realTimeData}</span>
              </div>
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
              >
                {realTimeData ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Plane className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{drones.length}</div>
                  <div className="text-sm text-white/80">{t.totalDrones}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{missions.filter(m => m.status === 'active').length}</div>
                  <div className="text-sm text-white/80">{t.activeMissions}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">{drones.reduce((sum, d) => sum + d.coverage, 0).toFixed(1)} ha</div>
                  <div className="text-sm text-white/80">{t.areaCovered}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Layers className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">2.4 TB</div>
                  <div className="text-sm text-white/80">{t.dataCollected}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-lg">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'fleet'
                ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plane className="w-5 h-5" />
            {t.droneFleet}
          </button>
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'missions'
                ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Target className="w-5 h-5" />
            {t.missions}
          </button>
          <button
            onClick={() => setActiveTab('sensors')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'sensors'
                ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Scan className="w-5 h-5" />
            {t.sensors}
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-5 h-5" />
            {t.analytics}
          </button>
        </div>

        {/* Fleet View */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            {/* Live Map */}
            <LiveDroneMap language={language} />

            {/* Drone Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drones.map(drone => (
              <div
                key={drone.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                onClick={() => setSelectedDrone(drone.id)}
              >
                <div className={`p-4 bg-gradient-to-r ${
                  drone.status === 'active' ? 'from-green-500 to-green-600' :
                  drone.status === 'idle' ? 'from-agri-600 to-forest-600' :
                  drone.status === 'charging' ? 'from-yellow-500 to-yellow-600' :
                  'from-red-500 to-red-600'
                } text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Plane className="w-6 h-6" />
                      <div>
                        <h3 className="font-bold text-lg">{drone.name}</h3>
                        <p className="text-sm opacity-90">{drone.model}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm`}>
                      {t[drone.status as keyof typeof t] || drone.status}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Battery */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className={`w-5 h-5 ${getBatteryColor(drone.battery)}`} />
                      <span className="text-gray-700 font-medium">{t.battery}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            drone.battery > 60 ? 'bg-green-500' :
                            drone.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${drone.battery}%` }}
                        />
                      </div>
                      <span className={`font-bold ${getBatteryColor(drone.battery)}`}>
                        {drone.battery.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Flight Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-agri-700" />
                      <div>
                        <div className="text-xs text-gray-500">{t.altitude}</div>
                        <div className="font-bold text-gray-900">{drone.altitude.toFixed(0)}m</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-xs text-gray-500">{t.speed}</div>
                        <div className="font-bold text-gray-900">{drone.speed.toFixed(1)} m/s</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-500">{t.temperature}</div>
                        <div className="font-bold text-gray-900">{drone.temperature.toFixed(1)}°C</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-forest-700" />
                      <div>
                        <div className="text-xs text-gray-500">{t.windSpeed}</div>
                        <div className="font-bold text-gray-900">{drone.windSpeed.toFixed(1)} m/s</div>
                      </div>
                    </div>
                  </div>

                  {/* Coverage Stats */}
                  {drone.status === 'active' && (
                    <div className="bg-agri-50 rounded-lg p-3 border border-agri-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600">{t.flightTime}</div>
                          <div className="font-bold text-agri-700">{drone.flightTime.toFixed(0)} min</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">{t.coverage}</div>
                          <div className="font-bold text-agri-700">{drone.coverage.toFixed(1)} ha</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-agri-600 text-white py-2 rounded-lg hover:bg-agri-700 transition-all">
                      <Camera className="w-4 h-4" />
                      {t.liveStream}
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
                      <Home className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-gray-500 text-center">
                    {t.lastUpdate}: {drone.lastUpdate.toLocaleTimeString('tr-TR')}
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}

        {/* Missions View */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            {missions.map(mission => (
              <div key={mission.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      mission.type === 'survey' ? 'bg-agri-100 text-agri-700' :
                      mission.type === 'spray' ? 'bg-green-100 text-green-600' :
                      mission.type === 'monitoring' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {mission.type === 'survey' && <Scan className="w-6 h-6" />}
                      {mission.type === 'spray' && <Droplet className="w-6 h-6" />}
                      {mission.type === 'monitoring' && <Activity className="w-6 h-6" />}
                      {mission.type === 'seeding' && <Sprout className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{mission.name}</h3>
                      <p className="text-sm text-gray-600">
                        {t[mission.type as keyof typeof t]} • {mission.area} ha • Drone: {mission.droneId}
                      </p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(mission.status)}`}>
                    {t[mission.status as keyof typeof t] || mission.status}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      {language === 'tr' ? 'İlerleme' : 'Progress'}
                    </span>
                    <span className="text-sm font-bold text-agri-600">{mission.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-agri-600 to-forest-600 h-3 rounded-full transition-all"
                      style={{ width: `${mission.progress}%` }}
                    />
                  </div>
                </div>

                {/* Time Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">
                      {language === 'tr' ? 'Başlangıç' : 'Start Time'}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {mission.startTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500">
                      {language === 'tr' ? 'Tahmini Bitiş' : 'Est. Completion'}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {mission.estimatedCompletion.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {mission.status === 'scheduled' && (
                    <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all">
                      <Play className="w-4 h-4" />
                      {t.startMission}
                    </button>
                  )}
                  {mission.status === 'active' && (
                    <button className="flex-1 flex items-center justify-center gap-2 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-all">
                      <Pause className="w-4 h-4" />
                      {t.pauseMission}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sensors View */}
        {activeTab === 'sensors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* NDVI Index */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Sprout className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.ndviIndex}</h3>
                  <p className="text-xs text-gray-500">Normalized Difference Vegetation Index</p>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-5xl font-bold mb-2 ${getNDVIColor(sensorData.ndvi)}`}>
                  {sensorData.ndvi.toFixed(2)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full"
                    style={{ width: `${sensorData.ndvi * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {sensorData.ndvi > 0.7 ? (language === 'tr' ? 'Mükemmel Sağlık' : 'Excellent Health') :
                   sensorData.ndvi > 0.4 ? (language === 'tr' ? 'Orta Sağlık' : 'Moderate Health') :
                   (language === 'tr' ? 'Zayıf Sağlık' : 'Poor Health')}
                </p>
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-agri-100 p-3 rounded-xl">
                  <Droplet className="w-6 h-6 text-agri-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.soilMoisture}</h3>
                  <p className="text-xs text-gray-500">Volumetric Water Content</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-agri-700 mb-2">
                  {sensorData.soilMoisture.toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-agri-600 h-3 rounded-full"
                    style={{ width: `${sensorData.soilMoisture}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {sensorData.soilMoisture > 60 ? (language === 'tr' ? 'Optimal Nem' : 'Optimal Moisture') :
                   sensorData.soilMoisture > 30 ? (language === 'tr' ? 'Sulama Önerilir' : 'Irrigation Recommended') :
                   (language === 'tr' ? 'Acil Sulama Gerekli' : 'Urgent Irrigation Required')}
                </p>
              </div>
            </div>

            {/* Crop Health */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{t.cropHealth}</h3>
                  <p className="text-xs text-gray-500">Overall Crop Vitality Score</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {sensorData.cropHealth.toFixed(0)}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${sensorData.cropHealth}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {sensorData.cropHealth > 80 ? (
                    <>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-600 font-semibold">
                        {language === 'tr' ? 'Çok İyi' : 'Excellent'}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm text-yellow-600 font-semibold">
                        {language === 'tr' ? 'İyileştirilebilir' : 'Can Improve'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* NPK Levels */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">NPK {language === 'tr' ? 'Seviyeleri' : 'Levels'}</h3>
                  <p className="text-xs text-gray-500">Nitrogen, Phosphorus, Potassium</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">N - {t.nitrogenLevel}</span>
                    <span className="text-sm font-bold text-purple-600">{sensorData.nitrogen}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${sensorData.nitrogen}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">P - {t.phosphorusLevel}</span>
                    <span className="text-sm font-bold text-orange-600">{sensorData.phosphorus}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${sensorData.phosphorus}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">K - {t.potassiumLevel}</span>
                    <span className="text-sm font-bold text-pink-600">{sensorData.potassium}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${sensorData.potassium}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Temperature & Humidity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <ThermometerSun className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {language === 'tr' ? 'İklim Koşulları' : 'Climate Conditions'}
                  </h3>
                  <p className="text-xs text-gray-500">Temperature & Humidity</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {sensorData.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-sm text-gray-600">{t.temperature}</div>
                </div>
                <div className="text-center p-4 bg-forest-50 rounded-lg">
                  <div className="text-3xl font-bold text-forest-700">
                    {drones[0].humidity}%
                  </div>
                  <div className="text-sm text-gray-600">{t.humidity}</div>
                </div>
              </div>
            </div>

            {/* Disease & Pest Detection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${sensorData.pestDetection ? 'bg-red-100' : 'bg-green-100'}`}>
                  {sensorData.pestDetection ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {language === 'tr' ? 'Hastalık & Zararlı' : 'Disease & Pest'}
                  </h3>
                  <p className="text-xs text-gray-500">AI-Powered Detection</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.pestDetection}</div>
                  <div className={`text-xl font-bold ${sensorData.pestDetection ? 'text-red-600' : 'text-green-600'}`}>
                    {sensorData.pestDetection ?
                      (language === 'tr' ? 'Tespit Edildi' : 'Detected') :
                      (language === 'tr' ? 'Tespit Edilmedi' : 'Not Detected')}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.diseaseRisk}</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getRiskColor(sensorData.diseaseRisk)}`}>
                    {t[sensorData.diseaseRisk as keyof typeof t] || sensorData.diseaseRisk}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-agri-600 to-forest-600 text-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-2">
                {language === 'tr' ? 'Gelişmiş Analitik ve Raporlama' : 'Advanced Analytics & Reporting'}
              </h2>
              <p className="text-white/90">
                {language === 'tr'
                  ? 'Yapay zeka destekli tarımsal analitik, trend analizi ve tahmine dayalı modelleme sistemi'
                  : 'AI-powered agricultural analytics, trend analysis and predictive modeling system'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Yield Prediction */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {language === 'tr' ? 'Verim Tahmini' : 'Yield Prediction'}
                    </h3>
                    <p className="text-xs text-gray-500">AI-Based Forecasting</p>
                  </div>
                </div>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold text-green-600 mb-2">8.2</div>
                  <div className="text-gray-600">
                    {language === 'tr' ? 'ton/hektar (tahmin)' : 'tons/hectare (estimated)'}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">
                      {language === 'tr' ? '+12% geçen yıla göre' : '+12% vs last year'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resource Optimization */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-agri-100 p-3 rounded-xl">
                    <Droplet className="w-6 h-6 text-agri-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {language === 'tr' ? 'Kaynak Optimizasyonu' : 'Resource Optimization'}
                    </h3>
                    <p className="text-xs text-gray-500">Water & Chemical Savings</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-agri-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'tr' ? 'Su Tasarrufu' : 'Water Savings'}
                    </div>
                    <div className="text-3xl font-bold text-agri-700">34%</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {language === 'tr' ? 'Kimyasal Azaltma' : 'Chemical Reduction'}
                    </div>
                    <div className="text-3xl font-bold text-green-600">42%</div>
                  </div>
                </div>
              </div>

              {/* Coverage Map */}
              <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {language === 'tr' ? 'Kapsama Haritası' : 'Coverage Map'}
                    </h3>
                    <p className="text-xs text-gray-500">Real-Time Field Mapping</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-agri-600 mx-auto mb-3" />
                    <div className="text-gray-600 font-semibold">
                      {language === 'tr' ? 'Gerçek Zamanlı Harita Görünümü' : 'Real-Time Map View'}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {language === 'tr' ? 'Multispektral Görüntüleme Aktif' : 'Multispectral Imaging Active'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
