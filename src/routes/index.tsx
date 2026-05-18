import { createSignal, For, Show } from "solid-js";
import { useTelescopeContext, TelescopeProvider } from "~/telescope";
import { PhosphorIcon } from "~/widgets/icons";

// ─── Demo icon helpers (Phosphor) ────────────────────────────────────────────

const IconSearch = () => <PhosphorIcon name="magnifying-glass" fontSize={16} />;
const IconStar = () => <PhosphorIcon name="star" fontSize={16} />;
const IconChevron = () => <PhosphorIcon name="caret-right" fontSize={16} />;
const IconHome = () => <PhosphorIcon name="house" fontSize={16} />;
const IconUser = () => <PhosphorIcon name="user" fontSize={16} />;
const IconBell = () => <PhosphorIcon name="bell" fontSize={16} />;

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section(props: { id: string; title: string; children: any }) {
  return (
    <section id={props.id} class="scroll-mt-6 space-y-4">
      <div class="border-b border-stroke-2 pb-3">
        <h2 class="text-title-3-semi-bold text-text-normal-primary">{props.title}</h2>
      </div>
      {props.children}
    </section>
  );
}

function Card(props: { title?: string; dark?: boolean; children: any }) {
  return (
    <div
      class="rounded-2xl p-5 space-y-4"
      classList={{
        "bg-background-normal-secondary": !props.dark,
        "bg-background-inverted-primary": props.dark,
      }}
    >
      <Show when={props.title}>
        <p class="text-label-semi-bold text-text-normal-tertiary uppercase tracking-wide">
          {props.title}
        </p>
      </Show>
      {props.children}
    </div>
  );
}

function Row(props: { label?: string; children: any; wrap?: boolean }) {
  return (
    <div class="space-y-2">
      <Show when={props.label}>
        <p class="text-label-medium text-text-normal-secondary">{props.label}</p>
      </Show>
      <div
        class="flex items-center gap-3"
        classList={{ "flex-wrap": props.wrap }}
      >
        {props.children}
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function TypographySection() {
  const styles = [
    { cls: "text-title-1-bold", label: "title-1-bold", sample: "Display Heading" },
    { cls: "text-title-2-semi-bold", label: "title-2-semi-bold", sample: "Section Title" },
    { cls: "text-title-3-semi-bold", label: "title-3-semi-bold", sample: "Page Header" },
    { cls: "text-title-4-semi-bold", label: "title-4-semi-bold", sample: "Card Title" },
    { cls: "text-title-5-semi-bold", label: "title-5-semi-bold", sample: "Sub-title" },
    { cls: "text-title-6-semi-bold", label: "title-6-semi-bold", sample: "Small Title" },
    { cls: "text-title-6-medium", label: "title-6-medium", sample: "Small Medium" },
    { cls: "text-para-1-regular", label: "para-1-regular", sample: "Body text — paragraph 1 regular for main content." },
    { cls: "text-para-2-regular", label: "para-2-regular", sample: "Body text — paragraph 2 regular for descriptions." },
    { cls: "text-para-3-regular", label: "para-3-regular", sample: "Body text — paragraph 3 regular for secondary content." },
    { cls: "text-para-3-medium", label: "para-3-medium", sample: "Body text — paragraph 3 medium weight." },
    { cls: "text-para-3-bold", label: "para-3-bold", sample: "Body text — paragraph 3 bold weight." },
    { cls: "text-label-regular", label: "label-regular", sample: "Label regular — tags, badges" },
    { cls: "text-label-medium", label: "label-medium", sample: "Label medium — emphasized tags" },
    { cls: "text-label-semi-bold", label: "label-semi-bold", sample: "Label semi-bold — section labels" },
    { cls: "text-caption-regular", label: "caption-regular", sample: "Caption — small helper text" },
    { cls: "text-caption-semi-bold", label: "caption-semi-bold", sample: "CAPTION SEMI-BOLD" },
  ];

  return (
    <Section id="typography" title="Typography">
      <Card>
        <div class="divide-y divide-stroke-1">
          <For each={styles}>
            {(s) => (
              <div class="flex items-baseline justify-between gap-6 py-4 first:pt-0 last:pb-0">
                <span class={`${s.cls} text-text-normal-primary flex-1`}>{s.sample}</span>
                <code class="text-caption-regular text-text-normal-tertiary font-mono shrink-0">
                  .{s.label}
                </code>
              </div>
            )}
          </For>
        </div>
      </Card>
    </Section>
  );
}

function ColorSection() {
  const groups = [
    {
      name: "Static",
      tokens: [
        { bg: "bg-static-white", label: "static-white", border: true },
        { bg: "bg-static-black", label: "static-black" },
      ],
    },
    {
      name: "Text",
      tokens: [
        { bg: "bg-text-normal-primary", label: "text-normal-primary" },
        { bg: "bg-text-normal-secondary", label: "text-normal-secondary" },
        { bg: "bg-text-normal-tertiary", label: "text-normal-tertiary" },
        { bg: "bg-text-inverted-primary", label: "text-inverted-primary" },
        { bg: "bg-text-inverted-secondary", label: "text-inverted-secondary" },
        { bg: "bg-text-inverted-tertiary", label: "text-inverted-tertiary" },
      ],
    },
    {
      name: "Background",
      tokens: [
        { bg: "bg-background-normal-primary", label: "background-normal-primary", border: true },
        { bg: "bg-background-normal-secondary", label: "background-normal-secondary" },
        { bg: "bg-background-normal-tertiary", label: "background-normal-tertiary" },
        { bg: "bg-background-inverted-primary", label: "background-inverted-primary" },
        { bg: "bg-background-inverted-secondary", label: "background-inverted-secondary" },
        { bg: "bg-background-inverted-tertiary", label: "background-inverted-tertiary" },
        { bg: "bg-background-mapping-elevation-1", label: "background-mapping-elevation-1", border: true },
        { bg: "bg-background-mapping-elevation-2", label: "background-mapping-elevation-2", border: true },
        { bg: "bg-background-mapping-reverse", label: "background-mapping-reverse", border: true },
      ],
    },
    {
      name: "Stroke",
      tokens: [
        { bg: "bg-stroke-solid", label: "stroke-solid" },
        { bg: "bg-stroke-1", label: "stroke-1" },
        { bg: "bg-stroke-2", label: "stroke-2" },
        { bg: "bg-stroke-3", label: "stroke-3" },
        { bg: "bg-stroke-solid-inverted", label: "stroke-solid-inverted" },
        { bg: "bg-stroke-1-alpha", label: "stroke-1-alpha" },
        { bg: "bg-stroke-2-alpha", label: "stroke-2-alpha" },
        { bg: "bg-stroke-3-alpha", label: "stroke-3-alpha" },
      ],
    },
    {
      name: "Feature (Brand)",
      tokens: [
        { bg: "bg-feature-lighter", label: "feature-lighter" },
        { bg: "bg-feature-light", label: "feature-light" },
        { bg: "bg-feature-base", label: "feature-base" },
        { bg: "bg-feature-dark", label: "feature-dark" },
      ],
    },
    {
      name: "Brand TBD",
      tokens: [
        { bg: "bg-brand-tbd-lighter", label: "brand-tbd-lighter" },
        { bg: "bg-brand-tbd-light", label: "brand-tbd-light" },
        { bg: "bg-brand-tbd-base", label: "brand-tbd-base" },
        { bg: "bg-brand-tbd-dark", label: "brand-tbd-dark" },
        { bg: "bg-brand-button-primary-text", label: "brand-button-primary-text" },
      ],
    },
    {
      name: "Faded",
      tokens: [
        { bg: "bg-faded-lighter", label: "faded-lighter" },
        { bg: "bg-faded-light", label: "faded-light" },
        { bg: "bg-faded-base", label: "faded-base" },
        { bg: "bg-faded-dark", label: "faded-dark" },
      ],
    },
    {
      name: "Error",
      tokens: [
        { bg: "bg-error-lighter", label: "error-lighter" },
        { bg: "bg-error-light", label: "error-light" },
        { bg: "bg-error-base", label: "error-base" },
        { bg: "bg-error-dark", label: "error-dark" },
      ],
    },
    {
      name: "Success",
      tokens: [
        { bg: "bg-success-lighter", label: "success-lighter" },
        { bg: "bg-success-light", label: "success-light" },
        { bg: "bg-success-base", label: "success-base" },
        { bg: "bg-success-dark", label: "success-dark" },
      ],
    },
    {
      name: "Warning",
      tokens: [
        { bg: "bg-warning-lighter", label: "warning-lighter" },
        { bg: "bg-warning-light", label: "warning-light" },
        { bg: "bg-warning-base", label: "warning-base" },
        { bg: "bg-warning-dark", label: "warning-dark" },
      ],
    },
    {
      name: "Info",
      tokens: [
        { bg: "bg-info-lighter", label: "info-lighter" },
        { bg: "bg-info-light", label: "info-light" },
        { bg: "bg-info-base", label: "info-base" },
        { bg: "bg-info-dark", label: "info-dark" },
      ],
    },
    {
      name: "Away",
      tokens: [
        { bg: "bg-away-lighter", label: "away-lighter" },
        { bg: "bg-away-light", label: "away-light" },
        { bg: "bg-away-base", label: "away-base" },
        { bg: "bg-away-dark", label: "away-dark" },
      ],
    },
    {
      name: "Verified",
      tokens: [
        { bg: "bg-verified-lighter", label: "verified-lighter" },
        { bg: "bg-verified-light", label: "verified-light" },
        { bg: "bg-verified-base", label: "verified-base" },
        { bg: "bg-verified-dark", label: "verified-dark" },
      ],
    },
    {
      name: "Highlighted",
      tokens: [
        { bg: "bg-highlighted-lighter", label: "highlighted-lighter" },
        { bg: "bg-highlighted-light", label: "highlighted-light" },
        { bg: "bg-highlighted-base", label: "highlighted-base" },
        { bg: "bg-highlighted-dark", label: "highlighted-dark" },
      ],
    },
    {
      name: "Stable",
      tokens: [
        { bg: "bg-stable-lighter", label: "stable-lighter" },
        { bg: "bg-stable-light", label: "stable-light" },
        { bg: "bg-stable-base", label: "stable-base" },
        { bg: "bg-stable-dark", label: "stable-dark" },
      ],
    },
  ];

  return (
    <Section id="colors" title="Color Tokens">
      <div class="grid gap-4 sm:grid-cols-2">
        <For each={groups}>
          {(group) => (
            <Card title={group.name}>
              <div class="space-y-2">
                <For each={group.tokens}>
                  {(token) => (
                    <div class="flex items-center gap-3">
                      <div
                        class={`h-9 w-9 shrink-0 rounded-lg ${token.bg}`}
                        classList={{ "border border-stroke-2": token.border }}
                      />
                      <code class="text-label-regular text-text-normal-secondary font-mono">
                        {token.label}
                      </code>
                    </div>
                  )}
                </For>
              </div>
            </Card>
          )}
        </For>
      </div>
    </Section>
  );
}

function ButtonSection() {
  const { components } = useTelescopeContext();
  const [loading, setLoading] = createSignal(false);
  const noop = () => {};

  const variants = ["primary", "secondary", "tertiary", "quaternary"] as const;
  const styles = ["brand", "neutral", "error"] as const;
  const sizes = [48, 44, 40, 36, 32, 28] as const;

  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Section id="buttons" title="Button">
      {/* Variant × Style matrix */}
      <Card title="Variant × Style">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[480px]">
            <thead>
              <tr>
                <th class="text-label-medium text-text-normal-tertiary pb-3 text-left w-28">Variant</th>
                <For each={styles}>
                  {(s) => (
                    <th class="text-label-medium text-text-normal-tertiary pb-3 text-center capitalize">{s}</th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody class="divide-y divide-stroke-1">
              <For each={variants}>
                {(variant) => (
                  <tr>
                    <td class="text-label-medium text-text-normal-secondary py-3 capitalize">{variant}</td>
                    <For each={styles}>
                      {(style) => (
                        <td class="py-3 text-center">
                          <div class="flex justify-center">
                            <components.Button
                              text="Label"
                              variant={variant}
                              style={style}
                              size={36}
                              onClick={noop}
                            />
                          </div>
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Sizes */}
      <Card title="Sizes — primary / brand">
        <div class="flex flex-wrap items-end gap-4">
          <For each={sizes}>
            {(size) => (
              <div class="flex flex-col items-center gap-2">
                <components.Button text="Label" variant="primary" style="brand" size={size} onClick={noop} />
                <code class="text-caption-regular text-text-normal-tertiary">{size}</code>
              </div>
            )}
          </For>
        </div>
      </Card>

      {/* States */}
      <Card title="States">
        <Row label="Default">
          <components.Button text="Primary" variant="primary" style="brand" size={40} onClick={noop} />
          <components.Button text="Secondary" variant="secondary" style="brand" size={40} onClick={noop} />
          <components.Button text="Tertiary" variant="tertiary" style="brand" size={40} onClick={noop} />
          <components.Button text="Quaternary" variant="quaternary" style="brand" size={40} onClick={noop} />
        </Row>
        <Row label="Disabled">
          <components.Button text="Primary" variant="primary" style="brand" size={40} disabled onClick={noop} />
          <components.Button text="Secondary" variant="secondary" style="brand" size={40} disabled onClick={noop} />
          <components.Button text="Tertiary" variant="tertiary" style="brand" size={40} disabled onClick={noop} />
        </Row>
        <Row label="Loading (click to trigger)">
          <components.Button text="Click me" variant="primary" style="brand" size={40} loading={loading()} onClick={triggerLoading} />
          <components.Button text="Click me" variant="secondary" style="brand" size={40} loading={loading()} onClick={triggerLoading} />
        </Row>
        <Row label="With icons">
          <components.Button text="Lead icon" variant="primary" style="brand" size={40} LeadIcon={IconSearch} onClick={noop} />
          <components.Button text="Trail icon" variant="secondary" style="brand" size={40} TrailIcon={IconChevron} onClick={noop} />
          <components.Button text="Both" variant="tertiary" style="brand" size={40} LeadIcon={IconStar} TrailIcon={IconChevron} onClick={noop} />
        </Row>
        <Row label="Expanded (full width)">
          <div class="w-full">
            <components.Button text="Full Width Button" variant="primary" style="brand" size={48} expanded onClick={noop} />
          </div>
        </Row>
      </Card>

      {/* Error style */}
      <Card title="Error style">
        <Row wrap>
          <components.Button text="Primary error" variant="primary" style="error" size={40} onClick={noop} />
          <components.Button text="Secondary error" variant="secondary" style="error" size={40} onClick={noop} />
          <components.Button text="Tertiary error" variant="tertiary" style="error" size={40} onClick={noop} />
          <components.Button text="Quaternary error" variant="quaternary" style="error" size={40} onClick={noop} />
        </Row>
      </Card>

      {/* Neutral style */}
      <Card title="Neutral style">
        <Row wrap>
          <components.Button text="Primary neutral" variant="primary" style="neutral" size={40} onClick={noop} />
          <components.Button text="Secondary neutral" variant="secondary" style="neutral" size={40} onClick={noop} />
          <components.Button text="Tertiary neutral" variant="tertiary" style="neutral" size={40} onClick={noop} />
        </Row>
      </Card>
    </Section>
  );
}

function LinkButtonSection() {
  const { components } = useTelescopeContext();
  const types = ["primary", "secondary", "link", "error", "white"] as const;
  const sizes = [20, 16] as const;
  const noop = () => {};

  return (
    <Section id="linkbutton" title="LinkButton">
      <Card title="Types × Sizes">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[400px]">
            <thead>
              <tr>
                <th class="text-label-medium text-text-normal-tertiary pb-3 text-left w-28">Type</th>
                <For each={sizes}>
                  {(s) => (
                    <th class="text-label-medium text-text-normal-tertiary pb-3 text-center">Size {s}</th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody class="divide-y divide-stroke-1">
              <For each={types}>
                {(type) => (
                  <tr classList={{ "bg-background-inverted-primary rounded-xl": type === "white" }}>
                    <td class="text-label-medium text-text-normal-secondary py-3 capitalize">{type}</td>
                    <For each={sizes}>
                      {(size) => (
                        <td class="py-3 text-center">
                          <components.LinkButton text="Click here" type={type} size={size} onClick={noop} />
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="With Underline">
        <Row wrap>
          <components.LinkButton text="Primary underline" type="primary" size={20} underline onClick={noop} />
          <components.LinkButton text="Link underline" type="link" size={20} underline onClick={noop} />
          <components.LinkButton text="Error underline" type="error" size={20} underline onClick={noop} />
        </Row>
      </Card>

      <Card title="With Icons">
        <Row wrap>
          <components.LinkButton text="Lead icon" type="link" size={20} leadIcon={<IconSearch />} onClick={noop} />
          <components.LinkButton text="Tail icon" type="primary" size={20} tailIcon={<IconChevron />} onClick={noop} />
        </Row>
      </Card>

      <Card title="Disabled">
        <Row wrap>
          <components.LinkButton text="Disabled link" type="link" size={20} disabled onClick={noop} />
          <components.LinkButton text="Disabled primary" type="primary" size={20} disabled onClick={noop} />
        </Row>
      </Card>
    </Section>
  );
}

function InputSection() {
  const { components } = useTelescopeContext();
  const [val1, setVal1] = createSignal("");
  const [val2, setVal2] = createSignal("Prefilled value");
  const [val3, setVal3] = createSignal("");
  const [val4, setVal4] = createSignal("");
  const [val5, setVal5] = createSignal("");
  const sizes = [44, 40, 36, 32] as const;

  return (
    <Section id="input" title="Input">
      <Card title="States">
        <div class="space-y-4 max-w-sm">
          <components.Input value={val1()} onChange={setVal1} size={40} placeholder="Default state" state="default" label="Default" />
          <components.Input value={val2()} onChange={setVal2} size={40} placeholder="Enter value" state="default" label="With value" />
          <components.Input value={val3()} onChange={setVal3} size={40} placeholder="Error state" state="error" label="Error" helperText="This field has an error" />
          <components.Input value="" onChange={() => {}} size={40} placeholder="Disabled" state="disabled" label="Disabled" />
        </div>
      </Card>

      <Card title="Sizes">
        <div class="space-y-4 max-w-sm">
          <For each={sizes}>
            {(size) => (
              <components.Input
                value={val4()}
                onChange={setVal4}
                size={size}
                placeholder={`Size ${size}`}
                state="default"
                label={`Size ${size}`}
              />
            )}
          </For>
        </div>
      </Card>

      <Card title="With Icons & Extras">
        <div class="space-y-4 max-w-sm">
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="Search..."
            state="default"
            label="Lead icon"
            leadIcon={IconSearch}
          />
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="Enter amount"
            state="default"
            label="Trail icon"
            trailIcon={IconChevron}
          />
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="Max 100 chars"
            state="default"
            label="Character limit"
            characterLimit={100}
          />
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="Required field"
            state="default"
            label="Required"
            required
          />
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="With link button"
            state="default"
            label="Link button"
            linkButtonText="Forgot?"
            linkButtonOnClick={() => {}}
          />
          <components.Input
            value={val5()}
            onChange={setVal5}
            size={40}
            placeholder="With info tooltip"
            state="default"
            label="Info tooltip"
            infoText={"This is helpful\ninformation"}
          />
        </div>
      </Card>
    </Section>
  );
}

function CheckboxSection() {
  const { components } = useTelescopeContext();
  const [c1, setC1] = createSignal(false);
  const [c2, setC2] = createSignal(true);
  const [c3, setC3] = createSignal(false);
  const [c4, setC4] = createSignal(false);

  return (
    <Section id="checkbox" title="Checkbox">
      <Card title="Interactive">
        <div class="space-y-3">
          <components.Checkbox checked={c1()} onChange={setC1} label="Unchecked (click me)" size="large" />
          <components.Checkbox checked={c2()} onChange={setC2} label="Checked (click me)" size="large" />
          <components.Checkbox checked={c3()} onChange={setC3} indeterminate label="Indeterminate" size="large" />
          <components.Checkbox checked={c4()} onChange={setC4} label="Small size" size="small" />
        </div>
      </Card>

      <Card title="States">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Unchecked</p>
            <components.Checkbox checked={false} onChange={() => {}} size="large" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Checked</p>
            <components.Checkbox checked={true} onChange={() => {}} size="large" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Indeterminate</p>
            <components.Checkbox checked={false} indeterminate onChange={() => {}} size="large" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Disabled</p>
            <components.Checkbox checked={false} disabled onChange={() => {}} size="large" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Disabled checked</p>
            <components.Checkbox checked={true} disabled onChange={() => {}} size="large" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Small unchecked</p>
            <components.Checkbox checked={false} onChange={() => {}} size="small" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Small checked</p>
            <components.Checkbox checked={true} onChange={() => {}} size="small" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Small disabled</p>
            <components.Checkbox checked={false} disabled onChange={() => {}} size="small" />
          </div>
        </div>
      </Card>
    </Section>
  );
}

function ToggleSection() {
  const { components } = useTelescopeContext();
  const [t1, setT1] = createSignal(false);
  const [t2, setT2] = createSignal(true);
  const [t3, setT3] = createSignal(false);
  const [t4, setT4] = createSignal(true);

  return (
    <Section id="toggle" title="Toggle">
      <Card title="Interactive">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-para-3-regular text-text-normal-primary">Size 24 — {t1() ? "On" : "Off"}</span>
            <components.Toggle size="24" checked={t1()} onChange={setT1} />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-para-3-regular text-text-normal-primary">Size 24 checked — {t2() ? "On" : "Off"}</span>
            <components.Toggle size="24" checked={t2()} onChange={setT2} />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-para-3-regular text-text-normal-primary">Size 20 — {t3() ? "On" : "Off"}</span>
            <components.Toggle size="20" checked={t3()} onChange={setT3} />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-para-3-regular text-text-normal-primary">Size 20 checked — {t4() ? "On" : "Off"}</span>
            <components.Toggle size="20" checked={t4()} onChange={setT4} />
          </div>
        </div>
      </Card>

      <Card title="States">
        <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Off (24)</p>
            <components.Toggle size="24" checked={false} onChange={() => {}} />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">On (24)</p>
            <components.Toggle size="24" checked={true} onChange={() => {}} />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Off (20)</p>
            <components.Toggle size="20" checked={false} onChange={() => {}} />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">On (20)</p>
            <components.Toggle size="20" checked={true} onChange={() => {}} />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Disabled off</p>
            <components.Toggle size="24" checked={false} disabled onChange={() => {}} />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">Disabled on</p>
            <components.Toggle size="24" checked={true} disabled onChange={() => {}} />
          </div>
        </div>
      </Card>
    </Section>
  );
}

function LoaderSection() {
  const { components } = useTelescopeContext();
  const sizes = ["small", "medium", "large"] as const;
  const variants = ["primary", "secondary", "brand", "white", "black"] as const;

  return (
    <Section id="loader" title="Loader (Dots)">
      <Card title="Size × Variant">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[400px]">
            <thead>
              <tr>
                <th class="text-label-medium text-text-normal-tertiary pb-3 text-left w-24">Size</th>
                <For each={variants}>
                  {(v) => (
                    <th class="text-label-medium text-text-normal-tertiary pb-3 text-center capitalize">{v}</th>
                  )}
                </For>
              </tr>
            </thead>
            <tbody class="divide-y divide-stroke-1">
              <For each={sizes}>
                {(size) => (
                  <tr>
                    <td class="text-label-medium text-text-normal-secondary py-4 capitalize">{size}</td>
                    <For each={variants}>
                      {(variant) => (
                        <td
                          class="py-4 text-center"
                          classList={{ "bg-background-inverted-primary rounded": variant === "white" }}
                        >
                          <div class="flex justify-center">
                            <components.Loader size={size} variant={variant} />
                          </div>
                        </td>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
}

function CircularLoaderSection() {
  const { components } = useTelescopeContext();
  const variants = ["primary", "secondary", "brand"] as const;

  return (
    <Section id="circularloader" title="CircularLoader">
      <Card title="Variants & Sizes">
        <div class="flex flex-wrap gap-8">
          <For each={variants}>
            {(variant) => (
              <div class="space-y-4">
                <p class="text-label-medium text-text-normal-secondary capitalize">{variant}</p>
                <div class="flex items-center gap-4">
                  <components.CircularLoader variant={variant} size={16} borderSize={2} />
                  <components.CircularLoader variant={variant} size={24} borderSize={3} />
                  <components.CircularLoader variant={variant} size={36} borderSize={4} />
                  <components.CircularLoader variant={variant} size={48} borderSize={4} />
                </div>
                <div class="flex items-center gap-4">
                  <code class="text-caption-regular text-text-normal-tertiary">16</code>
                  <code class="text-caption-regular text-text-normal-tertiary ml-2">24</code>
                  <code class="text-caption-regular text-text-normal-tertiary ml-3">36</code>
                  <code class="text-caption-regular text-text-normal-tertiary ml-5">48</code>
                </div>
              </div>
            )}
          </For>
        </div>
      </Card>
    </Section>
  );
}

function TabsSection() {
  const { components } = useTelescopeContext();
  const [underlineTab, setUnderlineTab] = createSignal("home");
  const [chipTab, setChipTab] = createSignal("home");
  const [pillTab, setPillTab] = createSignal("home");

  const tabItems = [
    { id: "home", label: "Home", leadIcon: IconHome, badge: 3 },
    { id: "search", label: "Search", leadIcon: IconSearch },
    { id: "profile", label: "Profile", leadIcon: IconUser, badge: "New" },
    { id: "alerts", label: "Alerts", leadIcon: IconBell },
  ];

  return (
    <Section id="tabs" title="Tabs">
      <Card title="Underline">
        <components.Tab
          items={tabItems}
          activeTab={underlineTab()}
          onTabChange={setUnderlineTab}
          type="underline"
        />
        <p class="text-label-regular text-text-normal-tertiary">Active: {underlineTab()}</p>
      </Card>

      <Card title="Chip">
        <div class="flex flex-wrap gap-2">
          <components.Tab
            items={tabItems}
            activeTab={chipTab()}
            onTabChange={setChipTab}
            type="chip"
          />
        </div>
        <p class="text-label-regular text-text-normal-tertiary">Active: {chipTab()}</p>
      </Card>

      <Card title="Pill">
        <div class="flex flex-wrap gap-2">
          <components.Tab
            items={tabItems}
            activeTab={pillTab()}
            onTabChange={setPillTab}
            type="pill"
          />
        </div>
        <p class="text-label-regular text-text-normal-tertiary">Active: {pillTab()}</p>
      </Card>
    </Section>
  );
}

function SegmentedControlSection() {
  const { components } = useTelescopeContext();
  const [active1, setActive1] = createSignal("home");
  const [active2, setActive2] = createSignal("search");
  const [active3, setActive3] = createSignal("home");
  const [active4, setActive4] = createSignal("home");
  const [active5, setActive5] = createSignal("home");

  const items = [
    { id: "home", label: "Home", icon: IconHome },
    { id: "search", label: "Search", icon: IconSearch },
    { id: "profile", label: "Profile", icon: IconUser },
  ];

  return (
    <Section id="segmented" title="SegmentedControl">
      <Card title="Types — medium size">
        <div class="space-y-4">
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">icon-label</p>
            <components.SegmentedControl items={items} activeItem={active1()} onItemChange={setActive1} type="icon-label" size="medium" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">icon-only</p>
            <components.SegmentedControl items={items} activeItem={active2()} onItemChange={setActive2} type="icon-only" size="medium" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">label-only</p>
            <components.SegmentedControl items={items} activeItem={active3()} onItemChange={setActive3} type="label-only" size="medium" />
          </div>
        </div>
      </Card>

      <Card title="Small size">
        <div class="space-y-4">
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">icon-label small</p>
            <components.SegmentedControl items={items} activeItem={active4()} onItemChange={setActive4} type="icon-label" size="small" />
          </div>
          <div class="space-y-2">
            <p class="text-label-medium text-text-normal-secondary">label-only small</p>
            <components.SegmentedControl items={items} activeItem={active5()} onItemChange={setActive5} type="label-only" size="small" />
          </div>
        </div>
      </Card>

      <Card title="Expanded">
        <components.SegmentedControl items={items} activeItem={active1()} onItemChange={setActive1} type="icon-label" size="medium" expanded />
      </Card>
    </Section>
  );
}

function OtpSection() {
  const { components } = useTelescopeContext();
  const [otp, setOtp] = createSignal("");
  const [otpError, setOtpError] = createSignal("");
  const [isError, setIsError] = createSignal(false);

  const triggerError = () => {
    setIsError(true);
    setOtpError(otp());
    setTimeout(() => setIsError(false), 2000);
  };

  return (
    <Section id="otp" title="OtpInput">
      <Card title="Default (6 digits)">
        <div class="space-y-4 max-w-sm">
          <components.OtpInput otp={otp} setOtp={setOtp} isError={false} removeFocus={false} />
          <p class="text-label-regular text-text-normal-secondary">Value: "{otp()}"</p>
        </div>
      </Card>

      <Card title="Error state">
        <div class="space-y-4 max-w-sm">
          <components.OtpInput otp={otpError} setOtp={setOtpError} isError={isError()} removeFocus={false} />
          <div>
            <button
              class="text-label-medium text-error-base underline"
              onClick={triggerError}
            >
              Trigger error for 2s
            </button>
          </div>
        </div>
      </Card>

      <Card title="4-digit variant">
        <div class="space-y-4 max-w-xs">
          <components.OtpInput otp={otp} setOtp={setOtp} isError={false} removeFocus={false} length={4} />
        </div>
      </Card>
    </Section>
  );
}

function ModalHeaderSection() {
  const { components } = useTelescopeContext();

  return (
    <Section id="modalheader" title="ModalHeaderV2">
      <Card title="Medium — title only">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2 title="Payment Details" size="medium" />
        </div>
      </Card>

      <Card title="Medium — with description">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2
            title="Confirm Payment"
            description="Review your order before completing the purchase."
            size="medium"
          />
        </div>
      </Card>

      <Card title="Medium — with icon">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2
            title="Redeem Code"
            description="Enter your promo code to get a discount."
            icon={() => <IconStar />}
            size="medium"
          />
        </div>
      </Card>

      <Card title="Medium — with back button">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2
            title="OTP Verification"
            description="Enter the code sent to +91 98765 43210"
            size="medium"
            onBack={() => {}}
          />
        </div>
      </Card>

      <Card title="Large — title only">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2 title="Choose Amount" size="large" />
        </div>
      </Card>

      <Card title="Large — with icon & description">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalHeaderV2
            title="Payment Failed"
            description="We couldn't process your payment. Please try again or use a different method."
            icon={() => <IconBell />}
            iconClass="bg-error-lighter"
            size="large"
          />
        </div>
      </Card>
    </Section>
  );
}

function ModalFooterSection() {
  const { components } = useTelescopeContext();
  const noop = () => {};

  return (
    <Section id="modalfooter" title="ModalFooter">
      <Card title="Single button">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalFooter
            button={{ text: "Continue", variant: "primary", style: "brand", size: 48, onClick: noop }}
          />
        </div>
      </Card>

      <Card title="Single button — with top stroke">
        <div class="border border-stroke-2 rounded-xl overflow-hidden bg-background-normal-secondary pt-4">
          <components.ModalFooter
            topStroke
            button={{ text: "Confirm", variant: "primary", style: "brand", size: 48, onClick: noop }}
          />
        </div>
      </Card>

      <Card title="Two buttons">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalFooter
            leftButton={{ text: "Cancel", variant: "secondary", style: "neutral", size: 40, onClick: noop }}
            rightButton={{ text: "Confirm", variant: "primary", style: "brand", size: 40, onClick: noop }}
          />
        </div>
      </Card>

      <Card title="Three buttons (link + 2 buttons)">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalFooter
            leftButton={{ text: "Skip", type: "secondary", size: 20, onClick: noop }}
            middleButton={{ text: "Later", variant: "secondary", style: "neutral", size: 40, onClick: noop }}
            rightButton={{ text: "Pay now", variant: "primary", style: "brand", size: 40, onClick: noop }}
          />
        </div>
      </Card>

      <Card title="Price + action button">
        <div class="border border-stroke-2 rounded-xl overflow-hidden">
          <components.ModalFooter
            price={499}
            priceLabel="Total payable"
            priceSubtext="incl. taxes"
            actionButton={{ text: "Pay ₹499", variant: "primary", style: "brand", size: 48, onClick: noop }}
          />
        </div>
      </Card>
    </Section>
  );
}

// ─── NAV ITEMS ────────────────────────────────────────────────────────────────

const NAV = [
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "buttons", label: "Button" },
  { id: "linkbutton", label: "LinkButton" },
  { id: "input", label: "Input" },
  { id: "checkbox", label: "Checkbox" },
  { id: "toggle", label: "Toggle" },
  { id: "loader", label: "Loader" },
  { id: "circularloader", label: "CircularLoader" },
  { id: "tabs", label: "Tabs" },
  { id: "segmented", label: "SegmentedControl" },
  { id: "otp", label: "OtpInput" },
  { id: "modalheader", label: "ModalHeaderV2" },
  { id: "modalfooter", label: "ModalFooter" },
];

// ─── Main page ─────────────────────────────────────────────────────────────────

function TestUI() {
  const [activeSection, setActiveSection] = createSignal("typography");
  const { theme, toggleTheme } = useTelescopeContext();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div class="flex min-h-screen bg-background-normal-primary text-text-normal-primary">
      {/* Sidebar */}
      <aside class="sticky top-0 hidden h-screen w-52 shrink-0 flex-col border-r border-stroke-1 bg-background-normal-secondary sm:flex">
        <div class="border-b border-stroke-1 px-4 py-4">
          <p class="text-title-6-semi-bold text-text-normal-primary">🔭 Telescope</p>
          <p class="text-caption-regular text-text-normal-tertiary mt-0.5">Component Storybook</p>
        </div>
        <nav class="flex-1 overflow-y-auto py-2">
          <For each={NAV}>
            {(item) => (
              <button
                class="w-full px-4 py-2 text-left text-para-3-regular transition-colors"
                classList={{
                  "text-text-normal-primary bg-background-normal-tertiary font-medium": activeSection() === item.id,
                  "text-text-normal-secondary hover:text-text-normal-primary hover:bg-background-normal-tertiary": activeSection() !== item.id,
                }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            )}
          </For>
        </nav>
        {/* Theme toggle at bottom */}
        <div class="border-t border-stroke-1 px-4 py-4">
          <div class="flex items-center rounded-xl bg-stroke-1-alpha p-1">
            <button
              onClick={() => theme() === "telescope-dark-theme" && toggleTheme()}
              class="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 transition-all duration-200"
              classList={{
                "bg-background-normal-primary shadow-sm text-text-normal-primary": theme() === "telescope-light-theme",
                "text-text-normal-tertiary": theme() === "telescope-dark-theme",
              }}
            >
              <PhosphorIcon name="sun" fontSize={14} />
              <span class="text-label-semi-bold">Light</span>
            </button>
            <button
              onClick={() => theme() === "telescope-light-theme" && toggleTheme()}
              class="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 transition-all duration-200"
              classList={{
                "bg-background-normal-primary shadow-sm text-text-normal-primary": theme() === "telescope-dark-theme",
                "text-text-normal-tertiary": theme() === "telescope-light-theme",
              }}
            >
              <PhosphorIcon name="moon" fontSize={14} />
              <span class="text-label-semi-bold">Dark</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div class="sm:hidden fixed top-0 left-0 right-0 z-10 border-b border-stroke-1 bg-background-normal-secondary px-4 py-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <div class="shrink-0 flex items-center rounded-lg bg-stroke-1-alpha p-0.5">
            <button
              onClick={() => theme() === "telescope-dark-theme" && toggleTheme()}
              class="flex items-center justify-center rounded-md w-7 h-7 transition-all duration-200"
              classList={{
                "bg-background-normal-primary shadow-sm text-text-normal-primary": theme() === "telescope-light-theme",
                "text-text-normal-tertiary": theme() === "telescope-dark-theme",
              }}
            >
              <PhosphorIcon name="sun" fontSize={14} />
            </button>
            <button
              onClick={() => theme() === "telescope-light-theme" && toggleTheme()}
              class="flex items-center justify-center rounded-md w-7 h-7 transition-all duration-200"
              classList={{
                "bg-background-normal-primary shadow-sm text-text-normal-primary": theme() === "telescope-dark-theme",
                "text-text-normal-tertiary": theme() === "telescope-light-theme",
              }}
            >
              <PhosphorIcon name="moon" fontSize={14} />
            </button>
          </div>
          <For each={NAV}>
            {(item) => (
              <button
                class="shrink-0 rounded-full px-3 py-1 text-label-medium transition-colors"
                classList={{
                  "bg-feature-base text-white": activeSection() === item.id,
                  "text-text-normal-secondary bg-background-normal-tertiary": activeSection() !== item.id,
                }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Content */}
      <main class="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:pt-8 pt-16">
        <div class="mx-auto max-w-3xl space-y-16">
          <div>
            <h1 class="text-title-2-semi-bold text-text-normal-primary">Telescope Storybook</h1>
            <p class="text-para-3-regular text-text-normal-secondary mt-1">
              All components from <code class="text-feature-base">@hubble/telescope</code> — live & interactive.
            </p>
          </div>

          <TypographySection />
          <ColorSection />
          <ButtonSection />
          <LinkButtonSection />
          <InputSection />
          <CheckboxSection />
          <ToggleSection />
          <LoaderSection />
          <CircularLoaderSection />
          <TabsSection />
          <SegmentedControlSection />
          <OtpSection />
          <ModalHeaderSection />
          <ModalFooterSection />
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <TelescopeProvider>
      <TestUI />
    </TelescopeProvider>
  );
}
