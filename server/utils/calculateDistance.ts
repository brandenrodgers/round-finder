function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: "km" | "mi" | "nm" = "km"
): number {
  const toRadians = (angle: number) => (Math.PI / 180) * angle;

  const R: number | undefined = {
    km: 6371,
    mi: 3958.8,
    nm: 3440.065,
  }[unit.toLowerCase()];

  if (!R) return -1;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default calculateDistance;
