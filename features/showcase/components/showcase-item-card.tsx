import { ItemCard } from "@/components/global/item-card";

interface ShowcaseItem {
  name: string;
  title: string;
  category?: string[];
  description?: string;
  isNew?: boolean;
}

interface IShowcaseItemCardProps {
  item: ShowcaseItem;
  className?: string;
}

export function ShowcaseItemCard({ item, className }: IShowcaseItemCardProps) {
  return (
    <ItemCard href={`/components/${item.name}`} className={className}>
      <ItemCard.Header>
        <ItemCard.Title>{item.title}</ItemCard.Title>
        <ItemCard.CategoryBadges categories={item.category} />
      </ItemCard.Header>

      <ItemCard.Description>{item.description}</ItemCard.Description>

      <ItemCard.Footer>
        <ItemCard.NewBadge show={item.isNew} />
        <ItemCard.Arrow />
      </ItemCard.Footer>
    </ItemCard>
  );
}
