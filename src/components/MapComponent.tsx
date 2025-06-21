// src/components/MapComponent.tsx
import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import type { LatLng } from "../functions/getCurrentPosition";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// 初期値は東京
const defaultCenter = {
  lat: 35.6809591,
  lng: 139.7673068,
};

const MapComponent: React.FC<LatLng> = ({ lat, lng }) => {
  const center = {
    lat: lat ?? defaultCenter.lat,
    lng: lng ?? defaultCenter.lng,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY, // ここにAPIキーを貼る
  });

  if (loadError) return <div>地図の読み込みに失敗しました</div>;
  if (!isLoaded) return <div>読み込み中...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {/* マーカーなど追加したい場合はここに */}
    </GoogleMap>
  );
};

export default MapComponent;
