'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface AgriMapProps {
  onLocationSelect?: (lat: number, lon: number) => void;
  language?: 'tr' | 'en';
}

function AgriMapComponent({ onLocationSelect, language = 'en' }: AgriMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const [lng, setLng] = useState(-93.0977);
  const [lat, setLat] = useState(41.8781);
  const [zoom, setZoom] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [initAttempted, setInitAttempted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current || initAttempted) return;

    setInitAttempted(true);

    // Immediate timeout - force show map after 1 second if not loaded
    const safetyTimeout = setTimeout(() => {
      if (!isLoaded) {
        console.log('Map loading - forcing display');
        setIsLoaded(true);
        setMapReady(true);
      }
    }, 1000);

    // Check if Leaflet CSS is already loaded
    const existingLink = document.querySelector('link[href*="leaflet.css"]');

    const initMap = () => {
      import('leaflet').then((L) => {
        if (!mapContainer.current) return;

        try {
          // Initialize map with better default view (US agricultural regions)
          map.current = L.map(mapContainer.current, {
            center: [lat, lng],
            zoom: zoom,
            zoomControl: true,
            attributionControl: false // Remove default attribution
          });

          // Add OpenStreetMap tile layer with better settings
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: 19,
            minZoom: 3,
          }).addTo(map.current);

          // Add satellite layer option
          const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            maxZoom: 19,
          });

          // Layer control with minimal UI
          const baseMaps = {
            "Street": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '',
              maxZoom: 19,
            }),
            "Satellite": satelliteLayer
          };

          L.control.layers(baseMaps, {}, { position: 'topright' }).addTo(map.current);

          // Custom green marker icon
          const greenIcon = L.icon({
            iconUrl: 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
                <path fill="#22c55e" stroke="#16a34a" stroke-width="2" d="M15,2 C8.5,2 3,7.5 3,14 C3,20.5 15,38 15,38 S27,20.5 27,14 C27,7.5 21.5,2 15,2 Z"/>
                <circle fill="white" cx="15" cy="14" r="5"/>
              </svg>
            `),
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
          });

          // Add initial marker at center
          marker.current = L.marker([lat, lng], { icon: greenIcon })
            .addTo(map.current)
            .bindPopup(`
              <div style="padding: 6px; min-width: 140px;">
                <p style="font-weight: bold; margin: 0 0 4px 0; color: #15803d; font-size: 13px;">📍 ${language === 'tr' ? 'Seçili Konum' : 'Selected Location'}</p>
                <p style="margin: 0; font-size: 11px; color: #4b5563;">Lat: ${lat.toFixed(4)}</p>
                <p style="margin: 0; font-size: 11px; color: #4b5563;">Lon: ${lng.toFixed(4)}</p>
              </div>
            `);

          // Click handler for map interaction
          map.current.on('click', (e: any) => {
            const { lat, lng } = e.latlng;

            if (marker.current) {
              map.current?.removeLayer(marker.current);
            }

            marker.current = L.marker([lat, lng], { icon: greenIcon })
              .addTo(map.current!)
              .bindPopup(`
                <div style="padding: 6px; min-width: 140px;">
                  <p style="font-weight: bold; margin: 0 0 4px 0; color: #15803d; font-size: 13px;">📍 ${language === 'tr' ? 'Seçili Konum' : 'Selected Location'}</p>
                  <p style="margin: 0; font-size: 11px; color: #4b5563;">Lat: ${lat.toFixed(4)}</p>
                  <p style="margin: 0; font-size: 11px; color: #4b5563;">Lon: ${lng.toFixed(4)}</p>
                </div>
              `)
              .openPopup();

            setLat(lat);
            setLng(lng);

            if (onLocationSelect) {
              onLocationSelect(lat, lng);
            }
          });

          // Update coordinates on move
          map.current.on('moveend', () => {
            if (map.current) {
              const center = map.current.getCenter();
              setLng(parseFloat(center.lng.toFixed(4)));
              setLat(parseFloat(center.lat.toFixed(4)));
              setZoom(map.current.getZoom());
            }
          });

          // Add Iowa Corn Belt overlay
          L.polygon([
            [40.5, -96.5],
            [40.5, -90.0],
            [43.5, -90.0],
            [43.5, -96.5],
            [40.5, -96.5]
          ], {
            color: '#16a34a',
            fillColor: '#22c55e',
            fillOpacity: 0.12,
            weight: 2
          }).addTo(map.current).bindPopup('<b>Iowa Corn Belt</b><br>Prime agricultural region');

          // Add major US agricultural regions
          const agriRegions = [
            { name: 'California Valley', coords: [[37, -122], [35, -119]], type: 'vegetables' },
            { name: 'Texas Panhandle', coords: [[35.5, -102], [33.5, -100]], type: 'cotton' },
            { name: 'Nebraska Plains', coords: [[41.5, -101], [40, -98]], type: 'corn' },
            { name: 'Kansas Wheat Belt', coords: [[39, -100], [37.5, -97]], type: 'wheat' },
            { name: 'Minnesota Lakes', coords: [[46, -95], [44, -93]], type: 'soybeans' }
          ];

          agriRegions.forEach(region => {
            const color = region.type === 'corn' ? '#22c55e' :
                         region.type === 'wheat' ? '#eab308' :
                         region.type === 'soybeans' ? '#65a30d' :
                         region.type === 'cotton' ? '#06b6d4' : '#f97316';

            L.rectangle([
              [region.coords[1][0], region.coords[1][1]],
              [region.coords[0][0], region.coords[0][1]]
            ], {
              color: color,
              weight: 1.5,
              fillOpacity: 0.08,
              fillColor: color
            }).addTo(map.current!).bindPopup(`
              <div style="padding: 4px;">
                <b style="color: ${color};">${region.name}</b><br>
                <span style="font-size: 11px;">${region.type.charAt(0).toUpperCase() + region.type.slice(1)} farming region</span>
              </div>
            `);
          });

          setIsLoaded(true);
          setMapReady(true);

          // Force a resize after a short delay to ensure proper rendering
          setTimeout(() => {
            if (map.current) {
              map.current.invalidateSize();
            }
          }, 100);
        } catch (error) {
          console.error('Error initializing map:', error);
          setMapReady(true); // Still set ready to remove loading spinner
        }
      }).catch(error => {
        console.error('Error loading Leaflet:', error);
        setMapReady(true);
        setIsLoaded(true); // Show map even if error
      });
    };

    // If CSS already exists, init immediately
    if (existingLink) {
      initMap();
    } else {
      // Load Leaflet CSS first
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';

      cssLink.onload = () => {
        initMap();
      };

      cssLink.onerror = () => {
        console.error('Failed to load Leaflet CSS');
        setMapReady(true);
        setIsLoaded(true); // Show even if CSS fails
      };

      document.head.appendChild(cssLink);
    }

    return () => {
      clearTimeout(safetyTimeout);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[400px] md:min-h-[500px]">
      <div
        ref={mapContainer}
        className="w-full h-full rounded-lg shadow-lg border-2 border-green-200"
        style={{ minHeight: '350px', background: '#f0fdf4' }}
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-green-600 mx-auto mb-3"></div>
            <p className="text-green-700 text-sm font-semibold">
              {language === 'tr' ? 'Harita yükleniyor...' : 'Loading map...'}
            </p>
          </div>
        </div>
      )}

      {/* Coordinates Display - Bottom Left (Mobile Friendly) */}
      {isLoaded && (
        <div className="absolute bottom-2 left-2 bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded shadow-lg z-[1000]">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-100">
            <MapPin className="w-3 h-3 text-green-400" />
            <span className="font-mono">{lat.toFixed(3)}, {lng.toFixed(3)}</span>
          </div>
        </div>
      )}

      {/* Interactive Hint - Bottom Right (Mobile Friendly) */}
      {isLoaded && (
        <div className="absolute bottom-2 right-2 bg-green-600/90 backdrop-blur-sm px-2 py-1 rounded shadow-lg text-[10px] sm:text-xs z-[1000]">
          <div className="font-semibold text-white">
            {language === 'tr' ? '🌾 Harita' : '🌾 Interactive Map'}
          </div>
        </div>
      )}
    </div>
  );
}

export default AgriMapComponent;
