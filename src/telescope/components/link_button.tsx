import { Show, JSX } from "solid-js";
// import Loader from "./loader";
import { useTelescopeContext } from "../context/index";

export type LinkButtonProps = {
  text: string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  type: "primary" | "secondary" | "link" | "error" | "white";
  size: 20 | 16;
  underline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leadIcon?: JSX.Element;
  tailIcon?: JSX.Element;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

const getTextColor = (
  type: LinkButtonProps["type"],
  disabled: boolean
): string => {
  if (disabled) {
    return "text-text-normal-tertiary";
  }

  const colorMap = {
    primary: "text-text-normal-primary",
    secondary:
      "text-text-normal-primary hover:text-text-normal-secondary focus:text-text-normal-tertiary",
    link: "text-feature-base hover:text-purple-600 focus:text-purple-700",
    error: "text-error-base hover:text-red-600 focus:text-red-700",
    white: "text-text-inverted-primary hover:text-gray-200 focus:text-gray-300",
  };

  return colorMap[type];
};

const getUnderlineClass = (
  type: LinkButtonProps["type"],
  underline: boolean,
  disabled: boolean
): string => {
  if (!underline || disabled) {
    return "";
  }

  const colorMap = {
    primary: "underline decoration-text-normal-primary",
    secondary:
      "underline decoration-text-normal-primary hover:decoration-text-normal-secondary focus:decoration-text-normal-tertiary",
    link: "underline decoration-feature-base hover:decoration-purple-600 focus:decoration-purple-700",
    error:
      "underline decoration-error-base hover:decoration-red-600 focus:decoration-red-700",
    white:
      "underline decoration-text-inverted-primary hover:decoration-gray-200 focus:decoration-gray-300",
  };

  return colorMap[type];
};

const getFontSize = (size: LinkButtonProps["size"]): string => {
  return size === 20
    ? "text-[14px] leading-[20px]"
    : "text-[12px] leading-[16px]";
};

const getIconSize = (size: LinkButtonProps["size"]): string => {
  return size === 20 ? "size-[20px]" : "size-[16px]";
};

export default function LinkButton(props: LinkButtonProps) {
  const { components } = useTelescopeContext();
  const textColor = () => getTextColor(props.type, props.disabled || false);
  const underlineClass = () =>
    getUnderlineClass(
      props.type,
      props.underline || false,
      props.disabled || false
    );
  const fontSize = () => getFontSize(props.size);
  const iconSize = () => getIconSize(props.size);

  const handleClick = (e: MouseEvent) => {
    if (props.disabled) {
      e.preventDefault();
      return;
    }
    props.onClick?.(e);
  };

  const commonClasses = `
    relative inline-flex items-center justify-center gap-1
    font-['Inter'] font-medium
    tracking-[-0.14px] text-nowrap
    transition-colors duration-200
    ${fontSize()}
    ${textColor()}
    ${underlineClass()}
    ${props.disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
  `;

  const content = (
    <>
      <span
        class={`${props.loading ? "opacity-0" : ""} inline-flex items-center gap-1`}
      >
        <Show when={props.leadIcon}>
          <div
            class={`${iconSize()} flex shrink-0 items-center justify-center`}
          >
            {props.leadIcon}
          </div>
        </Show>
        <span class="shrink-0">{props.text}</span>
        <Show when={props.tailIcon}>
          <div
            class={`${iconSize()} flex shrink-0 items-center justify-center`}
          >
            {props.tailIcon}
          </div>
        </Show>
      </span>
      <Show when={props.loading}>
        <components.Loader
          size="small"
          class="absolute inset-0"
          variant="primary"
        />
      </Show>
    </>
  );

  return (
    <Show
      when={props.href && !props.disabled}
      fallback={
        <button
          class={commonClasses}
          onClick={handleClick}
          disabled={props.disabled}
          type="button"
        >
          {content}
        </button>
      }
    >
      <a
        href={props.href}
        class={commonClasses}
        onClick={handleClick}
        target={props.target}
        rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    </Show>
  );
}
