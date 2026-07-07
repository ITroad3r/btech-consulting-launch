import type { CSSProperties } from "react";

type Size = "sm" | "md" | "lg" | number;
const SIZE_MAP: Record<Exclude<Size, number>, number> = { sm: 24, md: 32, lg: 42 };

interface Props {
  size?: Size;
  /** Background of the round badge behind the logo. */
  bg?: "white" | "light" | "transparent";
  padding?: number;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

/**
 * BTech Consulting bot avatar — renders the exact uploaded logo.
 * Used in the chatbot header, message avatars, and launcher.
 */
export function ChatbotLogo({
  size = "md",
  bg = "white",
  padding = 4,
  className,
  style,
  alt = "BTech Consulting Bot",
}: Props) {
  const px = typeof size === "number" ? size : SIZE_MAP[size];
  const background =
    bg === "white" ? "rgba(255,255,255,0.95)" : bg === "light" ? "#F5F5F5" : "transparent";

  return (
    <div
      className={"flex items-center justify-center rounded-full shrink-0 " + (className ?? "")}
      style={{ width: px, height: px, padding, background, ...style }}
    >
      <img
        src="/btech-bot-logo.png"
        alt={alt}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

export default ChatbotLogo;
