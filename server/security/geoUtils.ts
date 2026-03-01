// server/security/geoUtils.ts

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: number;
}

export function haversine(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export function validateSpeed(
  previous: GeoPoint,
  current: GeoPoint,
  maxSpeed = 60
): boolean {
  const distance = haversine(previous, current);
  const time = (current.timestamp - previous.timestamp) / 1000;

  if (time <= 0) return false;

  const speed = distance / time;
  return speed <= maxSpeed;
}
