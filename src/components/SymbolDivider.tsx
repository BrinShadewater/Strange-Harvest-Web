"use client";

import { HERO_LOGO_SRC_OPTIMISED, HERO_LOGO_SRCSET } from "../constants/assets";

export default function SymbolDivider() {
  return (
    <div className="symbolDivider">
      <img
        src={HERO_LOGO_SRC_OPTIMISED}
        srcSet={HERO_LOGO_SRCSET}
        sizes="80px"
        alt="Strange Harvest symbol"
        className="symbolImage"
        loading={"lazy"}
        decoding={"async"}
        width={512}
        height={512}
      />
    </div>
  );
}
