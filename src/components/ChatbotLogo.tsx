import type { CSSProperties } from "react";

type Size = "sm" | "md" | "lg" | number;

const SIZE_MAP: Record<Exclude<Size, number>, number> = { sm: 20, md: 28, lg: 36 };

interface Props {
  size?: Size;
  /** Header/launcher variant renders on navy; inverts eye color. */
  variant?: "onLight" | "onDark";
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * BTech Consulting chatbot mascot.
 * A stylized "B" reinterpreted as an assistant face:
 *  - two vertical bowls of the B form the head silhouette
 *  - a soft antenna dot suggests a bot
 *  - two eyes + subtle smile mark it as a friendly assistant
 * Fully inline SVG — crisp at every size.
 */
export function ChatbotLogo({
  size = "md",
  variant = "onLight",
  className,
  style,
  title = "BTech Consulting Assistant",
}: Props) {
  const px = typeof size === "number" ? size : SIZE_MAP[size];

  const NAVY = "#003D7A";
  const MEDIUM = "#1E5BA8";
  const SKY = "#5DADE2";
  const WHITE = "#FFFFFF";

  const face = variant === "onDark" ? WHITE : NAVY;
  const faceLight = variant === "onDark" ? SKY : MEDIUM;
  const eye = variant === "onDark" ? NAVY : WHITE;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      style={style}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="btBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={face} />
          <stop offset="100%" stopColor={faceLight} />
        </linearGradient>
      </defs>

      {/* Antenna */}
      <line x1="32" y1="4" x2="32" y2="10" stroke={faceLight} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="4" r="2.6" fill={SKY} />

      {/* Head — rounded "B" head with a subtle chat-bubble tail on the bottom-left */}
      <path
        d="
          M18 12
          H40
          a14 14 0 0 1 0 28
          H24
          l-6 6
          v-6
          H18
          a4 4 0 0 1 -4 -4
          V16
          a4 4 0 0 1 4 -4
          Z
        "
        fill="url(#btBody)"
      />

      {/* Inner "B" spine hint — a soft vertical highlight */}
      <rect x="20" y="16" width="2.4" height="22" rx="1.2" fill={WHITE} opacity="0.18" />

      {/* Eyes */}
      <circle cx="28" cy="26" r="3.2" fill={eye} />
      <circle cx="38" cy="26" r="3.2" fill={eye} />
      {/* Eye glints */}
      <circle cx="29" cy="25" r="0.9" fill={face} opacity="0.9" />
      <circle cx="39" cy="25" r="0.9" fill={face} opacity="0.9" />

      {/* Smile */}
      <path
        d="M28 33 Q33 37 38 33"
        fill="none"
        stroke={eye}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ChatbotLogo;
