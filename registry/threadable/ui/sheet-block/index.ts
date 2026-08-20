export { default as SheetBlock } from "./SheetBlock.vue";

export const handleSheetClose = (
  emit: (event: string, value: boolean) => void,
) => {
  return () => {
    emit("close", false);
  };
};
