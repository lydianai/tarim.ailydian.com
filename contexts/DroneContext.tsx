'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface DroneData {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'charging' | 'maintenance';
  battery: number;
  altitude: number;
  speed: number;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  flightTime: number;
  coverage: number;
  lastUpdate: Date;
}

export interface MissionData {
  id: string;
  name: string;
  type: 'mapping' | 'spraying' | 'monitoring' | 'inspection';
  droneId: string;
  status: 'active' | 'completed' | 'scheduled' | 'paused';
  progress: number;
  area: number;
  startTime: string;
  estimatedCompletion: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SensorData {
  ndvi: number;
  soilMoisture: number;
  temperature: number;
  cropHealth: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  pestDetection: boolean;
  diseaseRisk: 'low' | 'medium' | 'high';
}

interface DroneContextType {
  drones: DroneData[];
  setDrones: (drones: DroneData[]) => void;
  missions: MissionData[];
  setMissions: (missions: MissionData[]) => void;
  sensorData: SensorData;
  setSensorData: (data: SensorData) => void;
  realTimeData: boolean;
  setRealTimeData: (enabled: boolean) => void;
  selectedDrone: string | null;
  setSelectedDrone: (id: string | null) => void;
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export function useDroneContext() {
  const context = useContext(DroneContext);
  if (!context) {
    throw new Error('useDroneContext must be used within DroneProvider');
  }
  return context;
}

interface DroneProviderProps {
  children: ReactNode;
}

export function DroneProvider({ children }: DroneProviderProps) {
  const [drones, setDrones] = useState<DroneData[]>([]);
  const [missions, setMissions] = useState<MissionData[]>([]);
  const [sensorData, setSensorData] = useState<SensorData>({
    ndvi: 0.78,
    soilMoisture: 62.5,
    temperature: 24.5,
    cropHealth: 87,
    nitrogen: 72,
    phosphorus: 68,
    potassium: 81,
    pestDetection: false,
    diseaseRisk: 'low',
  });
  const [realTimeData, setRealTimeData] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);

  // Initialize with default drone data
  useEffect(() => {
    if (drones.length === 0) {
      const defaultDrones: DroneData[] = [
        {
          id: 'DJI-M3M-001',
          name: 'Mavic 3M Alpha',
          model: 'DJI Mavic 3 Multispectral',
          status: 'active',
          battery: 78,
          altitude: 120,
          speed: 15.2,
          latitude: 39.9334,
          longitude: 32.8597,
          temperature: 24.5,
          humidity: 62,
          windSpeed: 8.3,
          flightTime: 22.5,
          coverage: 48.7,
          lastUpdate: new Date(),
        },
        {
          id: 'DJI-T40-002',
          name: 'Agras T40 Bravo',
          model: 'DJI Agras T40',
          status: 'active',
          battery: 92,
          altitude: 8,
          speed: 6.8,
          latitude: 39.9234,
          longitude: 32.8497,
          temperature: 26.1,
          humidity: 58,
          windSpeed: 7.2,
          flightTime: 8.2,
          coverage: 15.3,
          lastUpdate: new Date(),
        },
        {
          id: 'SNT-P4M-003',
          name: 'Phantom 4M Charlie',
          model: 'DJI Phantom 4 Multispectral',
          status: 'idle',
          battery: 100,
          altitude: 0,
          speed: 0,
          latitude: 39.9434,
          longitude: 32.8697,
          temperature: 23.8,
          humidity: 65,
          windSpeed: 5.5,
          flightTime: 0,
          coverage: 0,
          lastUpdate: new Date(),
        },
        {
          id: 'AGE-RX60-004',
          name: 'RX60 Delta',
          model: 'AgEagle RX60',
          status: 'charging',
          battery: 45,
          altitude: 0,
          speed: 0,
          latitude: 39.9134,
          longitude: 32.8397,
          temperature: 22.5,
          humidity: 70,
          windSpeed: 6.1,
          flightTime: 0,
          coverage: 0,
          lastUpdate: new Date(),
        },
      ];
      setDrones(defaultDrones);
    }
  }, [drones.length]);

  // Initialize default missions
  useEffect(() => {
    if (missions.length === 0) {
      const defaultMissions: MissionData[] = [
        {
          id: 'M-001',
          name: 'Kuzey Tarla NDVI Haritalaması',
          type: 'mapping',
          droneId: 'DJI-M3M-001',
          status: 'active',
          progress: 67,
          area: 75.2,
          startTime: '09:15',
          estimatedCompletion: '14:30',
          priority: 'high',
        },
        {
          id: 'M-002',
          name: 'Güney Bölge İlaçlama',
          type: 'spraying',
          droneId: 'DJI-T40-002',
          status: 'active',
          progress: 34,
          area: 42.8,
          startTime: '10:00',
          estimatedCompletion: '12:45',
          priority: 'high',
        },
        {
          id: 'M-003',
          name: 'Sera Gözetimi',
          type: 'monitoring',
          droneId: 'SNT-P4M-003',
          status: 'scheduled',
          progress: 0,
          area: 18.5,
          startTime: '14:00',
          estimatedCompletion: '15:30',
          priority: 'medium',
        },
      ];
      setMissions(defaultMissions);
    }
  }, [missions.length]);

  const value: DroneContextType = {
    drones,
    setDrones,
    missions,
    setMissions,
    sensorData,
    setSensorData,
    realTimeData,
    setRealTimeData,
    selectedDrone,
    setSelectedDrone,
  };

  return <DroneContext.Provider value={value}>{children}</DroneContext.Provider>;
}
