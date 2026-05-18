import { JSX, Show } from "solid-js";
import Loader from "./loader";

export type ButtonProps = {
  text: string;
  onClick: (e: MouseEvent) => void;
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
  style: "neutral" | "error" | "brand";
  size: 48 | 44 | 40 | 36 | 32 | 28;
  disabled?: boolean;
  expanded?: boolean;
  loading?: boolean;
  LeadIcon?: () => JSX.Element;
  TrailIcon?: () => JSX.Element;
};

const getBackgroundColor = (
  variant: ButtonProps["variant"],
  style: ButtonProps["style"],
  disabled: boolean
): string => {
  if (disabled) {
    return "bg-stroke-1-alpha";
  }

  const colorMap = {
    primary: {
      brand:
        "bg-brand-tbd-base before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-transparent before:transition-none before:duration-300 hover:before:bg-[rgba(0,0,0,0.2)] focus:before:bg-[rgba(0,0,0,0.3)]",
      neutral:
        "bg-background-inverted-primary hover:bg-background-inverted-secondary focus:bg-background-inverted-tertiary",
      error:
        "bg-error-base hover:bg-[var(--color-red-600)] focus:bg-[var(--color-red-700)]",
    },
    secondary: {
      brand:
        "bg-background-normal-primary hover:bg-feature-lighter focus:bg-feature-light",
      neutral:
        "bg-background-normal-primary hover:bg-background-normal-secondary focus:bg-background-normal-tertiary",
      error:
        "bg-background-normal-primary hover:bg-error-lighter focus:bg-error-light",
    },
    tertiary: {
      brand: "bg-feature-lighter hover:bg-feature-light focus:bg-feature-light",
      neutral:
        "bg-[var(--color-alpha-neutral-16)] hover:bg-[var(--color-alpha-neutral-16)] focus:bg-[var(--color-alpha-neutral-24)]",
      error: "bg-error-lighter hover:bg-error-light focus:bg-error-light",
    },
    quaternary: {
      brand: "bg-transparent hover:bg-feature-lighter focus:bg-feature-light",
      neutral: "bg-transparent hover:bg-faded-lighter focus:bg-faded-light",
      error: "bg-transparent hover:bg-error-lighter focus:bg-error-light",
    },
  };

  return colorMap[variant][style];
};

const getTextColor = (
  variant: ButtonProps["variant"],
  style: ButtonProps["style"],
  disabled: boolean
): string => {
  if (disabled) {
    return "text-text-normal-tertiary stroke-text-normal-tertiary";
  }

  const colorMap = {
    primary: {
      brand: "text-brand-button-primary-text stroke-brand-button-primary-text",
      neutral: "text-text-inverted-primary stroke-text-inverted-primary",
      error: "text-white stroke-text-white",
    },
    secondary: {
      brand: "text-feature-base stroke-text-feature-base",
      neutral: "text-text-normal-primary stroke-text-normal-primary",
      error: "text-error-base stroke-text-error-base",
    },
    tertiary: {
      brand: "text-feature-base stroke-text-feature-base",
      neutral: "text-text-normal-primary stroke-text-normal-primary",
      error: "text-error-base stroke-text-error-base",
    },
    quaternary: {
      brand: "text-feature-base stroke-text-feature-base",
      neutral: "text-text-normal-primary stroke-text-normal-primary",
      error: "text-error-base stroke-text-error-base",
    },
  };

  return colorMap[variant][style];
};

const getBorderColor = (
  variant: ButtonProps["variant"],
  style: ButtonProps["style"],
  disabled: boolean
): string => {
  if (
    disabled ||
    variant === "primary" ||
    // variant === "tertiary" ||
    variant === "quaternary"
  ) {
    return "";
  }

  const colorMap = {
    secondary: {
      brand: "border border-feature-base",
      neutral: "border border-stroke-2",
      error: "border border-error-base",
    },
    tertiary: {
      brand:
        "border hover:border-[var(--color-alpha-purple-24)] focus:border-[var(--color-alpha-purple-16)]",
      neutral:
        "border border-transparent focus:border-stroke-2-alpha hover:border-stroke-2-alpha",
      error:
        "border border-transparent focus:border-[var(--color-alpha-red-16)] hover:border-[var(--color-alpha-red-16)]",
    },
  };

  return colorMap[variant]?.[style] || "";
};

const horizontalPadding = {
  48: "px-4",
  44: "px-4",
  40: "px-4",
  36: "px-4",
  32: "px-3",
  28: "px-3",
};

const height = {
  48: "h-12",
  44: "h-11",
  40: "h-10",
  36: "h-9",
  32: "h-8",
  28: "h-7",
};

const gap = {
  48: "gap-2",
  44: "gap-2",
  40: "gap-2",
  36: "gap-[6px]",
  32: "gap-1",
  28: "gap-1",
};

export default function Button(props: ButtonProps) {
  let buttonRef: HTMLButtonElement | undefined;

  const bgColor = () =>
    getBackgroundColor(props.variant, props.style, props.disabled || false);
  const textColor = () =>
    getTextColor(props.variant, props.style, props.disabled || false);
  const borderColor = () =>
    getBorderColor(props.variant, props.style, props.disabled || false);

  return (
    <button
      ref={buttonRef}
      class={`${horizontalPadding[props.size]} ${height[props.size]}  text-title-6-semi-bold relative flex items-center justify-center gap-2 text-nowrap rounded-full  duration-200
        ${bgColor()}
        ${textColor()}
        ${borderColor()}
        ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${props.expanded ? "w-full" : ""}
      `}
      onClick={(e) => {
        if (props.disabled) {
          return;
        }
        props.onClick(e);
        setTimeout(() => {
          buttonRef?.blur();
        }, 300);
      }}
      disabled={props.disabled}
    >
      <span
        class={`${props.loading ? "opacity-0" : ""} flex flex-row items-center justify-center ${gap[props.size]} relative z-10`}
      >
        <Show when={props.LeadIcon}>{props.LeadIcon?.()}</Show>
        <span>{props.text}</span>
        <Show when={props.TrailIcon}>{props.TrailIcon?.()}</Show>
      </span>
      <Show when={props.loading}>
        <Loader
          size="small"
          class={`absolute inset-0 z-10`}
          variant={
            props.style == "brand" && !props.disabled
              ? "brand-button-primary-text"
              : "primary"
          }
        />
      </Show>
    </button>
  );
}
