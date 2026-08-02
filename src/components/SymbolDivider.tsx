"use client";

import { HERO_LOGO_SRC_OPTIMISED, HERO_LOGO_SRCSET } from "../constants/assets";

export default function SymbolDivider() {
  return (
    // Purely decorative section rule. It appears eight times on the page; named,
    // it announced "Strange Harvest symbol" eight times to screen readers.
    <div className="symbolDivider" aria-hidden="true">
      <img
        src={HERO_LOGO_SRC_OPTIMISED}
        srcSet={HERO_LOGO_SRCSET}
        sizes="80px"
        alt=""
        className="symbolImage"
        loading={"lazy"}
        decoding={"async"}
        width={512}
        height={512}
      />
    </div>
  );
}
