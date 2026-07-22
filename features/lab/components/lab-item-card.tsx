import { ItemCard } from "@/components/global/item-card";

interface LabItem {
  slug: string;
  title: string;
  description?: string;
  topics?: string[];
}

interface ILabItemCardProps {
  item: LabItem;
  className?: string;
}

export function LabItemCard({ item, className }: ILabItemCardProps) {
  return (
    <ItemCard href={`/labs/${item.slug}`} className={className}>
      <ItemCard.Header>
        <ItemCard.Title>{item.title}</ItemCard.Title>
        <ItemCard.Arrow />
      </ItemCard.Header>

      <ItemCard.Description>{item.description}</ItemCard.Description>

      <ItemCard.Footer>
        <ItemCard.Topics topics={item.topics} />
      </ItemCard.Footer>
    </ItemCard>
  );
}
