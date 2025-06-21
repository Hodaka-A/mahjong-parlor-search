import { useEffect, useState } from "react";
import "./App.css";
import {
  getCurrentLocation,
  type LatLng,
} from "./functions/getCurrentPosition";
import MapComponent from "./components/MapComponent";

function App() {
  const [location, setLocation] = useState<LatLng | null>(null);
  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setLocation(loc))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
      {location ? (
        <p>現在地: 緯度 {location.lat}, 経度 {location.lng}</p>
      ) : (
        <p>現在地を取得中...</p>
      )}
    </div>
      <MapComponent {...location} />

    </>
  );
}

export default App;
