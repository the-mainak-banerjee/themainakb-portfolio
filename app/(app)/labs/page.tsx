import { MainContainer } from "@/components/global/containers";
import ListPageHeader from "@/components/global/list-page-header";
import SectionContainer from "@/components/global/section-container";
import { labs } from "@/features/lab/data/labs-data";
import Link from "next/link";

export const metadata = {
  title: "Labs",
  description:
    "A running log of components rebuilt to learn motion and interaction.",
};

export default function LabsPage() {
  const sorted = [...labs].sort((a, b) => Number(b.index) - Number(a.index));

  return (
    <MainContainer>
      <SectionContainer>
        <ListPageHeader
          title="Labs"
          description=" A running log of components I've rebuilt to learn motion and
          interaction — not production-ready, not optimized, just practice."
          eyebrow="Assembling"
          // count={counts.all}
          countLabel="components"
        />
      </SectionContainer>
    </MainContainer>
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
          {labs.length.toString().padStart(3, "0")} entries
        </div>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          Labs
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
          A running log of components I&apos;ve rebuilt to learn motion and
          interaction — not production-ready, not optimized, just practice.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((lab) => (
          <Link
            key={lab.slug}
            href={`/labs/${lab.slug}`}
            className="border-border hover:border-muted-foreground/40 group block min-w-0 rounded-lg border p-4 transition-colors"
          >
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-muted-foreground/70 text-xs tabular-nums">
                {lab.index}
              </span>
              <span className="text-foreground text-sm font-medium">
                {lab.name}
              </span>
            </div>

            <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
              {lab.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
