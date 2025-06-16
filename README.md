---------------------------------------------------------------------------------------------------------------
WORKING VIDEO LINK OF PROJECT :https://drive.google.com/file/d/1ZiqU8Ij3G-4JsGHPAtwYV_2Ian0uoui-/view?usp=sharing
---------------------------------------------------------------------------------------------------------------
screenshots:![image](https://github.com/user-attachments/assets/269ff433-dc17-44b4-a4f2-8b6b4456d3a3)
![image](https://github.com/user-attachments/assets/17bf327a-ed86-4f0f-b04c-a040603a15ec)
![image](https://github.com/user-attachments/assets/32f662ea-26ec-4ffe-98a6-f53efcf033e1)
![image](https://github.com/user-attachments/assets/308b4fbd-eab1-4cb5-9d41-739d0a29f38d)
![image](https://github.com/user-attachments/assets/eca9be50-3859-41c2-8f15-a830e6aaf0ae)



# EduplusCoding-Challenge

A modern full-stack web application for managing users, stores, and ratings, with role-based dashboards for Admins, Store Owners, and Users.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Pushpinder064/EduplusCoding-Challenge.git
cd EduplusCoding-Challenge
```

### 2. Set Up the Backend

```bash
cd backend
# Create a new .env file with your database URL and JWT secret


npm install
# Migrate your database (for a new DB)
npx prisma migrate dev
# If you have an existing DB, use:
# npx prisma db pull

npm start
```

### 3. Set Up the Frontend

```bash
cd ../frontend/Store-ratings
npm install
npm run dev
```

### 4. Access the App

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:4000](http://localhost:4000)

---

##  Features

- **User Management:** Admin can add, filter, and manage users.
- **Store Management:** Admins and Store Owners can create and manage stores.
- **Ratings:** Users can rate stores; Store Owners can view ratings for their stores.
- **Role-Based Dashboards:** Different dashboards and permissions for Admin, Store Owner, and User roles.
- **Authentication:** Secure login, logout, and protected routes.
- **Responsive UI:** Clean, modern interface with React and custom CSS.

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT-based
- **Styling:** Custom CSS

---

##  Environment Variables

**Backend (`backend/.env`):**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_jwt_secret
```
