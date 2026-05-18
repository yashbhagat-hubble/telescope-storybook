import {
  Accessor,
  createContext,
  createSignal,
  JSX,
  useContext,
} from "solid-js";
import Button, { ButtonProps } from "../components/button";
import LinkButton, { LinkButtonProps } from "../components/link_button";
import Input from "../components/input";
import Tabs from "../components/tabs";
import Toggle, { ToggleProps } from "../components/toggle";
import SegmentedControl, {
  SegmentedControlProps,
} from "../components/segmented-control";
import Checkbox, { CheckboxProps } from "../components/checkbox";
import Loader, { LoaderProps } from "../components/loader";
import CircularLoader, {
  CircularLoaderProps,
} from "../components/circular-loader";
import ModalHeader, { ModalHeaderProps } from "../components/modal-header";
import ModalHeaderV2, {
  ModalHeaderV2Props,
} from "../components/modal-header-v2";
import ModalFooter, { ModalFooterProps } from "../components/modal-footer";
import OtpInput, { OtpInputProps } from "../components/otp-input";

export type TelescopeTheme =
  | "telescope-light-theme"
  | "telescope-dark-theme"
  | "axis-bank-burgundy-theme";

export type TelescopeContextType = {
  theme: Accessor<TelescopeTheme>;
  toggleTheme: () => void;
  setTheme: (theme: TelescopeTheme) => void;
  styles: Accessor<JSX.CSSProperties>;
  appendStyles: (newStyles: JSX.CSSProperties) => void;
  deleteStyles: (keys: string[]) => void;
  components: {
    Button: (props: ButtonProps) => JSX.Element;
    LinkButton: (props: LinkButtonProps) => JSX.Element;
    Input: typeof Input;
    Tab: typeof Tabs;
    Toggle: (props: ToggleProps) => JSX.Element;
    SegmentedControl: (props: SegmentedControlProps) => JSX.Element;
    Checkbox: (props: CheckboxProps) => JSX.Element;
    Loader: (props: LoaderProps) => JSX.Element;
    CircularLoader: (props: CircularLoaderProps) => JSX.Element;
    ModalHeader: (props: ModalHeaderProps) => JSX.Element;
    ModalHeaderV2: (props: ModalHeaderV2Props) => JSX.Element;
    ModalFooter: (props: ModalFooterProps) => JSX.Element;
    OtpInput: (props: OtpInputProps) => JSX.Element;
  };
};

const TelescopeContext = createContext<TelescopeContextType>();

export function useTelescopeContext() {
  const context = useContext(TelescopeContext);
  if (!context) {
    throw new Error(
      "useTelescopeContext must be used within a TelescopeProvider"
    );
  }
  return context;
}

export type TelescopeComponents = {
  Button?: (props: ButtonProps) => JSX.Element;
  LinkButton?: (props: LinkButtonProps) => JSX.Element;
  Input?: typeof Input;
  Tab?: typeof Tabs;
  Toggle?: (props: ToggleProps) => JSX.Element;
  SegmentedControl?: (props: SegmentedControlProps) => JSX.Element;
  Checkbox?: (props: CheckboxProps) => JSX.Element;
  Loader?: (props: LoaderProps) => JSX.Element;
  CircularLoader?: (props: CircularLoaderProps) => JSX.Element;
  ModalHeader?: (props: ModalHeaderProps) => JSX.Element;
  ModalHeaderV2?: (props: ModalHeaderV2Props) => JSX.Element;
  ModalFooter?: (props: ModalFooterProps) => JSX.Element;
  OtpInput?: (props: OtpInputProps) => JSX.Element;
};

export function TelescopeProvider(props: {
  children: JSX.Element;
  theme?: TelescopeTheme;
  components?: TelescopeComponents;
  styles?: JSX.CSSProperties;
}) {
  const [theme, setTheme] = createSignal(
    props.theme ?? "telescope-light-theme"
  );
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const [styles, setStyles] = createSignal<JSX.CSSProperties>(
    props.styles ?? {}
  );

  const appendStyles = (newStyles: JSX.CSSProperties) => {
    setStyles((currentStyles) => ({ ...currentStyles, ...newStyles }));
  };

  const deleteStyles = (keys: string[]) => {
    setStyles((currentStyles) => {
      const updated = { ...currentStyles };
      keys.forEach((key) => {
        delete updated[key as keyof JSX.CSSProperties];
      });
      return updated;
    });
  };

  const toggleTheme = () => {
    setIsTransitioning(true);

    setTheme(
      theme() === "telescope-light-theme"
        ? "telescope-dark-theme"
        : "telescope-light-theme"
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <TelescopeContext.Provider
      value={{
        toggleTheme,
        theme,
        setTheme,
        styles,
        appendStyles,
        deleteStyles,
        components: {
          Button: props.components?.Button ?? Button,
          LinkButton: props.components?.LinkButton ?? LinkButton,
          Input: props.components?.Input ?? Input,
          Tab: props.components?.Tab ?? Tabs,
          Toggle: props.components?.Toggle ?? Toggle,
          SegmentedControl:
            props.components?.SegmentedControl ?? SegmentedControl,
          Checkbox: props.components?.Checkbox ?? Checkbox,
          Loader: props.components?.Loader ?? Loader,
          CircularLoader: props.components?.CircularLoader ?? CircularLoader,
          ModalHeader: props.components?.ModalHeader ?? ModalHeader,
          ModalHeaderV2: props.components?.ModalHeaderV2 ?? ModalHeaderV2,
          ModalFooter: props.components?.ModalFooter ?? ModalFooter,
          OtpInput: props.components?.OtpInput ?? OtpInput,
        },
      }}
    >
      <>
        <style>
          {`
          .theme-container.theme-transitioning * {
            transition: background-color 300ms, color 300ms, border-color 300ms, fill 300ms, stroke 300ms;
          }
        `}
        </style>
        <div
          style={styles()}
          class="theme-container h-full w-full"
          classList={{
            [theme()]: true,
            "theme-transitioning": isTransitioning(),
          }}
        >
          {props.children}
        </div>
      </>
    </TelescopeContext.Provider>
  );
}

export default TelescopeContext;
