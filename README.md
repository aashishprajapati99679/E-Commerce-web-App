# E-Commerce-web-App

This is a complete MERN (MongoDB, Express, React, Node.js) Stack E-Commerce Web Application.

## Project Structure
- **frontend**: The user-facing storefront built with React + Vite + Tailwind CSS.
- **admin**: The administrative panel built with React + Vite + Tailwind CSS.
- **backend**: The Express Node.js API server handling MongoDB connection, authentication, and payments (Stripe/Razorpay/Cloudinary).

---

## Hosting on Vercel

This repository has been configured to be deployed easily to **Vercel**. Each sub-folder can be deployed as an independent project.

### 1. Deploying the Backend API
The backend is prepared to run as a serverless function on Vercel.
1. Sign in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project** and import this GitHub repository.
3. For the **Backend** project:
   - **Framework Preset**: Other (automatically detected)
   - **Root Directory**: `backend`
   - **Environment Variables**: Add all the keys from `backend/.env` (e.g. `MONGODB_URI`, `CLOUDINARY_API_KEY`, `CLOUDINARY_SECRET_KEY`, `CLOUDINARY_NAME`, `JWT_SECRET`, etc.).
4. Click **Deploy**. This will give you a backend production URL (e.g., `https://your-backend-api.vercel.app`).

### 2. Deploying the Frontend (Storefront)
1. In Vercel, click **Add New** > **Project** and import the same repository again.
2. For the **Frontend** project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `VITE_BACKEND_URL`: Set this to your production backend URL (e.g., `https://your-backend-api.vercel.app`). Do not add a trailing slash.
3. Click **Deploy**.

### 3. Deploying the Admin Panel
1. In Vercel, click **Add New** > **Project** and import the same repository again.
2. For the **Admin** project:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Environment Variables**:
     - `VITE_BACKEND_URL`: Set this to your production backend URL (e.g., `https://your-backend-api.vercel.app`). Do not add a trailing slash.
3. Click **Deploy**.
