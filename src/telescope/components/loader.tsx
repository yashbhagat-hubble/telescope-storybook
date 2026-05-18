const ANIMATION_DURATION = 1400;

const getPageLoadTime = (): number => {
  if (typeof window === "undefined") return 0;
  if (!(window as any).__GLOBAL_PAGE_LOAD_TIME__) {
    (window as any).__GLOBAL_PAGE_LOAD_TIME__ = Date.now();
  }
  return (window as any).__GLOBAL_PAGE_LOAD_TIME__;
};

const getSyncedDelay = (baseDelay: number): string => {
  if (typeof window === "undefined") return `${baseDelay}ms`;
  const elapsedTime = Date.now() - getPageLoadTime();
  return `${baseDelay - (elapsedTime % ANIMATION_DURATION)}ms`;
};

export type LoaderProps = {
  size?: "small" | "medium" | "large";
  variant?:
    | "primary"
    | "secondary"
    | "brand"
    | "white"
    | "black"
    | "brand-button-primary-text";
  class?: string;
};

const getSizeClasses = (size: string) => {
  const sizeMap = {
    small: {
      container: "gap-1",
      dot: "w-2 h-2",
    },
    medium: {
      container: "gap-1.5",
      dot: "w-3 h-3",
    },
    large: {
      container: "gap-2",
      dot: "w-4 h-4",
    },
  };
  return sizeMap[size as keyof typeof sizeMap];
};

const getVariantClasses = (variant: string) => {
  const variantMap = {
    primary: "bg-text-normal-primary",
    secondary: "bg-text-normal-secondary",
    brand: "bg-feature-base",
    white: "bg-white",
    black: "bg-black",
    "brand-button-primary-text": "bg-brand-button-primary-text",
  };
  return variantMap[variant as keyof typeof variantMap];
};

export default function Loader(props: LoaderProps) {
  const size = props.size || "small";
  const variant = props.variant || "primary";

  const sizeClasses = getSizeClasses(size);
  const variantClass = getVariantClasses(variant);

  return (
    <>
      <style>
        {`
          @keyframes telescope-loader-pulse {
            0%, 60%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            30% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          .telescope-loader-dot {
            animation: telescope-loader-pulse 1400ms ease-in-out infinite;
          }
        `}
      </style>
      <div
        class={`flex items-center justify-center ${sizeClasses.container} ${props.class || ""}`}
        role="status"
        aria-label="Loading"
      >
        <div
          class={`${sizeClasses.dot} ${variantClass} telescope-loader-dot rounded-full`}
          style={`animation-delay: ${getSyncedDelay(0)};`}
        />
        <div
          class={`${sizeClasses.dot} ${variantClass} telescope-loader-dot rounded-full`}
          style={`animation-delay: ${getSyncedDelay(200)};`}
        />
        <div
          class={`${sizeClasses.dot} ${variantClass} telescope-loader-dot rounded-full`}
          style={`animation-delay: ${getSyncedDelay(400)};`}
        />
      </div>
    </>
  );
}
