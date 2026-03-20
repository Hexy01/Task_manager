# 📝 Task Manager Web App

A full-stack task management application built using **Typscript, Next.js, Node.js, Express, Prisma, and PostgreSQL**. This app allows users to sign up, log in, and manage their personal tasks in a clean and user-friendly interface.

---

## 🚀 Features

* 🔐 User Authentication (Signup & Login)
* 👤 User-specific dashboard
* 📝 Add, delete, and manage tasks
* 💾 Persistent storage using PostgreSQL
* ⚡ Fast and modern UI with Next.js
* 🔄 Real-time state updates

---

## 🛠️ Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL

---

## 📁 Project Structure

```
Task_manager/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── routes/
│   │   │   └── authRoutes.ts
│   │   └── index.ts
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   └── dashboard/
│   └── ...
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/Hexy01/Task_manager.git
cd Task_manager
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file:

```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskdb"
```

Run Prisma:

```
npx prisma generate
npx prisma db push
```

Start backend server:

```
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd ../frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

* Users sign up with **username, email, and password**
* Login verifies credentials from database
* User data is stored in `localStorage`
* Dashboard loads user-specific data

---

