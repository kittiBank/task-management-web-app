const BANGKOK_OFFSET_MS = 7 * 60 * 60 * 1000;

// Convert UTC date to Bangkok ISO string
export function toBangkokIsoString(date: Date): string {
  return new Date(date.getTime() + BANGKOK_OFFSET_MS)
    .toISOString()
    .replace('Z', '+07:00');
}
