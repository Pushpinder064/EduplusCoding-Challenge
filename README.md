screenshots:![Screenshot (29)](https://github.com/user-attachments/assets/e3d1d2d0-6c19-4050-b46a-424ec8b272b4)
![Screenshot (30)](https://github.com/user-attachments/assets/4222b1eb-6d23-4f3a-b359-a02356b6cc2b)
![Screenshot (31)](https://github.com/user-attachments/assets/cea114f3-e9c0-4c40-b097-fc157e1cf428)
![Screenshot (33)](https://github.com/user-attachments/assets/788a992e-6a99-48ab-9046-3bf5f15ccc55)
![Screenshot (34)](https://github.com/user-attachments/assets/d2a28913-0701-49cd-86e8-71ecb53e2cbd)


Working Video link:https://drive.google.com/file/d/1ZiqU8Ij3G-4JsGHPAtwYV_2Ian0uoui-/view?usp=sharing


Getting Started
1. Clone the Repository
bash
git clone https://github.com/Pushpinder064/EduplusCoding-Challenge.git
2. Set Up the Backend
cd backend
# Make a new .env with your database URL and JWT secret
npm install
npx prisma migrate dev // migrate your db , if you have existing db , use npx prisma db pull
npm start
3. Set Up the Frontend
cd ../frontend/Store-ratings
npm install 
npm run dev 
4. Access the App
Frontend: http://localhost:5173
Backend API: http://localhost:4000


Features:
User Management: Admin can add, filter, and manage users.
Store Management: Admins and Store Owners can create and manage stores.
Ratings: Users can rate stores; Store Owners can view ratings for their stores.
Role-Based Dashboards: Different dashboards and permissions for Admin, Store Owner, and User roles.
Authentication: Secure login, logout, and protected routes.
Responsive UI: Clean, modern interface with React and custom CSS.

Tech Stack:

Frontend: React, Axios, React Router
Backend: Node.js, Express.js
Database: PostgreSQL (via Prisma ORM)
Authentication: JWT-based
Styling: Custom CSS
