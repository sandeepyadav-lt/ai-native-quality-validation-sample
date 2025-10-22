# Installation Instructions

Follow these steps to get your Airbnb Clone running.

## Prerequisites Check

Before starting, ensure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **npm** installed (comes with Node.js)
  ```bash
  npm --version
  ```

- [ ] **MongoDB 7+** installed ([Download](https://www.mongodb.com/try/download/community))
  - OR Docker Desktop for containerized MongoDB

- [ ] **Git** installed (for cloning)
  ```bash
  git --version
  ```

## Installation Methods

Choose the method that works best for you:

### Method 1: Docker (Easiest) ⭐

**Step 1:** Navigate to project directory
```bash
cd airbnb-clone
```

**Step 2:** Run the start script
```bash
./start.sh
```

**Step 3:** Seed the database
```bash
docker-compose exec backend npm run seed
```

**Step 4:** Open your browser
- Visit: http://localhost:5173
- Use credentials from seed output

**To Stop:**
```bash
docker-compose down
```

---

### Method 2: Manual Installation

#### A. Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
- Start MongoDB service from Services app
- Or run `mongod` from command prompt

**Verify MongoDB is running:**
```bash
mongosh
# Should connect without errors
```

#### B. Install Backend

**Terminal 1 - Backend:**
```bash
# Navigate to backend folder
cd airbnb-clone/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

#### C. Install Frontend

**Terminal 2 - Frontend:**
```bash
# Navigate to frontend folder
cd airbnb-clone/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
Local: http://localhost:5173/
```

#### D. Seed Database

**Terminal 3 - Seed:**
```bash
# Navigate to backend folder
cd airbnb-clone/backend

# Run seed script
npm run seed
```

You should see:
```
✅ Database seeded successfully!
   Users: 50
   Hosts: 15
   Listings: 100
   Bookings: 200
   Reviews: 150

📧 Test user credentials:
   Email: [email shown]
   Password: password123
```

#### E. Access Application

Open your browser and navigate to:
**http://localhost:5173**

---

## Verification Steps

### 1. Check Backend API

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Check Listings Endpoint

```bash
curl http://localhost:5000/api/listings
```

You should see JSON with listings array.

### 3. Check Frontend

Navigate to http://localhost:5173 in your browser.

You should see:
- Airbnb logo in header
- Search bar
- Grid of property listings with images

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution 1: Check if MongoDB is running**
```bash
# Try to connect with mongosh
mongosh

# Or check the process
# macOS/Linux:
ps aux | grep mongod

# Windows:
tasklist | findstr mongod
```

**Solution 2: Start MongoDB**
```bash
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Windows:
net start MongoDB
```

**Solution 3: Check MongoDB URI in .env**
```bash
# Edit backend/.env
MONGODB_URI=mongodb://localhost:27017/airbnb-clone
```

---

### Issue: "Port 5000 already in use"

**Solution 1: Find and kill the process**
```bash
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F
```

**Solution 2: Change the port**
```bash
# Edit backend/.env
PORT=5001

# Edit frontend/.env
VITE_API_URL=http://localhost:5001/api
```

---

### Issue: "Port 5173 already in use"

**Solution 1: Kill the process**
```bash
# macOS/Linux:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

**Solution 2: Let Vite choose another port**
Vite will automatically suggest an alternative port like 5174.

---

### Issue: "Module not found" or dependency errors

**Solution: Clean install**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: No listings showing on frontend

**Checklist:**
1. Is the backend running? (check http://localhost:5000/health)
2. Did you seed the database? (run `npm run seed`)
3. Check browser console for errors (F12)
4. Verify VITE_API_URL in frontend/.env

**Re-seed database:**
```bash
cd backend
npm run seed
```

---

### Issue: Images not loading

This is normal! We use placeholder image URLs from Unsplash. Some may:
- Load slowly
- Show placeholder text
- Fail to load (fallback will show)

This is expected behavior with placeholder images.

---

### Issue: Docker containers won't start

**Check Docker is running:**
```bash
docker info
```

**View container logs:**
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

**Rebuild containers:**
```bash
docker-compose down -v
docker-compose up --build
```

---

## First-Time User Guide

Once everything is running:

### 1. Create an Account
- Click "Sign up" in the header
- Fill in your details
- Use a simple password like "password123" (development only!)

### 2. Explore Listings
- Browse the home page grid
- Click on any listing to see details
- Check out the image gallery

### 3. Try Searching
- Click the search bar
- Enter a city name (e.g., "New York", "Paris")
- Select dates
- Choose number of guests

### 4. Make a Booking
- Select a listing
- Choose check-in and check-out dates
- Click "Reserve"
- View your bookings in the user menu

### 5. Use Seeded Test Account
After seeding, use the credentials shown in the console:
- Email: (shown in seed output)
- Password: `password123`

---

## Development Workflow

### Making Changes

**Backend Changes:**
1. Edit files in `backend/src/`
2. Server auto-restarts (nodemon)
3. Test with curl or browser

**Frontend Changes:**
1. Edit files in `frontend/src/`
2. Page auto-reloads (Vite HMR)
3. See changes instantly

### Adding New Features

**Example: Add a new API endpoint**

1. Create controller in `backend/src/controllers/`
2. Define route in `backend/src/routes/`
3. Add route to `backend/src/index.ts`
4. Create service in `frontend/src/services/`
5. Use in components

### Debugging

**Backend:**
```bash
# Add console.log statements
console.log('Debug:', variableName);

# Or use VS Code debugger
# Add breakpoints and press F5
```

**Frontend:**
```bash
# Use browser DevTools (F12)
# Check Console tab for errors
# Check Network tab for API calls
```

---

## Next Steps

1. ✅ Installation complete
2. 📖 Read [README.md](README.md) for full documentation
3. 🚀 Read [SETUP.md](SETUP.md) for quick start guide
4. 📝 Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for technical details
5. 💻 Start coding!

---

## Quick Command Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm start           # Run production build
npm run seed        # Seed database

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build

# Docker
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f            # View logs
docker-compose exec backend bash  # Access backend container
```

---

## Getting Help

- Check error messages in terminal
- Look at browser console (F12)
- Review the documentation files
- Check MongoDB connection
- Verify environment variables
- Try restarting services

---

**Congratulations! You're ready to build amazing features! 🎉**
