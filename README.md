# 🚗 MrRent Frontend

Modern frontend client for the MrRent Management System, built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**.

## 📌 Project Info

- **Frontend Repo:** https://github.com/AliDevEng/car-rental-frontend-react.git
- **Backend API Repo:** https://github.com/AliDevEng/car-rental-api-net10.git
- **Backend APIs:** `.NET` (`https://localhost:7174`) and `Spring` (`http://localhost:8080`)
- **Local Frontend URL:** `http://localhost:3000`

---

## 🧰 Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9+
- Tailwind CSS 4
- Axios
- React Hook Form + Zod
- Lucide React
- react-phone-input-2
- country-list
- libphonenumber-js
- ESLint (Next.js config)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── cars/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── car/[id]/page.tsx
│   └── not-found.tsx
├── views/
├── components/
├── services/
├── context/
├── hooks/
├── types/
├── utils/
└── assets/
```

> `src/pages` is intentionally unused in this App Router setup.

---

## ⚙️ Environment Variables

Create `.env` in project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7174
NEXT_PUBLIC_API_BASE_URLS=https://localhost:7174,http://localhost:8080
NEXT_PUBLIC_APP_NAME=MrRent
```

`NEXT_PUBLIC_API_BASE_URLS` is optional but recommended. The frontend will try URLs in order and fall back automatically if the first backend is offline.

---

## ▶️ Run Locally

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## ✅ Quality & Build

```bash
npm run type-check
npm run lint
npm run build
npm run start
```

---

## 🔌 API Integration

Axios client is configured in:

- `src/services/api.ts`

Using:

```ts
process.env.NEXT_PUBLIC_API_BASE_URLS;
```

Behavior:
- Supports both single backend (`NEXT_PUBLIC_API_BASE_URL`) and multi-backend (`NEXT_PUBLIC_API_BASE_URLS`).
- Automatically retries with the next configured URL on network failure.
- Remembers the last successful backend in browser `localStorage` to speed up later loads.

Current implemented endpoints include category retrieval and authentication flows (customer register/login and admin login), with booking and admin modules planned in next iterations.

---

## 🧭 Development Status

- ✅ Iteration 1: Foundation setup complete
- ✅ Iteration 2: Categories and car browsing integration complete
- ✅ Iteration 3: Authentication and user context complete
- 🔄 Next: Iteration 4 booking/cart workflow, then Iteration 5 admin management features

Detailed plan: `frontend-setup-instruction.md`

---

## 📝 Notes

- Keep browser-only logic inside client components/hooks using `"use client"`.
- Restart dev server after `.env` changes.
- Keep one backend running at a time (`https://localhost:7174` or `http://localhost:8080`).
- Public registration is customer-only; admin accounts are backend-managed (seed/manual process).
