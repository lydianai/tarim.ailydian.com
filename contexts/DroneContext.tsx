'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DroneActivityLog, validateDroneOperation } from '@/lib/us-agriculture-data';

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
  // US Agriculture specific fields
  operatorCertificate?: string;
  faaCompliant?: boolean;
  currentCrop?: string;
  currentFieldId?: string;
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
  // US Agriculture specific fields
  cropType?: string;
  fieldId?: string;
  epaCompliant?: boolean;
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

export interface BigDataSyncStatus {
  lastSync: Date;
  syncEnabled: boolean;
  logsInQueue: number;
  totalLogsSent: number;
  syncErrors: number;
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
  // BigData Integration
  bigDataSync: BigDataSyncStatus;
  setBigDataSync: (status: BigDataSyncStatus) => void;
  logDroneActivity: (log: DroneActivityLog) => Promise<boolean>;
  activityLogs: DroneActivityLog[];
  // US Agriculture
  currentRegion: string;
  setCurrentRegion: (region: string) => void;
  faaCompliance: boolean;
  epaCompliance: boolean;
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
  const [currentRegion, setCurrentRegion] = useState('IA'); // Iowa as default
  const [activityLogs, setActivityLogs] = useState<DroneActivityLog[]>([]);

  // BigData sync status
  const [bigDataSync, setBigDataSync] = useState<BigDataSyncStatus>({
    lastSync: new Date(),
    syncEnabled: true,
    logsInQueue: 0,
    totalLogsSent: 1247,
    syncErrors: 0
  });

  // FAA and EPA compliance status
  const [faaCompliance, setFaaCompliance] = useState(true);
  const [epaCompliance, setEpaCompliance] = useState(true);

  // Initialize with default drone data (US Agriculture focused)
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
          latitude: 41.5868, // Iowa coordinates
          longitude: -93.6250,
          temperature: 72,
          humidity: 62,
          windSpeed: 8.3,
          flightTime: 22.5,
          coverage: 48.7,
          lastUpdate: new Date(),
          operatorCertificate: '4567891',
          faaCompliant: true,
          currentCrop: 'corn',
          currentFieldId: 'IA-FIELD-001'
        },
        {
          id: 'DJI-T40-002',
          name: 'Agras T40 Bravo',
          model: 'DJI Agras T40',
          status: 'active',
          battery: 92,
          altitude: 8,
          speed: 6.8,
          latitude: 41.5768,
          longitude: -93.6150,
          temperature: 74,
          humidity: 58,
          windSpeed: 7.2,
          flightTime: 8.2,
          coverage: 15.3,
          lastUpdate: new Date(),
          operatorCertificate: '4567892',
          faaCompliant: true,
          currentCrop: 'soybeans',
          currentFieldId: 'IA-FIELD-002'
        },
        {
          id: 'SNT-P4M-003',
          name: 'Phantom 4M Charlie',
          model: 'DJI Phantom 4 Multispectral',
          status: 'idle',
          battery: 100,
          altitude: 0,
          speed: 0,
          latitude: 41.5968,
          longitude: -93.6350,
          temperature: 70,
          humidity: 65,
          windSpeed: 5.5,
          flightTime: 0,
          coverage: 0,
          lastUpdate: new Date(),
          operatorCertificate: '4567893',
          faaCompliant: true
        },
        {
          id: 'AGE-RX60-004',
          name: 'RX60 Delta',
          model: 'AgEagle RX60',
          status: 'charging',
          battery: 45,
          altitude: 0,
          speed: 0,
          latitude: 41.5668,
          longitude: -93.6050,
          temperature: 68,
          humidity: 70,
          windSpeed: 6.1,
          flightTime: 0,
          coverage: 0,
          lastUpdate: new Date(),
          operatorCertificate: '4567894',
          faaCompliant: true
        },
      ];
      setDrones(defaultDrones);
    }
  }, [drones.length]);

  // Initialize default missions (US Agriculture focused)
  useEffect(() => {
    if (missions.length === 0) {
      const defaultMissions: MissionData[] = [
        {
          id: 'M-001',
          name: 'North Field NDVI Mapping',
          type: 'mapping',
          droneId: 'DJI-M3M-001',
          status: 'active',
          progress: 67,
          area: 186, // acres (converted from ~75 hectares)
          startTime: '09:15',
          estimatedCompletion: '14:30',
          priority: 'high',
          cropType: 'corn',
          fieldId: 'IA-FIELD-001',
          epaCompliant: true
        },
        {
          id: 'M-002',
          name: 'South Field Pesticide Application',
          type: 'spraying',
          droneId: 'DJI-T40-002',
          status: 'active',
          progress: 34,
          area: 106, // acres (converted from ~43 hectares)
          startTime: '10:00',
          estimatedCompletion: '12:45',
          priority: 'high',
          cropType: 'soybeans',
          fieldId: 'IA-FIELD-002',
          epaCompliant: true
        },
        {
          id: 'M-003',
          name: 'Greenhouse Surveillance',
          type: 'monitoring',
          droneId: 'SNT-P4M-003',
          status: 'scheduled',
          progress: 0,
          area: 46, // acres
          startTime: '14:00',
          estimatedCompletion: '15:30',
          priority: 'medium',
          cropType: 'wheat_winter',
          fieldId: 'IA-FIELD-003',
          epaCompliant: true
        },
      ];
      setMissions(defaultMissions);
    }
  }, [missions.length]);

  // Log drone activity to BigData system
  const logDroneActivity = async (log: DroneActivityLog): Promise<boolean> => {
    try {
      // Validate the operation first
      const validation = validateDroneOperation(log);

      if (!validation.valid) {
        console.error('Validation failed:', validation.violations);
        setBigDataSync(prev => ({
          ...prev,
          syncErrors: prev.syncErrors + 1
        }));
        return false;
      }

      // Add to activity logs
      setActivityLogs(prev => [log, ...prev].slice(0, 100)); // Keep last 100

      // Update BigData sync status
      setBigDataSync(prev => ({
        ...prev,
        logsInQueue: prev.logsInQueue + 1,
        totalLogsSent: prev.totalLogsSent + 1,
        lastSync: new Date()
      }));

      // In production, this would send to actual BigData endpoint
      // await fetch('/api/bigdata/drone-logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(log)
      // });

      // Simulate successful sync after short delay
      setTimeout(() => {
        setBigDataSync(prev => ({
          ...prev,
          logsInQueue: Math.max(0, prev.logsInQueue - 1)
        }));
      }, 1000);

      return true;
    } catch (error) {
      console.error('Error logging drone activity:', error);
      setBigDataSync(prev => ({
        ...prev,
        syncErrors: prev.syncErrors + 1
      }));
      return false;
    }
  };

  // Auto-sync to Tarim Dashboard
  useEffect(() => {
    if (!bigDataSync.syncEnabled || !realTimeData) return;

    const interval = setInterval(() => {
      // Simulate syncing current drone states to Tarim Dashboard
      console.log('Syncing to Tarim Dashboard...', {
        drones: drones.length,
        missions: missions.length,
        sensorData,
        timestamp: new Date()
      });

      setBigDataSync(prev => ({
        ...prev,
        lastSync: new Date()
      }));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [bigDataSync.syncEnabled, realTimeData, drones, missions, sensorData]);

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
    bigDataSync,
    setBigDataSync,
    logDroneActivity,
    activityLogs,
    currentRegion,
    setCurrentRegion,
    faaCompliance,
    epaCompliance
  };

  return <DroneContext.Provider value={value}>{children}</DroneContext.Provider>;
}
