# Comfortly Admin Dashboard

## 📌 Overview
The **Comfortly Admin Dashboard** is a web-based admin panel built with **Next.js, TypeScript, and Tailwind CSS**. It allows administrators to manage customer orders, update statuses, and view order details in real time. This dashboard is integrated with **Sanity.io** as a backend for content and order management.

## 🚀 Features
- **Real-time Order Management**: Fetch and display all orders from **Sanity**.
- **Status Updates**: Admins can change order status (Pending, Shipped, Delivered).
- **Order Details View**: Click on an order to view its details.
- **Search & Filters**: Filter orders based on status.
- **Secure Admin Login**: Protect the dashboard with an admin login system.
- **Responsive UI**: Fully optimized for desktop and mobile.
- **Animations & Enhanced UI**: Improved aesthetics with smooth transitions.

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Sanity.io (CMS & database)
- **Authentication**: LocalStorage-based admin authentication
- **UI Enhancements**: Framer Motion for animations, SweetAlert2 for alerts

## 📂 Folder Structure
```
comfortly-admin-dashboard/
│-- app/
│   ├── components/      # Reusable UI components
│   ├── admin/
│   │   ├── dashboard/   # Orders listing & management
│   │   ├── login.tsx    # Admin login page
│-- sanity/              # Sanity client setup
│-- public/              # Static assets
│-- pages/               # Next.js pages
│-- styles/              # Global styles
│-- .next/               # Build output
```

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/comfortly-admin-dashboard.git
cd comfortly-admin-dashboard
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Configure Sanity Backend
- Ensure your **Sanity project** is set up.
- Update the `sanity.config.ts` with your **Sanity project ID**.

### 4️⃣ Run the Development Server
```sh
npm run dev  # or yarn dev
```
Access the dashboard at `http://localhost:3000`

## 🔑 Admin Login Credentials
```
Email: admin@gmail.com
Password: admin123
```

## 📜 Usage Guide
- **Login**: Navigate to `/admin/login` and enter credentials.
- **View Orders**: The dashboard displays all customer orders.
- **Change Order Status**: Select a new status from the dropdown.
- **Delete Orders**: Click on the delete button to remove an order.

## 🎨 UI Enhancements
- **Comfortly Theme**: Custom colors, typography, and branding.
- **Animations**: Smooth transitions using Framer Motion.
- **Responsive Design**: Optimized for mobile and desktop.

## 💡 Future Improvements
- Connect to a main website for centralized data management.
- Advanced analytics and reports.
- Role-based authentication for better security.

## 🤝 Contributing
Feel free to submit issues or PRs to enhance this dashboard!

## 📜 License
This project is **open-source** under the MIT License.

