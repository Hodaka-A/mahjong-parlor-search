// src/components/MapComponent.tsx
import React, { useEffect, useState, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import type { LatLng } from "../functions/getCurrentPosition";
import MapHeader from "./MapHeader";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

// 初期値は東京
const defaultCenter = {
  lat: 35.6809591,
  lng: 139.7673068,
};

const MapComponent: React.FC<LatLng> = ({ lat, lng }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY,
    libraries: ["places"],
  });

  const center = useMemo(
    () => ({
      lat: lat ?? defaultCenter.lat,
      lng: lng ?? defaultCenter.lng,
    }),
    [lat, lng]
  );

  useEffect(() => {
    if (map) {
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: center,
        radius: 3000,
        keyword: "雀荘 麻雀",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPlaces(results);
        }
      });
    }
  }, [map]);

  return (
    <>
      <MapHeader places={places} />
      {!isLoaded || loadError ? (
        <div>
          {loadError ? "地図の読み込みに失敗しました" : "読み込み中..."}
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <>
            {/* 現在地マーカー */}
            <Marker
              position={center}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#ffffff",
              }}
            />

            {/* 雀荘マーカー */}
            {places.map((place, index) => (
              <Marker
                key={index}
                position={{
                  lat:
                    typeof place.geometry?.location?.lat === "function"
                      ? place.geometry.location.lat()
                      : place.geometry?.location?.lat ?? 0,
                  lng:
                    typeof place.geometry?.location?.lng === "function"
                      ? place.geometry.location.lng()
                      : place.geometry?.location?.lng ?? 0,
                }}
              />
            ))}
          </>
        </GoogleMap>
      )}
    </>
  );
};

export default MapComponent;
