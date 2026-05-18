export type ToggleProps = {
  size?: "20" | "24";
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Toggle(props: ToggleProps) {
  const getContainerClasses = () => {
    const baseClasses =
      "relative inline-flex items-center transition-all duration-200 ease-in-out cursor-pointer p-0.5";

    // Size classes
    const sizeClasses = props.size === "20" ? "w-8 h-5 rounded-[20px]" : "w-10 h-6 rounded-[24px]";

    // Color classes based on state
    let colorClasses = "";
    if (props.disabled) {
      colorClasses = "bg-background-normal-tertiary cursor-not-allowed";
    } else if (props.checked) {
      colorClasses = "bg-success-base hover:bg-[#178c4e]"; // success-base with hover state
    } else {
      colorClasses = "bg-faded-base hover:bg-[#5c5c5c]"; // faded-base with hover state
    }

    return `${baseClasses} ${sizeClasses} ${colorClasses}`;
  };

  const getKnobClasses = () => {
    const baseClasses =
      "block transition-transform duration-200 ease-in-out rounded-full bg-static-white shadow-sm";

    // Size classes
    const sizeClasses = props.size === "20" ? "w-4 h-4" : "w-5 h-5";

    // Position classes - knob moves to the right when checked
    const positionClasses = props.checked
      ? props.size === "20"
        ? "translate-x-3" // 12px movement for small
        : "translate-x-4" // 16px movement for large
      : "translate-x-0";

    // Disabled knob color
    const colorClasses = props.disabled ? "bg-text-normal-primary" : "bg-static-white";

    return `${baseClasses} ${sizeClasses} ${positionClasses} ${colorClasses}`;
  };

  const handleClick = () => {
    if (!props.disabled && props.onChange) {
      props.onChange(!props.checked);
    }
  };

  return (
    <button
      type="button"
      class={getContainerClasses()}
      onClick={handleClick}
      disabled={props.disabled}
      role="switch"
      aria-checked={props.checked}
    >
      <span class={getKnobClasses()} />
    </button>
  );
}
