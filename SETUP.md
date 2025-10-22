# Quick Setup Guide

This guide will help you get the Airbnb Clone up and running in minutes.

## Option 1: Quick Start with Docker (Recommended)

If you have Docker installed, this is the fastest way:

```bash
# Clone the repository
cd airbnb-clone

# Run the start script
./start.sh

# Seed the database with mock data
docker-compose exec backend npm run seed
```

That's it! The application will be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Option 2: Manual Setup

### Prerequisites
- Node.js 18+ and npm
- MongoDB 7+

### Step-by-Step

1. **Start MongoDB**
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows - Start MongoDB service
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env if needed
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env if needed
   npm run dev
   ```

4. **Seed Database** (in a new terminal)
   ```bash
   cd backend
   npm run seed
   ```

5. **Open Browser**
   Navigate to http://localhost:5173

## Testing the Application

### Using Seeded Data

After running the seed script, you'll see test credentials in the console output:

```
📧 Test user credentials:
   Email: [shown in console]
   Password: password123

   Host email: [shown in console]
   Password: password123
```

### Create Your Own Account

Simply go to http://localhost:5173/register and create a new account!

## Common Issues

### MongoDB Connection Error

**Problem**: Cannot connect to MongoDB

**Solution**:
- Make sure MongoDB is running
- Check the `MONGODB_URI` in `backend/.env`
- If using Docker: `docker-compose logs mongodb`

### Port Already in Use

**Problem**: Port 5000 or 5173 is already in use

**Solution**:
- Change the ports in `.env` files
- Update `docker-compose.yml` port mappings
- Or stop the conflicting service

### Module Not Found

**Problem**: Missing dependencies

**Solution**:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Project Features Overview

### What's Included

✅ **User Authentication**
- JWT-based authentication
- Login & Registration
- Password hashing with bcrypt

✅ **Property Listings**
- 100+ mock listings
- High-quality placeholder images
- Detailed property information

✅ **Search & Filtering**
- Location search
- Price range filtering
- Property type filtering
- Amenity filtering
- Guest capacity filtering

✅ **Booking System**
- Date selection
- Availability checking
- Price calculation
- Booking management

✅ **Reviews & Ratings**
- Overall ratings
- Category-specific ratings
- Review comments
- Rating aggregation

✅ **Responsive Design**
- Mobile-first approach
- Works on all screen sizes
- Modern UI/UX

## API Testing

You can test the API using curl, Postman, or any HTTP client:

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Get All Listings
```bash
curl http://localhost:5000/api/listings
```

### Search Listings
```bash
curl "http://localhost:5000/api/listings?city=New%20York&minPrice=100&maxPrice=300"
```

## Next Steps

1. **Explore the Application**
   - Browse listings on the home page
   - Click on a listing to see details
   - Try the search functionality
   - Register and create a booking

2. **Check the Code**
   - Backend API: `backend/src/`
   - Frontend Components: `frontend/src/components/`
   - Database Models: `backend/src/models/`

3. **Customize**
   - Add new features
   - Modify the UI
   - Add more mock data
   - Integrate real services

## Development Tips

### Hot Reload
Both frontend and backend support hot reload during development. Just save your files and see the changes!

### Debug Mode
```bash
# Backend with debug logs
cd backend
DEBUG=* npm run dev

# Frontend with React DevTools
# Install React DevTools browser extension
```

### Database GUI
Use MongoDB Compass to visualize your data:
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Database: `airbnb-clone`

## Production Deployment

### Build for Production

**Backend**:
```bash
cd backend
npm run build
npm start
```

**Frontend**:
```bash
cd frontend
npm run build
# Serve the dist/ folder
```

### Environment Variables

Make sure to set proper production values:
- Change `JWT_SECRET` to a secure random string
- Set `NODE_ENV=production`
- Update `MONGODB_URI` to production database
- Configure `FRONTEND_URL` and `VITE_API_URL`

## Support

Need help? Check:
- Main README.md for detailed documentation
- API documentation in README.md
- Code comments throughout the project
- Open an issue on GitHub

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Happy coding! 🚀
