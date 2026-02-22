# 🚗 Car Rental Frontend - React + Next.js Setup Instructions

## 📋 Project Overview

This document is the **updated implementation guide** for the Car Rental frontend.

The project now uses **Next.js (App Router)** instead of Vite + React Router.

- **Project Name:** Car Rental Management System - Frontend Client
- **Frontend Repository:** https://github.com/AliDevEng/car-rental-frontend-react.git
- **Backend API:** https://github.com/AliDevEng/car-rental-api-net10.git

---

## 🎯 Current Tech Stack

| Category        | Technology              | Purpose                                 |
| --------------- | ----------------------- | --------------------------------------- |
| **Framework**   | Next.js 15 (App Router) | React framework, routing, build/runtime |
| **UI Library**  | React 19                | Component-based UI                      |
| **Language**    | TypeScript 5.9+         | Type safety                             |
| **Styling**     | Tailwind CSS 4          | Utility-first styling                   |
| **HTTP Client** | Axios                   | API communication                       |
| **Forms**       | React Hook Form + Zod   | Form handling + validation              |
| **Icons**       | Lucide React            | UI icons                                |
| **Linting**     | ESLint (Next config)    | Code quality                            |

---

## 🏗️ Updated Project Structure (Current)

```text
CarRental-frontend/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── cars/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── car/[id]/page.tsx
│   │   └── not-found.tsx
│   │
│   ├── views/                      # View components consumed by app routes
│   │   ├── Home.tsx
│   │   ├── Cars.tsx
│   │   ├── CarDetail.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── features/
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── categoriesService.ts
│   │   ├── carsService.ts
│   │   ├── authService.ts
│   │   └── bookingService.ts
│   │
│   ├── context/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── assets/
│
├── next.config.ts
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.json
├── .env
└── package.json
```

> Note: `src/pages` is intentionally unused/empty in this setup.

---

## 🔗 Backend API Integration

### Base Configuration

- **Backend API Base URL:** `https://localhost:7174`
- **Frontend Dev URL (Next default):** `http://localhost:3000`

### Available Endpoints (Phase 1)

```ts
GET / categories;
GET / categories / { id };
```

### Current Axios Base URL Pattern

The app uses:

```ts
process.env.NEXT_PUBLIC_API_BASE_URL;
```

configured in `.env`.

---

## ⚙️ Environment Variables

Use public Next env names for browser access:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7174
NEXT_PUBLIC_APP_NAME=Car Rental System
```

---

## ⚙️ Configuration Files (Current)

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#10B981",
        accent: "#F59E0B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

### `src/services/api.ts` (Axios)

```ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

---

## 🚀 Getting Started (Current)

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

### 3) Type check / lint / build

```bash
npm run type-check
npm run lint
npm run build
```

### 4) Run production server

```bash
npm run start
```

---

## 📝 Iteration Plan (Adjusted for Next.js)

### **ITERATION 1: Foundation (Completed)** ✅

- Next.js app router scaffolded
- Tailwind 4 configured
- Base layout (Header/Navbar/Footer/MainLayout)
- Environment variables configured
- Axios instance configured
- Core routes available: Home, Cars, Login, Register, Dashboard, CarDetail

### **ITERATION 2: Categories & Car Browsing** 🔄

Goal remains the same:

1. Finalize `Car` and `Category` interfaces
2. Implement `categoriesService`
3. Build `CategoryCard`, `CarCard`, `CarList`, `FilterSidebar`
4. Implement `useCategories` + loading/error states
5. Update `Home` and `Cars` views to consume real API data
6. Keep responsive/mobile-first behavior

### **ITERATION 3–5**

Auth, booking, and admin iterations remain valid with these adjustments:

- Use Next route files in `src/app/...`
- Use Next navigation (`next/link`, `next/navigation`) instead of React Router APIs
- Keep client-only logic (`localStorage`, auth context) in client components/hooks

---

## 🎨 Design System Notes

Current utility classes already match the intended palette and card/button styles:

- Primary actions: blue
- Secondary actions: outlined blue
- Cards: white + rounded + shadow

Global styles are now in:

- `src/app/globals.css`

---

## 🔧 Useful Commands

```bash
# Development
npm run dev

# Quality
npm run type-check
npm run lint

# Production
npm run build
npm run start
```

---

## 🐛 Common Issues (Next.js Edition)

### 1) CORS / HTTPS backend errors

- Ensure backend is running on `https://localhost:7174`
- Ensure backend CORS allows `http://localhost:3000`
- Verify `.env` contains `NEXT_PUBLIC_API_BASE_URL`

### 2) Env variable not updating

- Restart Next dev server after editing `.env`

### 3) Browser-only API errors (`localStorage` is undefined)

- Ensure the code runs in client context (`"use client"` components/hooks)
- Guard server-side execution where needed

### 4) Tailwind classes not applied

- Confirm `postcss.config.js` uses `@tailwindcss/postcss`
- Confirm `tailwind.config.js` content points at `./src/**/*`
- Restart dev server

---

## ✅ Success Criteria (Current)

Frontend is ready when:

- Categories are fetched and rendered from backend
- Cars can be browsed with filters
- Layout is responsive on mobile/tablet/desktop
- Loading and error states are implemented
- No TypeScript or lint errors
- `npm run build` succeeds

---

**Updated for the current Next.js architecture.**
