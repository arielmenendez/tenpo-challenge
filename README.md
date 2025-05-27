# Tenpo Frontend Challenge

This is the solution for the Tenpo frontend technical challenge. The goal was to build a scalable React + TypeScript application with authentication, protected routes, public API consumption, and session handling.

## Tech Stack

* **React 19** with **Vite** + **TypeScript**
* **Zustand** – state management for auth
* **React Router DOM v6** – routing with protected routes
* **TanStack React Query** – data fetching
* **Axios** – HTTP client with token injection
* **react-infinite-scroll-component** – infinite scrolling
* **CSS** – native styling from Vite template

## Features

* Fake login screen with email and password
* Session management using a fake token stored in memory (Zustand)
* Protected home route that fetches and displays 2000 items from a public API (`jsonplaceholder.typicode.com/photos`)
* Infinite scroll implemented using `react-infinite-scroll-component`
* Axios interceptor sends the fake token on every request
* Logout button clears session and redirects to login
* Folder structure ready for future scaling (e.g. `features/auth`, `features/home`, `components/`, `api/`, etc.)

## Architecture

```
src/
├── api/               # Axios client and data services
├── components/        # Reusable UI components
├── features/
│   ├── auth/          # Login form and logic
│   └── home/          # Infinite scroll list
├── routes/            # AppRouter with public/private routes
├── store/             # Zustand auth store
├── App.tsx
└── main.tsx
```

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`

## Auth Logic

* On login, a fake token is stored in Zustand.
* All requests use an Axios interceptor to include the token in the Authorization header.
* Protected routes redirect unauthenticated users to `/login`.

## Data Fetching

* Data is fetched once from the public API using Axios.
* Infinite scrolling is simulated by slicing the 2000-element list locally into pages of 30.
* Image fallback uses `https://picsum.photos/seed/{id}` to avoid placeholder domain issues.

## Scalability

The application structure uses feature-based folders and keeps logic modular. New pages like password recovery (public) or user profile (private) can be easily added by extending the `features/` directory.

## Suggested Improvement

To improve performance in real-world applications, instead of fetching all 2000 items at once, it’s better to implement **backend-side pagination or infinite loading using query params** (`?page=1&limit=30`). This reduces payload size, memory usage, and improves load time.

---
