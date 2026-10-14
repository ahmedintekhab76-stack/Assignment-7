# 🛒 বাজার দর (BazarDor)

> বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) **আজকের দাম এক নজরে** দেখার একটি Price Tracking Website।

BazarDor এ আজকের দাম, গতকালের তুলনায় দাম বাড়া-কমা, এবং বিভিন্ন বাজারের সর্বনিম্ন / সর্বাধিক / গড় দাম দেখা যায়। Sign in করা user রা প্রতিটি পণ্যের বিস্তারিত পাতা দেখতে ও নিজের প্রোফাইল আপডেট করতে পারে।

## ✨ Features

1. **চলমান দামের Ticker** — Navbar এর নিচে সব পণ্যের নাম, দাম ও ▲/▼ পরিবর্তন অসীমভাবে ঘুরতে থাকে।
2. **Home Page** — "আজ দাম বেড়েছে" (Top 6), "আজ দাম কমেছে" (Top 6) এবং "সব পণ্য" — API থেকে আসা live data দিয়ে।
3. **Category Page + Sorting** — Category অনুযায়ী পণ্য filter এবং দাম অনুযায়ী (কম→বেশি / বেশি→কম) sort — Bangla সংখ্যা ঠিকভাবে number হিসেবে sort হয়।
4. **Product Details (Protected Route)** — `/product/[slug]` পাতায় সর্বনিম্ন, সর্বাধিক, গড় দাম এবং বাজারভিত্তিক table; login ছাড়া ঢুকলে Sign In এ পাঠানো হয়।
5. **Authentication (Better Auth)** — Email/Password, Google ও GitHub দিয়ে Sign In / Sign Up, Toast notification এবং Sign Out।
6. **My Profile + Update Information** — প্রোফাইল দেখা এবং আলাদা route (`/profile/update`) থেকে নাম আপডেট করা।
7. **Loading Skeleton, 404 Page, Error Page** এবং পুরো site **mobile / tablet / desktop** এ responsive।

## 🛠️ Technologies Used

| Technology | কাজ |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | UI তৈরি ও page navigation |
| TypeScript | নিরাপদ code লেখা |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling ও responsive design |
| [Better Auth](https://better-auth.com) | Authentication (Email, Google, GitHub) |
| MongoDB Atlas | User data সংরক্ষণ |
| react-hot-toast | Toast notification |
| Hind Siliguri (Fontsource) | বাংলা font |

## 📡 API

Main API: `https://openapi.programming-hero.com/api/bazardor`

| Endpoint | কাজ |
| --- | --- |
| `/categories` | সব category |
| `/categories/chal` | একটি category |
| `/products` | সব পণ্য |
| `/products?category=chal` | category অনুযায়ী filter |
| `/products/1` | একটি পণ্য |

Main API বন্ধ থাকলে app নিজে নিজে alternative API (`api.api-store.workers.dev`, `api.abcz.workers.dev`) চেষ্টা করে।

## 🚀 Local এ চালানোর নিয়ম

```bash
# 1. Dependencies install
npm install

# 2. Environment file বানাও
cp .env.example .env.local      # Windows এ: copy .env.example .env.local
# তারপর .env.local ফাইলে value গুলো বসাও (নিচে দেখো)

# 3. Development server চালাও
npm run dev
```

এরপর browser এ [http://localhost:3000](http://localhost:3000) খোলো।

### Environment variables

| Variable | কী দিতে হবে |
| --- | --- |
| `BETTER_AUTH_SECRET` | যেকোনো লম্বা random লেখা (৩২+ অক্ষর) |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | Local এ `http://localhost:3000`, Deploy এর পর live site এর URL |
| `MONGODB_URI` / `MONGODB_DB` | MongoDB Atlas এর connection string ও database নাম |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console থেকে |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub → Settings → Developer settings → OAuth Apps থেকে |

> `MONGODB_URI` না দিলে শুধু practice এর জন্য user data memory তে থাকে (server বন্ধ করলে মুছে যায়)। **Deploy করার সময় অবশ্যই MongoDB ব্যবহার করতে হবে।**

### Social login এর Callback URL

- Google: `http://localhost:3000/api/auth/callback/google` (Deploy এর পর live URL দিয়েও একটা যোগ করো)
- GitHub: `http://localhost:3000/api/auth/callback/github`

## ☁️ Deploy (Vercel)

1. Code GitHub এ push করো।
2. [vercel.com](https://vercel.com) এ **Add New → Project** থেকে repository import করো।
3. **Environment Variables** এ `.env.example` এর সব variable বসাও (`BETTER_AUTH_URL` হবে Vercel এর live URL)।
4. Deploy করো, তারপর Google/GitHub এর callback URL এ live URL যোগ করো।
5. Home, Category, Product Details, Sign In/Up, Profile — সব page reload দিয়ে test করো।

## 📁 Folder Structure

```
app/            → সব page (home, category, product, signin, signup, profile)
components/     → বারবার ব্যবহৃত UI অংশ (Header, Ticker, Card ...)
lib/            → API, auth, Bangla সংখ্যা/তারিখের helper
public/         → ছবি (hero banner)
```
