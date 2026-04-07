# 🌾 Krushi-Setu API

> **Bridging farmers and buyers — a secure, feature-rich REST API powering India's agricultural marketplace.**

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose-5.x-880000?style=for-the-badge&logo=mongoose&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-brightgreen?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://your-live-link-here.com">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-View%20Now-FF4500?style=for-the-badge" />
  </a>
</p>

---

## 📌 About the Project

India has **100+ million smallholder farmers** who struggle to connect directly with buyers, are exploited by middlemen, and have no reliable digital platform to list and sell their produce.

**Krushi-Setu** (meaning "Bridge for Farmers" in Sanskrit/Hindi) is a full-featured backend REST API that powers an agricultural marketplace — enabling farmers to register as verified sellers, list products (dairy, grains, vegetables, fruits, tools, vehicles), and manage orders end-to-end, while buyers can browse, cart, and purchase directly.

The API also includes a seller **document verification system** (land number / Shram Yogi card), a built-in **admin dashboard**, and is secured against the most common web threats out of the box.

**Who is it for?**
- 🧑‍🌾 **Farmers / Sellers** — who want to reach buyers without intermediaries
- 🛒 **Buyers / Customers** — who want fresh farm produce at fair prices
- 🏗️ **Developers** — who want a well-structured, production-grade Node.js API reference

---

## ✨ Features

- 🔐 **JWT-based Authentication** — Stateless auth with Bearer tokens, 90-day expiry, and automatic invalidation on password change
- 📧 **Email-based Password Reset** — Secure SHA-256 hashed reset tokens sent via Nodemailer; tokens expire in 5 minutes
- 👤 **Dual Role System** — `customer` and `seller` roles with middleware-enforced authorization
- 🌾 **Product Catalogue** — Full CRUD for products with 6 categories: `dairy`, `vehicles`, `tools`, `grains`, `vegetables`, `fruits`
- 🛒 **Shopping Cart** — Per-user cart management with item quantity support; auto-populated with product & owner details
- 📦 **Order Management** — Orders with shipping/pickup addresses, seller & buyer references, shipped/delivered status tracking
- ⭐ **Review System** — Nested product reviews (1–5 star ratings) linked to both user and product; auto-populated author info
- 📄 **Seller Document Verification** — Supports `landNumber` and `shramYogiCardNumber` document types with a unique compound index (no duplicate submissions)
- 🖼️ **Profile Photo Upload** — Multer-based photo upload for user profiles
- 🔍 **Advanced Query API** — URL-based filtering (`gt`, `lt`, `gte`, `lte`), sorting, pagination, and field projection on all list endpoints
- 🛡️ **Built-in Security Layer** — Helmet, rate limiting (1000 req/hour), XSS protection, NoSQL injection sanitization, and HTTP parameter pollution prevention
- 🏛️ **Admin Dashboard** — Server-side rendered HTML dashboard panel served at `/admin`
- 🧩 **Handler Factory Pattern** — DRY, reusable CRUD handlers shared across all resource controllers
- 🌐 **Environment-aware Error Handling** — Verbose errors in `development`, clean operational errors in `production`

---

## 💡 Use Cases

| Scenario | How Krushi-Setu Helps |
|---|---|
| A wheat farmer in Punjab wants to sell 500 kg of grain directly | Registers as a `seller`, uploads land document for verification, lists product under `grains` category |
| A restaurant owner in Mumbai wants farm-fresh vegetables | Signs up as `customer`, browses the product catalogue, adds items to cart, places an order with delivery address |
| A buyer wants to filter only affordable dairy products | Uses query params: `GET /api/v1/products?category=dairy&price[lte]=500` |
| A user forgets their password | Hits `/forgot-password`, receives a time-limited reset link via email |
| An admin wants to check platform activity | Visits `/admin/dashboard` for the server-rendered admin panel |
| A buyer finds a bad product | Posts a review with rating on `POST /api/v1/products/:productId/reviews` |

---

## 🎯 Benefits

- ✅ **Production-grade security** built in — no extra setup needed for Helmet, XSS, NoSQL injection, or rate limiting
- ✅ **Scalable architecture** — Handler Factory pattern means adding a new resource takes just 5 lines of code
- ✅ **MongoDB Atlas** cloud database — zero infrastructure management, scales automatically
- ✅ **Fully RESTful** — consistent, predictable URL conventions and response shapes across every endpoint
- ✅ **Token invalidation on password change** — prevents stale JWTs from being used after a security-sensitive operation
- ✅ **Nested routing** — reviews and cart items are accessible both standalone and nested under their parent product (`/products/:id/reviews`)
- ✅ **Developer experience** — `nodemon` for hot-reloading, `morgan` for dev request logging, `.prettierrc` for consistent formatting

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js ≥ 10 | Server-side JavaScript runtime |
| **Framework** | Express.js 4.x | HTTP server & routing |
| **Database** | MongoDB Atlas (Mongoose 5.x) | Cloud NoSQL database & ODM |
| **Authentication** | JSON Web Tokens (jsonwebtoken) | Stateless auth |
| **Password Security** | bcryptjs | Password hashing (salt rounds: 12) |
| **Email** | Nodemailer + Mailtrap | Transactional email (password reset) |
| **File Upload** | Multer 1.4 | Profile photo handling |
| **Input Validation** | validator.js | Email & phone validation |
| **Security: Headers** | Helmet | Secure HTTP headers |
| **Security: Rate Limit** | express-rate-limit | 1000 req/hr per IP |
| **Security: NoSQL Injection** | express-mongo-sanitize | MongoDB operator injection prevention |
| **Security: XSS** | xss-clean | Cross-site scripting prevention |
| **Security: HPP** | hpp | HTTP Parameter Pollution prevention |
| **Dev Logging** | Morgan | HTTP request logger |
| **Dev Tooling** | nodemon, Prettier | Hot reload & code formatting |

---

## 🚀 Getting Started (For Developers)

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Notes |
|---|---|---|
| Node.js | ≥ 10.0.0 | [Download](https://nodejs.org/) |
| npm | ≥ 6.x | Comes with Node.js |
| MongoDB Atlas Account | — | [Sign up free](https://www.mongodb.com/atlas) |
| Mailtrap Account | — | [Sign up free](https://mailtrap.io/) — for email testing |
| nodemon | ≥ 3.x | Installed as devDependency |

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/krushi-setu-api.git

# 2. Navigate into the project directory
cd krushi-setu-api

# 3. Install all dependencies
npm install
```

---

### Environment Variables

Create a `config.env` file in the root of the project (copy the template below). **Do NOT commit this file** — it is already listed in `.gitignore`.

```env
# Application
NODE_ENV=development
PORT=5050

# MongoDB Atlas
DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
DATABASE_PASSWORD=<your_mongodb_atlas_password>

# JWT
JWT_SECRET=<a-long-random-secret-string>
JWT_EXPIRE=90d

# Email (Mailtrap for development)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=<your_mailtrap_username>
EMAIL_PASS=<your_mailtrap_password>
```

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` or `production` — controls error verbosity and logging |
| `PORT` | Port the server listens on (default: `5050`) |
| `DATABASE` | Full MongoDB Atlas connection string with `<PASSWORD>` placeholder |
| `DATABASE_PASSWORD` | Your MongoDB Atlas cluster password (injected into DATABASE string) |
| `JWT_SECRET` | Long, random string used to sign JWT tokens |
| `JWT_EXPIRE` | JWT validity duration (e.g. `90d`, `1h`) |
| `EMAIL_HOST` | SMTP host — use Mailtrap in dev, a real provider in production |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP authentication username |
| `EMAIL_PASS` | SMTP authentication password |

---

### Run Locally

```bash
# Start the development server (with hot-reloading via nodemon)
npm start
```

The server will start at: **`http://localhost:5050`**

You should see:
```
development from app,js
CLOUD Database Connected Successfully
App is running on http://localhost:5050
```

---

### Build for Production

This is a Node.js API — there is no build step. To run in production mode:

```bash
# Set NODE_ENV in your config.env or hosting provider
NODE_ENV=production node server.js
```

> 💡 **Tip:** For production deployments, use a process manager like [PM2](https://pm2.keymetrics.io/) and set environment variables through your hosting platform (Railway, Render, Heroku, etc.) rather than `config.env`.

---

## 📖 API Reference (For Users & Integrators)

All API endpoints are prefixed with `/api/v1`. Protected routes require a Bearer JWT token in the `Authorization` header.

```
Authorization: Bearer <your_jwt_token>
```

<details>
<summary><strong>👤 Users & Auth</strong></summary>

| Method  | Endpoint                              | Auth | Description                       |
|---------|---------------------------------------|------|-----------------------------------|
| `POST`  | `/api/v1/users/sign-up`               | ❌    | Register a new user               |
| `POST`  | `/api/v1/users/login`                 | ❌    | Log in and receive JWT            |
| `POST`  | `/api/v1/users/forgot-password`       | ❌    | Send password reset email         |
| `POST`  | `/api/v1/users/reset-password/:token` | ❌    | Reset password via token          |
| `POST`  | `/api/v1/users/update-password`       | ✅    | Change password (logged-in users) |
| `PATCH` | `/api/v1/users/update-me`             | ✅    | Update name, mobile, photo        |
| `PATCH` | `/api/v1/users/delete-me`             | ✅    | Soft-delete own account           |
| `GET`   | `/api/v1/users/`                      | ❌    | Get all users                     |
| `GET`   | `/api/v1/users/:id`                   | ❌    | Get a single user                 |
| `PATCH` | `/api/v1/users/:id`                   | ❌    | Update user by ID                 |

</details>

<details>
<summary><strong>🌾 Products</strong></summary>

| Method   | Endpoint               | Auth | Description                                                |
|----------|------------------------|------|------------------------------------------------------------|
| `GET`    | `/api/v1/products`     | ❌    | Get all products (supports filtering, sorting, pagination) |
| `POST`   | `/api/v1/products`     | ❌    | Create a product                                           |
| `GET`    | `/api/v1/products/:id` | ❌    | Get a single product (with seller & reviews populated)     |
| `PATCH`  | `/api/v1/products/:id` | ❌    | Update a product                                           |
| `DELETE` | `/api/v1/products/:id` | ❌    | Delete a product                                           |

**Query Parameters supported on `GET /api/v1/products`:**
```
?category=dairy
?price[lte]=500
?price[gte]=100
?sort=price,-createdAt
?page=2&limit=10
?fields=name,price,category
```

</details>

<details>
<summary><strong>🛒 Cart</strong></summary>

| Method   | Endpoint           | Auth | Description                           |
|----------|--------------------|------|---------------------------------------|
| `GET`    | `/api/v1/cart`     | ✅    | Get all cart items for logged-in user |
| `POST`   | `/api/v1/cart`     | ✅    | Add item to cart                      |
| `GET`    | `/api/v1/cart/:id` | ✅    | Get a specific cart item              |
| `PATCH`  | `/api/v1/cart/:id` | ✅    | Update cart item (e.g. quantity)      |
| `DELETE` | `/api/v1/cart/:id` | ✅    | Remove item from cart                 |

> Also accessible nested under a product: `POST /api/v1/products/:productId/cart`

</details>

<details>
<summary><strong>📦 Orders</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/orders` | ❌ | Get all orders |
| `POST` | `/api/v1/orders` | ❌ | Create an order |
| `GET` | `/api/v1/orders/:id` | ❌ | Get a single order (with products, buyer, seller populated) |
| `PATCH` | `/api/v1/orders/:id` | ❌ | Update order status |
| `DELETE` | `/api/v1/orders/:id` | ❌ | Delete an order |

</details>

<details>
<summary><strong>⭐ Reviews</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/reviews` | ✅ | Get all reviews |
| `POST` | `/api/v1/reviews` | ✅ | Create a review |
| `GET` | `/api/v1/reviews/:id` | ✅ | Get a single review |
| `PATCH` | `/api/v1/reviews/:id` | ✅ | Update a review |
| `DELETE` | `/api/v1/reviews/:id` | ✅ | Delete a review |

> Also accessible nested under a product: `POST /api/v1/products/:productId/reviews`

</details>

<details>
<summary><strong>📄 Documents (Seller Verification)</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/documents` | ❌ | Get all verification documents |
| `POST` | `/api/v1/documents` | ❌ | Submit a document for verification |
| `GET` | `/api/v1/documents/:id` | ❌ | Get a specific document |
| `PATCH` | `/api/v1/documents/:id` | ❌ | Update a document record |
| `DELETE` | `/api/v1/documents/:id` | ❌ | Delete a document |

**Supported `documentType` values:** `landNumber`, `shramYogiCardNumber`

</details>

<details>
<summary><strong>🏛️ Admin</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/admin/dashboard` | ❌ | Server-rendered HTML admin dashboard |

</details>

---

## 📁 Project Structure

```
krushi-setu-api/
│
├── server.js                    # Entry point: DB connection & server boot
├── app.js                       # Express app: middleware, routes, global error handler
├── config.env                   # Environment variables (gitignored)
├── package.json                 # Project metadata & npm scripts
├── .prettierrc                  # Code formatting config
├── .gitignore
│
├── controllers/                 # Route handler logic
│   ├── authController.js        # signUp, login, protect, forgotPassword, resetPassword, updatePassword
│   ├── userController.js        # updateMe, deleteMe, CRUD via factory
│   ├── productController.js     # CRUD via factory
│   ├── cartController.js        # Cart CRUD + setProductUserIds middleware
│   ├── orderController.js       # Order CRUD via factory
│   ├── reviewController.js      # Review CRUD + setProductUserIds middleware
│   ├── documentCotroller.js     # Document CRUD via factory
│   ├── adminPanelController.js  # Server-side rendered admin dashboard
│   ├── handlerFactory.js        # Generic getAll, getOne, createOne, updateOne, deleteOne
│   └── errorController.js       # Global error handler (dev vs production mode)
│
├── models/                      # Mongoose schemas & models
│   ├── userModel.js             # User: name, email, mobile, role, photo, isVerified, etc.
│   ├── productModel.js          # Product: name, price, category, quantity, seller, images
│   ├── cartModel.js             # Cart: owner, product, quantity
│   ├── orderModel.js            # Order: products[], shippingAddress, buyer, seller, isShipped/Delivered
│   ├── reviewModel.js           # Review: review text, rating (1-5), product, author
│   └── documentModel.js         # Document: seller, documentNumber, documentType, isVerified
│
├── routes/                      # Express routers
│   ├── userRoutes.js            # /api/v1/users
│   ├── productRoutes.js         # /api/v1/products (+ nested /reviews, /cart)
│   ├── cartRoutes.js            # /api/v1/cart
│   ├── orderRoutes.js           # /api/v1/orders
│   ├── reviewRoutes.js          # /api/v1/reviews
│   ├── documentRoutes.js        # /api/v1/documents
│   └── adminPanelRoute.js       # /admin
│
├── util/                        # Shared utility modules
│   ├── apiFeatures.js           # Query builder: filter, sort, paginate, limitField
│   ├── appError.js              # Custom operational error class
│   ├── catchAsync.js            # Async error-catching wrapper
│   └── sendMail.js              # Nodemailer email utility
│
├── dataMappers/                 # Data transformation utilities
│   └── replaceDashboard.js      # (in progress)
│
└── public/                      # Static files & admin UI assets
    ├── html/
    │   ├── dashboard.html        # Admin dashboard HTML template
    │   └── templates/
    │       └── nav-bar-template.html
    └── images/
        └── users/               # Uploaded user profile photos (multer destination)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow this flow:

```bash
# 1. Fork the repo

# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request on GitHub
```

> Please keep PRs focused and include a clear description of what changed and why.

---

## 👤 Author

Made with ❤️ by **[Khush Vachhani](https://github.com/kapvm4444)** **[(Portfolio)](https://khush.pro)**

---

<p align="center">
  <sub>🌾 Krushi-Setu — Empowering farmers. Connecting markets.</sub>
</p>
