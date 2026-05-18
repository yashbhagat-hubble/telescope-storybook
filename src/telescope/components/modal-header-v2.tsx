import { JSX, Show } from "solid-js";

export type ModalHeaderV2Props = {
  title: string;
  description?: string;
  icon?: () => JSX.Element;
  iconClass?: string;
  onBack?: () => void;
  size: "medium" | "large";
};

export default function ModalHeaderV2(props: ModalHeaderV2Props) {
  if (props.size === "medium") {
    return (
      <div class="bg-background-normal-primary flex w-full items-center gap-3 px-4 pb-3 pt-4">
        <Show when={props.onBack}>
          <button
            onClick={props.onBack}
            class="hover:bg-faded-lighter focus:bg-faded-light flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full"
          >
            <ChevronLeft />
          </button>
        </Show>

        <div class="flex min-w-0 flex-1 items-center gap-3">
          <Show when={props.icon}>
            <div class={`${props.iconClass ?? "bg-background-normal-secondary"} flex size-10 shrink-0 items-center justify-center rounded-full`}>
              {props.icon?.()}
            </div>
          </Show>

          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <div class="text-title-4-semi-bold text-text-normal-primary">
              {props.title}
            </div>
            <Show when={props.description}>
              <div class="text-para-3-regular text-text-normal-secondary">
                {props.description}
              </div>
            </Show>
          </div>
        </div>
      </div>
    );
  }

  // Large variant
  return (
    <div class="bg-background-normal-primary flex w-full flex-col items-start gap-3 px-4 pb-4 pt-5">
      <Show when={props.onBack}>
        <button
          onClick={props.onBack}
          class="hover:bg-faded-lighter focus:bg-faded-light flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full"
        >
          <ChevronLeft />
        </button>
      </Show>

      <div class="flex w-full flex-col items-start gap-3">
        <Show when={props.icon}>
          <div class={`${props.iconClass ?? "bg-background-normal-secondary"} flex size-[60px] shrink-0 items-center justify-center rounded-full`}>
            {props.icon?.()}
          </div>
        </Show>

        <div class="flex w-full flex-col gap-1">
          <div class="text-title-4-semi-bold text-text-normal-primary">
            {props.title}
          </div>
          <Show when={props.description}>
            <div class="text-para-3-regular text-text-normal-secondary">
              {props.description}
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3333 15L7.66667 9.33333L13.3333 3.66667"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
