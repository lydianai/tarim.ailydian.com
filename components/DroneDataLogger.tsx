'use client';

import { useState, useEffect } from 'react';
import {
  Database,
  Activity,
  TrendingUp,
  Cloud,
  Server,
  Zap,
  Check,
  AlertCircle,
  Upload,
  Download,
  RefreshCw,
  BarChart3,
  FileText,
  Filter
} from 'lucide-react';

interface DroneDataLoggerProps {
  language?: 'tr' | 'en';
}

interface DataMetrics {
  totalLogs: number;
  logsToday: number;
  totalFlightTime: number; // minutes
  totalAreaCovered: number; // acres
  totalChemicalsApplied: number; // gallons
  avgFlightDuration: number; // minutes
  dataStorageUsed: number; // MB
  syncStatus: 'synced' | 'syncing' | 'offline' | 'error';
  lastSync: Date;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  droneId: string;
  activityType: string;
  duration: number;
  area: number;
  status: 'success' | 'warning' | 'error';
  syncedToTarim: boolean;
  syncedToBigData: boolean;
}

export default function DroneDataLogger({ language = 'en' }: DroneDataLoggerProps) {
  const [metrics, setMetrics] = useState<DataMetrics>({
    totalLogs: 1247,
    logsToday: 23,
    totalFlightTime: 8452, // minutes
    totalAreaCovered: 12845, // acres
    totalChemicalsApplied: 4523, // gallons
    avgFlightDuration: 38.5,
    dataStorageUsed: 2847, // MB
    syncStatus: 'synced',
    lastSync: new Date()
  });

  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'survey' | 'spray' | 'monitoring'>('all');

  const t = {
    dataLogger: language === 'tr' ? 'Veri Kaydedici' : 'Data Logger',
    bigDataIntegration: language === 'tr' ? 'BigData Entegrasyonu' : 'BigData Integration',
    tarimDashboard: language === 'tr' ? 'Tarım Dashboard' : 'Tarim Dashboard',
    metrics: language === 'tr' ? 'Metrikler' : 'Metrics',
    recentLogs: language === 'tr' ? 'Son Kayıtlar' : 'Recent Logs',
    totalLogs: language === 'tr' ? 'Toplam Kayıt' : 'Total Logs',
    logsToday: language === 'tr' ? 'Bugünkü Kayıtlar' : 'Logs Today',
    totalFlightTime: language === 'tr' ? 'Toplam Uçuş Süresi' : 'Total Flight Time',
    areaCovered: language === 'tr' ? 'Kaplanan Alan' : 'Area Covered',
    chemicalsApplied: language === 'tr' ? 'Uygulanan Kimyasal' : 'Chemicals Applied',
    avgDuration: language === 'tr' ? 'Ortalama Süre' : 'Avg Duration',
    storageUsed: language === 'tr' ? 'Kullanılan Depolama' : 'Storage Used',
    syncStatus: language === 'tr' ? 'Senkronizasyon Durumu' : 'Sync Status',
    lastSync: language === 'tr' ? 'Son Senkronizasyon' : 'Last Sync',
    autoSync: language === 'tr' ? 'Otomatik Senkronizasyon' : 'Auto Sync',
    manualSync: language === 'tr' ? 'Manuel Senkronizasyon' : 'Manual Sync',
    export: language === 'tr' ? 'Dışa Aktar' : 'Export',
    filter: language === 'tr' ? 'Filtrele' : 'Filter',
    all: language === 'tr' ? 'Tümü' : 'All',
    survey: language === 'tr' ? 'Tarama' : 'Survey',
    spray: language === 'tr' ? 'İlaçlama' : 'Spray',
    monitoring: language === 'tr' ? 'İzleme' : 'Monitoring',
    synced: language === 'tr' ? 'Senkronize' : 'Synced',
    syncing: language === 'tr' ? 'Senkronize Ediliyor' : 'Syncing',
    offline: language === 'tr' ? 'Çevrimdışı' : 'Offline',
    error: language === 'tr' ? 'Hata' : 'Error',
    success: language === 'tr' ? 'Başarılı' : 'Success',
    warning: language === 'tr' ? 'Uyarı' : 'Warning',
    syncToTarim: language === 'tr' ? 'Tarım Dashboard\'a Gönder' : 'Sync to Tarim Dashboard',
    syncToBigData: language === 'tr' ? 'BigData\'ya Gönder' : 'Sync to BigData',
    dataFlow: language === 'tr' ? 'Veri Akışı' : 'Data Flow',
    realTimeUpdates: language === 'tr' ? 'Gerçek Zamanlı Güncellemeler' : 'Real-Time Updates'
  };

  // Generate mock log entries
  useEffect(() => {
    const mockLogs: LogEntry[] = [];
    const activityTypes = ['survey', 'spray', 'monitoring', 'inspection'];
    const droneIds = ['DJI-M3M-001', 'DJI-T40-002', 'SNT-P4M-003', 'AGE-RX60-004'];

    for (let i = 0; i < 50; i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - i);

      mockLogs.push({
        id: `log-${i + 1}`,
        timestamp,
        droneId: droneIds[Math.floor(Math.random() * droneIds.length)],
        activityType: activityTypes[Math.floor(Math.random() * activityTypes.length)],
        duration: 15 + Math.random() * 60,
        area: 5 + Math.random() * 50,
        status: Math.random() > 0.9 ? 'warning' : Math.random() > 0.95 ? 'error' : 'success',
        syncedToTarim: Math.random() > 0.1,
        syncedToBigData: Math.random() > 0.15
      });
    }

    setRecentLogs(mockLogs);
  }, []);

  // Auto-sync simulation
  useEffect(() => {
    if (!autoSync) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        lastSync: new Date(),
        syncStatus: 'syncing'
      }));

      setTimeout(() => {
        setMetrics(prev => ({
          ...prev,
          syncStatus: 'synced'
        }));
      }, 2000);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [autoSync]);

  // Update metrics in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalLogs: prev.totalLogs + Math.floor(Math.random() * 2),
        logsToday: prev.logsToday + (Math.random() > 0.7 ? 1 : 0),
        totalFlightTime: prev.totalFlightTime + (Math.random() * 2),
        totalAreaCovered: prev.totalAreaCovered + (Math.random() * 5),
        dataStorageUsed: prev.dataStorageUsed + (Math.random() * 0.5)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const manualSync = () => {
    setSyncInProgress(true);
    setMetrics(prev => ({ ...prev, syncStatus: 'syncing' }));

    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        syncStatus: 'synced',
        lastSync: new Date()
      }));
      setSyncInProgress(false);

      // Update logs to show synced
      setRecentLogs(prev => prev.map(log => ({
        ...log,
        syncedToTarim: true,
        syncedToBigData: true
      })));
    }, 3000);
  };

  const exportData = () => {
    // In production, this would generate and download a CSV/JSON file
    alert('Exporting data...');
  };

  const filteredLogs = filterType === 'all'
    ? recentLogs
    : recentLogs.filter(log => log.activityType === filterType);

  const getSyncStatusColor = (status: DataMetrics['syncStatus']) => {
    switch (status) {
      case 'synced': return 'text-green-600 bg-green-50';
      case 'syncing': return 'text-blue-600 bg-blue-50';
      case 'offline': return 'text-gray-400 bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="bg-earth-900 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-neon-100/20 p-2 rounded-lg backdrop-blur-sm">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t.dataLogger}</h2>
              <p className="text-sm text-white/90">{t.bigDataIntegration}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 bg-neon-100/20 backdrop-blur-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-neon-100/30 transition-all">
              <input
                type="checkbox"
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold">{t.autoSync}</span>
            </label>

            <button
              onClick={manualSync}
              disabled={syncInProgress}
              className="bg-neon-100/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-neon-100/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${syncInProgress ? 'animate-spin' : ''}`} />
              <span className="text-sm font-semibold">{t.manualSync}</span>
            </button>

            <button
              onClick={exportData}
              className="bg-neon-100/20 backdrop-blur-sm px-3 py-2 rounded-lg hover:bg-neon-100/30 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-semibold">{t.export}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Data Flow Visualization */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {t.dataFlow}
          </h3>

          <div className="flex items-center justify-between">
            {/* Drone */}
            <div className="text-center">
              <div className="bg-neon-100 p-4 rounded-xl shadow-md mb-2">
                <Server className="w-8 h-8 text-purple-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-white">Drones</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 bg-purple-300 flex-1" />
              <Zap className="w-5 h-5 text-purple-600 mx-2 animate-pulse" />
              <div className="h-0.5 bg-purple-300 flex-1" />
            </div>

            {/* Data Logger */}
            <div className="text-center">
              <div className="bg-earth-800 p-4 rounded-xl shadow-md mb-2">
                <Database className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-white">Logger</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 bg-blue-300 flex-1" />
              <Zap className="w-5 h-5 text-blue-600 mx-2 animate-pulse" />
              <div className="h-0.5 bg-blue-300 flex-1" />
            </div>

            {/* Tarim Dashboard */}
            <div className="text-center">
              <div className="bg-earth-800 p-4 rounded-xl shadow-md mb-2">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-white">Tarim</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 bg-green-300 flex-1" />
              <Zap className="w-5 h-5 text-green-600 mx-2 animate-pulse" />
              <div className="h-0.5 bg-green-300 flex-1" />
            </div>

            {/* BigData */}
            <div className="text-center">
              <div className="bg-earth-800 p-4 rounded-xl shadow-md mb-2">
                <Cloud className="w-8 h-8 text-indigo-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-white">BigData</p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div>
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {t.metrics}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{metrics.totalLogs.toLocaleString()}</div>
              <div className="text-sm text-gray-400">{t.totalLogs}</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{metrics.logsToday}</div>
              <div className="text-sm text-gray-400">{t.logsToday}</div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{(metrics.totalFlightTime / 60).toFixed(1)}h</div>
              <div className="text-sm text-gray-400">{t.totalFlightTime}</div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">{metrics.totalAreaCovered.toLocaleString()}</div>
              <div className="text-sm text-gray-400">{t.areaCovered} (acres)</div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="text-2xl font-bold text-red-600">{metrics.totalChemicalsApplied.toLocaleString()}</div>
              <div className="text-sm text-gray-400">{t.chemicalsApplied} (gal)</div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <div className="text-2xl font-bold text-indigo-600">{metrics.avgFlightDuration.toFixed(1)}m</div>
              <div className="text-sm text-gray-400">{t.avgDuration}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-400">{(metrics.dataStorageUsed / 1024).toFixed(2)}GB</div>
              <div className="text-sm text-gray-400">{t.storageUsed}</div>
            </div>

            <div className={`rounded-lg p-4 border ${getSyncStatusColor(metrics.syncStatus)}`}>
              <div className="text-2xl font-bold">{t[metrics.syncStatus]}</div>
              <div className="text-sm">{t.syncStatus}</div>
              <div className="text-xs mt-1">{metrics.lastSync.toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Recent Logs */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t.recentLogs}
            </h3>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-earth-700 bg-earth-800 text-white rounded-lg px-3 py-1.5 text-sm"
              >
                <option value="all">{t.all}</option>
                <option value="survey">{t.survey}</option>
                <option value="spray">{t.spray}</option>
                <option value="monitoring">{t.monitoring}</option>
              </select>
            </div>
          </div>

          <div className="border border-earth-700 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-earth-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-white">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-white">Drone</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-white">Activity</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-white">Duration</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-white">Area</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-white">Status</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-white">Tarim</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-white">BigData</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-700">
                  {filteredLogs.slice(0, 20).map(log => (
                    <tr key={log.id} className="hover:bg-earth-800">
                      <td className="px-4 py-2 text-sm text-white">
                        {log.timestamp.toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-white">
                        {log.droneId}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          log.activityType === 'spray' ? 'bg-green-100 text-green-700' :
                          log.activityType === 'survey' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {log.activityType}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-white">
                        {log.duration.toFixed(1)}m
                      </td>
                      <td className="px-4 py-2 text-sm text-right text-white">
                        {log.area.toFixed(1)} ac
                      </td>
                      <td className="px-4 py-2 text-center">
                        {log.status === 'success' ? (
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        ) : log.status === 'warning' ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600 mx-auto" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {log.syncedToTarim ? (
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <Upload className="w-4 h-4 text-gray-400 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {log.syncedToBigData ? (
                          <Check className="w-4 h-4 text-green-600 mx-auto" />
                        ) : (
                          <Upload className="w-4 h-4 text-gray-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
