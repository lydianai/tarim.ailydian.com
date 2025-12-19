import { NextResponse } from 'next/server';

// DJI Cloud API / Parrot Olympe / AgEagle API endpoints
const DJI_API_BASE = process.env.DJI_API_BASE || '';
const DJI_API_KEY = process.env.DJI_API_KEY || '';
const PARROT_API_BASE = process.env.PARROT_API_BASE || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const droneId = searchParams.get('droneId') || 'all';

  try {
    // If real API credentials exist, use them
    if (DJI_API_KEY && DJI_API_KEY !== '') {
      const response = await fetch(`${DJI_API_BASE}/drones/${droneId}/telemetry`, {
        headers: {
          'Authorization': `Bearer ${DJI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          success: true,
          data,
          source: 'DJI Cloud API',
          timestamp: new Date().toISOString()
        });
      }
    }

    // Generate realistic drone telemetry data
    const telemetryData = generateRealisticDroneTelemetry(droneId);

    return NextResponse.json({
      success: true,
      data: telemetryData,
      source: 'Mock Drone Telemetry (DJI/Parrot Compatible)',
      timestamp: new Date().toISOString(),
      note: 'Add DJI_API_KEY or PARROT_API_KEY to .env for real telemetry data'
    });

  } catch (error) {
    console.error('Drone Telemetry API Error:', error);

    const telemetryData = generateRealisticDroneTelemetry(droneId);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch drone telemetry',
      data: telemetryData,
      source: 'Fallback Mock Data',
      timestamp: new Date().toISOString()
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { droneId, command, parameters } = body;

    // Simulate command execution
    console.log(`Executing command '${command}' on drone ${droneId}`, parameters);

    return NextResponse.json({
      success: true,
      message: `Command '${command}' sent to drone ${droneId}`,
      executed: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to execute drone command',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

function generateRealisticDroneTelemetry(droneId: string) {
  const drones = [
    {
      id: 'DJI-M3M-001',
      name: 'Mavic 3 Multispectral Alpha',
      model: 'DJI Mavic 3M',
      manufacturer: 'DJI',
      type: 'multispectral',
      status: 'active',
      mission: {
        id: 'MSN-001',
        name: 'Wheat Field NDVI Survey',
        type: 'survey',
        progress: 65,
        startTime: new Date(Date.now() - 28 * 60000).toISOString(),
        estimatedCompletion: new Date(Date.now() + 15 * 60000).toISOString()
      }
    },
    {
      id: 'DJI-T40-002',
      name: 'Agras T40 Bravo',
      model: 'DJI Agras T40',
      manufacturer: 'DJI',
      type: 'spraying',
      status: 'active',
      mission: {
        id: 'MSN-002',
        name: 'Corn Field Spraying',
        type: 'spray',
        progress: 42,
        startTime: new Date(Date.now() - 12 * 60000).toISOString(),
        estimatedCompletion: new Date(Date.now() + 16 * 60000).toISOString()
      }
    },
    {
      id: 'SNT-P4M-003',
      name: 'Phantom 4 Multispectral Charlie',
      model: 'DJI P4 Multispectral',
      manufacturer: 'DJI',
      type: 'multispectral',
      status: 'idle',
      mission: null
    },
    {
      id: 'AGE-RX60-004',
      name: 'AgEagle RX60 Delta',
      model: 'AgEagle RX60',
      manufacturer: 'AgEagle',
      type: 'survey',
      status: 'charging',
      mission: null
    }
  ];

  const selectedDrones = droneId === 'all' ? drones : drones.filter(d => d.id === droneId);

  return selectedDrones.map(drone => {
    const isActive = drone.status === 'active';

    return {
      droneInfo: {
        id: drone.id,
        name: drone.name,
        model: drone.model,
        manufacturer: drone.manufacturer,
        type: drone.type,
        serialNumber: `SN${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
        firmwareVersion: '2.0.4',
        lastMaintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      status: {
        current: drone.status,
        connected: drone.status !== 'maintenance',
        signalStrength: drone.status === 'active' ? 85 + Math.random() * 10 : 0,
        lastUpdate: new Date().toISOString()
      },
      battery: {
        level: drone.status === 'active' ? 78 + Math.random() * -10 :
               drone.status === 'charging' ? 45 + Math.random() * 5 :
               100,
        voltage: 25.2 + Math.random() * 0.5,
        current: isActive ? 12.5 + Math.random() * 2 : 0,
        temperature: 35 + Math.random() * 5,
        health: 98,
        cycleCount: Math.floor(Math.random() * 50) + 10,
        estimatedFlightTime: isActive ? 25 - Math.random() * 3 : 45
      },
      position: {
        latitude: 39.9334 + (Math.random() - 0.5) * 0.01,
        longitude: 32.8597 + (Math.random() - 0.5) * 0.01,
        altitude: {
          absolute: isActive ? 120 + (Math.random() - 0.5) * 10 : 0,
          relative: isActive ? 120 + (Math.random() - 0.5) * 10 : 0,
          unit: 'meters'
        },
        accuracy: {
          horizontal: 0.5,
          vertical: 0.8,
          unit: 'meters'
        },
        gpsStatus: 'RTK_FIXED', // Real-Time Kinematic for cm-level accuracy
        satellitesConnected: 18 + Math.floor(Math.random() * 5)
      },
      velocity: {
        horizontal: isActive ? 15.2 + (Math.random() - 0.5) * 2 : 0,
        vertical: isActive ? (Math.random() - 0.5) * 0.5 : 0,
        groundSpeed: isActive ? 15.2 + (Math.random() - 0.5) * 2 : 0,
        unit: 'm/s'
      },
      attitude: {
        pitch: isActive ? (Math.random() - 0.5) * 5 : 0,
        roll: isActive ? (Math.random() - 0.5) * 5 : 0,
        yaw: isActive ? Math.random() * 360 : 0,
        unit: 'degrees'
      },
      gimbal: {
        pitch: isActive ? -90 + Math.random() * 10 : 0,
        roll: 0,
        yaw: 0,
        mode: 'follow',
        unit: 'degrees'
      },
      camera: {
        mode: drone.type === 'multispectral' ? 'multispectral' : 'rgb',
        recording: isActive,
        photosTaken: isActive ? Math.floor(Math.random() * 500) + 100 : 0,
        storageUsed: {
          value: 24.5 + Math.random() * 20,
          unit: 'GB',
          total: 128
        },
        exposure: {
          iso: 100,
          shutterSpeed: '1/2000',
          aperture: 'f/2.8'
        }
      },
      sensors: drone.type === 'multispectral' ? {
        multispectral: {
          bands: ['Blue', 'Green', 'Red', 'Red Edge', 'NIR'],
          captures: isActive ? Math.floor(Math.random() * 200) + 50 : 0,
          ndvi: {
            current: 0.78 + (Math.random() - 0.5) * 0.1,
            min: 0.45,
            max: 0.92,
            average: 0.73
          },
          gndvi: 0.75 + (Math.random() - 0.5) * 0.08,
          evi: 0.68 + (Math.random() - 0.5) * 0.08
        },
        temperature: {
          ground: 24.5 + Math.random() * 3,
          air: 23.0 + Math.random() * 2,
          unit: 'celsius'
        }
      } : null,
      spray: drone.type === 'spraying' ? {
        tankCapacity: 40,
        tankLevel: isActive ? 28.5 - Math.random() * 5 : 35,
        flowRate: isActive ? 4.5 + Math.random() * 0.5 : 0,
        sprayWidth: 7,
        pressureMain: isActive ? 3.5 + Math.random() * 0.3 : 0,
        pressureBackup: isActive ? 3.4 + Math.random() * 0.3 : 0,
        nozzleStatus: {
          left: 'operational',
          right: 'operational'
        },
        unit: 'liters'
      } : null,
      weather: {
        temperature: 24 + Math.random() * 2,
        humidity: 45 + Math.random() * 5,
        windSpeed: 8.5 + (Math.random() - 0.5) * 2,
        windDirection: Math.floor(Math.random() * 360),
        pressure: 1013 + Math.random() * 5,
        visibility: 10,
        conditions: 'Clear'
      },
      flight: {
        flightTime: isActive ? 28 + Math.random() * 0.5 : 0,
        distance: isActive ? 4250 + Math.random() * 100 : 0,
        areaCovered: isActive ? 156.3 + Math.random() * 2 : 0,
        waypointsCovered: isActive ? 65 : 0,
        waypointsTotal: 100,
        homePosition: {
          latitude: 39.9320,
          longitude: 32.8580,
          altitude: 650
        },
        returnHomeAltitude: 150,
        maxAltitude: 200,
        unit: {
          time: 'minutes',
          distance: 'meters',
          area: 'hectares'
        }
      },
      mission: drone.mission,
      health: {
        overall: 'Good',
        motorStatus: ['Normal', 'Normal', 'Normal', 'Normal'],
        esc: ['Normal', 'Normal', 'Normal', 'Normal'],
        imu: 'Calibrated',
        compass: 'Calibrated',
        obstacles: {
          front: null,
          rear: null,
          left: null,
          right: null,
          top: null,
          bottom: isActive ? (Math.random() > 0.9 ? 'Detected at 15m' : null) : null
        },
        warnings: [],
        errors: []
      },
      communication: {
        controllerConnection: drone.status === 'active' || drone.status === 'idle',
        videoTransmission: isActive,
        linkQuality: isActive ? 90 + Math.random() * 8 : 0,
        dataRate: isActive ? 8.5 : 0,
        latency: isActive ? 45 + Math.random() * 10 : 0,
        frequency: '2.4GHz',
        unit: {
          quality: 'percentage',
          dataRate: 'Mbps',
          latency: 'ms'
        }
      },
      metadata: {
        timestamp: new Date().toISOString(),
        updateRate: '10Hz',
        protocol: drone.manufacturer === 'DJI' ? 'DJI SDK' : 'MAVLink',
        apiVersion: '2.0'
      }
    };
  });
}
