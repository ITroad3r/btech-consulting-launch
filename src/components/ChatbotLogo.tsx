interface Props {
  size?: number;
  className?: string;
}

/** BTech Consulting bot avatar — raw transparent PNG, no badge/wrapper. */
export function ChatbotLogo({ size = 40, className = "" }: Props) {
  return (
    <img
      src="/btech-bot-logo.png"
      alt="BTech Consulting Bot"
      width={size}
      height={size}
      draggable={false}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    />
  );
}

export default ChatbotLogo;
