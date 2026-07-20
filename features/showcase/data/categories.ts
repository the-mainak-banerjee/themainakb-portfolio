import { REGISTRY_ITEM_CATEGORY, REGISTRY_ITEM_CATEGORY_DISPLAY } from "@/registry/config";

export const CATEGORIES: {
  label: string;
  value?: keyof typeof REGISTRY_ITEM_CATEGORY | "all";
}[] = [
  { label: "All"},
  ...(Object.keys(REGISTRY_ITEM_CATEGORY) as Array<keyof typeof REGISTRY_ITEM_CATEGORY>).map(item => {
    return {
        label: REGISTRY_ITEM_CATEGORY_DISPLAY[item],
        value: item
    }
  })
]