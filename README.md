# 🚗 Car Rental Frontend

Modern frontend client for the Car Rental Management System, built with **React + Next.js (App Router) + TypeScript + Tailwind CSS**.

## 📌 Project Info

- Frontend: https://github.com/AliDevEng/car-rental-frontend-react.git
- Backend API: https://github.com/AliDevEng/car-rental-api-net10.git
- Backend base URL: `https://localhost:7174`
- Frontend dev URL: `http://localhost:3000`

---

## 🧰 Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9+
- Tailwind CSS 4
- Axios
- React Hook Form + Zod
- Lucide React

---

## 📁 Current Structure

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

---

## ⚙️ Environment Variables

Create `.env`:

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

Start development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Quality and build commands:

```bash
npm run type-check
npm run lint
npm run build
npm run start
```

---

## 🔌 API Integration

Axios is configured in `src/services/api.ts` using:

```ts
process.env.NEXT_PUBLIC_API_BASE_URL;
```

Current phase endpoint:

- `GET /categories`
- `GET /categories/{id}`

---

## 🧭 Development Status

- ✅ Iteration 1 (Foundation) completed with Next.js architecture
- 🔄 Iteration 2 in progress (categories, car browsing, filters)
- 🔜 Iteration 3–5 (auth, booking, admin)

Detailed implementation plan is documented in `frontend-setup-instruction.md`.

---

## 🚀 Push to GitHub

If this folder is not a git repo yet:

```bash
git init
git add .
git commit -m "chore: migrate frontend to Next.js app router"
git branch -M main
git remote add origin https://github.com/AliDevEng/car-rental-frontend-react.git
git push -u origin main
```

If remote `origin` already exists:

```bash
git remote set-url origin https://github.com/AliDevEng/car-rental-frontend-react.git
git push -u origin main
```

---

## 📝 Notes

- `src/pages` is intentionally unused (App Router project).
- Keep browser-only logic in client components/hooks (`"use client"`).
- Restart dev server after changing `.env`.
