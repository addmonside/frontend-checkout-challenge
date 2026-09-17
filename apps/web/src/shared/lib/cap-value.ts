export function capValue(value: number, maxCap: number): string {
  return value < maxCap ? `${value}` : `${maxCap}+`;
}
