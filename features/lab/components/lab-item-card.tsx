import { ItemCard } from "@/components/global/item-card";
import { LabType } from "../data/labs-data";
import { cn } from "@/lib/utils";

interface LabItem {
  slug: string;
  title: string;
  description?: string;
  topics?: string[];
  inspiredBy?: { name: string; url?: string };
  type: LabType
}

interface ILabItemCardProps {
  item: LabItem;
  className?: string;
}

export function LabItemCard({ item, className }: ILabItemCardProps) {
  return (
    <ItemCard href={`/labs/${item.slug}`} className={cn(className, "min-h-14")}>
      <ItemCard.Header>
        <ItemCard.Title>{item.title}</ItemCard.Title>
        <ItemCard.CategoryBadges categories={[item.type]}/>
      </ItemCard.Header>

      <ItemCard.Description>{item.description}</ItemCard.Description>
      <ItemCard.Credit inspiredBy={item.inspiredBy} />

      <ItemCard.Footer className="items-start">
        <ItemCard.Topics topics={item.topics} />
        <ItemCard.Arrow />
      </ItemCard.Footer>
    </ItemCard>
  );
}
