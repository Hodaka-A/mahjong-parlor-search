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
    const [places, setPlaces] = useState<any[]>([]);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY, // ここにAPIキーを貼る
        libraries: ["places"], // 必要なライブラリを指定
    });

    const center = useMemo(() => ({
        lat: lat ?? defaultCenter.lat,
        lng: lng ?? defaultCenter.lng,
    }), [lat, lng]);

    // 地図が読み込まれた後にGoogle Places APIを使用して近くの雀荘を検索
    useEffect(() => {
        if (map) {
            const service = new google.maps.places.PlacesService(map);

            const request = {
                location: center,
                radius: 3000, // 半径3000メートル以内を検索
                keyword: "雀荘", // 検索キーワード
            };

            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    setPlaces(results); // 取得結果を State に保存
                }
            });
        }
    }, [map]);

    return (
        <>
            <MapHeader />
            {!isLoaded || loadError ? (
                // 読み込み中やエラー時の表示
                <div>
                    {loadError ? "地図の読み込みに失敗しました" : "読み込み中..."}
                </div>
            ) : (
                // 地図表示
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={(mapInstance) => setMap(mapInstance)}
                    >
                        <>
                            {/* 現在地を示すピン */}
                            <Marker position={center} />

                            {/* 検索された場所のピン */}
                            {places.map((place, index) => (
                                <Marker
                                    key={index}
                                    position={{
                                        lat: typeof place.geometry.location.lat === 'function'
                                            ? place.geometry.location.lat()
                                            : place.geometry.location.lat,
                                        lng: typeof place.geometry.location.lng === 'function'
                                            ? place.geometry.location.lng()
                                            : place.geometry.location.lng,
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
