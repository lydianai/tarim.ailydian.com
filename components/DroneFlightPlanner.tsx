'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Map,
  MapPin,
  Navigation,
  Crosshair,
  Square,
  Circle as CircleIcon,
  Shapes,
  Trash2,
  Save,
  Upload,
  Download,
  Play,
  Grid3x3,
  Ruler,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Eye
} from 'lucide-react';

interface DroneFlightPlannerProps {
  language?: 'tr' | 'en';
  onPlanCreated?: (plan: FlightPlan) => void;
}

interface Waypoint {
  id: string;
  lat: number;
  lng: number;
  altitude: number;
  action?: 'hover' | 'capture' | 'spray' | 'survey';
  duration?: number; // seconds
}

interface FieldBoundary {
  id: string;
  name: string;
  points: { lat: number; lng: number }[];
  area: number; // acres
  cropType?: string;
}

interface FlightPlan {
  id: string;
  name: string;
  fieldId: string;
  waypoints: Waypoint[];
  estimatedTime: number; // minutes
  estimatedBattery: number; // percentage
  coveragePattern: 'parallel' | 'zigzag' | 'circular' | 'custom';
  altitude: number; // feet
  speed: number; // mph
  overlapPercentage: number;
  warnings: string[];
}

export default function DroneFlightPlanner({ language = 'en', onPlanCreated }: DroneFlightPlannerProps) {
  const [mode, setMode] = useState<'boundary' | 'waypoint' | 'view'>('view');
  const [boundaryPoints, setBoundaryPoints] = useState<{ lat: number; lng: number }[]>([]);
  const [fields, setFields] = useState<FieldBoundary[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [coveragePattern, setCoveragePattern] = useState<FlightPlan['coveragePattern']>('parallel');
  const [altitude, setAltitude] = useState(300);
  const [speed, setSpeed] = useState(15);
  const [overlap, setOverlap] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showNoFlyZones, setShowNoFlyZones] = useState(true);

  const t = {
    flightPlanner: language === 'tr' ? 'Uçuş Planlayıcı' : 'Flight Planner',
    drawBoundary: language === 'tr' ? 'Alan Sınırı Çiz' : 'Draw Boundary',
    addWaypoint: language === 'tr' ? 'Yol Noktası Ekle' : 'Add Waypoint',
    view: language === 'tr' ? 'Görünüm' : 'View',
    clear: language === 'tr' ? 'Temizle' : 'Clear',
    save: language === 'tr' ? 'Kaydet' : 'Save',
    import: language === 'tr' ? 'İçe Aktar' : 'Import',
    export: language === 'tr' ? 'Dışa Aktar' : 'Export',
    generatePlan: language === 'tr' ? 'Plan Oluştur' : 'Generate Plan',
    coveragePattern: language === 'tr' ? 'Kaplama Deseni' : 'Coverage Pattern',
    parallel: language === 'tr' ? 'Paralel' : 'Parallel',
    zigzag: language === 'tr' ? 'Zigzag' : 'Zigzag',
    circular: language === 'tr' ? 'Dairesel' : 'Circular',
    custom: language === 'tr' ? 'Özel' : 'Custom',
    altitude: language === 'tr' ? 'İrtifa' : 'Altitude',
    speed: language === 'tr' ? 'Hız' : 'Speed',
    overlap: language === 'tr' ? 'Üst Üste Binme' : 'Overlap',
    estimatedTime: language === 'tr' ? 'Tahmini Süre' : 'Estimated Time',
    estimatedBattery: language === 'tr' ? 'Tahmini Batarya' : 'Estimated Battery',
    area: language === 'tr' ? 'Alan' : 'Area',
    distance: language === 'tr' ? 'Mesafe' : 'Distance',
    waypoints: language === 'tr' ? 'Yol Noktaları' : 'Waypoints',
    warnings: language === 'tr' ? 'Uyarılar' : 'Warnings',
    noFlyZones: language === 'tr' ? 'Uçuş Yasak Bölgeler' : 'No-Fly Zones'
  };

  // Calculate area of polygon in acres
  const calculateArea = (points: { lat: number; lng: number }[]): number => {
    if (points.length < 3) return 0;

    // Simple polygon area calculation (approximate for small areas)
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].lat * points[j].lng;
      area -= points[j].lat * points[i].lng;
    }
    area = Math.abs(area / 2);

    // Convert to acres (very rough approximation)
    const sqMeters = area * 111000 * 111000 * Math.cos(points[0].lat * Math.PI / 180);
    return sqMeters / 4047; // Convert sq meters to acres
  };

  // Generate waypoints based on coverage pattern
  const generateWaypoints = () => {
    const field = fields.find(f => f.id === selectedField);
    if (!field) return;

    const newWaypoints: Waypoint[] = [];
    const bounds = getFieldBounds(field.points);

    if (coveragePattern === 'parallel') {
      // Generate parallel lines
      const spacing = 0.0002; // Approximate spacing in degrees
      let currentLat = bounds.minLat;
      let direction = 1;

      while (currentLat <= bounds.maxLat) {
        if (direction === 1) {
          newWaypoints.push({
            id: `wp-${newWaypoints.length}`,
            lat: currentLat,
            lng: bounds.minLng,
            altitude,
            action: 'survey'
          });
          newWaypoints.push({
            id: `wp-${newWaypoints.length}`,
            lat: currentLat,
            lng: bounds.maxLng,
            altitude,
            action: 'survey'
          });
        } else {
          newWaypoints.push({
            id: `wp-${newWaypoints.length}`,
            lat: currentLat,
            lng: bounds.maxLng,
            altitude,
            action: 'survey'
          });
          newWaypoints.push({
            id: `wp-${newWaypoints.length}`,
            lat: currentLat,
            lng: bounds.minLng,
            altitude,
            action: 'survey'
          });
        }
        currentLat += spacing;
        direction *= -1;
      }
    } else if (coveragePattern === 'zigzag') {
      // Generate zigzag pattern
      const spacing = 0.0003;
      let currentLat = bounds.minLat;

      while (currentLat <= bounds.maxLat) {
        newWaypoints.push({
          id: `wp-${newWaypoints.length}`,
          lat: currentLat,
          lng: bounds.minLng,
          altitude,
          action: 'survey'
        });
        newWaypoints.push({
          id: `wp-${newWaypoints.length}`,
          lat: currentLat,
          lng: bounds.maxLng,
          altitude,
          action: 'survey'
        });
        currentLat += spacing * 0.7;
        newWaypoints.push({
          id: `wp-${newWaypoints.length}`,
          lat: currentLat,
          lng: bounds.maxLng,
          altitude,
          action: 'survey'
        });
        newWaypoints.push({
          id: `wp-${newWaypoints.length}`,
          lat: currentLat,
          lng: bounds.minLng,
          altitude,
          action: 'survey'
        });
        currentLat += spacing * 0.7;
      }
    } else if (coveragePattern === 'circular') {
      // Generate circular pattern
      const centerLat = (bounds.minLat + bounds.maxLat) / 2;
      const centerLng = (bounds.minLng + bounds.maxLng) / 2;
      const radius = Math.max(bounds.maxLat - bounds.minLat, bounds.maxLng - bounds.minLng) / 2;
      const points = 16;

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * 2 * Math.PI;
        newWaypoints.push({
          id: `wp-${i}`,
          lat: centerLat + radius * Math.cos(angle),
          lng: centerLng + radius * Math.sin(angle),
          altitude,
          action: 'survey'
        });
      }
    }

    setWaypoints(newWaypoints);
  };

  const getFieldBounds = (points: { lat: number; lng: number }[]) => {
    return {
      minLat: Math.min(...points.map(p => p.lat)),
      maxLat: Math.max(...points.map(p => p.lat)),
      minLng: Math.min(...points.map(p => p.lng)),
      maxLng: Math.max(...points.map(p => p.lng))
    };
  };

  // Calculate flight statistics
  const calculateFlightStats = (): FlightPlan | null => {
    if (waypoints.length === 0 || !selectedField) return null;

    let totalDistance = 0;
    for (let i = 1; i < waypoints.length; i++) {
      const dlat = waypoints[i].lat - waypoints[i - 1].lat;
      const dlng = waypoints[i].lng - waypoints[i - 1].lng;
      totalDistance += Math.sqrt(dlat * dlat + dlng * dlng) * 111000; // Approximate meters
    }

    const totalDistanceMiles = totalDistance / 1609.34;
    const estimatedTime = (totalDistanceMiles / speed) * 60; // minutes
    const batteryPerMinute = 1.5; // Approximate battery consumption per minute
    const estimatedBattery = Math.min(100, estimatedTime * batteryPerMinute);

    const warnings: string[] = [];
    if (altitude > 400) warnings.push('Altitude exceeds FAA limit of 400ft AGL');
    if (estimatedBattery > 80) warnings.push('Flight may require battery change');
    if (waypoints.length > 200) warnings.push('Large number of waypoints may affect performance');
    if (speed > 20) warnings.push('High speed may reduce image quality');

    return {
      id: `plan-${Date.now()}`,
      name: `Flight Plan ${new Date().toLocaleDateString()}`,
      fieldId: selectedField,
      waypoints,
      estimatedTime,
      estimatedBattery,
      coveragePattern,
      altitude,
      speed,
      overlapPercentage: overlap,
      warnings
    };
  };

  // Render map
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#f0f4f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    if (showGrid) {
      ctx.strokeStyle = '#d0d0d0';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // No-fly zones (example)
    if (showNoFlyZones) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);

      // Example no-fly zone
      ctx.beginPath();
      ctx.arc(canvas.width * 0.75, canvas.height * 0.25, 60, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Draw fields
    fields.forEach(field => {
      const isSelected = field.id === selectedField;

      ctx.fillStyle = isSelected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 150, 100, 0.1)';
      ctx.strokeStyle = isSelected ? '#22c55e' : '#64966e';
      ctx.lineWidth = isSelected ? 3 : 2;

      ctx.beginPath();
      field.points.forEach((point, i) => {
        const x = ((point.lng + 122) / 0.05) * canvas.width;
        const y = ((38.5 - point.lat) / 0.05) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Field label
      if (field.points.length > 0) {
        const centerX = field.points.reduce((sum, p) => sum + ((p.lng + 122) / 0.05) * canvas.width, 0) / field.points.length;
        const centerY = field.points.reduce((sum, p) => sum + ((38.5 - p.lat) / 0.05) * canvas.height, 0) / field.points.length;

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(field.name, centerX, centerY);
        ctx.font = '10px sans-serif';
        ctx.fillText(`${field.area.toFixed(1)} acres`, centerX, centerY + 15);
      }
    });

    // Draw current boundary being drawn
    if (boundaryPoints.length > 0) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';

      ctx.beginPath();
      boundaryPoints.forEach((point, i) => {
        const x = ((point.lng + 122) / 0.05) * canvas.width;
        const y = ((38.5 - point.lat) / 0.05) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        // Draw point
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
      if (boundaryPoints.length > 2) {
        ctx.closePath();
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.fill();
      }
      ctx.stroke();
    }

    // Draw waypoints
    waypoints.forEach((waypoint, i) => {
      const x = ((waypoint.lng + 122) / 0.05) * canvas.width;
      const y = ((38.5 - waypoint.lat) / 0.05) * canvas.height;

      // Draw waypoint marker
      ctx.fillStyle = waypoint.action === 'spray' ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Draw waypoint number
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(i + 1), x, y + 4);

      // Draw line to next waypoint
      if (i < waypoints.length - 1) {
        const nextX = ((waypoints[i + 1].lng + 122) / 0.05) * canvas.width;
        const nextY = ((38.5 - waypoints[i + 1].lat) / 0.05) * canvas.height;

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }, [fields, boundaryPoints, waypoints, selectedField, showGrid, showNoFlyZones]);

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert to lat/lng (approximate)
    const lng = (x / canvas.width) * 0.05 - 122;
    const lat = 38.5 - (y / canvas.height) * 0.05;

    if (mode === 'boundary') {
      setBoundaryPoints([...boundaryPoints, { lat, lng }]);
    } else if (mode === 'waypoint') {
      setWaypoints([
        ...waypoints,
        {
          id: `wp-${waypoints.length}`,
          lat,
          lng,
          altitude,
          action: 'survey'
        }
      ]);
    }
  };

  const completeBoundary = () => {
    if (boundaryPoints.length < 3) return;

    const area = calculateArea(boundaryPoints);
    const newField: FieldBoundary = {
      id: `field-${fields.length + 1}`,
      name: `Field ${fields.length + 1}`,
      points: boundaryPoints,
      area
    };

    setFields([...fields, newField]);
    setBoundaryPoints([]);
    setSelectedField(newField.id);
    setMode('view');
  };

  const flightPlan = calculateFlightStats();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Map className="w-6 h-6" />
            <h2 className="text-xl font-bold">{t.flightPlanner}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all text-sm flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {t.import}
            </button>
            <button className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              {t.export}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Map Canvas */}
        <div className="col-span-2">
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full cursor-crosshair"
              onClick={handleCanvasClick}
            />
          </div>

          {/* Mode Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setMode('view')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Eye className="w-4 h-4" />
              {t.view}
            </button>
            <button
              onClick={() => setMode('boundary')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === 'boundary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Shapes className="w-4 h-4" />
              {t.drawBoundary}
            </button>
            <button
              onClick={() => setMode('waypoint')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === 'waypoint' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {t.addWaypoint}
            </button>
          </div>

          {/* Action Buttons */}
          {mode === 'boundary' && boundaryPoints.length >= 3 && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={completeBoundary}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                Complete Boundary
              </button>
              <button
                onClick={() => setBoundaryPoints([])}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          {/* Coverage Pattern */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">{t.coveragePattern}</label>
            <div className="grid grid-cols-2 gap-2">
              {(['parallel', 'zigzag', 'circular', 'custom'] as const).map(pattern => (
                <button
                  key={pattern}
                  onClick={() => setCoveragePattern(pattern)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    coveragePattern === pattern
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t[pattern]}
                </button>
              ))}
            </div>
          </div>

          {/* Flight Parameters */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                {t.altitude}: {altitude}ft
              </label>
              <input
                type="range"
                min="50"
                max="400"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {t.speed}: {speed} mph
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                {t.overlap}: {overlap}%
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={overlap}
                onChange={(e) => setOverlap(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Generate Plan Button */}
          <button
            onClick={generateWaypoints}
            disabled={!selectedField}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-semibold"
          >
            <Target className="w-5 h-5" />
            {t.generatePlan}
          </button>

          {/* Flight Statistics */}
          {flightPlan && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Flight Statistics
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.waypoints}:</span>
                  <span className="font-bold text-gray-900">{flightPlan.waypoints.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.estimatedTime}:</span>
                  <span className="font-bold text-gray-900">{flightPlan.estimatedTime.toFixed(1)} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{t.estimatedBattery}:</span>
                  <span className={`font-bold ${flightPlan.estimatedBattery > 80 ? 'text-red-600' : 'text-green-600'}`}>
                    {flightPlan.estimatedBattery.toFixed(0)}%
                  </span>
                </div>
              </div>

              {flightPlan.warnings.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t.warnings}
                  </div>
                  {flightPlan.warnings.map((warning, i) => (
                    <div key={i} className="text-xs text-gray-600 ml-6 mb-1">
                      • {warning}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Display Options */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Show Grid</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showNoFlyZones}
                onChange={(e) => setShowNoFlyZones(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">{t.noFlyZones}</span>
            </label>
          </div>

          {/* Start Flight Button */}
          {flightPlan && (
            <button
              onClick={() => onPlanCreated?.(flightPlan)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-semibold"
            >
              <Play className="w-5 h-5" />
              Start Flight Mission
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
