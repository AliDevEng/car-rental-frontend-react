# 🚗 MrRent Frontend - Setup and Iteration Guide

## 📋 Project Overview

This document tracks the current implementation status of the MrRent frontend.

- Project Name: MrRent Management System - Frontend Client
- Frontend Repository: https://github.com/AliDevEng/car-rental-frontend-react.git
- Backend API: https://github.com/AliDevEng/car-rental-api-net10.git
- Frontend Stack: Next.js App Router (not Vite + React Router)

---

## 🎯 Current Tech Stack

| Category | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | React framework, routing, build/runtime |
| UI Library | React 19 | Component-based UI |
| Language | TypeScript 5.9+ | Type safety |
| Styling | Tailwind CSS 4 | Utility-first styling |
| HTTP Client | Axios | API communication |
| Forms | React Hook Form + Zod | Form state + validation |
| Icons | Lucide React | UI icons |
| Country/Phone UX | react-phone-input-2 + country-list + libphonenumber-js | Country and phone input handling |
| Linting | ESLint (Next config) | Code quality |

---

## 🏗️ Project Structure (Current)

```text
CarRental-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── providers.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── cars/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── car/[id]/page.tsx
│   │   └── not-found.tsx
│   ├── views/
│   ├── components/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── assets/
├── next.config.ts
├── next-env.d.ts
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.json
├── .env
└── package.json
```

Note: `src/pages` is intentionally unused/empty.

---

## 🔗 Backend API Integration

### 🌐 Base URLs

- Backend API Base URL: `https://localhost:7174`
- Frontend Dev URL: `http://localhost:3000`

### 🔐 Auth Endpoints in Use

- `POST /auth/register` (customer registration)
- `POST /auth/login` (customer login)
- `POST /auth/admin/login` (admin login)

### 📦 Categories Endpoints in Use

- `GET /categories`
- `GET /categories/{id}`

### ⚙️ Axios Base URL Pattern

The app uses:

```ts
process.env.NEXT_PUBLIC_API_BASE_URL;
```

Configured in `.env` and expected to point to `https://localhost:7174`.

---

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7174
NEXT_PUBLIC_APP_NAME=MrRent
```

---

## 🛠️ Configuration Reference

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

### `src/services/api.ts` (summary)

- Adds `Authorization` bearer token from localStorage on requests
- Handles `401` globally by clearing auth and redirecting to `/login`

---

## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

### 3️⃣ Type check, lint, build

```bash
npm run type-check
npm run lint
npm run build
```

### 4️⃣ Run production server

```bash
npm run start
```

---

## 📝 Iteration Plan Status

### ✅ ITERATION 1: Foundation (Completed)

- Next.js app router scaffolded
- Tailwind 4 configured
- Base layout and routing created
- Environment variables configured
- Axios instance configured

### ✅ ITERATION 2: Categories and Car Browsing (Completed)

- Core car/category types and services integrated
- Category and car browsing views connected to backend
- Loading and error states implemented

### ✅ ITERATION 3: Authentication and User Context (Completed)

Implemented:

1. Auth types and user typing finalized
2. `authService` implemented for login/register/logout
3. `AuthContext` and `useAuth` wired globally via `providers.tsx`
4. Login/Register forms built with RHF + Zod
5. JWT integration with localStorage persistence
6. Protected route logic for dashboard
7. Header auth state and logout UI
8. Auth loading/error handling across flows

Additional auth/register details:

- Register includes customer profile fields: first name, last name, phone, address, city, postal code, country
- Country dropdown contains complete country list (`country-list`)
- Country selection auto-sets default phone prefix (`libphonenumber-js`)
- Phone prefix remains editable for edge cases (country differs from phone number country)
- Password rules and live checker:
  - minimum 6 characters
  - at least one uppercase letter
  - at least one number
- Show/hide password toggles added for password fields

Backend compatibility fix:

- Auth service handles both nested and flat auth response DTOs to avoid false frontend failures when backend returns `201 Created`.

### 🔄 ITERATION 4: Booking and Cart Functionality (Next)

1. Finalize booking types
2. Implement booking service
3. Create `CartContext` and `useCart`
4. Build booking/cart UX
5. Integrate booking history into dashboard

### 🎨 ITERATION 5: Admin and Management Features (Planned)

1. Add admin-only routes and management UI
2. Implement car/category CRUD for admins
3. Add admin dashboard and role-based access checks

---

## 🛡️ Security and Access Notes

- Public frontend registration is customer-only.
- Admin registration endpoint does not exist by design.
- Admin accounts must be seeded/created outside public API (backend-controlled).

---

## 🐛 Common Issues

### 1️⃣ CORS / HTTPS backend errors

- Ensure backend runs on `https://localhost:7174`
- Ensure backend CORS allows `http://localhost:3000`
- Verify `.env` has `NEXT_PUBLIC_API_BASE_URL`

### 2️⃣ Env variable changes not applied

- Restart Next dev server after editing `.env`

### 3️⃣ Browser-only API errors (`localStorage` undefined)

- Keep localStorage usage in client components/hooks only

### 4️⃣ Styling not applied

- Confirm Tailwind/PostCSS config files are correct
- Restart dev server after config changes

---

## ✅ Success Criteria (Current)

Frontend is considered stable when:

- Categories and cars are rendered from backend
- Authentication flows work end-to-end for register/login
- Protected routes redirect correctly for unauthenticated users
- Register UX supports country + phone requirements
- No TypeScript or lint errors
- `npm run build` succeeds

Updated for current Next.js architecture and current auth implementation.
