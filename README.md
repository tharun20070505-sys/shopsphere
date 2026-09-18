# ShopSphere – Simple MERN E-Commerce Application

ShopSphere is a clean, intermediate-level, portfolio-ready E-Commerce web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with Tailwind CSS.

The application features a realistic inventory of **100+ products** across **10 shopping categories**, JWT authentication with role-based access (**CUSTOMER** and **ADMIN**), a persistent shopping cart and wishlist, order placement with **100% Cash on Delivery (COD)**, order tracking and cancellations, and an **Admin Management Dashboard**.

---

## Technology Stack

### Frontend
- **React.js** (v18 via Vite)
- **React Router DOM** (v6 client-side routing)
- **Axios** (centralized HTTP client with JWT interceptors)
- **Tailwind CSS** (clean, modern styling & responsive design)
- **React Icons** (Feather and FontAwesome icons)
- **React Toastify** (toast notifications for cart, orders, and errors)

### Backend
- **Node.js** & **Express.js** (REST API)
- **MongoDB** & **Mongoose** (ODM with schemas, indexes, and aggregation pipelines)
- **JWT (jsonwebtoken)** (Stateless token-based authentication)
- **bcryptjs** (Password hashing)
- **cookie-parser** & **cors** & **dotenv**

> **Note on Payment**: There are **NO external payment gateways** (no Stripe, Razorpay, or PayPal). All purchases are completed exclusively via **Cash on Delivery (COD)**.

---

## Project Structure

```text
ShopSphere/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── models/
│   │   ├── User.js               # Customer and Admin schema
│   │   ├── Product.js            # 100+ product catalog schema
│   │   ├── Category.js           # 10 shopping categories
│   │   ├── Cart.js               # User cart with quantity & stock
│   │   ├── Order.js              # COD orders and status tracking
│   │   └── Review.js             # Customer ratings & reviews
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Me, Profile, Wishlist
│   │   ├── productController.js  # Search, Category Filter, Sort, Pagination
│   │   ├── categoryController.js # CRUD for categories
│   │   ├── cartController.js     # Add, update quantity, remove, clear
│   │   ├── orderController.js    # Create COD order, get orders, cancel
│   │   ├── reviewController.js   # Add, edit, delete reviews
│   │   └── adminController.js    # Dashboard stats, user & order management
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT bearer token verification
│   │   └── adminMiddleware.js    # Admin role guard
│   ├── seed/
│   │   └── seedData.js           # Seeds 10 categories, 11 users, 100 products, 50 reviews, 20 orders
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Responsive navigation, cart & wishlist counters, search
│   │   │   ├── Footer.jsx        # Brand links, COD assurance badge, demo accounts
│   │   │   ├── ProductCard.jsx   # Product card with badges, rating, add-to-cart, wishlist
│   │   │   ├── ProductList.jsx   # Responsive grid with skeletons and empty states
│   │   │   └── ProtectedRoute.jsx# Route protection & admin role guard
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Hero section, categories, featured & latest items
│   │   │   ├── Products.jsx      # Search, category filter pills, price sorting, pagination
│   │   │   ├── ProductDetails.jsx# Details, stock indicator, quantity, customer reviews
│   │   │   ├── Login.jsx         # Authentication with 1-click demo buttons
│   │   │   ├── Register.jsx      # Customer registration with default address
│   │   │   ├── Cart.jsx          # Cart items, quantity controls, subtotal & shipping
│   │   │   ├── Wishlist.jsx      # Saved items grid
│   │   │   ├── Checkout.jsx      # Shipping address form & COD confirmation
│   │   │   ├── Orders.jsx        # Customer order history & cancellation for PLACED orders
│   │   │   ├── Profile.jsx       # View and update user profile & address
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx # 4 metric cards, low stock alerts, status chart
│   │   │       ├── Products.jsx  # Inventory data table with search, edit, delete
│   │   │       ├── AddProduct.jsx# Add / edit product form with image preview
│   │   │       ├── Categories.jsx# Category table + add / edit modal
│   │   │       ├── Users.jsx     # Registered users list with role badges
│   │   │       └── Orders.jsx    # Orders table with status selector dropdown
│   │   ├── context/
│   │   │   ├── AuthContext.jsx   # User, token, login, logout, profile
│   │   │   └── CartContext.jsx   # Cart, wishlist, item counters, price totals
│   │   ├── services/
│   │   │   └── api.js            # Axios client with auth interceptor
│   │   ├── App.jsx               # Routes and layout
│   │   └── main.jsx              # React DOM entry point
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/shopsphere
JWT_SECRET=shopsphere_secret_jwt_key_2026_intermediate_portfolio
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

---

## Installation & Setup

### 1. Clone the repository and install dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

---

## Database Seeding (100 Realistic Products)

Populate your database with the complete dataset:
- **10 Categories**: Electronics, Mobile Phones, Laptops, Headphones, Cameras, Men's Clothing, Women's Clothing, Shoes, Home & Kitchen, Books
- **11 Users**: 1 Administrator + 10 realistic Customers (with hashed passwords)
- **100 Products**: Authentic brands (Apple, Sony, Samsung, Nike, Bose, Canon, etc.), unique images, realistic prices, stock levels (including low-stock items), and ratings
- **50 Reviews**: Distributed ratings and feedback from verified buyers
- **20 Sample Orders**: All using Cash on Delivery with various statuses

Run from `backend/`:
```bash
npm run seed
```

**Output:**
```text
Categories: 10
Users: 11
Products: 100
Reviews: 50
Orders: 20

Seed completed successfully.
```

---

## Running the Application

### Start Backend API Server
```bash
cd backend
npm run dev   # or npm start
```
*The server will start on `http://localhost:5001`.*

### Start Frontend Dev Server
```bash
cd frontend
npm run dev
```
*The React app will be accessible at `http://localhost:5173`.*

---

## Demo Login Credentials

The application includes convenient **1-click quick login buttons** on the Login page (`/login`):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@shopsphere.com` | `Admin@123` |
| **Customer** | `alex.johnson@example.com` | `Customer@123` |

---

## Application Features

### Customer Features
1. **Browse Catalog**: Explore 100+ realistic products with smooth hover effects, stock badges, and pricing discounts.
2. **Search**: Search across titles and brands in real-time (`?search=Sony`).
3. **Filter**: Filter by department/category with interactive pills.
4. **Sort**: Order by Price (Low to High, High to Low) or Newest Arrivals.
5. **Pagination**: Browse 12 products per page with numbered page buttons.
6. **Product Details**: Image preview, brand, rating breakdown, stock status, and quantity selector.
7. **Customer Reviews**: Verified buyer ratings (1 to 5 stars) and comments. Authenticated users can write, edit, and delete their reviews.
8. **Cart Management**: Add items, update quantities with stock validation, remove items, or clear cart.
9. **Wishlist**: Toggle products in/out of wishlist with instant navbar counter badge.
10. **Cash on Delivery Checkout**:
    - Validate shipping address (Name, Phone, Address, City, State, Pincode).
    - Automatic stock validation.
    - Zero online payment risks.
    - Automatic stock deduction upon order confirmation.
    - Automatic cart clearance.
11. **Order Tracking & Cancellation**: View order history, item breakdowns, total due, and cancel any order with status `PLACED`.
12. **Profile Management**: Update name, phone, and delivery address.

### Admin Features
1. **Admin Dashboard**:
   - 4 Summary Cards: Total Products, Registered Users, Total Orders, Total Revenue.
   - Low Stock Alert Table: Products with `stock < 10` for quick reordering.
   - Orders Status Distribution: Visual progress bars for PLACED, CONFIRMED, SHIPPED, DELIVERED, and CANCELLED.
   - Recent Orders list.
2. **Product Management**: View, search, add, edit, and delete products.
3. **Category Management**: View, add, edit, and delete store categories.
4. **User Management**: View registered customers and administrators with role badges and creation dates.
5. **Order Management**: View all customer orders and update dispatch status (`PLACED` → `CONFIRMED` → `SHIPPED` → `DELIVERED` → `CANCELLED`). If an order is cancelled, inventory is automatically restored.
