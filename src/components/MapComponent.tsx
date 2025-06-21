// src/components/MapComponent.tsx
import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: 35.6809591, // 東京駅
    lng: 139.7673068,
};

const MapComponent: React.FC = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLEMAP_API_KEY, // ここにAPIキーを貼る
    });

    if (loadError) return <div>地図の読み込みに失敗しました</div>;
    if (!isLoaded) return <div>読み込み中...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
        >
            {/* マーカーなど追加したい場合はここに */}
        </GoogleMap>
    );
};

export default MapComponent;
