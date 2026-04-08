import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Round Finder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src="https://i.imgur.com/qztJS54.jpg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.45)",
          }}
        />
        {/* Text */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-1px",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            Round Finder
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: 34,
              fontWeight: 400,
              textShadow: "0 1px 6px rgba(0,0,0,0.5)",
            }}
          >
            Find golf tee times in the Boston area
          </div>
        </div>
      </div>
    ),
    size
  );
}
