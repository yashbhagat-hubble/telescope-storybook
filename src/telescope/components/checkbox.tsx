import { Show, createSignal } from "solid-js";

export type CheckboxProps = {
  id?: string;
  checked?: boolean;
  indeterminate?: boolean;
  size?: "large" | "small";
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  class?: string;
};

const getCheckboxClasses = (
  checked: boolean,
  indeterminate: boolean,
  size: string,
  disabled: boolean,
  isHovered: boolean
): string => {
  const sizeClasses = {
    large: "w-6 h-6 rounded-lg",
    small: "w-5 h-5 rounded-md",
  };

  const baseClasses = `${sizeClasses[size as keyof typeof sizeClasses]} border transition-all duration-200 flex items-center justify-center relative cursor-pointer`;

  if (disabled) {
    if (checked || indeterminate) {
      return `${baseClasses} bg-background-normal-secondary border-stroke-1 cursor-not-allowed`;
    }
    return `${baseClasses} bg-background-normal-secondary border-stroke-1 cursor-not-allowed`;
  }

  if (checked || indeterminate) {
    if (isHovered) {
      return `${baseClasses} bg-background-inverted-tertiary border-background-inverted-tertiary shadow-sm`;
    }
    return `${baseClasses} bg-background-inverted-primary border-background-inverted-primary shadow-sm`;
  }

  if (isHovered) {
    return `${baseClasses} bg-background-normal-primary border-stroke-3 shadow-sm`;
  }

  return `${baseClasses} bg-background-normal-primary border-stroke-2 shadow-sm`;
};

const CheckIcon = (props: { size: string; disabled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="9"
    viewBox="0 0 14 9"
    fill="none"
  >
    <path
      d="M13 1L5.36364 8L1 4"
      class="stroke-stroke-solid-inverted"
      classList={{
        "!stroke-[var(--stroke-3-alpha)]": props.disabled,
      }}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const IndeterminateIcon = (props: { size: string; disabled: boolean }) => (
  <svg
    width={props.size === "large" ? "10.5" : "10.5"}
    height="2"
    viewBox="0 0 11 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.25 1L10.75 1"
      class="stroke-stroke-solid-inverted"
      classList={{
        "stroke-stroke-3-alpha": props.disabled,
      }}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export default function Checkbox(props: CheckboxProps) {
  const [isHovered, setIsHovered] = createSignal(false);

  const handleChange = () => {
    if (!props.disabled && props.onChange) {
      props.onChange(!props.checked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !props.disabled) {
      e.preventDefault();
      handleChange();
    }
  };

  const checkboxClasses = () =>
    getCheckboxClasses(
      props.checked || false,
      props.indeterminate || false,
      props.size || "large",
      props.disabled || false,
      isHovered()
    );

  return (
    <div class={`flex items-center gap-2 ${props.class || ""}`}>
      <div
        class={checkboxClasses()}
        onMouseEnter={() => !props.disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        role="checkbox"
        tabindex={props.disabled ? -1 : 0}
        aria-checked={props.indeterminate ? "mixed" : props.checked || false}
        aria-disabled={props.disabled}
        aria-labelledby={props.label ? `${props.id}-label` : undefined}
      >
        <Show when={props.checked && !props.indeterminate}>
          <CheckIcon
            size={props.size || "large"}
            disabled={props.disabled || false}
          />
        </Show>
        <Show when={props.indeterminate}>
          <IndeterminateIcon
            size={props.size || "large"}
            disabled={props.disabled || false}
          />
        </Show>
      </div>
      <Show when={props.label}>
        <label
          id={`${props.id}-label`}
          class={`cursor-pointer text-para-3-regular ${
            props.disabled
              ? "text-text-normal-tertiary"
              : "text-text-normal-primary"
          }`}
          onClick={handleChange}
        >
          {props.label}
        </label>
      </Show>
    </div>
  );
}
