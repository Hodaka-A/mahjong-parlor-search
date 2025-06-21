export type LatLng = {
  lat?: number | null;
  lng?: number | null;
};

export const getCurrentLocation = (): Promise<LatLng> => {
  return new Promise((resolve, reject) => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      resolve({ lat, lng });
    };

    const error = (err: GeolocationPositionError) => {
      console.error("位置情報取得エラー:", err);
      reject(new Error("位置情報の取得に失敗しました: " + err.message));
    };

    if (!navigator.geolocation) {
      reject(new Error("このブラウザでは位置情報がサポートされていません"));
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
};
