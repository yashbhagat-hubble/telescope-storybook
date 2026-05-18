import { createSignal, JSX, Ref, Show } from "solid-js";

export type InputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  size: 44 | 40 | 36 | 32;
  placeholder: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  state: "default" | "error" | "disabled";
  leadIcon?: () => JSX.Element;
  trailIcon?: () => JSX.Element;
  required?: boolean;
  linkButtonText?: string;
  linkButtonOnClick?: () => void;
  infoText?: string;
  characterLimit?: number;
  type?: "text" | "phone" | "number";
  ref?: Ref<HTMLInputElement>;
};

const getSizeStyles = (size: InputProps["size"]) => {
  const sizeMap = {
    44: "py-[12px] ", // 44px height
    40: "py-[10px] ", // 40px height
    36: "py-[8px] ", // 36px height
    32: "py-[6px] !rounded-lg", // 32px height
  };
  return sizeMap[size];
};

const getLabelStyles = (size: InputProps["size"]) => {
  const sizeMap = {
    44: "text-para-3-medium",
    40: "text-para-3-medium",
    36: "text-para-3-medium",
    32: "text-label-medium",
  };
  return sizeMap[size];
};

const getStateStyles = (state: InputProps["state"], isFocused: boolean) => {
  switch (state) {
    case "error":
      return {
        container: "border border-error-base bg-background-normal-primary",
        focusRing: "",
        text: "text-text-normal-primary",
      };
    case "disabled":
      return {
        container: "bg-background-normal-tertiary border-0 cursor-not-allowed",
        focusRing: "",
        text: "text-text-normal-tertiary",
      };
    default:
      if (isFocused) {
        return {
          container:
            "border border-stroke-solid bg-background-normal-primary shadow-[0px_0px_0px_2px_var(--background-normal-primary),0px_0px_0px_4px_rgba(159,159,169,0.16)]",
          focusRing: "",
          text: "text-text-normal-primary",
        };
      }
      return {
        container:
          "border border-stroke-2 bg-background-normal-primary hover:border-stroke-3 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]",
        focusRing: "",
        text: "text-text-normal-primary",
      };
  }
};

export default function Input(props: InputProps) {
  const [isFocused, setIsFocused] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const sizeStyles = getSizeStyles(props.size);
  const stateStyles = () => getStateStyles(props.state, isFocused());

  return (
    <div class="flex w-full flex-col gap-1">
      <div class="flex flex-row items-end justify-between">
        <Show when={props.label} fallback={<div />}>
          <div
            class="flex h-5 items-center gap-1 "
            classList={{
              "h-4": props.size === 32,
            }}
          >
            <label
              class={`text-text-normal-primary ${getLabelStyles(props.size)}`}
            >
              {props.label}
            </label>
            <Show when={props.required}>
              <span class="text-para-3-medium text-info-base">*</span>
            </Show>
            <Show when={props.infoText}>
              <InfoIcon infoText={props.infoText!} />
            </Show>
          </div>
        </Show>
        <Show when={props.linkButtonText}>
          <button
            class="text-para-3-medium text-text-normal-primary underline underline-offset-2"
            onClick={props.linkButtonOnClick}
          >
            {props.linkButtonText}
          </button>
        </Show>
      </div>

      <div
        class={`relative flex items-center rounded-xl transition-all duration-150 ease-in-out ${sizeStyles} ${stateStyles().container}`}
        onClick={() => inputRef?.focus()}
      >
        <div class="flex w-full flex-col items-center ">
          <div class="flex w-full flex-row items-center  ">
            <Show when={props.leadIcon}>
              <span class="text-text-normal-secondary ml-3  flex items-center">
                {props.leadIcon!()}
              </span>
            </Show>
            <input
              id={props.id}
              type={"text"}
              ref={(el) => {
                inputRef = el;
                if (typeof props.ref === "function") {
                  props.ref(el);
                }
              }}
              value={props.value}
              onInput={(e) => {
                const value = e.currentTarget.value;
                if (props.type === "phone" || props.type === "number") {
                  // Only allow digits
                  const digitsOnly = value.replace(/[^0-9]/g, "");
                  e.currentTarget.value = digitsOnly;
                  props.onChange(digitsOnly);
                } else {
                  props.onChange(value);
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={props.placeholder}
              disabled={props.state === "disabled"}
              maxLength={props.characterLimit}
              class={` text-para-2-regular  h-full w-full  rounded-xl bg-transparent px-3  ${stateStyles().text}
            ${props.state === "disabled" ? "placeholder:text-text-normal-tertiary cursor-not-allowed" : "placeholder:text-text-normal-tertiary"}
            ${props.leadIcon ? "pl-2" : ""}
            ${props.trailIcon ? "pr-2" : ""}`}
            />
            <Show when={props.trailIcon}>
              <span class="text-text-normal-secondary mr-3 flex items-center">
                {props.trailIcon!()}
              </span>
            </Show>
          </div>
          <Show when={props.characterLimit}>
            <div class="mt-1 flex w-full justify-end px-3">
              <span class="text-label-medium text-text-normal-tertiary">
                {props.value.length} / {props.characterLimit}
              </span>
            </div>
          </Show>
        </div>
      </div>

      <Show when={props.helperText}>
        <span
          class={`text-label-regular ${props.state === "error" ? "text-error-base" : "text-text-normal-secondary"}`}
        >
          {props.helperText}
        </span>
      </Show>
    </div>
  );
}

const InfoIcon = (props: { infoText: string }) => {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div
      class="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        class="cursor-pointer"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 17.5C5.8575 17.5 2.5 14.1425 2.5 10C2.5 5.8575 5.8575 2.5 10 2.5C14.1425 2.5 17.5 5.8575 17.5 10C17.5 14.1425 14.1425 17.5 10 17.5Z"
          class="fill-[var(--color-alpha-neutral-24)]"
        />
        <path
          d="M10.3125 13.8542V9.6875H9.47917"
          class="stroke-text-normal-secondary"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.1033 6.35433C9.98834 6.35433 9.895 6.44766 9.89584 6.56266C9.89584 6.67766 9.98917 6.771 10.1042 6.771C10.2192 6.771 10.3125 6.67766 10.3125 6.56266C10.3125 6.44766 10.2192 6.35433 10.1033 6.35433"
          class="stroke-text-normal-secondary"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <Show when={isHovered()}>
        <div class="absolute bottom-full left-1/2 z-50 mb-2 min-w-32 -translate-x-1/2">
          <div class="bg-background-inverted-primary text-label-medium text-text-inverted-primary  whitespace-pre-line rounded-lg px-3 py-2 text-center shadow-[0px_4px_12px_rgba(0,0,0,0.15)]">
            {props.infoText}
          </div>
          <div class="absolute left-1/2 top-full -translate-x-1/2">
            <div class="border-t-background-inverted-primary border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      </Show>
    </div>
  );
};
