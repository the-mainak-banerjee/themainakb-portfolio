import { useState } from "react";

interface ItemWithValue {
  value?: string;
}
export function useDirection(
  currentValue: string | undefined,
  items: ItemWithValue[],
): 1 | -1 {
  const [prevValue, setPrevValue] = useState(currentValue);
  const [direction, setDirection] = useState<1 | -1>(1);

  if (currentValue !== prevValue) {
    const previousIndex = items.findIndex((item) => item.value === prevValue);
    const currentIndex = items.findIndex((item) => item.value === currentValue);

    setDirection(currentIndex > previousIndex ? 1 : -1);
    setPrevValue(currentValue);
  }

  return direction;
}
