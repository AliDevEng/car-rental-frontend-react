# 🚗 MrRent Frontend

Modern frontend client for the MrRent Management System, built with **Next.js (App Router) + React + TypeScript + Tailwind CSS**.

## 📌 Project Info

- **Frontend Repo:** https://github.com/AliDevEng/car-rental-frontend-react.git
- **Backend API Repo:** https://github.com/AliDevEng/car-rental-api-net10.git
- **Backend API:** `http://localhost:7174`
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
NEXT_PUBLIC_API_BASE_URL=http://localhost:7174
NEXT_PUBLIC_APP_NAME=MrRent
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

Behavior:
- Uses a single backend base URL from `NEXT_PUBLIC_API_BASE_URL`.
- Adds `Authorization` bearer token from `localStorage` on authenticated requests.
- Handles `401` responses globally by clearing auth state and redirecting to `/login`.
- Uses `/auth/me` after login so the frontend stores the real authenticated user profile instead of relying on token parsing.
- Remembers the last successful backend in browser `localStorage`.

Current implemented frontend integrations include:

- `POST /customers/register`
- `POST /auth/login`
- `POST /auth/admin/login`
- `GET /auth/me`
- `GET /categories`
- `GET /categories/{id}`
- `GET /cars`
- `GET /cars/available`
- `GET /cars/{id}`
- `GET /customers/{id}`
- `PUT /customers/{id}`
- `GET /rentals/my`
- `PUT /rentals/{id}/cancel`

---

## 🧭 Development Status

- ✅ Iteration 1: Foundation setup complete
- ✅ Iteration 2: Categories and car browsing integration complete
- ✅ Iteration 3: Authentication and user context complete
- 🔄 Iteration 4: Booking and customer account workflow partially complete
- 📋 Next: Complete the remaining booking flow, then Iteration 5 admin management features

Detailed plan: `frontend-setup-instruction.md`

---

## 📝 Notes

- Keep browser-only logic inside client components/hooks using `"use client"`.
- Restart dev server after `.env` changes.
- Keep the backend running on `http://localhost:7174`.
- Public registration is customer-only; admin accounts are backend-managed (seed/manual process).

---

## 📝 Iteration Summary

### ✅ Iteration 1: Foundation (Completed)

- Next.js App Router structure is in place
- Tailwind CSS 4 is configured
- Base layout, routing, and shared providers are wired
- Axios API client is configured
- Environment-based backend URL setup is working

### ✅ Iteration 2: Categories and Car Browsing (Completed)

- Car and category types/services are integrated
- Homepage car browsing is connected to the backend
- Date-based availability search is implemented
- Sorting and filtering UX is implemented for car browsing
- Loading and error states are handled across car/category views

### ✅ Iteration 3: Authentication and User Context (Completed)

- Customer registration and customer/admin login are implemented
- `AuthContext` is wired globally via app providers
- Auth state persists in `localStorage`
- `/auth/me` is used after login to load the authenticated user profile
- Register form includes customer profile fields: first name, last name, phone, address, city, postal code, country
- Country dropdown, phone prefix defaulting, password rules, and password visibility toggles are implemented
- Protected route logic is in place for dashboard access
- Header auth state and logout flow are implemented

### 🔄 Iteration 4: Booking and Customer Account Workflow (In Progress)

Implemented so far:

- Customer dashboard/account page is implemented
- Dashboard includes tabs for profile information and bookings
- Customer profile can be viewed and updated
- Booking history view supports upcoming, active, past, and all bookings
- Future pending bookings can be cancelled according to backend rules
- Booking status badges use clearer colors for better UX
- Dashboard includes direct actions to return home and book again

Still remaining in this iteration:

- Complete the actual booking flow from car detail through booking creation
- Finalize any cart/booking state still planned for the original iteration

### 🎨 Iteration 5: Admin and Management Features (Planned)

- Admin-only routes and management views
- Car/category CRUD for admins
- Admin dashboard and role-based management features
