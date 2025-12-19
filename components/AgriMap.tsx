'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface AgriMapProps {
  onLocationSelect?: (lat: number, lon: number) => void;
}

function AgriMapComponent({ onLocationSelect }: AgriMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const [lng, setLng] = useState(-93.0977); // Des Moines, Iowa
  const [lat, setLat] = useState(41.8781);
  const [zoom, setZoom] = useState(6);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Dynamic import of Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Import Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Initialize map
      map.current = L.map(mapContainer.current!, {
        center: [lat, lng],
        zoom: zoom,
        zoomControl: true
      });

      // Add OpenStreetMap tile layer (free, no API key required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Add USDA Satellite imagery overlay (optional, for agriculture)
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 19,
      });

      // Layer control to switch between street and satellite view
      const baseMaps = {
        "Street Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }),
        "Satellite": satelliteLayer
      };

      L.control.layers(baseMaps).addTo(map.current);

      // Add scale control
      L.control.scale({ position: 'bottomleft' }).addTo(map.current);

      // Custom marker icon (green for agriculture)
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

      // Add marker on click
      map.current.on('click', (e: any) => {
        const { lat, lng } = e.latlng;

        // Remove existing marker
        if (marker.current) {
          map.current?.removeLayer(marker.current);
        }

        // Add new marker with popup
        marker.current = L.marker([lat, lng], { icon: greenIcon })
          .addTo(map.current!)
          .bindPopup(`
            <div class="p-2">
              <p class="font-bold text-sm text-gray-900">Selected Location</p>
              <p class="text-xs text-gray-700">Lat: ${lat.toFixed(4)}</p>
              <p class="text-xs text-gray-700">Lon: ${lng.toFixed(4)}</p>
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

      // Add Iowa corn belt highlight
      const iowaBounds: [number, number][] = [
        [40.5, -96.5],
        [40.5, -90.0],
        [43.5, -90.0],
        [43.5, -96.5],
        [40.5, -96.5]
      ];

      L.polygon(iowaBounds, {
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.15,
        weight: 2
      }).addTo(map.current).bindPopup('<b>Iowa Corn Belt</b><br>Prime agricultural region');

      // Add US state boundaries (simplified example for major ag states)
      const agStates = [
        { name: 'California', coords: [[42, -124], [32.5, -114]] },
        { name: 'Texas', coords: [[36.5, -106], [25.8, -93.5]] },
        { name: 'Nebraska', coords: [[43, -104], [40, -95.3]] },
        { name: 'Kansas', coords: [[40, -102], [37, -94.6]] },
        { name: 'Minnesota', coords: [[49, -97], [43.5, -89.5]] }
      ];

      agStates.forEach(state => {
        if (state.coords[0] && state.coords[1]) {
          L.rectangle(
            [
              [state.coords[1][0], state.coords[1][1]],
              [state.coords[0][0], state.coords[0][1]]
            ],
            {
              color: '#059669',
              weight: 1,
              fillOpacity: 0.05
            }
          ).addTo(map.current!).bindPopup(`<b>${state.name}</b><br>Agricultural region`);
        }
      });

      setIsLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm z-[1000]">
        <div className="font-semibold text-gray-100">Map Coordinates</div>
        <div className="text-gray-300">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom.toFixed(1)}
        </div>
      </div>
      <div className="absolute top-4 right-4 bg-green-600/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs z-[1000]">
        <div className="font-bold text-white">🌾 OpenStreetMap (Open Source)</div>
        <div className="text-white/90">Click map to pin location</div>
      </div>
    </div>
  );
}

// Export with ssr: false to avoid server-side rendering issues
export default dynamic(() => Promise.resolve(AgriMapComponent), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full min-h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading agricultural map...</p>
      </div>
    </div>
  ),
});
