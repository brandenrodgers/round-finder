"use client";

import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Box
      key={pathname}
      sx={{
        animation: "pageFadeIn 0.2s ease-out both",
        "@keyframes pageFadeIn": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {children}
    </Box>
  );
}
