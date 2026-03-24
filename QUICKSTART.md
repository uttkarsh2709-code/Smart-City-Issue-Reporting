# Quick Start Checklist

Use this checklist to get the Smart City Issue Reporting System running quickly.

## ✅ Prerequisites Check

- [ ] Java 17+ installed (`java -version`)
- [ ] Node.js 16+ installed (`node -v`)
- [ ] MySQL 8.0+ installed (`mysql --version`)
- [ ] Maven installed (`mvn -v`)

## ✅ Database Setup (5 minutes)

```bash
# 1. Start MySQL server

# 2. Create database
mysql -u root -p
CREATE DATABASE smart_city_db;
exit;

# 3. Import schema
cd "c:\Users\uttkarsh raj\OneDrive\Desktop\Smart city issue"
mysql -u root -p smart_city_db < database/schema.sql
```

## ✅ One-Click Start (Windows)

```bat
cd "c:\Users\uttkarsh raj\OneDrive\Desktop\Smart city issue"
start-dev.bat
```

This launches backend and frontend in separate terminals.

## ✅ Backend Setup (5 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Update database credentials (if needed)
# Edit: src/main/resources/application.properties
# Change: spring.datasource.username and spring.datasource.password

# 3. Run backend
mvn spring-boot:run

# ✓ Backend should be running at http://localhost:8080
```

## ✅ Frontend Setup (5 minutes)

```bash
# 1. Open NEW terminal (keep backend running)

# 2. Navigate to frontend
cd frontend

# 3. Install dependencies
npm install

# 4. Start frontend
npm start

# ✓ Frontend should open at http://localhost:3000
```

## ✅ Test the Application (5 minutes)

### Test 1: Register and Login
- [ ] Go to http://localhost:3000
- [ ] Click "Register" and create account
- [ ] Login with your credentials

### Test 2: Report an Issue
- [ ] Click "Report Issue"
- [ ] Fill form (title, description, category, location)
- [ ] Click "Submit Issue"
- [ ] View in "My Issues"

### Test 3: Admin Dashboard
- [ ] Logout
- [ ] Login as admin:
  - Email: `admin@smartcity.com`
  - Password: `admin123`
- [ ] Click "Admin Dashboard"
- [ ] View statistics
- [ ] Click "Update" on any issue
- [ ] Change status to "IN_PROGRESS"
- [ ] Assign department

## 🎉 Success!

Your Smart City Issue Reporting System is now running!

## 🆘 Troubleshooting

**Backend won't start?**
- Check MySQL is running
- Verify database credentials in application.properties
- Check port 8080 is not in use

**Frontend won't start?**
- Run `npm install` again
- Check port 3000 is not in use
- Clear npm cache: `npm cache clean --force`

**Can't login?**
- Clear browser localStorage
- Check backend is running at port 8080
- Verify user was created in database

## 📖 Full Documentation

For complete details, see [SETUP.md](SETUP.md)

## 🔗 Quick Links

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Endpoints: http://localhost:8080/api

## 📝 Default Test Accounts

| Role    | Email                   | Password  |
|---------|-------------------------|-----------|
| Admin   | admin@smartcity.com     | admin123  |
| Citizen | john@example.com        | password  |
| Citizen | jane@example.com        | password  |

---

**Total Setup Time: ~20 minutes**
