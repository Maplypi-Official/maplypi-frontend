import { useState, useEffect } from 'react';

/**
 * 📍 useGPS - لجلب موقع المستخدم الحقيقي من الجهاز
 * يقوم بتحديث الإحداثيات تلقائياً عند تحرك المستخدم.
 */
export const useGPS = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      console.error("GPS Error:", error.message);
    };

    // مراقبة الموقع بشكل حي (High Accuracy)
    const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { location, error };
};

