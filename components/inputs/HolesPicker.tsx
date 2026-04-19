"use client";

import { Holes } from "@/lib/types";

type HolesPickerProps = {
  value: Holes;
  onChange: (newHoles: Holes) => void;
};

const OPTIONS: { label: string; value: Holes }[] = [
  { label: "9 Holes", value: 9 },
  { label: "18 Holes", value: 18 },
];

const HolesPicker: React.FC<HolesPickerProps> = ({ value, onChange }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: 12,
        padding: 4,
        gap: 0,
      }}
    >
      {/* sliding pill */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: value === 9 ? 4 : "calc(50% + 2px)",
          width: "calc(50% - 6px)",
          height: "calc(100% - 8px)",
          backgroundColor: "#2d6a4f",
          borderRadius: 9,
          transition: "left 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
      />
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              position: "relative",
              flex: 1,
              padding: "10px 28px",
              border: "none",
              background: "transparent",
              color: selected ? "#fff" : "#1a2e1a",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: 9,
              transition: "color 0.22s ease",
              zIndex: 1,
              whiteSpace: "nowrap",
            }}
            aria-pressed={selected}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default HolesPicker;
