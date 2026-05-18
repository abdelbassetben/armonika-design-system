import { Button } from "@/components/ui/button";
import type { CSSProperties } from "react";

const S_STEPS = [0, 1, 2, 3, 4, 5] as const;

const SEMANTIC_COLORS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--card-background",
  "--box-background",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--success",
  "--success-foreground",
  "--border",
  "--input",
  "--ring",
  "--disable",
  "--table-header",
] as const;

const CHART_COLORS = [
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const;

const SIDEBAR_COLORS = [
  "--sidebar",
  "--sidebar-foreground",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
  "--sidebar-ring",
] as const;

const EM_GROUPS = [
  {
    title: "Primary",
    tokens: [
      "high-em",
      "med-em",
      "low-em",
      "base-em",
      "low-em-alpha",
      "base-em-alpha",
    ],
  },
  {
    title: "Info",
    tokens: [
      "high-em",
      "med-em",
      "low-em",
      "base-em",
      "low-em-alpha",
      "base-em-alpha",
    ],
  },
  {
    title: "Success",
    tokens: [
      "high-em",
      "med-em",
      "low-em",
      "base-em",
      "low-em-alpha",
      "base-em-alpha",
    ],
  },
  {
    title: "Warning",
    tokens: [
      "high-em",
      "med-em",
      "low-em",
      "base-em",
      "low-em-alpha",
      "base-em-alpha",
    ],
  },
  {
    title: "Danger",
    tokens: [
      "high-em",
      "med-em",
      "low-em",
      "base-em",
      "low-em-alpha",
      "base-em-alpha",
    ],
  },
  {
    title: "Disabled",
    tokens: ["high-em", "med-em", "low-em", "base-em"],
  },
] as const;

const OUTLINES = [
  "--outline-primary",
  "--outline-secondary",
  "--outline-sheet-special",
  "--outline-high-em",
  "--outline-med-em",
  "--outline-low-em",
  "--outline-base-em",
  "--outline-primary-button-top",
  "--outline-primary-button-bottom",
  "--outline-secondary-button-top",
  "--outline-secondary-button-bottom",
  "--outline-input-field",
  "--outline-input-field-low-em",
];

type SwatchProps = {
  cssVar: string;
  label: string;
  alpha?: boolean;
};

function Swatch({ cssVar, label, alpha }: SwatchProps) {
  const style = { background: `var(${cssVar})` } as CSSProperties;

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <div
        className="relative h-16 w-full min-w-0"
        style={alpha ? undefined : style}
      >
        {alpha ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%)",
                backgroundSize: "12px 12px",
              }}
            />
            <div className="absolute inset-0" style={style} />
          </>
        ) : null}
      </div>
      <div className="border-t border-border bg-card px-2 py-2">
        <code className="block break-all text-[10px] text-muted-foreground sm:text-xs">
          {label}
        </code>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SwatchGrid({
  items,
  className = "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
}: {
  items: { cssVar: string; label: string; alpha?: boolean }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <Swatch key={item.label} {...item} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const pairLabels = S_STEPS.flatMap((i) =>
    S_STEPS.map((j) => `--s-l${i}-d${j}` as const),
  );

  return (
    <div className="min-h-screen bg-card px-4 py-8 sm:px-6 lg:px-8">
      <div className="page_content mx-auto max-w-6xl space-y-14">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Design tokens
          </h1>
          <p className="text-sm text-muted-foreground">
            Preview from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              app/global.css
            </code>
            . Toggle dark mode to see theme-aware tokens update.
          </p>
        </header>

        <Section
          title="Semantic UI"
          description="Shadcn-style roles wired through @theme inline (e.g. bg-primary, text-muted-foreground)."
        >
          <SwatchGrid
            items={SEMANTIC_COLORS.map((cssVar) => ({
              cssVar,
              label: cssVar,
            }))}
          />
        </Section>

        <Section
          title="Emphasis palette"
          description="Per-hue ramps (high → base) plus alpha steps. Values differ in .dark."
        >
          <div className="space-y-8">
            {EM_GROUPS.map((group) => {
              const prefix = group.title.toLowerCase();
              return (
                <div key={group.title} className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {group.title}
                  </p>
                  <SwatchGrid
                    items={group.tokens.map((token) => {
                      const cssVar = `--${prefix}-${token}`;
                      return {
                        cssVar,
                        label: cssVar,
                        alpha: token.includes("alpha"),
                      };
                    })}
                  />
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Charts" description="Data visualization accents.">
          <SwatchGrid
            items={CHART_COLORS.map((cssVar) => ({ cssVar, label: cssVar }))}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"
          />
        </Section>

        <Section title="Sidebar" description="Navigation shell tokens.">
          <SwatchGrid
            items={SIDEBAR_COLORS.map((cssVar) => ({
              cssVar,
              label: cssVar,
            }))}
          />
        </Section>

        <Section
          title="Theme ramp"
          description="Same step index in light and dark (Figma s-0 … s-5 per mode)."
        >
          <SwatchGrid
            items={S_STEPS.map((n) => ({
              cssVar: `--s-${n}`,
              label: `--s-${n}`,
            }))}
          />
        </Section>

        <Section
          title="Reference ramps"
          description="Fixed light and dark ramps used by pair tokens (always the physical light or dark step)."
        >
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              --s-light-0 … --s-light-5
            </p>
            <SwatchGrid
              items={S_STEPS.map((n) => ({
                cssVar: `--s-light-${n}`,
                label: `--s-light-${n}`,
              }))}
            />
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              --s-dark-0 … --s-dark-5
            </p>
            <SwatchGrid
              items={S_STEPS.map((n) => ({
                cssVar: `--s-dark-${n}`,
                label: `--s-dark-${n}`,
              }))}
            />
          </div>
        </Section>

        <Section
          title="Cross-theme pairs"
          description="Token --s-l{i}-d{j}: light UI uses light step i, dark UI uses dark step j (36 combinations)."
        >
          <SwatchGrid
            items={pairLabels.map((label) => ({ cssVar: label, label }))}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          />
        </Section>

        <Section
          title="Within-theme gradient"
          description="Type C blend on the active ramp (--s-0 → --s-1)."
        >
          <div className="max-w-xs">
            <Swatch cssVar="--s-gradient-0-1" label="--s-gradient-0-1" />
          </div>
        </Section>

        <Section
          title="Outlines"
          description="Outline colors with varying opacity."
        >
          <SwatchGrid
            items={OUTLINES.map((label) => ({ cssVar: label, label }))}
          />
        </Section>
      </div>
    </div>
  );
}
