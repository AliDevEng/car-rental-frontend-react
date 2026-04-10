# 🚗 NextCar: Fullstack Car Rental & Admin Management System

![Next.js](https://img.shields.io/badge/Next.js-16.2.3-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.5-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

🚘 **Modern Car Rental Platform** | 📊 **Admin Dashboard** | ☕ **Java Spring Boot Backend**

Build a complete car rental experience with a polished customer journey, booking flow, and role-based management foundations.

## 🌟 Highlights

- ⚡ Fast and modern frontend with Next.js App Router
- 🔐 Authentication flow for customer and admin login
- 📅 Date-based car availability and booking UX
- 🧾 Customer dashboard with booking history and profile management
- 🎨 Responsive and clean Tailwind-based UI
- 🧠 Type-safe forms and validation with React Hook Form + Zod

## 🌐 Project Links

- 🔗 Frontend repo: https://github.com/AliDevEng/car-rental-frontend-react.git
- 🔗 Backend repo: https://github.com/AliDevEng/car-rental-api-net10.git
- 🖥️ Frontend local URL: `http://localhost:3000`
- ⚙️ Backend local API: `http://localhost:7174`

## 🧰 Frontend Stack

- ⚡ Next.js (App Router)
- ⚛️ React
- 🟦 TypeScript
- 🎨 Tailwind CSS
- 🔐 React Hook Form + Zod
- 🌍 Axios
- ✅ ESLint + Prettier

## 🛠️ Fullstack Architecture & Tech Stack

| Layer | Technology |
| --- | --- |
| Backend A | ☕ Java 21, Spring Boot 3, Spring Security, JPA/Hibernate |
| Backend B | 🔷 C# .NET (parallel implementation — same schema) |
| Frontend | ⚛️ React, Next.js, TypeScript (separate repo) |
| Database | 🐬 MySQL 8.0 (Docker) |
| Auth | 🔐 JWT (HMAC-SHA256), BCrypt |
| Build | 🔧 Maven |

## 🏗️ Project Structure

```text
src/
├── app/
├── components/
├── context/
├── hooks/
├── services/
├── types/
├── utils/
└── views/
```

## 🔐 Environment Variables

Create `.env` in project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:7174
NEXT_PUBLIC_APP_NAME=MrRent
```

## ▶️ Run Locally

```bash
npm install
npm run dev
```

## 🧪 Quality & Build

```bash
npm run type-check
npm run lint
npm run build
npm run start
```

## 📡 API Endpoints Integrated

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

## 📦 Installed Package Versions

### 🚀 Runtime Dependencies

| Package | Version |
| --- | --- |
| `@hookform/resolvers` | `5.2.2` |
| `axios` | `1.15.0` |
| `country-list` | `2.4.1` |
| `libphonenumber-js` | `1.12.41` |
| `lucide-react` | `1.8.0` |
| `next` | `16.2.3` |
| `react` | `19.2.5` |
| `react-dom` | `19.2.5` |
| `react-hook-form` | `7.72.1` |
| `react-phone-input-2` | `2.15.1` |
| `zod` | `4.3.6` |

### 🛠️ Dev Dependencies

| Package | Version |
| --- | --- |
| `@tailwindcss/postcss` | `4.2.2` |
| `@types/country-list` | `2.1.4` |
| `@types/node` | `25.6.0` |
| `@types/react` | `19.2.14` |
| `@types/react-dom` | `19.2.3` |
| `autoprefixer` | `10.4.27` |
| `eslint` | `9.39.4` |
| `eslint-config-next` | `16.2.3` |
| `eslint-config-prettier` | `10.1.8` |
| `eslint-plugin-prettier` | `5.5.5` |
| `postcss` | `8.5.9` |
| `prettier` | `3.8.2` |
| `tailwindcss` | `4.2.2` |
| `typescript` | `6.0.2` |
| `typescript-eslint` | `8.58.1` |

## 🛣️ Roadmap

- ✅ Foundation setup and frontend architecture
- ✅ Car browsing and category integration
- ✅ Authentication and user context
- 🔄 Complete booking creation flow
- 🔜 Admin management features (role-based routes and CRUD)

## 🤝 Contributing

Contributions are welcome for UI polish, feature hardening, and performance improvements.

1. Fork the repo
2. Create your feature branch
3. Commit your changes
4. Open a pull request

## 💬 Notes

- ESLint is pinned to compatible `9.x` because `10.x` currently conflicts with this Next.js lint stack.
- `useSearchParams()` routes are wrapped in `Suspense` for Next.js 16 prerender requirements.

## 💙 Support

If you like this project, drop a ⭐ on GitHub and share it with fellow devs! 🚀
