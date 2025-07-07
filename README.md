# 🛠️ Workshop Booking System

A full-stack system to manage workshop bookings. Admins can create workshops with time slots and monitor bookings via a dashboard. Customers can register, browse workshops, and book time slots.

---

## 🌐 Live Demo

- [[Customer Site URL]](https://workshop-frontend-flame.vercel.app/my-bookings)
- [[Admin Panel URL](https://workshop-frontend-flame.vercel.app/admin/)](#) *(replace with your link)*

---

## 📜 Features

✅ Customer Features
- User registration & login (JWT)
- Browse workshops & available time slots
- Make bookings
- Booking confirmation with unique ID

✅ Admin Features
- Secure admin login (JWT)
- Dashboard with analytics (Recharts)
- Create/manage workshops & time slots
- View & update bookings

✅ Backend Features
- PostgreSQL with Prisma
- Express.js with clean architecture
- Rate limiting with Redis
- Zod for validation
- JWT Auth
- Soft deletion
- Pagination & filtering
- Testing with Jest & Supertest

---

## 🏗️ Tech Stack

**Frontend:**
- React + React Router
- Redux Toolkit
- Tailwind CSS (Customer)
- Material-UI (Admin)
- Recharts
- Framer Motion

**Backend:**
- Node.js + Express.js
- PostgreSQL + Prisma
- Redis (ioredis)
- Zod for validation
- JWT Auth
- Jest + Supertest

---

## 📦 Monorepo Structure Example

## 🗺️ API ROUTES (Express)

---

### ✅ User Routes

| Method | Path            | Auth   | Description                     |
| ------ | ---------------- | ------ | ------------------------------- |
| POST   | /api/users       | Public | Register new user               |
| POST   | /api/users/login | Public | Login for users/admins          |
| GET    | /api/users       | Auth   | Get logged-in user info         |

---

### ✅ Workshop Routes

| Method | Path                    | Auth   | Description                                  |
| ------ | ----------------------- | ------ | -------------------------------------------- |
| POST   | /api/workshops          | Admin  | Create workshop                              |
| PATCH  | /api/workshops/:id      | Admin  | Update workshop                              |
| DELETE | /api/workshops/:id      | Admin  | Soft delete workshop                         |
| GET    | /api/workshops/:id      | Auth   | Get single workshop                          |
| GET    | /api/workshops          | Auth   | Get all active workshops with slots          |

---

### ✅ Time Slot Routes

| Method | Path                                               | Auth   | Description                                  |
| ------ | -------------------------------------------------- | ------ | -------------------------------------------- |
| POST   | /api/time-slots                                    | Admin  | Create time slot                             |
| PATCH  | /api/time-slots/:id                                | Admin  | Update time slot                             |
| DELETE | /api/time-slots/:id                                | Admin  | Soft delete time slot                        |
| GET    | /api/time-slots/:id                                | Auth   | Get single time slot                         |
| GET    | /api/time-slots                                    | Auth   | Get all time slots                           |
| GET    | /api/time-slots/time-slot-workshop/:workshopId     | Auth   | Get time slots for a workshop                |

---

### ✅ Booking Routes

| Method | Path                                 | Auth   | Description                                  |
| ------ | ------------------------------------ | ------ | -------------------------------------------- |
| POST   | /api/bookings                        | User   | Create booking                               |
| PATCH  | /api/bookings/:id                    | Auth   | Update booking status                        |
| DELETE | /api/bookings/:id                    | Auth   | Soft delete booking                          |
| GET    | /api/bookings/:id                    | Auth   | Get single booking                           |
| GET    | /api/bookings                        | Admin  | Get all bookings (pagination/filter)         |
| GET    | /api/bookings/current-user/books     | Auth   | Get bookings for logged-in customer          |
| GET    | /api/bookings/analytics              | Admin  | Analytics data for dashboard                 |

---
