# 🚗 Car Rental Frontend

Modern frontend client for the Car Rental Management System, built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**.

## 📌 Project Info

- **Frontend Repo:** https://github.com/AliDevEng/car-rental-frontend-react.git
- **Backend API Repo:** https://github.com/AliDevEng/car-rental-api-net10.git
- **Backend Base URL:** `https://localhost:7174`
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
- ESLint (Next.js config)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx
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
NEXT_PUBLIC_APP_NAME=Car Rental System
```

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
process.env.NEXT_PUBLIC_API_BASE_URL;
```

Current implemented endpoints include category retrieval, with additional modules prepared for cars, auth, and booking flows.

---

## 🧭 Development Status

- ✅ Iteration 1: Foundation setup complete
- 🔄 Iteration 2: Categories and car browsing integration
- 🔜 Next: Authentication, booking workflow, dashboard/admin features

Detailed plan: `frontend-setup-instruction.md`

---

## 📝 Notes

- Keep browser-only logic inside client components/hooks using `"use client"`.
- Restart dev server after `.env` changes.
- Backend should be running on `https://localhost:7174` during local development.
