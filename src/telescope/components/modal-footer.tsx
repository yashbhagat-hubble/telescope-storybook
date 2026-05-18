import { Show } from "solid-js";
import { useTelescopeContext } from "../context/index";
import { ButtonProps } from "./button";
import { LinkButtonProps } from "./link_button";

export type ModalFooterProps =
  | OneButton
  | TwoButton
  | ThreeButton
  | PriceAndActionButton;

type OneButton = {
  button: ButtonProps;
  topStroke?: boolean;
};

type TwoButton = {
  leftButton: ButtonProps;
  rightButton: ButtonProps;
  topStroke?: boolean;
};

type ThreeButton = {
  leftButton: LinkButtonProps;
  middleButton: ButtonProps;
  rightButton: ButtonProps;
  topStroke?: boolean;
};

type PriceAndActionButton = {
  price: number;
  priceLabel?: string;
  priceSubtext?: string;
  actionButton: ButtonProps;
  topStroke?: boolean;
};

// Type guards to determine which variant we have
function isOneButton(props: ModalFooterProps): props is OneButton {
  return "button" in props;
}

function isTwoButton(props: ModalFooterProps): props is TwoButton {
  return (
    "leftButton" in props &&
    "rightButton" in props &&
    !("middleButton" in props)
  );
}

function isThreeButton(props: ModalFooterProps): props is ThreeButton {
  return (
    "leftButton" in props && "middleButton" in props && "rightButton" in props
  );
}

function isPriceAndActionButton(
  props: ModalFooterProps
): props is PriceAndActionButton {
  return "price" in props && "actionButton" in props;
}

export default function ModalFooter(props: ModalFooterProps) {
  const { components } = useTelescopeContext();

  // Type=1 Button - Single full-width button
  if (isOneButton(props)) {
    return (
      <div
        class="border-stroke-1 bg-background-normal-primary flex gap-4 px-4 py-4"
        classList={{ "border-t": props.topStroke ?? false }}
      >
        <components.Button {...props.button} expanded />
      </div>
    );
  }

  // Type=2 buttons - Left and right buttons with space-between layout
  if (isTwoButton(props)) {
    return (
      <div
        class="border-stroke-1 bg-background-normal-primary flex gap-4 px-4 py-4"
        classList={{ "border-t": props.topStroke ?? false }}
      >
        <div class="flex w-full items-center justify-between gap-4">
          <components.Button {...props.leftButton} />
          <components.Button {...props.rightButton} />
        </div>
      </div>
    );
  }

  // Type=3 buttons - Left link button + two equal-width buttons on right
  if (isThreeButton(props)) {
    return (
      <div
        class="border-stroke-1 bg-background-normal-primary flex items-center justify-between px-4 py-4"
        classList={{ "border-t": props.topStroke ?? false }}
      >
        <components.LinkButton {...props.leftButton} />
        <div class="flex items-center gap-4">
          <components.Button {...props.middleButton} />
          <components.Button {...props.rightButton} />
        </div>
      </div>
    );
  }

  // Type=Price - Price display on left, action button on right
  if (isPriceAndActionButton(props)) {
    return (
      <div
        class="border-stroke-1 bg-background-normal-primary flex gap-4 px-4 py-4"
        classList={{ "border-t": props.topStroke ?? false }}
      >
        <div class="flex w-full items-center justify-between">
          <div class="flex flex-col items-start justify-center">
            <Show when={props.priceLabel}>
              <div class="text-label-medium text-text-normal-secondary">
                {props.priceLabel}
              </div>
            </Show>
            <div class="flex items-center gap-1">
              <p class="text-title-5-semi-bold text-text-normal-primary">
                ₹{props.price}
              </p>
              <Show when={props.priceSubtext}>
                <div class="flex h-full items-end pb-[2px]">
                  <div class="text-label-medium text-text-normal-secondary">
                    {props.priceSubtext}
                  </div>
                </div>
              </Show>
            </div>
          </div>
          <components.Button {...props.actionButton} />
        </div>
      </div>
    );
  }

  return null;
}
