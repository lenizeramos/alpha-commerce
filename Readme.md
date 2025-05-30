> **Note:** This repository is a personal backup of coursework originally developed as part of my studies at Cornerstone College.  
> It was cloned from an institutional and private repository to preserve my contributions and development history.

# 🍴 Alpha Commerce: A Next.js Restaurant & Ordering Experience

---

## 📖 Overview

🔗 [Live Demo](https://unicareer.online)

**Alpha** is a modern, responsive, and authentication-protected restaurant web application built using **Next.js 15**.  
Public users can browse featured menu items, while authenticated users get full access to the entire catalog, detailed views, and a cart system.

Dynamic content is managed via **Contentful CMS**, and secure user authentication is handled with **Clerk**. Stripe integration enables online payments.

---

## 🚀 Features

### 👥 Public Access
- 🏠 Home page (`/`) – Displays featured items from Contentful
- 🔐 Login & Register pages (`/login`, `/register`)
- 📣 CTA encouraging users to log in for full access

### 🔓 Authenticated Users
- 📖 View full menu or product list (`/menu` or `/products`)
- 🍽️ View item details (`/menu/:id` or `/products/:id`)
- 🛒 Manage items in shopping cart (`/cart`)

### 🧑‍🍳 Admin Access via CMS
- Add, update, or remove menu items via Contentful dashboard

### 💳 Payment
- Stripe integration for secure payments (bonus feature)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15, React 19, TypeScript 
- **Authentication**: Clerk
- **CMS**: Contentful
- **Database**: MongoDB (via Prisma ORM)
- **Payments**: Stripe
- **UI & Styling**: Tailwind CSS, Sass, PostCSS, Autoprefixer 
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Hosting**: Vercel
- **Icons**: Lucide React, React Icons
- **Other**: Swiper, Svix (webhooks)

---

## 🧪 Development & Scripts

```bash
npm install     # Install all dependencies listed in package.json
npm run dev     # Start dev server (Turbopack)
npm run build   # Create production build
npm run start   # Start production server
npm run lint    # Run linter
```

---

## 🪪 License

This repository is for educational purposes only. Not intended for commercial use or distribution.
