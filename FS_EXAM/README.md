# Very Simple MERN Auth

A minimal MERN authentication app with secure registration and login using bcrypt and JWT.

## Stack
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Frontend: React (CRA), react-router-dom, axios
- Database: MongoDB

## Setup
1. Prerequisites: Node.js LTS, MongoDB running locally.
2. Backend env:
   - Create `server/.env` and add:
```
MONGO_URI=mongodb://127.0.0.1:27017/mern_auth_demo
JWT_SECRET=change_this_in_production
PORT=5000
```
3. Install deps:
```
# from repo root
cd server && npm install && cd ..
cd client && npm install --legacy-peer-deps && cd ..
```

## Run (two terminals)
```
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm start
```
Client proxies API calls to `http://localhost:5000`.

## API
- POST `/api/auth/register` { name, email, password }
- POST `/api/auth/login` { email, password }

## GitHub
Initialize and push:
```
git init
git add .
git commit -m "Initial MERN auth"
# create repo on GitHub, then set remote
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main
```


