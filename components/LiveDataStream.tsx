'use client';

import { useState, useEffect } from 'react';
import { Activity, Wifi, Database, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface DataStreamItem {
  id: string;
  source: string;
  status: 'active' | 'updating' | 'error';
  lastUpdate: Date;
  recordsProcessed: number;
  latency: number;
}

export default function LiveDataStream() {
  const [streams, setStreams] = useState<DataStreamItem[]>([
    {
      id: 'usda-nass',
      source: 'USDA NASS QuickStats',
      status: 'active',
      lastUpdate: new Date(),
      recordsProcessed: 15234,
      latency: 145
    },
    {
      id: 'sentinel-2',
      source: 'Sentinel-2 Satellite',
      status: 'updating',
      lastUpdate: new Date(Date.now() - 300000),
      recordsProcessed: 8923,
      latency: 892
    },
    {
      id: 'openweather',
      source: 'OpenWeather Agro',
      status: 'active',
      lastUpdate: new Date(Date.now() - 60000),
      recordsProcessed: 45621,
      latency: 234
    },
    {
      id: 'nasa-modis',
      source: 'NASA MODIS',
      status: 'active',
      lastUpdate: new Date(Date.now() - 120000),
      recordsProcessed: 12456,
      latency: 567
    },
    {
      id: 'epa-ppls',
      source: 'EPA PPLS',
      status: 'active',
      lastUpdate: new Date(Date.now() - 180000),
      recordsProcessed: 3421,
      latency: 123
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => prev.map(stream => ({
        ...stream,
        lastUpdate: new Date(),
        recordsProcessed: stream.recordsProcessed + Math.floor(Math.random() * 100),
        latency: Math.floor(Math.random() * 500) + 100
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'updating': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'updating': return <Activity className="w-4 h-4 animate-pulse" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Wifi className="w-6 h-6 text-green-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Live Data Streams</h3>
            <p className="text-xs text-slate-400">Real-time agricultural data ingestion</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-green-400">LIVE</span>
        </div>
      </div>

      <div className="space-y-3">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600 transition-all hover:bg-slate-800/70"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(stream.status)}`}>
                  {getStatusIcon(stream.status)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{stream.source}</h4>
                  <p className="text-xs text-slate-400">{formatTimeSince(stream.lastUpdate)}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stream.status)} capitalize`}>
                {stream.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-700/30 rounded p-2">
                <div className="text-slate-400 mb-1">Records</div>
                <div className="font-bold text-white">{stream.recordsProcessed.toLocaleString()}</div>
              </div>
              <div className="bg-slate-700/30 rounded p-2">
                <div className="text-slate-400 mb-1">Latency</div>
                <div className="font-bold text-white">{stream.latency}ms</div>
              </div>
              <div className="bg-slate-700/30 rounded p-2">
                <div className="text-slate-400 mb-1">Quality</div>
                <div className="font-bold text-green-400">{Math.floor(95 + Math.random() * 5)}%</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (stream.recordsProcessed / 50000) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">
              {streams.reduce((acc, s) => acc + s.recordsProcessed, 0).toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Total Records</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {Math.floor(streams.reduce((acc, s) => acc + s.latency, 0) / streams.length)}ms
            </div>
            <div className="text-xs text-slate-400">Avg Latency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {streams.filter(s => s.status === 'active').length}/{streams.length}
            </div>
            <div className="text-xs text-slate-400">Active Streams</div>
          </div>
        </div>
      </div>
    </div>
  );
}
