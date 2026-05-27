# E-Commerce Web Application (MERN Stack)

A fully featured, responsive E-Commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Stripe, Razorpay, and Cloudinary integrations. 

This repository is split into three main parts:
* **Frontend**: Customer storefront application.
* **Admin**: Administration dashboard for managing products, categories, and orders.
* **Backend**: RESTful API server.

---

## 🔗 Live Deployments

| Component | Live Link |
| :--- | :--- |
| ** Customer Storefront** | [https://ecommerce-storefront-virid.vercel.app](https://ecommerce-storefront-virid.vercel.app/) |
| ** Admin Dashboard** | [https://ecommerce-admin-brown-gamma.vercel.app](https://ecommerce-admin-brown-gamma.vercel.app/) |
| ** Backend API Server** | [https://ecommerce-backend-api-three.vercel.app](https://ecommerce-backend-api-three.vercel.app/) |

---

##  Features

###  Customer Storefront (`/frontend`)
- **Responsive UI/UX**: Optimized for mobile, tablet, and desktop screens using Tailwind CSS.
- **Product Catalog**: Browse, search, filter, and sort products by categories and price.
- **Cart Management**: Add, update, and remove products from the cart with persistence.
- **Checkout Integrations**: Secure payment processing utilizing COD, Stripe, and Razorpay.
- **Order Tracking**: Customers can check the status and history of their orders.

###  Admin Dashboard (`/admin`)
- **Product Management**: Add new products (with multiple image uploads), view product list, and remove products.
- **Order Fulfilment**: View all orders placed across the system and update order status (e.g. *Order Placed, Packing, Shipped, Out for Delivery, Delivered*).
- **Secure Access**: Admin authentication middleware preventing unauthorized entry.

###  Backend API (`/backend`)
- **Serverless Ready**: Built with Express and fully configured for Vercel Serverless Functions.
- **Cloudinary Integration**: Handles multipart image uploads and serves optimized product assets.
- **Database Access**: MongoDB Atlas database integration.

---

##  Tech Stack

- **Frontend & Admin**: React (Vite), React Router DOM, Axios, React Toastify, Tailwind CSS
- **Backend API**: Node.js, Express.js, Mongoose, Multer (file handling), Cloudinary SDK
- **Database**: MongoDB Atlas
- **Payments**: Stripe SDK, Razorpay SDK

---

##  Environment Configurations

To run this project locally or configure it on Vercel, you need to set up the following environment variables:

### 1. Backend (`/backend/.env`)
```env
MONGODB_URI = "your-mongodb-atlas-uri"
CLOUDINARY_API_KEY = "your-cloudinary-api-key"
CLOUDINARY_SECRET_KEY = "your-cloudinary-api-secret"
CLOUDINARY_NAME = "your-cloudinary-cloud-name"
JWT_SECRET = "your-jwt-signing-secret"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "secure-admin-password"
