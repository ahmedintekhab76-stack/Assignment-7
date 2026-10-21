<div align="center">

# 🛒 বাজার দর (BazarDor)

**Bangladesh's everyday grocery prices — at a glance.**

A responsive price-tracking web application built with Next.js, Tailwind CSS and Better Auth.

[**Live Demo**](https://assignment-7intekhab.netlify.app/) · [**Report a Bug**](https://github.com/ahmedintekhab76-stack/Assignment-7/issues)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-05893e)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Pages & Routes](#-pages--routes)
- [Authentication Flow](#-authentication-flow)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Social Login Setup](#-social-login-setup)
- [Deployment](#-deployment)
- [Design Decisions](#-design-decisions)
- [Author](#-author)

---

## 📖 About the Project

**BazarDor (বাজার দর)** lets people check the current prices of daily-essential goods in Bangladesh — rice, lentils, oil, vegetables, fish, meat, eggs & dairy, and spices.

Users can see which prices went **up** or **down** today, filter products by category, sort them by price, and (after signing in) open a detailed page that compares the minimum, maximum and average price across different markets and divisions.

The interface follows a Figma design closely, is written entirely in Bangla (with Bangla numerals and dates), and works on mobile, tablet and desktop screens.

> **Note:** The product data comes from a practice API provided for this course. It is sample data meant for learning and is not an official, real-time market report.

---

## ✨ Features

### Browsing
- **Live price ticker** — an infinite marquee below the navbar showing every product's name, price and ▲/▼ change. It pauses on hover.
- **Home page** — hero banner with an anchor-scroll button, **Top 6 price risers**, **Top 6 price fallers**, and the full product grid.
- **Category pages** — filter products by category; the active category is highlighted in the navbar.
- **Sorting** — sort by *Default*, *Price: Low to High* or *Price: High to Low*. Bangla numerals are converted to real numbers, so sorting is numeric (not alphabetical).
- **Product details** — minimum / maximum / average price summary and a market-wise price table (desktop) or card list (mobile).

### Authentication & Users
- **Email & password** sign-up and sign-in using **Better Auth**.
- **Social login** with **Google** and **GitHub**.
- **Protected routes** — product details and profile pages require login. Unauthenticated visitors are redirected to Sign In with a toast message and returned to the page they wanted after logging in.
- **My Profile** page and a separate **Update Information** route to change the display name.
- **Toast notifications** for sign-in, sign-up, sign-out, validation errors and protected-route redirects.

### User Experience
- **Skeleton loading states** while data is being fetched.
- **Friendly 404 page** for unknown routes, invalid categories and unknown products, with a "Back to Home" button.
- **Empty state** for categories with no products, and a global error page with a retry button.
- **Fully responsive** — the grid collapses from 3 columns to 2 to 1, the navbar scrolls horizontally on small screens, and tables become cards on mobile.
- **API fallback** — if the main API is unreachable, the app automatically tries two alternative endpoints.

---

## 🛠 Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org) (App Router) | Framework, routing, server rendering |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling and responsive design |
| [Better Auth](https://better-auth.com) | Authentication (email/password, Google, GitHub) |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | User and session storage |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications |
| [Hind Siliguri](https://fontsource.org/fonts/hind-siliguri) | Bangla typeface (self-hosted via Fontsource) |
| [Netlify](https://www.netlify.com) | Hosting and deployment |

---

## 🧭 Pages & Routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home — hero, price movers, all products | Public |
| `/category/[slug]` | Products of one category, with sorting | Public |
| `/product/[slug]` | Product details and market-wise prices | 🔒 Login required |
| `/signin` | Sign in (email, Google, GitHub) | Public |
| `/signup` | Create an account | Public |
| `/profile` | View account information | 🔒 Login required |
| `/profile/update` | Update display name | 🔒 Login required |
| `/api/auth/*` | Better Auth endpoints | — |
| any other path | Custom 404 page | Public |

---

## 🔐 Authentication Flow

```
Visitor opens /product/peyaj
        │
        ▼
 Is there a valid session? ── yes ──► Show product details
        │ no
        ▼
 Redirect to /signin?redirect=/product/peyaj&reason=protected
        │
        ▼
 Toast: "Please sign in to view this page"
        │
        ▼
 User signs in ──► Redirected back to /product/peyaj
```

- The session is verified **on the server** (`auth.api.getSession`), so protected content is never sent to logged-out users.
- After **Sign Up**, the user is sent to the Sign In page (automatic sign-in is disabled on purpose).
- Only same-site redirect paths are accepted, to prevent open-redirect attacks.

---

## 📡 API Reference

**Base URL:** `https://openapi.programming-hero.com/api/bazardor`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/categories` | All categories |
| GET | `/categories/:slug` | A single category |
| GET | `/products` | All products |
| GET | `/products?category=chal` | Products filtered by category |
| GET | `/products/:id` | A single product |

Fallback endpoints used automatically when the main API fails:
`https://api.api-store.workers.dev/api/bazardor` and `https://api.abcz.workers.dev/api/bazardor`.

---

## 📁 Project Structure

```
Assignment-7/
├── app/
│   ├── api/auth/[...all]/   # Better Auth route handler
│   ├── category/[slug]/     # Category page + loading skeleton
│   ├── product/[slug]/      # Product details (protected) + loading skeleton
│   ├── profile/             # My Profile + /update route (protected)
│   ├── signin/  signup/     # Authentication pages
│   ├── layout.tsx           # Header, ticker, footer, toaster
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # 404 page
│   ├── error.tsx            # Error boundary
│   └── globals.css          # Design tokens, buttons, inputs, animations
├── components/              # Reusable UI (Header, Ticker, ProductCard, forms …)
├── lib/
│   ├── api.ts               # API client with fallback URLs
│   ├── auth.ts              # Better Auth server configuration
│   ├── auth-client.ts       # Better Auth browser client
│   ├── session.ts           # getSession / requireSession helpers
│   ├── bn.ts                # Bangla numerals, date and unit helpers
│   └── types.ts             # TypeScript types for API data
└── public/                  # Static assets (hero illustration)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) **v20 or newer**
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (for storing users)
- (Optional) Google and GitHub OAuth credentials for social login

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ahmedintekhab76-stack/Assignment-7.git
cd Assignment-7

# 2. Install dependencies
npm install

# 3. Create your environment file and fill in the values
cp .env.example .env.local        # Windows: copy .env.example .env.local

# 4. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Type-check the project |

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Main Bazardor API base URL (already set in `.env.example`) |
| `BETTER_AUTH_SECRET` | Random secret string, at least 32 characters |
| `BETTER_AUTH_URL` | App URL — `http://localhost:3000` locally, the live URL in production |
| `NEXT_PUBLIC_APP_URL` | Same as above |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | Database name (e.g. `bazardor`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth credentials |

> If `MONGODB_URI` is empty, users are kept in memory so the app can still be tried locally. They disappear when the server restarts, so **always set `MONGODB_URI` for deployment**.

---

## 🔗 Social Login Setup

Add these **callback (redirect) URLs** in each provider's console:

| Provider | Console | Local callback URL | Production callback URL |
| --- | --- | --- | --- |
| Google | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → OAuth client | `http://localhost:3000/api/auth/callback/google` | `https://assignment-7intekhab.netlify.app/api/auth/callback/google` |
| GitHub | GitHub → Settings → Developer settings → OAuth Apps | `http://localhost:3000/api/auth/callback/github` | `https://assignment-7intekhab.netlify.app/api/auth/callback/github` |

---

## ☁️ Deployment

The application is deployed on **Netlify**.

🔗 **Live URL:** https://assignment-7intekhab.netlify.app/

### Prerequisites
- The code is pushed to a GitHub repository.
- In **MongoDB Atlas → Network Access**, allow access from anywhere (`0.0.0.0/0`). Netlify uses dynamic IP addresses, so this is required for sign-in and sign-up to work in production.

### Steps

1. Log in to [Netlify](https://app.netlify.com) with your GitHub account.
2. Click **Add new site → Import an existing project → GitHub** and select the `Assignment-7` repository.
3. Keep the detected build settings. Netlify automatically recognises Next.js:
   - **Build command:** `npm run build`
   - **Publish directory:** leave empty (handled automatically)
4. Set the **Site name** to `assignment-7intekhab` so the live URL is known in advance.
5. Add the following **Environment variables** before deploying:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | `https://openapi.programming-hero.com/api/bazardor` |
   | `BETTER_AUTH_SECRET` | A random string of at least 32 characters |
   | `BETTER_AUTH_URL` | `https://assignment-7intekhab.netlify.app` |
   | `NEXT_PUBLIC_APP_URL` | `https://assignment-7intekhab.netlify.app` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `MONGODB_DB` | `bazardor` |
   | `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
   | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | From GitHub OAuth Apps |

6. Click **Deploy site** and wait for the build to finish.
7. Register the production callback URLs with the social providers (see [Social Login Setup](#-social-login-setup)).

> After changing any environment variable, trigger a new deploy from **Deploys → Trigger deploy → Deploy site**.

### Post-deployment Checklist

- [x] Home page, Category page and Product Details page load correctly
- [x] Sign Up and Sign In work with email/password, Google and GitHub
- [x] Protected routes redirect logged-out users to Sign In with a toast message
- [x] My Profile and Update Information pages work
- [x] Data loads from the API without console errors
- [x] Direct reload of dynamic routes (`/product/[slug]`, `/category/[slug]`) does not return a 404
- [x] Layout is responsive on mobile, tablet and desktop

---

## 🎨 Design Decisions

- **Figma-accurate UI** — colours, spacing, radii, shadows and typography were taken directly from the design tokens (`base-100/200/300`, `primary`, `error`, `success`).
- **Bangla-first** — Hind Siliguri font, Bangla numerals (`১,৮৫০`), Bangla dates in Bangladesh time, and Bangla units (কেজি, লিটার, ডজন, পিস).
- **Price colours** — following the Figma, a price **increase** is shown in red (▲) and a **decrease** in green (▼); unchanged prices are grey.
- **Server-first rendering** — pages fetch data on the server, authentication is checked on the server, and client components are used only where interaction is needed (menus, forms, sorting).
- **Accessible** — semantic HTML, labelled form fields, `aria` attributes on menus and breadcrumbs, and reduced-motion support for the ticker.

---

## 👤 Author

**Intekhab**
Computer and Communication Engineering, International Islamic University Chittagong (IIUC)

- GitHub: [@ahmedintekhab76-stack](https://github.com/ahmedintekhab76-stack)
- Repository: [Assignment-7](https://github.com/ahmedintekhab76-stack/Assignment-7)
- Live Demo: [assignment-7intekhab.netlify.app](https://assignment-7intekhab.netlify.app/)

---

