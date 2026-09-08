import React from "react";

// Official UWU Leo Logo (Full Lockup: Seal + Divider + Text)
export function UwuLeoOfficialLogo({
  className = "h-11 w-auto",
  theme = "dark", // "dark" for dark text on light backgrounds, "light" for white text on dark backgrounds
  alt = "Leo Club of Uva Wellassa University",
}: {
  className?: string;
  theme?: "dark" | "light";
  alt?: string;
}) {
  const src = theme === "light" ? "/logos/uwu-leo-logo-white.png" : "/logos/uwu-leo-logo.png";
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain select-none`}
    />
  );
}

// Official UWU Leo Seal (Circular Lion Emblem only)
export function UwuLeoEmblem({
  className = "w-12 h-12",
  theme = "dark",
  alt = "Leo Club of UWU Seal",
}: {
  className?: string;
  theme?: "dark" | "light";
  alt?: string;
}) {
  const src = theme === "light" ? "/logos/uwu-leo-seal-white.png" : "/logos/uwu-leo-seal.png";
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain select-none shrink-0`}
    />
  );
}

// Aliases for seamless component compatibility
export const LeoEmblemSvg = UwuLeoEmblem;
export const UwuLeoEmblemSvg = UwuLeoEmblem;
export const UwuLeoOfficialLogoSvg = UwuLeoOfficialLogo;

// Official Lions Clubs International Emblem
export function LionsEmblemSvg({
  className = "w-12 h-12",
  alt = "Lions International Emblem",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/logos/lions-international.png"
      alt={alt}
      className={`${className} object-contain select-none shrink-0 drop-shadow-sm`}
    />
  );
}

export const LionsInternationalLogo = LionsEmblemSvg;
export const LionsEmblem = LionsEmblemSvg;

// Authentic Leo District 306 D10 Emblem
export function DistrictEmblemSvg({
  className = "w-12 h-12",
  alt = "Leo District 306 D10 Emblem",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/logos/district-306-d10.png"
      alt={alt}
      className={`${className} object-contain select-none shrink-0 drop-shadow-sm`}
    />
  );
}

export const DistrictEmblem = DistrictEmblemSvg;


// Background subtle line-art doodle pattern
export function CardDoodlePattern({ className = "absolute inset-0 pointer-events-none" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M420 40 C410 45 400 48 390 42 C380 36 385 24 395 28 C405 32 415 30 425 22 C430 30 428 36 420 40 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.1"
      />
      <rect
        x="380"
        y="80"
        width="65"
        height="55"
        rx="12"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.1"
      />
      <circle cx="270" cy="50" r="30" stroke="currentColor" strokeWidth="1.2" opacity="0.08" strokeDasharray="3 3" />
    </svg>
  );
}
