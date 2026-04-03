# 📒 Notes Management Application (MERN Stack)

## 🚀 Project Overview

This is a full-stack **Notes Management Application** built using the MERN stack. The application allows users to register, login, create notes, manage books, and update their profiles. It also includes an **Admin Panel** with advanced controls.

---

## 🔑 Features

### 👤 Authentication

* User Registration (Sign Up)
* User Login (Sign In)
* Secure authentication system
* OTP verification for sensitive actions (admin password update)

---

### 📝 Notes Management

* Create Notes (Title + Content)
* View all created notes
* Edit Notes
* Delete Notes
* Display total number of notes created by the user

---

### 📚 Book Management

* Add new books with:

  * Title
  * Content
* View created books

---

### 👤 User Profile

* View user details:

  * Name
  * Email
* Update profile information
* Edit profile functionality

---

### 🔐 Admin Features

* Admin Login
* View all users' notes
* Edit admin password with OTP verification:

  * OTP is required before updating password
  * Only after correct OTP → password update allowed

---

### ⚡ Special Behavior

* Normal users can directly use features (no OTP required)
* Admin has extra security with OTP for sensitive operations

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Authentication:** JWT + OTP (Email verification)

---

## 📡 API Structure (Base URL)

All APIs are managed using a single base URL:

```
http://localhost:5000
```

Endpoints include:

* `/register`
* `/login`
* `/api/send-otp`
* `/api/verify-otp`
* `/notes/create`
* `/notes/feed`
* `/notes/:id`
* `/notes/admin/feed`
* `/user`
* `/update-profile`

---

## 📂 Project Flow

### 1️⃣ User Flow

1. Register → Login
2. Create Notes
3. View Notes Count
4. Edit/Delete Notes
5. Add Books
6. View & Update Profile

---

### 2️⃣ Admin Flow

1. Admin Login
2. View All Notes
3. Update Password

   * OTP Verification Required
   * After correct OTP → allow password update

---

## 🎯 Key Highlights

* Clean API structure using `.env`
* Dynamic routing for notes (`/notes/:id`)
* Secure OTP-based verification system
* Separate user and admin functionalities
* Scalable and maintainable code structure

---

## 📌 Conclusion

This project demonstrates a complete real-world application with:

* Authentication
* CRUD operations
* Role-based access (User/Admin)
* OTP security integration

---

## 👨‍💻 Author

Developed as a full-stack MERN project for learning and real-world practice.

---
