import { ref } from "vue";

type Direction = "next" | "prev";

export function useTypeaheadKeyboard() {
  const activeIndexes = ref<Record<string, number>>({});

  function reset(key: string): void {
    delete activeIndexes.value[key];
  }

  function currentIndex(key: string): number {
    return activeIndexes.value[key] ?? -1;
  }

  function setForLength(key: string, length: number): void {
    activeIndexes.value[key] = length > 0 ? 0 : -1;
  }

  function move(key: string, direction: Direction, length: number): number {
    if (length <= 0) {
      return -1;
    }

    const index = currentIndex(key);

    if (direction === "next") {
      const nextIndex = index >= length - 1 ? 0 : index + 1;
      activeIndexes.value[key] = nextIndex;
      return nextIndex;
    }

    const previousIndex = index <= 0 ? length - 1 : index - 1;
    activeIndexes.value[key] = previousIndex;

    return previousIndex;
  }

  function selectedOrFirst<T>(key: string, items: T[]): T | undefined {
    if (items.length === 0) {
      return undefined;
    }

    return items[currentIndex(key)] ?? items[0];
  }

  return {
    currentIndex,
    move,
    reset,
    selectedOrFirst,
    setForLength,
  };
}
