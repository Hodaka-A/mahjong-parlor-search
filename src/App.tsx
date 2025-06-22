import { useEffect, useState } from "react";
import "./App.css";
import {
  getCurrentLocation,
  type LatLng,
} from "./functions/getCurrentPosition";
import MapComponent from "./components/MapComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [location, setLocation] = useState<LatLng | null>(null);
  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setLocation(loc))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* <div>
        {location ? (
          <p>
            現在地: 緯度 {location.lat}, 経度 {location.lng}
          </p>
        ) : (
          <p>現在地を取得中...</p>
        )}
      </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<MapComponent {...location} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
