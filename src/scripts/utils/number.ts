/**
 * Rounds to the nearest number achievable using standard gym plates of 1.25kg, 2.5kg, 5kg, 10kg, 20kg
 */
export const plateRound = (weight: number): number => {
  return 2.5 * Math.floor(weight / 2.5);
};
