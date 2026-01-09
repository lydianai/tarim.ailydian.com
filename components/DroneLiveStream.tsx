'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Video,
  Circle,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Grid3x3,
  Layers,
  Thermometer,
  Activity,
  Eye,
  Crosshair,
  Zap,
  Navigation,
  Wind,
  Clock,
  MapPin,
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';

interface DroneLiveStreamProps {
  droneId: string;
  droneName: string;
  language?: 'tr' | 'en';
  onClose?: () => void;
}

type CameraMode = 'visible' | 'thermal' | 'ndvi' | 'multispectral';
type OverlayMode = 'grid' | 'telemetry' | 'detection' | 'none';

interface DetectedObject {
  id: string;
  type: 'crop' | 'disease' | 'pest' | 'weed' | 'water_stress';
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface TelemetryData {
  altitude: number;
  speed: number;
  heading: number;
  battery: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  gpsAccuracy: number;
  satellites: number;
}

export default function DroneLiveStream({
  droneId: _droneId,
  droneName,
  language = 'en',
  onClose
}: DroneLiveStreamProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [cameraMode, setCameraMode] = useState<CameraMode>('visible');
  const [overlayMode, setOverlayMode] = useState<OverlayMode>('telemetry');
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameCount, setFrameCount] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);

  const [telemetry, setTelemetry] = useState<TelemetryData>({
    altitude: 145,
    speed: 12.5,
    heading: 87,
    battery: 78,
    temperature: 72,
    humidity: 58,
    windSpeed: 6.2,
    gpsAccuracy: 1.2,
    satellites: 18
  });

  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);

  const t = {
    liveStream: language === 'tr' ? 'Canlı Yayın' : 'Live Stream',
    recording: language === 'tr' ? 'Kayıt Yapılıyor' : 'Recording',
    visible: language === 'tr' ? 'Görünür' : 'Visible',
    thermal: language === 'tr' ? 'Termal' : 'Thermal',
    ndvi: 'NDVI',
    multispectral: language === 'tr' ? 'Çok Spektrumlu' : 'Multispectral',
    altitude: language === 'tr' ? 'İrtifa' : 'Altitude',
    speed: language === 'tr' ? 'Hız' : 'Speed',
    heading: language === 'tr' ? 'Yön' : 'Heading',
    battery: language === 'tr' ? 'Batarya' : 'Battery',
    temperature: language === 'tr' ? 'Sıcaklık' : 'Temperature',
    humidity: language === 'tr' ? 'Nem' : 'Humidity',
    windSpeed: language === 'tr' ? 'Rüzgar' : 'Wind',
    gps: 'GPS',
    satellites: language === 'tr' ? 'Uydu' : 'Satellites',
    objectDetection: language === 'tr' ? 'Nesne Tespiti' : 'Object Detection',
    cropHealth: language === 'tr' ? 'Ürün Sağlığı' : 'Crop Health',
    diseaseDetected: language === 'tr' ? 'Hastalık Tespit Edildi' : 'Disease Detected',
    pestDetected: language === 'tr' ? 'Zararlı Tespit Edildi' : 'Pest Detected',
    waterStress: language === 'tr' ? 'Su Stresi' : 'Water Stress',
    weedDetected: language === 'tr' ? 'Yabani Ot Tespit Edildi' : 'Weed Detected'
  };

  // Simulate live video feed rendering
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render based on camera mode
      switch (cameraMode) {
        case 'visible':
          renderVisibleLight(ctx, canvas.width, canvas.height);
          break;
        case 'thermal':
          renderThermal(ctx, canvas.width, canvas.height);
          break;
        case 'ndvi':
          renderNDVI(ctx, canvas.width, canvas.height);
          break;
        case 'multispectral':
          renderMultispectral(ctx, canvas.width, canvas.height);
          break;
      }

      // Add grid overlay
      if (showGrid) {
        renderGrid(ctx, canvas.width, canvas.height);
      }

      // Render detected objects
      if (overlayMode === 'detection') {
        renderObjectDetection(ctx);
      }

      setFrameCount(prev => prev + 1);
    };

    const interval = setInterval(renderFrame, 1000 / 30); // 30 FPS
    return () => clearInterval(interval);
  }, [cameraMode, showGrid, overlayMode, detectedObjects]);

  // Update telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        altitude: prev.altitude + (Math.random() - 0.5) * 2,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 0.5),
        heading: (prev.heading + (Math.random() - 0.5) * 2 + 360) % 360,
        battery: Math.max(0, prev.battery - 0.02),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 0.5)),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 0.3),
        gpsAccuracy: Math.max(0.5, prev.gpsAccuracy + (Math.random() - 0.5) * 0.1),
        satellites: Math.max(12, Math.min(24, prev.satellites + Math.floor((Math.random() - 0.5) * 2)))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate object detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (overlayMode === 'detection') {
        const objects: DetectedObject[] = [];
        const types: DetectedObject['type'][] = ['crop', 'disease', 'pest', 'weed', 'water_stress'];

        for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
          const type = types[Math.floor(Math.random() * types.length)];
          objects.push({
            id: `obj-${Date.now()}-${i}`,
            type,
            confidence: 0.65 + Math.random() * 0.35,
            x: Math.random() * 0.8 + 0.1,
            y: Math.random() * 0.8 + 0.1,
            width: 0.05 + Math.random() * 0.1,
            height: 0.05 + Math.random() * 0.1,
            label: type.replace('_', ' ').toUpperCase()
          });
        }

        setDetectedObjects(objects);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [overlayMode]);

  // Recording timer
  useEffect(() => {
    if (!isRecording) {
      setRecordingTime(0);
      return;
    }

    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Rendering functions
  const renderVisibleLight = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Simulate aerial farmland view
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#2d5016');
    gradient.addColorStop(0.5, '#4a7c2f');
    gradient.addColorStop(1, '#6b9b4f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add crop row texture
    ctx.strokeStyle = 'rgba(30, 50, 20, 0.3)';
    ctx.lineWidth = 2;
    for (let y = 0; y < height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Add some variation for realism
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 50 + 50}, ${Math.random() * 100 + 100}, ${Math.random() * 50 + 20}, 0.1)`;
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 100 + 50,
        Math.random() * 100 + 50
      );
    }
  };

  const renderThermal = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Thermal imaging simulation
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(0.3, '#ff6600');
    gradient.addColorStop(0.6, '#ffff00');
    gradient.addColorStop(1, '#0000ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Hot spots
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const hotGradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
      hotGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      hotGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = hotGradient;
      ctx.fillRect(x - 50, y - 50, 100, 100);
    }
  };

  const renderNDVI = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // NDVI vegetation index visualization
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const ndvi = 0.4 + Math.random() * 0.4 + (Math.sin(x * 0.01) * Math.cos(y * 0.01) * 0.2);

        if (ndvi > 0.7) {
          // Healthy vegetation - green
          data[i] = 0;
          data[i + 1] = 200;
          data[i + 2] = 0;
        } else if (ndvi > 0.4) {
          // Moderate - yellow-green
          data[i] = 200;
          data[i + 1] = 200;
          data[i + 2] = 0;
        } else {
          // Stressed - red
          data[i] = 200;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const renderMultispectral = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Multispectral composite
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#8b00ff');
    gradient.addColorStop(0.25, '#0000ff');
    gradient.addColorStop(0.5, '#00ff00');
    gradient.addColorStop(0.75, '#ffff00');
    gradient.addColorStop(1, '#ff0000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add spectral variations
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 80 + 40,
        Math.random() * 80 + 40
      );
    }
  };

  const renderGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < width; x += width / 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < height; y += height / 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Crosshair in center
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.6)';
    ctx.lineWidth = 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const size = 20;

    ctx.beginPath();
    ctx.moveTo(centerX - size, centerY);
    ctx.lineTo(centerX + size, centerY);
    ctx.moveTo(centerX, centerY - size);
    ctx.lineTo(centerX, centerY + size);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 2, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const renderObjectDetection = (ctx: CanvasRenderingContext2D) => {
    detectedObjects.forEach(obj => {
      const x = obj.x * ctx.canvas.width;
      const y = obj.y * ctx.canvas.height;
      const w = obj.width * ctx.canvas.width;
      const h = obj.height * ctx.canvas.height;

      // Bounding box color based on type
      const colors = {
        crop: '#00ff00',
        disease: '#ff0000',
        pest: '#ff6600',
        weed: '#ffff00',
        water_stress: '#0099ff'
      };

      ctx.strokeStyle = colors[obj.type];
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      // Label background
      ctx.fillStyle = colors[obj.type];
      const labelWidth = ctx.measureText(obj.label).width + 10;
      ctx.fillRect(x, y - 25, labelWidth, 25);

      // Label text
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(obj.label, x + 5, y - 8);

      // Confidence
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(`${(obj.confidence * 100).toFixed(0)}%`, x + 5, y + h + 15);
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-gray-900 rounded-xl overflow-hidden shadow-2xl ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg animate-pulse">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{t.liveStream} - {droneName}</h3>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
                  LIVE
                </span>
                <span>{frameCount} frames</span>
                {isRecording && (
                  <span className="flex items-center gap-1 text-red-400">
                    <Circle className="w-2 h-2 fill-red-400 text-red-400 animate-pulse" />
                    {t.recording} {formatTime(recordingTime)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-lg transition-all ${
                isRecording ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Circle className={`w-5 h-5 ${isRecording ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-all text-gray-300"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-all text-gray-300"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-all text-gray-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Video Feed */}
      <div className="relative bg-black">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-auto"
        />

        {/* Telemetry Overlay */}
        {overlayMode === 'telemetry' && (
          <div className="absolute top-4 left-4 space-y-2">
            {/* Altitude */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-sm flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>ALT: {telemetry.altitude.toFixed(0)}ft</span>
            </div>

            {/* Speed */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>SPD: {telemetry.speed.toFixed(1)} mph</span>
            </div>

            {/* Heading */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-sm flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-purple-400" />
              <span>HDG: {telemetry.heading.toFixed(0)}°</span>
            </div>

            {/* GPS */}
            <div className="bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-400" />
              <span>{t.satellites}: {telemetry.satellites}</span>
            </div>
          </div>
        )}

        {/* Battery Warning */}
        {telemetry.battery < 30 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold animate-pulse flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {t.battery}: {telemetry.battery.toFixed(0)}%
          </div>
        )}

        {/* Weather Conditions */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-white font-mono text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span>{telemetry.temperature.toFixed(0)}°F</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span>{telemetry.humidity.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-400" />
              <span>{telemetry.windSpeed.toFixed(1)} mph</span>
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-2 rounded-lg text-white font-mono text-sm flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          {/* Camera Modes */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Camera Mode</label>
            <div className="grid grid-cols-4 gap-2">
              {(['visible', 'thermal', 'ndvi', 'multispectral'] as CameraMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setCameraMode(mode)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    cameraMode === mode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {t[mode]}
                </button>
              ))}
            </div>
          </div>

          {/* Overlay Options */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Overlay</label>
            <div className="flex gap-2">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  showGrid ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setOverlayMode(overlayMode === 'telemetry' ? 'none' : 'telemetry')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  overlayMode === 'telemetry' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Layers className="w-4 h-4" />
                Data
              </button>
              <button
                onClick={() => setOverlayMode(overlayMode === 'detection' ? 'none' : 'detection')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  overlayMode === 'detection' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Eye className="w-4 h-4" />
                AI
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-semibold">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2 font-semibold">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
