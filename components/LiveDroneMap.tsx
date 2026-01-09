'use client';

import { useState, useEffect, useRef } from 'react';
import { Plane, Radio, Zap, Navigation, Camera } from 'lucide-react';

interface DronePosition {
  id: string;
  name: string;
  x: number; // 0-100%
  y: number; // 0-100%
  altitude: number;
  heading: number; // 0-360 degrees
  status: 'active' | 'idle' | 'charging';
  battery: number;
  speed: number;
}

interface LiveDroneMapProps {
  language?: 'tr' | 'en';
}

export default function LiveDroneMap({ language = 'tr' }: LiveDroneMapProps) {
  const [drones, setDrones] = useState<DronePosition[]>([
    {
      id: 'DJI-M3M-001',
      name: 'Alpha',
      x: 25,
      y: 30,
      altitude: 120,
      heading: 45,
      status: 'active',
      battery: 78,
      speed: 15.2
    },
    {
      id: 'DJI-T40-002',
      name: 'Bravo',
      x: 65,
      y: 55,
      altitude: 8,
      heading: 180,
      status: 'active',
      battery: 92,
      speed: 6.8
    },
    {
      id: 'SNT-P4M-003',
      name: 'Charlie',
      x: 45,
      y: 75,
      altitude: 0,
      heading: 90,
      status: 'idle',
      battery: 100,
      speed: 0
    },
  ]);

  const [selectedDrone, setSelectedDrone] = useState<string | null>(null);
  const [showPaths, setShowPaths] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animate drones
  useEffect(() => {
    const interval = setInterval(() => {
      setDrones(prev => prev.map(drone => {
        if (drone.status !== 'active') return drone;

        // Move drone based on heading
        const radians = (drone.heading * Math.PI) / 180;
        const speed = 0.3; // pixels per frame

        let newX = drone.x + Math.cos(radians) * speed;
        let newY = drone.y + Math.sin(radians) * speed;

        // Bounce off walls
        let newHeading = drone.heading;
        if (newX <= 5 || newX >= 95) {
          newHeading = 180 - drone.heading;
          newX = Math.max(5, Math.min(95, newX));
        }
        if (newY <= 5 || newY >= 95) {
          newHeading = 360 - drone.heading;
          newY = Math.max(5, Math.min(95, newY));
        }

        return {
          ...drone,
          x: newX,
          y: newY,
          heading: newHeading,
          altitude: drone.altitude + (Math.random() - 0.5) * 2,
          battery: Math.max(0, drone.battery - 0.01),
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Draw agricultural field pattern and flight paths on canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw agricultural field pattern (green crop rows)
    const rowHeight = 30;
    const rowCount = Math.ceil(canvas.height / rowHeight);

    for (let i = 0; i < rowCount; i++) {
      // Alternating shades of green for crop rows
      const shade = i % 2 === 0 ? 'rgba(34, 197, 94, 0.08)' : 'rgba(22, 163, 74, 0.08)';
      ctx.fillStyle = shade;
      ctx.fillRect(0, i * rowHeight, canvas.width, rowHeight);

      // Draw crop texture lines
      ctx.strokeStyle = 'rgba(22, 163, 74, 0.15)';
      ctx.lineWidth = 2;
      for (let j = 0; j < canvas.width; j += 8) {
        ctx.beginPath();
        ctx.moveTo(j, i * rowHeight + 5);
        ctx.lineTo(j + 4, i * rowHeight + rowHeight - 5);
        ctx.stroke();
      }
    }

    // Draw field boundary lines
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      // Vertical field divisions
      ctx.beginPath();
      ctx.moveTo((i / 4) * canvas.width, 0);
      ctx.lineTo((i / 4) * canvas.width, canvas.height);
      ctx.stroke();

      // Horizontal field divisions
      ctx.beginPath();
      ctx.moveTo(0, (i / 4) * canvas.height);
      ctx.lineTo(canvas.width, (i / 4) * canvas.height);
      ctx.stroke();
    }

    if (!showPaths) return;

    // Draw flight paths for active drones
    drones.forEach(drone => {
      if (drone.status !== 'active') return;

      const x = (drone.x / 100) * canvas.width;
      const y = (drone.y / 100) * canvas.height;

      // Draw coverage circle
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, 2 * Math.PI);
      ctx.fillStyle = drone.id === selectedDrone ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.05)';
      ctx.fill();
      ctx.strokeStyle = drone.id === selectedDrone ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw heading indicator
      const headingLength = 30;
      const headingX = x + Math.cos((drone.heading * Math.PI) / 180) * headingLength;
      const headingY = y + Math.sin((drone.heading * Math.PI) / 180) * headingLength;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(headingX, headingY);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw arrowhead
      const arrowSize = 8;
      const angle1 = drone.heading + 150;
      const angle2 = drone.heading - 150;

      ctx.beginPath();
      ctx.moveTo(headingX, headingY);
      ctx.lineTo(
        headingX + Math.cos((angle1 * Math.PI) / 180) * arrowSize,
        headingY + Math.sin((angle1 * Math.PI) / 180) * arrowSize
      );
      ctx.moveTo(headingX, headingY);
      ctx.lineTo(
        headingX + Math.cos((angle2 * Math.PI) / 180) * arrowSize,
        headingY + Math.sin((angle2 * Math.PI) / 180) * arrowSize
      );
      ctx.stroke();
    });
  }, [drones, selectedDrone, showPaths]);

  const t = {
    liveMap: language === 'tr' ? 'Canlı Harita' : 'Live Map',
    flightPaths: language === 'tr' ? 'Uçuş Yolları' : 'Flight Paths',
    active: language === 'tr' ? 'Aktif' : 'Active',
    idle: language === 'tr' ? 'Beklemede' : 'Idle',
    altitude: language === 'tr' ? 'İrtifa' : 'Altitude',
    speed: language === 'tr' ? 'Hız' : 'Speed',
    battery: language === 'tr' ? 'Batarya' : 'Battery',
    heading: language === 'tr' ? 'Yön' : 'Heading',
  };

  return (
    <div className="bg-earth-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-earth-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-earth-900/20 p-2 rounded-lg backdrop-blur-sm">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t.liveMap}</h3>
              <p className="text-xs text-white/80">
                {drones.filter(d => d.status === 'active').length} {t.active}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPaths(!showPaths)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                showPaths
                  ? 'bg-earth-900 text-agri-700'
                  : 'bg-earth-900/20 text-white hover:bg-earth-900/30'
              }`}
            >
              <Radio className="w-4 h-4" />
              {t.flightPaths}
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 aspect-video">
        {/* Canvas for flight paths */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="absolute inset-0 w-full h-full"
        />

        {/* Drones */}
        {drones.map(drone => (
          <div
            key={drone.id}
            className="absolute cursor-pointer transition-all duration-100"
            style={{
              left: `${drone.x}%`,
              top: `${drone.y}%`,
              transform: `translate(-50%, -50%) rotate(${drone.heading}deg)`,
            }}
            onClick={() => setSelectedDrone(selectedDrone === drone.id ? null : drone.id)}
          >
            {/* Drone Icon with pulsing animation */}
            <div className="relative">
              {/* Pulse effect for active drones */}
              {drone.status === 'active' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-400 rounded-full opacity-30 animate-ping" />
                </div>
              )}

              {/* Main drone icon */}
              <div
                className={`relative z-10 p-3 rounded-full ${
                  drone.status === 'active'
                    ? 'bg-green-500 shadow-lg shadow-green-500/50'
                    : drone.status === 'idle'
                    ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    : 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
                } ${
                  selectedDrone === drone.id ? 'ring-4 ring-white ring-offset-2' : ''
                } transition-all hover:scale-110`}
              >
                <Plane className="w-5 h-5 text-white" style={{ transform: 'rotate(-45deg)' }} />
              </div>

              {/* Drone label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  {drone.name}
                </div>
              </div>

              {/* Battery indicator */}
              {drone.status === 'active' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="bg-earth-900 rounded-full px-2 py-1 shadow-md flex items-center gap-1">
                    <Zap className={`w-3 h-3 ${
                      drone.battery > 60 ? 'text-green-500' :
                      drone.battery > 30 ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-xs font-bold text-white">
                      {drone.battery.toFixed(0)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-earth-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-white mb-2">
            {language === 'tr' ? 'Durum' : 'Status'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs text-white">{t.active}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs text-white">{t.idle}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-xs text-white">
                {language === 'tr' ? 'Şarjda' : 'Charging'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Drone Details */}
      {selectedDrone && (
        <div className="bg-earth-900 border-t-2 border-earth-700 p-4">
          {drones.filter(d => d.id === selectedDrone).map(drone => (
            <div key={drone.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="font-bold text-white">{drone.name}</div>
                    <div className="text-xs text-gray-400">{drone.id}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDrone(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="bg-earth-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.altitude}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {drone.altitude.toFixed(0)}m
                  </div>
                </div>
                <div className="bg-earth-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.speed}</div>
                  <div className="text-lg font-bold text-green-600">
                    {drone.speed.toFixed(1)} m/s
                  </div>
                </div>
                <div className="bg-earth-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.battery}</div>
                  <div className={`text-lg font-bold ${
                    drone.battery > 60 ? 'text-green-600' :
                    drone.battery > 30 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {drone.battery.toFixed(0)}%
                  </div>
                </div>
                <div className="bg-earth-900 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">{t.heading}</div>
                  <div className="text-lg font-bold text-purple-600">
                    {drone.heading.toFixed(0)}°
                  </div>
                </div>
              </div>

              {/* Camera View Simulation */}
              <div className="bg-gray-900 rounded-lg p-4 relative overflow-hidden aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
                <div className="relative flex items-center justify-center h-full">
                  <Camera className="w-12 h-12 text-white/50" />
                  <div className="absolute top-2 left-2 text-xs text-green-400 font-mono">
                    {language === 'tr' ? 'CANLI YAYSIN' : 'LIVE STREAM'}
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white/70 font-mono">
                    {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
