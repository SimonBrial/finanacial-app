export function goalPercentage(
  currentValue: number,
  goalValue: number,
): string {
  const colorStates: string[] = [
    "red",
    "orange",
    "yellow",
    "lightgreen",
    "green",
  ];
  const percentage = (currentValue / goalValue) * 100;

  // Guard against divide-by-zero and invalid inputs
  if (
    !Number.isFinite(currentValue) ||
    !Number.isFinite(goalValue) ||
    goalValue === 0
  ) {
    return "gray";
  }
  if (percentage >= 0 && percentage < 20) {
    return colorStates[0];
  }
  if (percentage >= 20 && percentage < 40) {
    return colorStates[1];
  }
  if (percentage >= 40 && percentage < 60) {
    return colorStates[2];
  }
  if (percentage >= 60 && percentage < 80) {
    return colorStates[3];
  }
  if (percentage >= 80 && percentage <= 100) {
    return colorStates[4];
  }
  return "gray";
}
