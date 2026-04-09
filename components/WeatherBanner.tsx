"use client";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { wmoToEmoji, wmoToIconBg } from "@/lib/weather";
import type { WeatherData } from "@/lib/weather";

type WeatherBannerProps = {
  weather: WeatherData | null;
  loading: boolean;
};

const WeatherBanner: React.FC<WeatherBannerProps> = ({ weather, loading }) => {
  if (loading) {
    return (
      <Box sx={{ px: 2, pb: 1.5, maxWidth: 600, mx: "auto" }}>
        <Skeleton variant="rounded" height={64} sx={{ borderRadius: "12px" }} />
      </Box>
    );
  }

  if (!weather) return null;

  const emoji = wmoToEmoji(weather.wmoCode);
  const iconBg = wmoToIconBg(weather.wmoCode);

  return (
    <Box sx={{ px: 2, pb: 1.5, maxWidth: 600, mx: "auto" }}>
      <Box
        sx={{
          bgcolor: "white",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Weather icon */}
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 22,
            lineHeight: 1,
          }}
        >
          {emoji}
        </Box>

        {/* Condition + stats */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.3 }}
            >
              {weather.condition}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                flexShrink: 0,
                lineHeight: 1.3,
              }}
            >
              <Box component="span" sx={{ color: "error.main" }}>H</Box>
              {" "}{weather.high}° /{" "}
              <Box component="span" sx={{ color: "#2196f3" }}>L</Box>
              {" "}{weather.low}°
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
            <Typography variant="caption" color="text.secondary">
              {weather.precipChance}% chance of rain
            </Typography>
            <Typography variant="caption" sx={{ color: "divider" }}>
              ·
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {weather.windSpeed} mph wind
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherBanner;
