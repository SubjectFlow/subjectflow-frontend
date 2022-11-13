export const getCssVarInt = (name: string): number => {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue(name));
};
