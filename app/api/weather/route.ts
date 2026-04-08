import { NextRequest, NextResponse } from "next/server";
import { wmoToCondition } from "@/lib/weather";
import type { WeatherData } from "@/lib/weather";

// Boston center as default location
const DEFAULT_LAT = "42.3601";
const DEFAULT_LNG = "-71.0589";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat") ?? DEFAULT_LAT;
  const lng = req.nextUrl.searchParams.get("lng") ?? DEFAULT_LNG;
  // Expects YYYY-MM-DD
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", lng);
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max,windspeed_10m_max"
  );
  url.searchParams.set("temperature_unit", "fahrenheit");
  url.searchParams.set("windspeed_unit", "mph");
  url.searchParams.set("timezone", "America/New_York");
  url.searchParams.set("start_date", date);
  url.searchParams.set("end_date", date);

  const resp = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!resp.ok) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 502 });
  }

  const data = await resp.json();
  const daily = data.daily;

  if (!daily?.temperature_2m_max?.length) {
    return NextResponse.json({ error: "No weather data for this date" }, { status: 404 });
  }

  const result: WeatherData = {
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
    wmoCode: daily.weathercode[0],
    condition: wmoToCondition(daily.weathercode[0]),
    precipChance: daily.precipitation_probability_max[0] ?? 0,
    windSpeed: Math.round(daily.windspeed_10m_max[0]),
  };

  return NextResponse.json(result);
}
