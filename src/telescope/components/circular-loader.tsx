export type CircularLoaderProps = {
  size?: number;
  borderSize?: number;
  variant?: "primary" | "secondary" | "brand";
  class?: string;
};

const getVariantColors = (variant: string) => {
  const variantMap = {
    primary: {
      border: "var(--text-normal-primary)",
      borderTop: "var(--background-normal-primary)"
    },
    secondary: {
      border: "var(--text-normal-secondary)",
      borderTop: "var(--background-normal-secondary)"
    },
    brand: {
      border: "var(--feature-base)",
      borderTop: "var(--background-normal-primary)"
    }
  };
  return variantMap[variant as keyof typeof variantMap];
};

export default function CircularLoader(props: CircularLoaderProps) {
  const size = props.size || 24;
  const borderSize = props.borderSize || 3;
  const variant = props.variant || "primary";

  const colors = getVariantColors(variant);

  return (
    <>
      <style>
        {`
          @keyframes telescope-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .telescope-circular-loader {
            border-radius: 50%;
            animation: telescope-spin 1s linear infinite;
          }
        `}
      </style>
      <div
        class={`telescope-circular-loader ${props.class || ""}`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          border: `${borderSize}px solid ${colors.border}`,
          "border-top": `${borderSize}px solid ${colors.borderTop}`,
        }}
        role="status"
        aria-label="Loading"
      />
    </>
  );
}
