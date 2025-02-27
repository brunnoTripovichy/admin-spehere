## Project Overview

This project is a **full-stack web application** built with **Next.js** and **Supabase**, designed to showcase a modern and scalable approach to web development.

### Tech Stack

- **Frontend:** React, Tailwind CSS, Hero Icons
- **State Management & Data Fetching:** Redux Toolkit (RTK), React Query
- **Forms:** React Hook Form
- **API & Backend:** Next.js API routes with Supabase
- **HTTP Requests:** Axios

### Features

- Authentication & Authorization (if needed)
- REST API integration with Supabase
- Dynamic & Nested Routing with Breadcrumbs
- Optimistic UI Updates with React Query
- Responsive & Accessible UI

## Localization Overview  

This project uses **`react-i18next`** with **Next.js App Router** to support multilingual functionality efficiently. It ensures both **server-side** and **client-side** translations, making it scalable and performant.

### **🔹 Key Features**
- **SSR & SSG Ready** – Uses server-side translation loading for better SEO  
- **Multiple Namespaces** – Organizes translations by module  
- **URL-Based Language Detection** – Language is persisted in the URL  
- **Redux Integration** – Stores the current language globally  
- **Custom `I18nProvider`** – Provides a simple `useI18n()` hook for client components  

### **🛠 Implementation Overview**
1. **Server Components** use `useTranslation(lng, ns)` for translations  
2. **Client Components** use `useI18n()` from `I18nProvider`  
3. **Middleware** automatically redirects to the correct language  
4. **Redux** ensures global language persistence  

This setup ensures a **structured, efficient, and scalable** localization system for Next.js projects.
This project serves as both a **portfolio piece** and a **real-world example** of using modern web technologies effectively.
