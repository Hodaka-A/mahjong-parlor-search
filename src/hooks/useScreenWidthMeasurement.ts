import { useEffect, useState } from "react";

export const useScreenWidthMeasurement= () => {
  const [size, setSize] = useState<number>(window.innerWidth);
  useEffect(() => {
    const getWindowsSize = () => {
      const windouwWidth = window.innerWidth;
      setSize(windouwWidth);
    };
    getWindowsSize();
    window.addEventListener("resize", getWindowsSize);

    return () => {
      window.removeEventListener("resize", getWindowsSize);
    };
  }, []);
  return size;
};
