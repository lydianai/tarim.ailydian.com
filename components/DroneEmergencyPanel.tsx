'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Battery,
  Cloud,
  CloudRain,
  Wind,
  Radio,
  Home,
  Pause,
  Play,
  Navigation,
  Volume2,
  VolumeX,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Thermometer,
  Eye,
  Shield,
  MapPin,
  Activity
} from 'lucide-react';

interface DroneEmergencyPanelProps {
  droneId: string;
  droneName: string;
  language?: 'tr' | 'en';
  onEmergencyAction?: (action: string) => void;
}

interface EmergencyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'battery' | 'weather' | 'obstacle' | 'malfunction' | 'airspace' | 'connection';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  autoAction?: string;
}

interface SafetyStatus {
  battery: number;
  signalStrength: number;
  gpsAccuracy: number;
  windSpeed: number;
  temperature: number;
  obstacleDistance: number;
  altitude: number;
  returnHomeReady: boolean;
}

export default function DroneEmergencyPanel({
  droneId,
  droneName,
  language = 'en',
  onEmergencyAction
}: DroneEmergencyPanelProps) {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [safetyStatus, setSafetyStatus] = useState<SafetyStatus>({
    battery: 78,
    signalStrength: 95,
    gpsAccuracy: 1.2,
    windSpeed: 6.2,
    temperature: 72,
    obstacleDistance: 150,
    altitude: 145,
    returnHomeReady: true
  });
  const [emergencyMode, setEmergencyMode] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const t = {
    emergencyPanel: language === 'tr' ? 'Acil Durum Paneli' : 'Emergency Panel',
    safetyStatus: language === 'tr' ? 'Güvenlik Durumu' : 'Safety Status',
    activeAlerts: language === 'tr' ? 'Aktif Uyarılar' : 'Active Alerts',
    criticalAlerts: language === 'tr' ? 'Kritik Uyarılar' : 'Critical Alerts',
    warnings: language === 'tr' ? 'Uyarılar' : 'Warnings',
    battery: language === 'tr' ? 'Batarya' : 'Battery',
    signal: language === 'tr' ? 'Sinyal' : 'Signal',
    gps: 'GPS',
    wind: language === 'tr' ? 'Rüzgar' : 'Wind',
    temperature: language === 'tr' ? 'Sıcaklık' : 'Temperature',
    obstacle: language === 'tr' ? 'Engel' : 'Obstacle',
    altitude: language === 'tr' ? 'İrtifa' : 'Altitude',
    returnHome: language === 'tr' ? 'Eve Dön' : 'Return Home',
    emergencyLand: language === 'tr' ? 'Acil İniş' : 'Emergency Land',
    pauseFlight: language === 'tr' ? 'Uçuşu Duraklat' : 'Pause Flight',
    resumeFlight: language === 'tr' ? 'Uçuşa Devam Et' : 'Resume Flight',
    acknowledgeAll: language === 'tr' ? 'Tümünü Onayla' : 'Acknowledge All',
    voiceAlerts: language === 'tr' ? 'Sesli Uyarılar' : 'Voice Alerts',
    emergencyMode: language === 'tr' ? 'Acil Durum Modu' : 'Emergency Mode',
    lowBattery: language === 'tr' ? 'Düşük Batarya' : 'Low Battery',
    returnHomeNow: language === 'tr' ? 'Eve Dönüş Tavsiye Edilir' : 'Return Home Recommended',
    highWind: language === 'tr' ? 'Yüksek Rüzgar' : 'High Wind',
    windWarning: language === 'tr' ? 'Rüzgar hızı güvenli sınırları aşıyor' : 'Wind speed exceeds safe limits',
    obstacleDetected: language === 'tr' ? 'Engel Tespit Edildi' : 'Obstacle Detected',
    avoidanceActive: language === 'tr' ? 'Otomatik kaçınma aktif' : 'Automatic avoidance active',
    signalWeak: language === 'tr' ? 'Zayıf Sinyal' : 'Weak Signal',
    connectionIssue: language === 'tr' ? 'Bağlantı sorunları tespit edildi' : 'Connection issues detected',
    weatherAlert: language === 'tr' ? 'Hava Durumu Uyarısı' : 'Weather Alert',
    badWeather: language === 'tr' ? 'Kötü hava koşulları yaklaşıyor' : 'Bad weather approaching',
    gpsLoss: language === 'tr' ? 'GPS Kaybı' : 'GPS Loss',
    accuracyReduced: language === 'tr' ? 'GPS hassasiyeti azaldı' : 'GPS accuracy reduced',
    noFlyZone: language === 'tr' ? 'Yasak Bölge' : 'No-Fly Zone',
    enteringRestricted: language === 'tr' ? 'Kısıtlı alana giriyorsunuz' : 'Entering restricted airspace',
    systemOk: language === 'tr' ? 'Tüm Sistemler Normal' : 'All Systems Operational'
  };

  // Initialize audio context for voice alerts
  useEffect(() => {
    if (typeof window !== 'undefined' && voiceEnabled) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      audioContextRef.current?.close();
    };
  }, [voiceEnabled]);

  // Play voice alert
  const playVoiceAlert = (message: string, priority: 'critical' | 'warning' | 'info') => {
    if (!voiceEnabled || typeof window === 'undefined') return;

    // Use Web Speech API for voice alerts
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';
    utterance.rate = priority === 'critical' ? 1.2 : 1.0;
    utterance.pitch = priority === 'critical' ? 1.2 : 1.0;
    utterance.volume = priority === 'critical' ? 1.0 : 0.8;

    window.speechSynthesis.speak(utterance);

    // Also play a warning sound
    if (audioContextRef.current && priority === 'critical') {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.5);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.5);
    }
  };

  // Add alert
  const addAlert = (
    type: EmergencyAlert['type'],
    category: EmergencyAlert['category'],
    message: string,
    autoAction?: string
  ) => {
    const newAlert: EmergencyAlert = {
      id: `alert-${Date.now()}`,
      type,
      category,
      message,
      timestamp: new Date(),
      acknowledged: false,
      autoAction
    };

    setAlerts(prev => [newAlert, ...prev].slice(0, 20)); // Keep last 20 alerts

    // Play voice alert
    if (alertsEnabled) {
      playVoiceAlert(message, type);
    }

    // Trigger automatic action if specified
    if (autoAction) {
      onEmergencyAction?.(autoAction);
    }
  };

  // Monitor safety status and generate alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyStatus(prev => {
        const newStatus = {
          battery: Math.max(0, prev.battery - (Math.random() * 0.1)),
          signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() - 0.5) * 5)),
          gpsAccuracy: Math.max(0.5, prev.gpsAccuracy + (Math.random() - 0.5) * 0.2),
          windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 1),
          temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
          obstacleDistance: Math.max(0, prev.obstacleDistance + (Math.random() - 0.5) * 20),
          altitude: Math.max(0, prev.altitude + (Math.random() - 0.5) * 5),
          returnHomeReady: prev.battery > 20 && prev.signalStrength > 50
        };

        // Generate alerts based on status
        if (newStatus.battery < 20 && prev.battery >= 20) {
          addAlert('critical', 'battery', t.lowBattery + ' - ' + t.returnHomeNow, 'return_home');
        } else if (newStatus.battery < 30 && prev.battery >= 30) {
          addAlert('warning', 'battery', t.lowBattery + ' - ' + newStatus.battery.toFixed(0) + '%');
        }

        if (newStatus.windSpeed > 15 && prev.windSpeed <= 15) {
          addAlert('critical', 'weather', t.highWind + ' - ' + t.windWarning, 'emergency_land');
        } else if (newStatus.windSpeed > 12 && prev.windSpeed <= 12) {
          addAlert('warning', 'weather', t.highWind + ' - ' + newStatus.windSpeed.toFixed(1) + ' mph');
        }

        if (newStatus.obstacleDistance < 30 && prev.obstacleDistance >= 30) {
          addAlert('critical', 'obstacle', t.obstacleDetected + ' - ' + t.avoidanceActive, 'pause');
        } else if (newStatus.obstacleDistance < 50 && prev.obstacleDistance >= 50) {
          addAlert('warning', 'obstacle', t.obstacle + ': ' + newStatus.obstacleDistance.toFixed(0) + 'ft');
        }

        if (newStatus.signalStrength < 50 && prev.signalStrength >= 50) {
          addAlert('critical', 'connection', t.signalWeak + ' - ' + t.connectionIssue);
        } else if (newStatus.signalStrength < 70 && prev.signalStrength >= 70) {
          addAlert('warning', 'connection', t.signal + ': ' + newStatus.signalStrength.toFixed(0) + '%');
        }

        if (newStatus.gpsAccuracy > 5 && prev.gpsAccuracy <= 5) {
          addAlert('warning', 'airspace', t.gpsLoss + ' - ' + t.accuracyReduced);
        }

        return newStatus;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [alertsEnabled]);

  const acknowledgeAlert = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const acknowledgeAll = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, acknowledged: true })));
  };

  const clearAcknowledged = () => {
    setAlerts(prev => prev.filter(alert => !alert.acknowledged));
  };

  const getAlertIcon = (category: EmergencyAlert['category']) => {
    switch (category) {
      case 'battery': return Battery;
      case 'weather': return Wind;
      case 'obstacle': return Shield;
      case 'malfunction': return AlertOctagon;
      case 'airspace': return MapPin;
      case 'connection': return Radio;
      default: return AlertCircle;
    }
  };

  const getSafetyStatusColor = (status: SafetyStatus): string => {
    if (status.battery < 20 || status.windSpeed > 15 || status.obstacleDistance < 30 || status.signalStrength < 50) {
      return 'red';
    }
    if (status.battery < 30 || status.windSpeed > 12 || status.obstacleDistance < 50 || status.signalStrength < 70) {
      return 'yellow';
    }
    return 'green';
  };

  const statusColor = getSafetyStatusColor(safetyStatus);
  const criticalAlerts = alerts.filter(a => a.type === 'critical' && !a.acknowledged);
  const warningAlerts = alerts.filter(a => a.type === 'warning' && !a.acknowledged);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r p-4 text-white ${
        statusColor === 'red' ? 'from-red-600 to-red-700' :
        statusColor === 'yellow' ? 'from-yellow-500 to-orange-500' :
        'from-green-600 to-green-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.emergencyPanel}</h2>
              <p className="text-sm text-white/90">{droneName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-lg transition-all ${
                voiceEnabled ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`p-2 rounded-lg transition-all ${
                alertsEnabled ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{criticalAlerts.length}</div>
            <div className="text-xs">{t.criticalAlerts}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{warningAlerts.length}</div>
            <div className="text-xs">{t.warnings}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{alerts.length}</div>
            <div className="text-xs">{t.activeAlerts}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Safety Status Grid */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {t.safetyStatus}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Battery */}
            <div className={`rounded-lg p-3 ${
              safetyStatus.battery < 20 ? 'bg-red-50' :
              safetyStatus.battery < 30 ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Battery className={`w-5 h-5 ${
                  safetyStatus.battery < 20 ? 'text-red-600' :
                  safetyStatus.battery < 30 ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <span className={`text-xs font-semibold ${
                  safetyStatus.battery < 20 ? 'text-red-600' :
                  safetyStatus.battery < 30 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {safetyStatus.battery.toFixed(0)}%
                </span>
              </div>
              <div className="text-xs text-gray-600">{t.battery}</div>
            </div>

            {/* Signal */}
            <div className={`rounded-lg p-3 ${
              safetyStatus.signalStrength < 50 ? 'bg-red-50' :
              safetyStatus.signalStrength < 70 ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Radio className={`w-5 h-5 ${
                  safetyStatus.signalStrength < 50 ? 'text-red-600' :
                  safetyStatus.signalStrength < 70 ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <span className={`text-xs font-semibold ${
                  safetyStatus.signalStrength < 50 ? 'text-red-600' :
                  safetyStatus.signalStrength < 70 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {safetyStatus.signalStrength.toFixed(0)}%
                </span>
              </div>
              <div className="text-xs text-gray-600">{t.signal}</div>
            </div>

            {/* Wind */}
            <div className={`rounded-lg p-3 ${
              safetyStatus.windSpeed > 15 ? 'bg-red-50' :
              safetyStatus.windSpeed > 12 ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Wind className={`w-5 h-5 ${
                  safetyStatus.windSpeed > 15 ? 'text-red-600' :
                  safetyStatus.windSpeed > 12 ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <span className={`text-xs font-semibold ${
                  safetyStatus.windSpeed > 15 ? 'text-red-600' :
                  safetyStatus.windSpeed > 12 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {safetyStatus.windSpeed.toFixed(1)}
                </span>
              </div>
              <div className="text-xs text-gray-600">{t.wind} (mph)</div>
            </div>

            {/* Obstacle */}
            <div className={`rounded-lg p-3 ${
              safetyStatus.obstacleDistance < 30 ? 'bg-red-50' :
              safetyStatus.obstacleDistance < 50 ? 'bg-yellow-50' : 'bg-green-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <Shield className={`w-5 h-5 ${
                  safetyStatus.obstacleDistance < 30 ? 'text-red-600' :
                  safetyStatus.obstacleDistance < 50 ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <span className={`text-xs font-semibold ${
                  safetyStatus.obstacleDistance < 30 ? 'text-red-600' :
                  safetyStatus.obstacleDistance < 50 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {safetyStatus.obstacleDistance.toFixed(0)}ft
                </span>
              </div>
              <div className="text-xs text-gray-600">{t.obstacle}</div>
            </div>
          </div>
        </div>

        {/* Emergency Actions */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Emergency Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onEmergencyAction?.('return_home')}
              disabled={!safetyStatus.returnHomeReady}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Home className="w-5 h-5" />
              {t.returnHome}
            </button>

            <button
              onClick={() => onEmergencyAction?.('emergency_land')}
              className="bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Navigation className="w-5 h-5" />
              {t.emergencyLand}
            </button>

            <button
              onClick={() => {
                setEmergencyMode(!emergencyMode);
                onEmergencyAction?.(emergencyMode ? 'resume' : 'pause');
              }}
              className={`py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold ${
                emergencyMode
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-yellow-600 text-white hover:bg-yellow-700'
              }`}
            >
              {emergencyMode ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              {emergencyMode ? t.resumeFlight : t.pauseFlight}
            </button>

            <button
              onClick={acknowledgeAll}
              disabled={alerts.length === 0}
              className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <CheckCircle className="w-5 h-5" />
              {t.acknowledgeAll}
            </button>
          </div>
        </div>

        {/* Active Alerts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {t.activeAlerts}
            </h3>
            {alerts.some(a => a.acknowledged) && (
              <button
                onClick={clearAcknowledged}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Acknowledged
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-semibold">{t.systemOk}</p>
              </div>
            ) : (
              alerts.map(alert => {
                const Icon = getAlertIcon(alert.category);
                return (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-3 ${
                      alert.acknowledged ? 'bg-gray-50 border-gray-200 opacity-60' :
                      alert.type === 'critical' ? 'bg-red-50 border-red-300' :
                      alert.type === 'warning' ? 'bg-yellow-50 border-yellow-300' :
                      'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        alert.acknowledged ? 'text-gray-400' :
                        alert.type === 'critical' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />

                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${
                          alert.acknowledged ? 'text-gray-600' :
                          alert.type === 'critical' ? 'text-red-900' :
                          alert.type === 'warning' ? 'text-yellow-900' :
                          'text-blue-900'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {alert.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {!alert.acknowledged && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
