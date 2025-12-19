// API Client for Real Data Integration

export class AgriTechAPI {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  // Weather Data
  async getWeatherData(lat?: number, lon?: number) {
    try {
      const params = new URLSearchParams();
      if (lat) params.append('lat', lat.toString());
      if (lon) params.append('lon', lon.toString());

      const response = await fetch(`/api/weather?${params.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }

  // Satellite Data (Farmonaut)
  async getSatelliteData(lat?: number, lon?: number, startDate?: string, endDate?: string) {
    try {
      const params = new URLSearchParams();
      if (lat) params.append('lat', lat.toString());
      if (lon) params.append('lon', lon.toString());
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(`/api/satellite?${params.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Satellite API Error:', error);
      return null;
    }
  }

  // Drone Telemetry
  async getDroneTelemetry(droneId: string = 'all') {
    try {
      const response = await fetch(`/api/drone-telemetry?droneId=${droneId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Drone Telemetry API Error:', error);
      return null;
    }
  }

  // Send Drone Command
  async sendDroneCommand(droneId: string, command: string, parameters?: any) {
    try {
      const response = await fetch('/api/drone-telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          droneId,
          command,
          parameters
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Drone Command Error:', error);
      return null;
    }
  }

  // USDA NASS Agricultural Data
  async getUSDAData(commodity?: string, state?: string) {
    try {
      const params = new URLSearchParams();
      if (commodity) params.append('commodity', commodity);
      if (state) params.append('state', state);

      const response = await fetch(`/api/usda-nass?${params.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('USDA API Error:', error);
      return null;
    }
  }

  // EPA Pesticides Data
  async getEPAData(query?: string) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);

      const response = await fetch(`/api/epa-pesticides?${params.toString()}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('EPA API Error:', error);
      return null;
    }
  }
}

// Singleton instance
export const apiClient = new AgriTechAPI();

// Helper functions
export async function fetchWeather(lat?: number, lon?: number) {
  return apiClient.getWeatherData(lat, lon);
}

export async function fetchSatelliteData(lat?: number, lon?: number, days: number = 30) {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  return apiClient.getSatelliteData(lat, lon, startDate, endDate);
}

export async function fetchDroneTelemetry(droneId?: string) {
  return apiClient.getDroneTelemetry(droneId);
}

export async function controlDrone(droneId: string, command: 'start' | 'pause' | 'return' | 'land', params?: any) {
  return apiClient.sendDroneCommand(droneId, command, params);
}
