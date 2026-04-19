"use client";

import { Players } from "@/lib/types";

type PlayersPickerProps = {
  value: Players;
  onChange: (newPlayers: Players) => void;
};

const PLAYERS = [1, 2, 3, 4] as const;

const PlayersPicker: React.FC<PlayersPickerProps> = ({ value, onChange }) => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {PLAYERS.map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            onClick={() => onChange(n as Players)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: selected ? "1px solid #2d6a4f" : "1px solid #bdbdbd",
              backgroundColor: selected ? "#2d6a4f" : "rgba(0, 0, 0, 0.06)",
              color: selected ? "#fff" : "#1a2e1a",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              transition: "all 0.15s ease",
            }}
            aria-label={`${n} player${n > 1 ? "s" : ""}`}
            aria-pressed={selected}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
};

export default PlayersPicker;
