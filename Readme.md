# **Final Project - NextCommerce: A Next.js Shopping & Ordering Experience**  

## **Overview**  
Create **NextCommerce**, a modern, authentication-protected platform using **Next.js 15**, **Clerk**, and **Contentful CMS**. Users can browse featured items publicly and access the full catalog upon authentication. This project will test your ability to work with **authentication, CMS integration, and protected routes** while ensuring a seamless and visually appealing user experience.  

📌 **Items can be of your choice** – for example:  
- **E-Commerce Store** showcasing **merchandise, apparel, or tech products**.  
- **Restaurant Website** displaying a **menu with food and drink items**.  

In both cases:  
- **Public visitors see only a subset of items** on the home page.  
- **Authenticated users can view the full catalog and add items to their cart**
- **Content should be managed from Contentful CMS** so that it can be dynamically updated.  

---

## **Requirements**  

✅ **Public Access (No Login Required):**  
- **Home Page (`/`)** – Displays a **random selection** of featured items from Contentful.  
- **Login & Register Pages (`/login`, `/register`)** – Allows users to create an account or sign in.  
- **Call-To-Action (CTA)** on the home page encouraging users to log in for full access.  

🔒 **Authenticated Users Only:**  
- **All Products/Menu Page (`/products` or `/menu`)** – Displays the full product/menu list.  
- **Product/Menu Detail Page (`/products/:id` or `/menu/:id`)** – Shows detailed item information.  
- **Cart Page (`/cart`)** – Users can add/remove items.  

🔑 **Admin/Owner Features:**  
- **E-Commerce:** Admins can **add, update, or remove** products via Contentful CMS.  
- **Restaurant:** Restaurant owners can **add, update, or remove** menu items via Contentful CMS.  

💻 **Responsive** for Mobile + Web + Tablet. Minimalist/ Clean design.
* Have your own database (Postgres or MongoDB) to store all the registered users. Syn the Clerk data with your database (using Webhooks or middleware).


---

## **Tech Stack**  
- **Next.js 15 + TypeScript**  
- **Clerk (Authentication & Role Management)**  
- **Contentful (CMS for Products/Menu Items)**  
- **MongoDB (Sync User Data from Clerk)**  
- **Stripe (Payment Integration) (Bonus)**  
- **Tailwind CSS (UI & Styling)**  
- **Vercel (Hosting & Deployment)**  

---

## **Bonus Features**  
✨ **Stripe payment integration** for orders (optional but recommended).  
✨ **Set up CI/CD** for your project, so that every push you do on main, gets reflected on the live website.  

---

## **Component Libraries & UI Enhancements**  
To enhance UI and functionality, consider using:  
- **Shadcn/UI** – Prebuilt UI components with Tailwind integration.  
- **Aceternity UI** – Interactive UI elements.  
- **ReactBits** – Utility components for Next.js.  
- **Radix UI** – Accessible and customizable components.  
- **Lucide Icons** – Lightweight, customizable icons.  

---

## **Animation & UX Enhancements**  
- Use **GSAP, Framer Motion, AOS** to add smooth animations and transitions.  
- Implement **lazy loading & skeleton loaders** for improved UX.  

---

## **Submission Guidelines**  
* **Host the app on Vercel & present the live version**.
> If any issue with Vercel not allowing to connect with your repo, you can use the build folder and deploy it in Netlify or other hosting providers.    
* **Submit your URL via this form:** [here](https://forms.gle/tgF2Ukz87o6dC7ko9).  
* **Include a GitHub repo with a clear README (setup instructions required).** Be as technical as you can here. Diagrams are welcomed.   

---

## **Additional Notes**  
- **Presentation** – should start off with demo and then talk about structure and other stuff.  
- **Good design and clean code matter.** Keep it modular and maintainable.  
- Be creative! This is your **final project before the program project**—**give it your best!**  
> In your presentation, also show the data workflow on how data comes from CMS and into your app and database. 

---

## **Resources & Links**  
- [Contentful](https://www.contentful.com/)  
- [Clerk](https://clerk.com/)  
- [Next.js Minimal Store Template](https://github.com/leerob/next-minimal-store)
- [Galleo AI](https://www.usegalileo.ai/explore) for design inspiration.   
- [v0](https://v0.dev/) for design inspiration.   

🚀 **Good Luck! Make it count!**



