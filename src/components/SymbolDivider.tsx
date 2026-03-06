"use client";

import { HERO_LOGO_SRC } from "../constants/assets";

export default function SymbolDivider() {
  return (
    <div className="symbolDivider">
      <img
        src={HERO_LOGO_SRC}
        alt="Strange Harvest symbol"
        className="symbolImage"
      />
    </div>
  );
}
