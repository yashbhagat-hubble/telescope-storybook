import { Accessor, createEffect, createSignal, JSX } from "solid-js";

export type OtpInputProps = {
  otp: Accessor<string>;
  setOtp: (value: string) => void;
  isError: boolean;
  removeFocus: boolean;
  length?: number;
};

const getBoxStyles = (
  isFocused: boolean,
  isCurrentBox: boolean,
  isError: boolean
) => {
  if (isError) {
    return "border border-error-base bg-background-normal-primary";
  }

  if (isFocused && isCurrentBox) {
    return "border border-stroke-solid bg-background-normal-primary shadow-[0px_0px_0px_2px_var(--background-normal-primary),0px_0px_0px_4px_rgba(159,159,169,0.16)]";
  }

  return "border border-stroke-2 bg-background-normal-primary hover:border-stroke-3 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]";
};

export default function OtpInput(props: OtpInputProps): JSX.Element {
  const [hasFocus, setHasFocus] = createSignal<boolean>(false);
  let otpInput: HTMLInputElement | undefined;

  const length = () => props.length ?? 6;

  createEffect(() => {
    if (!props.removeFocus) {
      otpInput?.focus();
    } else {
      otpInput?.blur();
    }
  });

  const handleDivClick = () => {
    otpInput?.focus();
    setHasFocus(true);
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData("text");
    if (pasteData) {
      const sanitizedData = pasteData.replace(/\D/g, "").slice(0, length());
      props.setOtp(sanitizedData);
    }
  };

  const handleInput = (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    const sanitizedValue = value.replace(/\D/g, "").slice(0, length());
    props.setOtp(sanitizedValue);
  };

  return (
    <div class="relative flex w-full flex-col">
      <input
        ref={otpInput}
        class="absolute h-full w-full bg-transparent text-transparent caret-transparent"
        style="z-index: 1; -webkit-user-select: text;"
        type="text"
        autocomplete="one-time-code"
        inputmode="numeric"
        value={props.otp()}
        required
        maxLength={length()}
        placeholder=""
        onInput={handleInput}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onPaste={handlePaste}
      />
      <div class="flex w-full items-center justify-around gap-2">
        {[...Array(length())].map((_, index) => (
          <div
            class={`flex h-10 flex-1 cursor-text items-center justify-center rounded-xl text-para-3-medium text-text-normal-primary transition-all duration-150 ease-in-out ${getBoxStyles(
              hasFocus() && !props.removeFocus,
              index === props.otp().length,
              props.isError
            )}`}
            onClick={handleDivClick}
          >
            {props.otp()[index] ? (
              props.otp()[index]
            ) : index === props.otp().length && hasFocus() ? (
              <div class="h-3 w-0.5 animate-[blink_1s_infinite] bg-text-normal-primary" />
            ) : (
              <div class="h-1 w-1 rounded-full bg-stroke-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
