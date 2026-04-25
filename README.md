# 🌱 Sagar Agro Hub

**Sagar Agro Hub** is a beautifully designed, modern e-commerce platform bridging the gap between farmers and premium agricultural products. It allows users to flawlessly browse, purchase, and track fertilizers, completely authenticated and delivered straight to the farm.

---

## 🎯 Platform Features

1. **Guest Checkout Pipeline**: A frictionless shopping cart and COD checkout system allowing farmers to purchase without creating complicated user accounts.
2. **Automated Order Tracking**: Customers receive algorithmic delivery estimates (e.g. +5 days offset) and can live-track their box status using an Order ID and Email.
3. **Admin Dashboard**: A secure, JWT-authenticated backend routing system for store owners to manage product inventory, view live orders, and process "Shipped" status updates.
4. **Automated Nodemailer**: Real-time SMTP email dispatching that natively sends branded HTML receipts and contact inquiries straight to customer and admin inboxes.

---

## 🛠️ Tech Stack (The PERN Stack)

### Frontend
- **React 18 + Vite**: Lightning fast component rendering and dev-server build times.
- **TypeScript**: Strict interface typing to prevent runtime bugs.
- **Tailwind CSS + Shadcn UI**: Clean, dynamic, accessible user interfaces with premium layout styling.

### Backend
- **Node.js + Express.js**: The highly scalable REST API routing engine.
- **Express-Validator**: Middleware to sanitize inputs before saving to databases.
- **Helmet & Express-Rate-Limit**: DDOS and payload protection.

### Database
- **PostgreSQL**: Industry standard relational SQL database (Running natively via Neon.tech Serverless Cloud).
- **Sequelize ORM**: Translates JavaScript objects into secure SQL queries mapping Orders, Items, Products, and Admins.

---

## 🚀 Moving to Production

The application is completely configured for modern serverless deployment:
- Hardcoded localhost endpoints have been replaced with dynamic `import.meta.env.VITE_API_URL` routing.
- The Git repository is fully initialized. 

### Deployment Playbook
1. Ensure the backend is deployed to **Render** or **Railway** using the environment variables residing in `/server/.env`.
2. Connect the React frontend to **Vercel** or **Netlify** and assign `VITE_API_URL` to point to your live Render backend URL.

---

## 🏃‍♂️ How to Run Locally

### 1. Start the Backend
```bash
cd server
npm install
npm start
```
*Note: Make sure your `server/.env` file contains your active `DATABASE_URL`!*

### 2. Start the Frontend
Open a new terminal:
```bash
npm install
npm run dev
```

Visit `http://localhost:8080` to view the storefront!
