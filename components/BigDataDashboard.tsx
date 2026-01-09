'use client';

import { useState, useEffect } from 'react';
import { Database, Activity, Server, HardDrive, Zap, Clock, CheckCircle, AlertCircle, TrendingUp, Wifi } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getBigDataMetrics, DATA_COLLECTION_SCHEDULE, simulateRealtimeData, API_CONFIGS } from '@/lib/api-integrations';

export default function BigDataDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [realtimeData, setRealtimeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial metrics
    getBigDataMetrics().then(data => {
      setMetrics(data);
      setLoading(false);
    });

    // Simulate real-time data stream
    const interval = setInterval(() => {
      const newData = simulateRealtimeData();
      setRealtimeData(prev => {
        const updated = [...prev, { time: new Date().toLocaleTimeString(), ...newData.metrics }];
        return updated.slice(-20); // Keep last 20 data points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === 'healthy') return 'text-green-600 bg-green-100';
    if (status === 'degraded') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'healthy') return <CheckCircle className="w-4 h-4" />;
    if (status === 'degraded') return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-earth-900/20 backdrop-blur-sm p-4 rounded-xl">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Big Data Infrastructure</h2>
            <p className="text-white/90">Real-time Agricultural Data Collection & Analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Records', value: (metrics.totalRecordsCollected / 1000000).toFixed(1) + 'M', icon: Database, color: 'from-blue-500 to-cyan-500' },
            { label: 'Active APIs', value: `${metrics.activeAPIs}/${metrics.totalAPIs}`, icon: Server, color: 'from-green-500 to-emerald-500' },
            { label: 'Storage Size', value: metrics.storageSize, icon: HardDrive, color: 'from-purple-500 to-pink-500' },
            { label: 'Data Freshness', value: 'Real-time', icon: Zap, color: 'from-orange-500 to-red-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-earth-900/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-white" />
                <span className="text-xs text-white/80">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className={`mt-2 h-1 rounded-full bg-gradient-to-r ${stat.color}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Data Stream */}
      <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600 animate-pulse" />
          Real-time Data Stream (2-second refresh)
        </h3>
        {realtimeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={realtimeData}>
              <defs>
                <linearGradient id="colorDataPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="dataPointsPerSecond"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDataPoints)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Initializing real-time stream...
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {realtimeData.length > 0 && [
            { label: 'Weather Stations', value: realtimeData[realtimeData.length - 1]?.weatherStations || 0, color: 'blue' },
            { label: 'Soil Sensors', value: realtimeData[realtimeData.length - 1]?.soilSensors || 0, color: 'green' },
            { label: 'Satellite Passes', value: realtimeData[realtimeData.length - 1]?.satellitePasses || 0, color: 'purple' },
            { label: 'Data Points/sec', value: realtimeData[realtimeData.length - 1]?.dataPointsPerSecond || 0, color: 'orange' },
            { label: 'Active Connections', value: realtimeData[realtimeData.length - 1]?.activeConnections || 0, color: 'pink' }
          ].map((metric, idx) => (
            <div key={idx} className={`bg-${metric.color}-50 rounded-lg p-3 border border-${metric.color}-200`}>
              <div className="text-xs text-white mb-1">{metric.label}</div>
              <div className={`text-xl font-bold text-${metric.color}-600`}>{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* API Health Status */}
      <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-blue-600" />
          API Health Status ({Object.keys(metrics.apiHealth).length} Sources)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(metrics.apiHealth).map(([api, status]: [string, any]) => (
            <div
              key={api}
              className={`p-3 rounded-lg border-2 ${
                status === 'healthy' ? 'border-green-500 bg-green-50' :
                status === 'degraded' ? 'border-yellow-500 bg-yellow-50' :
                'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white truncate">{api}</span>
                {getStatusIcon(status)}
              </div>
              <div className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${getStatusColor(status)}`}>
                {status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Collection Schedule */}
      <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Data Collection Schedule
        </h3>
        <div className="space-y-3">
          {DATA_COLLECTION_SCHEDULE.map((job, idx) => (
            <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-earth-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    job.status === 'running' ? 'bg-green-500 animate-pulse' :
                    job.status === 'scheduled' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}></div>
                  <div>
                    <div className="font-semibold text-white">{job.name}</div>
                    <div className="text-xs text-white">
                      Frequency: <span className="font-semibold">{job.frequency}</span> |
                      Records: <span className="font-semibold">{job.recordsCollected.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white">Next run</div>
                  <div className="text-xs font-semibold text-blue-600">
                    {new Date(job.nextRun).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Last run: {new Date(job.lastRun).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation Links */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-6 shadow-lg border border-indigo-200">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" />
          Connected Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(API_CONFIGS).map(([key, config]) => (
            <div key={key} className="bg-earth-900 rounded-lg p-4 shadow-sm border border-earth-700">
              <div className="font-semibold text-white mb-2">{config.name}</div>
              <div className="space-y-1 text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    config.requiresAuth ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {config.requiresAuth ? 'Auth Required' : 'Public'}
                  </span>
                </div>
                <div>Rate Limit: <span className="font-semibold">{config.rateLimit}</span></div>
                <a
                  href={config.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Documentation →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-3xl font-bold">99.9%</span>
          </div>
          <div className="text-sm opacity-90">System Uptime</div>
          <div className="text-xs opacity-75 mt-1">Last 30 days</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8" />
            <span className="text-3xl font-bold">&lt; 100ms</span>
          </div>
          <div className="text-sm opacity-90">Avg Response Time</div>
          <div className="text-xs opacity-75 mt-1">P95 latency</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <Database className="w-8 h-8" />
            <span className="text-3xl font-bold">2.8M+</span>
          </div>
          <div className="text-sm opacity-90">Records Processed</div>
          <div className="text-xs opacity-75 mt-1">Today</div>
        </div>
      </div>

    </div>
  );
}
