'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox token here or in .env.local
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

interface AgriMapProps {
  onLocationSelect?: (lat: number, lon: number) => void;
}

export default function AgriMap({ onLocationSelect }: AgriMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-93.0977); // Des Moines, Iowa
  const [lat, setLat] = useState(41.8781);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add scale
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    // Add marker on click
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      // Remove existing markers
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());

      // Add new marker
      new mapboxgl.Marker({ color: '#22c55e' })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div class="p-2">
              <p class="font-bold text-sm">Selected Location</p>
              <p class="text-xs">Lat: ${lat.toFixed(4)}</p>
              <p class="text-xs">Lon: ${lng.toFixed(4)}</p>
            </div>`
          )
        )
        .addTo(map.current!);

      setLat(lat);
      setLng(lng);

      if (onLocationSelect) {
        onLocationSelect(lat, lng);
      }
    });

    // Update coordinates on move
    map.current.on('move', () => {
      if (map.current) {
        setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
        setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(map.current.getZoom().toFixed(2)));
      }
    });

    // Add soil quality layer (sample data)
    map.current.on('load', () => {
      if (!map.current) return;

      // Add Iowa corn belt highlight
      map.current.addSource('iowa-highlight', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-96.5, 40.5],
              [-90.0, 40.5],
              [-90.0, 43.5],
              [-96.5, 43.5],
              [-96.5, 40.5]
            ]]
          },
          properties: {}
        }
      });

      map.current.addLayer({
        id: 'iowa-layer',
        type: 'fill',
        source: 'iowa-highlight',
        paint: {
          'fill-color': '#22c55e',
          'fill-opacity': 0.15
        }
      });

      map.current.addLayer({
        id: 'iowa-outline',
        type: 'line',
        source: 'iowa-highlight',
        paint: {
          'line-color': '#16a34a',
          'line-width': 2
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
      <div className="absolute top-4 left-4 bg-neon-100/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm">
        <div className="font-semibold text-gray-800">Map Coordinates</div>
        <div className="text-gray-600">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
    </div>
  );
}
