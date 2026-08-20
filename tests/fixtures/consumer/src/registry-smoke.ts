export const installedRegistryModules = import.meta.glob(
  ["./components/ui/**/*.vue", "./lib/**/*.ts", "./composables/**/*.ts"],
  { eager: true },
);
