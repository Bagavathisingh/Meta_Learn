# MetaLearn

MetaLearn is a modern, user-friendly web platform designed to help students easily access programming materials, video tutorials, and PDF resources. Built with React and Firebase, MetaLearn focuses on making learning simple, fast, and organized.

# 🚀 Installation Guide for Meta Learn

Follow the steps below to set up the Meta Learn project on your local machine.

📦 Prerequisites
Make sure you have the following installed:

Node.js (v16 or later): Download Node.js

Git: Download Git

npm

MongoDB:
Mang0DB is used for this website to store and fetch the subjects Materials and Course Based Data.

FireBase :
FireBase is Used For the User Login Authentication for this website.

📁 Clone the Repository

```bash
git clone https://github.com/Bagavathisingh/MetaLearn.git
cd MetaLearn
```

🔧 Frontend Setup

```bash
cd client  # or your frontend folder
npm install
npm run dev  # or npm start
```

The frontend should now run on:

```bash
http://localhost:5173
```

🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on:

```bash
http://localhost:8000
```

⚙️ Environment Variables
Create a .env file in your backend folder with the following variables:
env

```bash
PORT=5000
DBuri=your_mongodb_uri
VITE_Url=http://localhost:8000
```

If your frontend also uses environment variables, add a .env file in the client folder too.

✅ Done!
Now open your browser and visit:

```bash
backend :http://localhost:8000
Frontend: http://localhost:5173
```
