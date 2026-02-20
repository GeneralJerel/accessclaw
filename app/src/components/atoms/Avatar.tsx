interface AvatarProps {
  initials: string;
  size?: "sm" | "md";
}

const sizeClasses = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
};

export function Avatar({ initials, size = "md" }: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 font-semibold text-accent-violet ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
}
