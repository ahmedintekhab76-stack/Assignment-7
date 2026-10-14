import type { Category, Product } from "./types";

// প্রথমে main API, কাজ না করলে alternative গুলো try করবে।
const MAIN = process.env.NEXT_PUBLIC_API_URL || "https://openapi.programming-hero.com/api/bazardor";
const BASES = [
  MAIN,
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) throw new NotFoundError();
      if (!res.ok) throw new Error(`API error ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      lastError = err;
    }
  }
  throw lastError ?? new Error("API পাওয়া যাচ্ছে না");
}

export class NotFoundError extends Error {}

export async function getCategories(): Promise<Category[]> {
  return request<Category[]>("/categories");
}

/** category না পেলে null দেয় */
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const data = await request<Category>(`/categories/${encodeURIComponent(slug)}`);
    return data && data.slug ? data : null;
  } catch (err) {
    if (err instanceof NotFoundError) return null;
    // API অন্যভাবে error দিলে categories list থেকে খুঁজে দেখি
    const all = await getCategories();
    return all.find((c) => c.slug === slug) ?? null;
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request<Product[]>(`/products${query}`);
}

/** slug (অথবা id) দিয়ে একটা product খোঁজে */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}
