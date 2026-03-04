// src/security/movementValidator.ts

export interface GeoPoint {
  lat: number;
  lng: number;
  timestamp: number;
}

function haversineDistance(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000; // meters
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const aVal =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

export function validateMovement(
  previous: GeoPoint,
  current: GeoPoint,
  maxSpeedMps = 60
): boolean {
  const distance = haversineDistance(previous, current);
  const timeDiff = (current.timestamp - previous.timestamp) / 1000;

  if (timeDiff <= 0) return false;

  const speed = distance / timeDiff;

  return speed <= maxSpeedMps; // reject unrealistic teleport
}
