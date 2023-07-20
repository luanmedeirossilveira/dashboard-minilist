export const N: INumberUtility = {
  clamp: (min: number, value: number, max: number) => Math.min(Math.max(min, value), max),
  rand: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min),
};
