
"use client";

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const NOIDA_SECTOR_36_COORDS = { lat: 28.5762, lng: 77.3335 }; // Approximate coordinates for Sector 36, Noida

export function MapEmbed() {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you'd fetch this from an environment variable securely.
    // For this example, we'll use a placeholder or assume it's globally available if configured.
    // This is NOT secure for client-side.
    const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (mapsApiKey) {
      setApiKey(mapsApiKey);
    } else {
      console.warn("Google Maps API Key (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) is not set. Map functionality will be limited or unavailable.");
    }
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }
  
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center p-8 text-center">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">
          Google Maps API Key is not configured. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment. The map cannot be displayed.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-border">
        <Map
          defaultCenter={NOIDA_SECTOR_36_COORDS}
          defaultZoom={15}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="pixelsflow_map" // Optional: for custom styling in Google Cloud Console
        >
          <Marker position={NOIDA_SECTOR_36_COORDS} title="PixelsFlow Office (Sector 36, Noida)" />
        </Map>
      </div>
    </APIProvider>
  );
}
