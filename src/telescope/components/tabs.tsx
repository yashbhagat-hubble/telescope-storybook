import { JSX, createSignal, For } from "solid-js";

export type TabType = "underline" | "chip" | "pill";

export type TabItem = {
  id: string;
  label: string;
  leadIcon?: () => JSX.Element;
  badge?: number | string;
};

export type TabsProps = {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  type: TabType;
};

const getTabStyles = (type: TabType, isActive: boolean, isHovered: boolean) => {
  const baseStyles = {
    container: "",
    text: "",
    icon: "text-text-normal-secondary",
    underline: "",
  };

  switch (type) {
    case "underline":
      return {
        container: `px-0 py-3 flex items-center justify-center gap-2 transition-colors duration-200 ${
          isActive ? "border-b border-stroke-solid" : isHovered ? "" : ""
        }`,
        text: `text-para-3-medium ${
          isActive || isHovered
            ? "text-text-normal-primary"
            : "text-text-normal-secondary"
        }`,
        icon: isActive || isHovered ? "text-text-normal-primary" : "text-text-normal-secondary",
        underline: "",
      };

    case "chip":
      return {
        container: `px-3 py-2 flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-background-inverted-primary border border-stroke-solid"
            : isHovered
              ? "bg-stroke-1-alpha"
              : "bg-background-normal-primary border border-stroke-2"
        }`,
        text: `text-para-3-medium ${
          isActive
            ? "text-text-inverted-primary"
            : isHovered || !isActive
              ? "text-text-normal-primary"
              : "text-text-normal-secondary"
        }`,
        icon: isActive ? "text-text-inverted-primary" : "text-text-normal-primary",
        underline: "",
      };

    case "pill":
      return {
        container: `px-4 py-2 flex items-center justify-center gap-2 rounded-full transition-all duration-200 ${
          isActive
            ? "bg-background-inverted-primary border border-stroke-solid"
            : isHovered
              ? "bg-stroke-1-alpha"
              : "bg-background-normal-primary border border-stroke-2"
        }`,
        text: `text-para-3-medium ${
          isActive
            ? "text-text-inverted-primary"
            : isHovered || !isActive
              ? "text-text-normal-primary"
              : "text-text-normal-secondary"
        }`,
        icon: isActive ? "text-text-inverted-primary" : "text-text-normal-primary",
        underline: "",
      };

    default:
      return baseStyles;
  }
};

const getBadgeStyles = (type: TabType, isActive: boolean) => {
  if (isActive) {
    return "bg-info-light text-info-dark text-label-medium px-2 h-5 rounded-md flex items-center justify-center";
  }
  return "bg-background-normal-primary border border-stroke-1 text-faded-base text-label-medium px-2 h-5 rounded-md flex items-center justify-center";
};

export default function Tabs(props: TabsProps) {
  const [hoveredTab, setHoveredTab] = createSignal<string | null>(null);

  return (
    <div class="flex items-center gap-1">
      <For each={props.items}>
        {(item) => {
          const isActive = () => props.activeTab === item.id;
          const isHovered = hoveredTab() === item.id;
          const styles = () => getTabStyles(props.type, isActive(), isHovered);
          const badgeStyles = () => getBadgeStyles(props.type, isActive());

          return (
            <button
              class={`cursor-pointer select-none ${styles().container}`}
              onClick={() => props.onTabChange(item.id)}
              onMouseEnter={() => setHoveredTab(item.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {item.leadIcon && (
                <span class={`inline-flex items-center justify-center ${styles().icon}`}>
                  {item.leadIcon()}
                </span>
              )}

              <span class={styles().text}>{item.label}</span>

              {item.badge && <span class={badgeStyles()}>{item.badge}</span>}
            </button>
          );
        }}
      </For>
    </div>
  );
}
