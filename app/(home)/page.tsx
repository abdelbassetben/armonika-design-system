const S_STEPS = [0, 1, 2, 3, 4, 5] as const;

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
  variant?: "solid" | "gradient";
};

function Swatch({ cssVar, label, variant = "solid" }: SwatchProps) {
  const style = { background: `var(${cssVar})` } as React.CSSProperties;

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="h-16 w-full min-w-0" style={style} />
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

export default function HomePage() {
  const pairLabels = S_STEPS.flatMap((i) =>
    S_STEPS.map((j) => `--s-l${i}-d${j}` as const),
  );

  return (
    <div className="min-h-screen bg-card px-4 py-8 sm:px-6 lg:px-8">
      <div className="page_content mx-auto max-w-6xl space-y-14">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Surface tokens
          </h1>
          <p className="text-sm text-muted-foreground">
            Preview from{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              app/global.css
            </code>
            . Toggle dark mode to see cross-theme pairs switch their resolved
            color.
          </p>
        </header>

        <Section
          title="Theme ramp"
          description="Same step index in light and dark (Figma s-0 … s-5 per mode)."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {S_STEPS.map((n) => (
              <Swatch key={n} cssVar={`--s-${n}`} label={`--s-${n}`} />
            ))}
          </div>
        </Section>

        <Section
          title="Reference ramps"
          description="Fixed light and dark ramps used by pair tokens (always the physical light or dark step)."
        >
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              --s-light-0 … --s-light-5
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {S_STEPS.map((n) => (
                <Swatch
                  key={`light-${n}`}
                  cssVar={`--s-light-${n}`}
                  label={`--s-light-${n}`}
                />
              ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              --s-dark-0 … --s-dark-5
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {S_STEPS.map((n) => (
                <Swatch
                  key={`dark-${n}`}
                  cssVar={`--s-dark-${n}`}
                  label={`--s-dark-${n}`}
                />
              ))}
            </div>
          </div>
        </Section>

        <Section
          title="Cross-theme pairs"
          description="Token --s-l{i}-d{j}: light UI uses light step i, dark UI uses dark step j (36 combinations)."
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {pairLabels.map((label) => (
              <Swatch key={label} cssVar={label} label={label} />
            ))}
          </div>
        </Section>

        <Section
          title="Within-theme gradient"
          description="Type C blend on the active ramp (--s-0 → --s-1)."
        >
          <div className="max-w-xs">
            <Swatch
              cssVar="--s-gradient-0-1"
              label="--s-gradient-0-1"
              variant="gradient"
            />
          </div>
        </Section>

        <Section
          title="Outlines"
          description="Outline colors with varying opacity."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {OUTLINES.map((label) => (
              <Swatch key={label} cssVar={label} label={label} />
            ))}
          </div>
        </Section>


      </div>
    </div>
  );
}
