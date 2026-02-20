export const glass = {
  card: [
    "relative",
    "rounded-2xl",
    "border border-glass-border",
    "bg-surface-card",
    "backdrop-blur-2xl",
    "shadow-[0_2px_16px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]",
    "overflow-hidden",
  ].join(" "),

  cardHover:
    "hover:bg-surface-elevated hover:border-glass-border-light hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300",

  cardHighlight:
    "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent",
};
