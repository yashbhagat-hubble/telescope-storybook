import { JSX, createSignal, For } from 'solid-js';

export type SegmentedControlType = 'icon-label' | 'icon-only' | 'label-only';

export type SegmentItem = {
  id: string;
  label?: string;
  icon?: () => JSX.Element;
};

export type SegmentedControlProps = {
  items: SegmentItem[];
  activeItem: string;
  onItemChange: (itemId: string) => void;
  type?: SegmentedControlType;
  size?: 'small' | 'medium';
  expanded?: boolean;
};

const getItemStyles = (
  segmentType: SegmentedControlType,
  isActive: boolean,
  isHovered: boolean,
  size: 'small' | 'medium' = 'medium'
) => {
  const sizeStyles = {
    small: {
      container: 'h-7 px-2 gap-1.5',
      icon: 'size-4',
      text: 'text-title-6-medium',
    },
    medium: {
      container: 'h-8 px-3 gap-2',
      icon: 'size-5',
      text: 'text-para-3-medium',
    },
  };

  const currentSize = sizeStyles[size];

  return {
    container: `flex items-center w-full justify-center ${currentSize.container} rounded-md transition-all duration-200 cursor-pointer select-none ${isActive
      ? 'bg-background-normal-primary shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]'
      : 'bg-transparent'
      }`,
    text: `${currentSize.text} ${isActive
      ? 'text-text-normal-primary'
      : isHovered
        ? 'text-text-normal-primary'
        : 'text-text-normal-secondary'
      }`,
    icon: `inline-flex items-center justify-center ${currentSize.icon} ${isActive
      ? 'text-text-normal-primary'
      : isHovered
        ? 'text-text-normal-primary'
        : 'text-text-normal-secondary'
      }`,
  };
};

const getSegmentContent = (
  item: SegmentItem,
  segmentType: SegmentedControlType,
  styles: ReturnType<typeof getItemStyles>
) => {
  switch (segmentType) {
    case 'icon-only':
      return item.icon && <span class={styles.icon}>{item.icon()}</span>;

    case 'label-only':
      return <span class={styles.text}>{item.label}</span>;

    case 'icon-label':
    default:
      return (
        <div class="flex items-center gap-[6px]">
          {item.icon && <span class={styles.icon}>{item.icon()}</span>}
          {item.label && <span class={styles.text}>{item.label}</span>}
        </div>
      );
  }
};

export default function SegmentedControl(props: SegmentedControlProps) {
  const [hoveredItem, setHoveredItem] = createSignal<string | null>(null);

  return (
    <div
      class={`bg-stroke-1-alpha p-1 rounded-lg flex items-center gap-1  ${props.expanded ? 'w-full' : 'w-fit'}`}
    >
      <For each={props.items}>
        {(item) => {
          const isActive = () => props.activeItem === item.id;
          const isHovered = () => hoveredItem() === item.id;
          const styles = () =>
            getItemStyles(
              props.type || 'icon-label',
              isActive(),
              isHovered(),
              props.size
            );

          return (
            <button
              class={styles().container}
              onClick={() => props.onItemChange(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {getSegmentContent(item, props.type || 'icon-label', styles())}
            </button>
          );
        }}
      </For>
    </div>
  );
}

// Individual Segment component for standalone use
export type SingleSegmentProps = {
  label?: string;
  icon?: () => JSX.Element;
  type?: SegmentedControlType;
  isActive?: boolean;
  size?: 'small' | 'medium';
  onClick?: () => void;
};

export function Segment(props: SingleSegmentProps) {
  const [isHovered, setIsHovered] = createSignal(false);

  const styles = () =>
    getItemStyles(
      props.type || 'icon-label',
      props.isActive || false,
      isHovered(),
      props.size
    );

  const item: SegmentItem = {
    id: 'single',
    label: props.label,
    icon: props.icon,
  };

  return (
    <button
      class={styles().container}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getSegmentContent(item, props.type || 'icon-label', styles())}
    </button>
  );
}
