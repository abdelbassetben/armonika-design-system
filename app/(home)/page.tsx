import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Armonika Design System
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A cohesive, themeable design system built with shadcn/ui tokens and
          Base UI primitives. Browse the color palette or jump into the docs.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/colors">
            <Button variant="primary-light" size="lg">
              Browse Colors
            </Button>
          </Link>
          <Link href="/docs/get-started">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
