export type WeatherData = {
  high: number;
  low: number;
  condition: string;
  precipChance: number;
  windSpeed: number;
  wmoCode: number;
};

export function wmoToCondition(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 2) return "Mostly Clear";
  if (code === 3) return "Overcast";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow Showers";
  return "Thunderstorms";
}

export function wmoToEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}

// Subtle background tint for the emoji icon circle
export function wmoToIconBg(code: number): string {
  if (code === 0) return "rgba(255, 180, 0, 0.12)";
  if (code <= 2) return "rgba(255, 200, 50, 0.10)";
  if (code <= 3) return "rgba(0, 0, 0, 0.06)";
  if (code <= 48) return "rgba(0, 0, 0, 0.06)";
  if (code <= 82) return "rgba(80, 140, 220, 0.12)";
  if (code <= 86) return "rgba(180, 210, 255, 0.18)";
  return "rgba(100, 60, 180, 0.10)";
}
