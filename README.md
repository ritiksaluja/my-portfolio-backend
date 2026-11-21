# Portfolio Backend

REST API powering the [Ritik Saluja portfolio](../README.md). Built with **Express.js + TypeScript + MongoDB**.

---

## ⚙️ Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Language** — TypeScript
- **Database** — MongoDB + Mongoose
- **Auth** — JWT + bcryptjs
- **Process Manager** — ts-node-dev (dev) / PM2 (prod)

---

## 📁 Structure

```
src/
├── config/
│   └── db.ts              # MongoDB connection
├── controllers/
│   ├── authController.ts
│   ├── projectController.ts
│   └── messageController.ts
├── middlewares/
│   ├── authMiddleware.ts
│   └── errorHandler.ts
├── models/
│   ├── Project.ts
│   └── Message.ts
├── routes/
│   ├── authRoutes.ts
│   ├── projectRoutes.ts
│   └── messageRoutes.ts
├── seed.ts                # Seed default projects
└── server.ts              # App entry point
```

---

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET

# 3. Seed the database (optional)
npm run seed

# 4. Start dev server
npm run dev
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot-reload (ts-node-dev) |
| `npm run build` | Compile TypeScript → `dist/` |
| `npm start` | Run compiled production build |
| `npm run seed` | Seed MongoDB with default projects |

---

## 🌐 API Reference

### Auth
| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/login` | `{ email, password }` | Admin login → returns JWT |

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/projects` | ❌ | Fetch all projects |
| `POST` | `/api/projects` | ✅ | Create a project |
| `PUT` | `/api/projects/:id` | ✅ | Update a project |
| `DELETE` | `/api/projects/:id` | ✅ | Delete a project |

### Messages
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/messages` | ❌ | Submit contact form |
| `GET` | `/api/messages` | ✅ | View all messages |

---

## 🔐 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your_jwt_secret_here
```

> Copy `.env.example` to `.env` — never commit `.env`.
