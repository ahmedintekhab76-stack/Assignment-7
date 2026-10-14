// API থেকে যে data আসে তার আকার (shape) এখানে বলে দেওয়া হয়েছে।

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string; // category এর slug, যেমন "chal"
  categoryNameBn: string;
  categoryIcon: string;
  unit: string; // kg | litre | dozen | piece
  image: string; // emoji
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: MarketPrice[];
};
