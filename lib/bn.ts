// Bangla সংখ্যা, তারিখ ও unit এর helper function গুলো

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** 1850 -> "১,৮৫০" */
export function toBn(value: number | string): string {
  const n = Number(value);
  if (!Number.isNaN(n) && typeof value === "number") {
    return new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 }).format(n);
  }
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** 2.1 -> "২.১" (সবসময় এক দশমিক ঘর) */
export function toBnPct(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value));
}

/** "১২৩" বা "123" দুটোকেই number বানায় (sort করার সময় লাগে) */
export function bnToNumber(value: string | number): number {
  if (typeof value === "number") return value;
  const en = value
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .replace(/,/g, "");
  return Number(en);
}

/** আজকের তারিখ: "মঙ্গলবার, ৬ অক্টোবর, ২০২৬" (Bangladesh time) */
export function banglaDate(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("weekday")}, ${get("day")} ${get("month")}, ${get("year")}`;
}

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

export function unitBn(unit: string): string {
  return UNIT_BN[unit] ?? unit;
}
