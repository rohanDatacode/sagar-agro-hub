# 🌱 Sagar Agro Hub

**Sagar Agro Hub** is a comprehensive e-commerce and information platform designed for agricultural products. It connects farmers and customers with high-quality agro-products like fertilizers, growth promoters, and water-soluble solutions.

---

## 🎯 Purpose of the Project
The main goal of this project is to digitalize the agricultural product business by providing:
1.  **Product Showcase**: A beautiful catalog of agricultural products.
2.  **Admin Management**: A secure dashboard for store owners to manage products and view inquiries.
3.  **Customer Connection**: A direct channel for customers to contact the business via a dynamic Contact Us form.

---

## 🔄 Process Flow
This is a full-stack application (Frontend + Backend + Database).

### 1. Admin Workflow
*   **Login**: The admin logs in securely at `/admin/login`.
*   **Authentication**: The backend verifies credentials and issues a secure **JWT Token**.
*   **Dashboard**: The admin is redirected to the Dashboard to view stats and recent inquiries.
*   **Product Management**: The admin can **Add, Edit, and Delete** products dynamically. These changes are instantly reflected on the website.
*   **Inquiries**: The admin can view messages submitted by customers.

### 2. Customer Workflow
*   **Browse**: Customers visit the website to view products. The product list is fetched in real-time from the database.
*   **Search & Filter**: Customers can filter products by category.
*   **Contact**: Customers go to the **Contact Us** page (`/contact`) to send a message.
*   **Submission**: The form data is sent to the backend API and saved in the **SQLite Database**.

---

## 🛠️ Tech Stack & Technologies Used

### Frontend (Client-Side)
*   **React + Vite**: For a blazing fast, modern user interface.
*   **TypeScript**: Ensures type safety and fewer bugs.
*   **Tailwind CSS**: For beautiful, responsive styling.
*   **Shadcn UI**: For premium, accessible UI components.
*   **Lucide React**: For modern icons.

### Backend (Server-Side)
*   **Node.js**: The runtime environment for the server.
*   **Express.js**: The web framework for handling API requests.
*   **Sequelize**: An ORM to interact with the database easily.
*   **SQLite**: A lightweight, file-based SQL database.

### Security
*   **BCrypt**: Encrypts passwords so they are never stored in plain text.
*   **JWT (JSON Web Tokens)**: Securely handles user sessions.
*   **CORS**: Protects the API but allows flexible local development.
*   **Protected Routes**: Sensitive actions (like creating admins or modifying products) are protected by secret keys and tokens.

---

## 🚀 Future Enhancements
We have now implemented the core Product Management system. Here is what is planned next:
1.  **Payment Gateway**: Integrate Razorpay or Stripe to allow customers to buy products online.
2.  **Email Notifications**: Automatically email the admin when a new inquiry is received.
3.  **Order Management**: A full system to track customer orders and delivery status.
4.  **Cloud Deployment**: Hosting the app on Vercel (Frontend) and Render/Railway (Backend) for global access.

---

## 🏃‍♂️ How to Run Locally

### 1. Start the Backend
```bash
cd server
npm install  # First time only
npm start
```

### 2. Start the Frontend
Open a new terminal:
```bash
npm install  # First time only
npm run dev
```

Visit `http://localhost:5173` to see the app!
