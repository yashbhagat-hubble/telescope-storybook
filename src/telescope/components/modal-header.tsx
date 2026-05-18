import { JSX, Show } from "solid-js";

export type ModalHeaderProps = {
  title: string;
  description?: string;
  icon?: () => JSX.Element; // URL or path to icon image
  onClose?: () => void;
  size: "small" | "medium" | "large";
};

export default function ModalHeader(props: ModalHeaderProps) {
  // Small variant - Single line header with optional back button and icon
  if (props.size === "small") {
    return (
      <div class="border-stroke-1 bg-background-normal-primary flex w-full items-center gap-3 border-b px-5 py-4">
        {/* <Show when={props.onClose}>
          <button
            onClick={props.onClose}
            class='flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full hover:bg-faded-lighter focus:bg-faded-light'
          >
            <ChevronLeft
              width={20}
              height={20}
              class='text-text-normal-secondary'
            />
          </button>
        </Show> */}

        <Show when={props.icon}>
          <div class="size-6">{props.icon?.()}</div>
        </Show>

        <div class="text-title-6-semi-bold text-text-normal-primary flex-1">
          {props.title}
        </div>

        <Show when={props.onClose}>
          <button
            onClick={props.onClose}
            class="hover:bg-faded-lighter focus:bg-faded-light flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full"
          >
            <CloseIcon
              width={20}
              height={20}
              class="text-text-normal-secondary"
            />
          </button>
        </Show>
      </div>
    );
  }

  // Medium variant - Header with description, optional icon, and close button
  if (props.size === "medium") {
    return (
      <div class="border-stroke-1 bg-background-normal-primary flex w-full items-start gap-3 border-b px-5 py-4">
        <div class="flex flex-1 items-start gap-3">
          <Show when={props.icon}>
            <div class="size-10">{props.icon?.()}</div>
          </Show>

          <div class="flex flex-1 flex-col gap-1">
            <div class="text-title-6-semi-bold text-text-normal-primary">
              {props.title}
            </div>
            <Show when={props.description}>
              <div class="text-label-regular text-text-normal-secondary">
                {props.description}
              </div>
            </Show>
          </div>
        </div>

        <Show when={props.onClose}>
          <button
            onClick={props.onClose}
            class="hover:bg-faded-lighter focus:bg-faded-light flex size-6 shrink-0 items-center justify-center overflow-clip rounded-full"
          >
            <CloseIcon
              width={20}
              height={20}
              class="text-text-normal-secondary"
            />
          </button>
        </Show>
      </div>
    );
  }

  // Large variant - Centered header with large icon, title, description
  return (
    <div class="bg-background-normal-primary relative flex w-full gap-4 px-5 pb-4 pt-6">
      {/* <Show when={props.onClose}>
        <button
          onClick={props.onClose}
          class='absolute left-4 top-4 flex size-6 items-center justify-center overflow-clip rounded-full hover:bg-faded-lighter focus:bg-faded-light'
        >
          <ChevronLeft
            width={20}
            height={20}
            class='text-text-normal-secondary'
          />
        </button>
      </Show> */}

      <Show when={props.onClose}>
        <button
          onClick={props.onClose}
          class="hover:bg-faded-lighter focus:bg-faded-light absolute right-4 top-4 flex size-6 items-center justify-center overflow-clip rounded-full"
        >
          <CloseIcon
            width={20}
            height={20}
            class="text-text-normal-secondary"
          />
        </button>
      </Show>

      <div class="flex w-full flex-col items-center justify-center gap-3 text-center">
        <Show when={props.icon}>
          <div class="size-[60px]">{props.icon?.()}</div>
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

function ChevronLeft(props: {
  class?: string;
  width?: number;
  height?: number;
}) {
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

function CloseIcon(props: { class?: string; width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99999 8.82129L14.125 4.69629L15.3033 5.87462L11.1783 9.99962L15.3033 14.1246L14.125 15.303L9.99999 11.178L5.87499 15.303L4.69666 14.1246L8.82166 9.99962L4.69666 5.87462L5.87499 4.69629L9.99999 8.82129Z"
        class="fill-text-normal-secondary"
      />
    </svg>
  );
}
