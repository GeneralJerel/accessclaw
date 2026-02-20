interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
        checked
          ? "border-accent-blue bg-accent-blue text-white"
          : "border-glass-border-light bg-white hover:border-accent-blue/40"
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
