# 🛖 Craftfolio — Frontend Client

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-v5-5A0EF8?logo=daisyui)
![Better Auth](https://img.shields.io/badge/Better--Auth-v1-green)

The Next.js 15 App Router frontend for **Craftfolio** — a marketplace for handmade artisan goods. Built in strict TypeScript with Tailwind v4, DaisyUI v5, and Better-Auth.

---

## ✨ Key Features

### 🏠 Homepage
- **Auto-playing HeroBanner** with 3 slides, prev/next controls, and animated text
- **Featured Items** grid fetched live from `/items/featured` with skeleton loaders
- **Categories Grid** — 6 craft categories with hover-reveal descriptions
- **How It Works** — 4-step process visualization
- **Statistics** — live data from `/stats` rendered with **Recharts BarChart**
- **Testimonials** — 3 verified buyer reviews
- **CTA Section** — gradient banner with dual CTAs

### 🔍 Explore (`/explore`)
- Full-text search by title, description, category, seller name
- Category filter pills (9 categories)
- Sort: Newest / Highest Rated / Price Asc / Price Desc
- Expandable price range filter (min/max)
- Paginated results (12 per page)

### 📦 Item Detail (`/items/[id]`)
- Full-bleed image, price, description, tags, seller info
- Review list with authenticated delete
- Review submission form with 1–5 star rating

### 🔐 Authentication (Better-Auth)
- Email/password login and registration with Google OAuth
- Protected routes: `/items/add`, `/items/manage` via Next.js middleware
- Demo credentials visible on login page

### 🧺 Seller Dashboard
- **Add Item** (`/items/add`) — full form with all fields
- **My Items** (`/items/manage`) — listing with edit/delete
- **Edit Item** (`/items/edit/[id]`) — pre-filled form, owner-verified

### 📄 Static Pages
- **About** — brand story, values, team
- **Contact** — contact info + message form

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 15 | App Router, SSR, Routing |
| TypeScript | Strict | Type Safety |
| Tailwind CSS | v4 | Styling |
| DaisyUI | v5 | UI Components |
| Better-Auth | latest | Authentication |
| MongoDB | Native | DB Adapter |
| Recharts | latest | Charts |
| React Hook Form | latest | Forms |
| React Hot Toast | latest | Notifications |
| Animate.css | latest | Transitions |
| Lucide React | latest | Icons |

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#6366F1` | Indigo — main brand color |
| Secondary | `#F59E0B` | Amber — accents |
| Accent | `#10B981` | Emerald — success |
| Foreground | `#1F2937` | Gray-800 — text |
| Font Sans | Inter | Body text |
| Font Display | Outfit | Headings |

---

## ⚙️ Environment Setup

Create `.env.local` in the root directory:

```env
BETTER_AUTH_SECRET=your_secret_here_min_32_chars_long
BETTER_AUTH_URL=http://localhost:3000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
ADMIN_EMAIL=admin@craftfolio.com
ADMIN_PASSWORD=Admin@1234
```

---

## 💻 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Credentials

| Role  | Email | Password |
|-------|-------|---------|
| User  | demo@craftfolio.com | Demo@1234 |
| Admin | admin@craftfolio.com | Admin@1234 |
