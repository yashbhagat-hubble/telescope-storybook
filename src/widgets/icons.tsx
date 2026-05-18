function classNames(...args: (string | undefined | null | false)[]): string {
  return args.filter(Boolean).join(" ");
}

/**
 * variant: "regular" | "solid" - Choose between regular phosphor icons and solid variants
 * size: "bold" | "fill" | "light" | "thin" | "duotone" or undefined (default, refers regular)
 */
export function PhosphorIcon(props: {
  name: string;
  class?: string;
  size?: "bold" | "fill" | "light" | "thin" | "duotone";
  fontSize?: number;
  onClick?: () => void;
  label?: string;
  weight?: "regular" | "bold" | "duotone" | "fill" | "light" | "thin";
}) {
  const weight = props.weight ?? "regular";
  return (
    <i
      aria-label={props.label}
      class={classNames(
        `ph-${weight}`,
        props.size ? `ph-${props.size}` : "ph",
        `ph-${props.name}`,
        props.class
      )}
      style={{
        "font-size": (props.fontSize ?? 20) + "px",
      }}
      onClick={props.onClick}
    />
  );
}
