# Smart City Issue Reporting System - Setup Guide

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`

2. **Node.js 16+ and npm**
   - Download from: https://nodejs.org/
   - Verify installation: `node -v` and `npm -v`

3. **MySQL 8.0 or higher**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Verify installation: `mysql --version`

4. **Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -v`

5. **VS Code** (or any IDE of your choice)
   - Download from: https://code.visualstudio.com/

## Step 1: Database Setup

1. Start MySQL server

2. Open MySQL command line or MySQL Workbench

3. Run the following commands:
```sql
CREATE DATABASE smart_city_db;
USE smart_city_db;
```

4. Execute the database schema:
```bash
# Navigate to the project directory
cd "c:\Users\uttkarsh raj\OneDrive\Desktop\Smart city issue"

# Import the schema
mysql -u root -p smart_city_db < database/schema.sql
```

Alternatively, copy and paste the contents of `database/schema.sql` into MySQL Workbench and execute.

### Database Configuration

The default configuration assumes:
- **Host:** localhost
- **Port:** 3306
- **Database:** smart_city_db
- **Username:** root
- **Password:** root

If your MySQL uses different credentials, update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_city_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

## Step 2: Backend Setup

1. Open a terminal in VS Code

2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies and build the project:
```bash
mvn clean install
```

4. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend server will start on: **http://localhost:8080**

You should see output like:
```
Started SmartCityApplication in X.XXX seconds
```

### Troubleshooting Backend

- **Port 8080 already in use:** Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
  Also update `frontend/src/services/api.js` to match the new port.

- **Database connection error:** Verify MySQL is running and credentials are correct.

## Step 3: Frontend Setup

1. Open a **NEW terminal** in VS Code (keep backend running)

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at: **http://localhost:3000**

### Troubleshooting Frontend

- **Port 3000 already in use:** The terminal will prompt to use a different port (e.g., 3001). Press `Y` to accept.

- **Module not found errors:** Delete `node_modules` and `package-lock.json`, then run `npm install` again.

## Step 4: Test the Application

### 1. Register a New User
- Go to http://localhost:3000
- Click "Register" in the navigation bar
- Fill in the registration form
- Click "Register"

### 2. Login
- Click "Login" in the navigation bar
- Enter your registered email and password
- Click "Login"

### 3. Report an Issue
- After login, click "Report Issue"
- Fill in the issue details:
  - Title
  - Description
  - Category
  - Location
  - Optionally get current location
  - Optionally add image URL
- Click "Submit Issue"

### 4. Track Your Issues
- Click "My Issues" in the navigation bar
- View all issues you've reported
- Check status updates

### 5. View All Issues
- Click "All Issues" in the navigation bar
- See a table of all reported issues in the system

### 6. Admin Access (For Testing)
- Use the pre-created admin account:
  - **Email:** admin@smartcity.com
  - **Password:** admin123
- Login with admin credentials
- Click "Admin Dashboard"
- View statistics and manage all issues
- Update issue status and assign departments

## Default Test Accounts

The database comes with pre-loaded test accounts:

| Role      | Email                   | Password   |
|-----------|-------------------------|------------|
| Admin     | admin@smartcity.com     | admin123   |
| Citizen   | john@example.com        | password   |
| Citizen   | jane@example.com        | password   |

## Project Structure

```
Smart city issue/
├── database/
│   └── schema.sql                  # Database schema and sample data
├── backend/                        # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/smartcity/
│   │       │   ├── SmartCityApplication.java
│   │       │   ├── model/          # JPA Entities
│   │       │   ├── repository/     # Data Access Layer
│   │       │   ├── service/        # Business Logic
│   │       │   ├── controller/     # REST API Endpoints
│   │       │   ├── dto/            # Data Transfer Objects
│   │       │   ├── config/         # Security Configuration
│   │       │   └── util/           # JWT Utility
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml                     # Maven Dependencies
└── frontend/                       # React Frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── services/               # API Services
    │   ├── components/             # React Components
    │   ├── pages/                  # Page Components
    │   ├── App.js                  # Main App Component
    │   └── index.js                # Entry Point
    └── package.json                # npm Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login (returns JWT token)

### Issues
- `POST /api/issues/report` - Report new issue (authenticated)
- `GET /api/issues` - Get all issues (authenticated)
- `GET /api/issues/user/{userId}` - Get user's issues (authenticated)
- `PUT /api/issues/{id}/status` - Update issue status (authenticated)
- `DELETE /api/issues/{id}` - Delete issue (authenticated)

### Departments
- `GET /api/departments` - Get all departments (public)

## Features Implemented

✅ User Registration and Login with JWT Authentication  
✅ Role-based Access Control (Admin/Citizen)  
✅ Report Issue with Category, Location, and Image  
✅ View All Issues  
✅ Track Personal Issues  
✅ Admin Dashboard with Statistics  
✅ Update Issue Status (Admin)  
✅ Assign Issues to Departments (Admin)  
✅ Responsive Material-UI Design  
✅ Geolocation Support  
✅ Real-time Status Updates  

## Technology Stack

### Backend
- **Framework:** Spring Boot 3.2.0
- **Language:** Java 17
- **Database:** MySQL 8.0+
- **ORM:** Spring Data JPA
- **Security:** Spring Security + JWT
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18.2.0
- **UI Library:** Material-UI 5.15.0
- **Routing:** React Router 6.20.0
- **HTTP Client:** Axios 1.6.2

## Common Issues and Solutions

### Issue: Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check CORS configuration in `SecurityConfig.java`
- Verify `api.js` has correct base URL

### Issue: Authentication not working
- Clear browser localStorage: `localStorage.clear()`
- Check JWT token in browser DevTools > Application > Local Storage
- Verify JWT secret is same in `application.properties`

### Issue: Database connection refused
- Ensure MySQL server is running
- Verify database name and credentials
- Check if port 3306 is not blocked

### Issue: Build errors in backend
- Run `mvn clean install -U` to force update dependencies
- Check Java version compatibility (Java 17+)

### Issue: npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Development Tips

### Hot Reload
- Frontend: Changes auto-reload (React hot reload)
- Backend: Use `spring-boot-devtools` for auto-restart (already included)

### Debugging
- **Frontend:** Use browser DevTools console
- **Backend:** Check terminal logs or use IDE debugger

### Database Changes
- After modifying `schema.sql`, drop and recreate the database:
```sql
DROP DATABASE smart_city_db;
CREATE DATABASE smart_city_db;
-- Then re-import schema.sql
```

## Next Steps

1. **Deploy to Production:**
   - Build frontend: `npm run build`
   - Package backend: `mvn package`
   - Deploy to cloud service (AWS, Azure, Heroku)

2. **Enhancements:**
   - Add file upload for images (currently using URLs)
   - Implement email notifications
   - Add issue comments and updates
   - Integrate maps (Google Maps/Leaflet)
   - Add analytics and reporting

3. **Testing:**
   - Write unit tests for services
   - Add integration tests for APIs
   - Implement E2E testing with Cypress

## Support

For any issues or questions:
1. Check the troubleshooting section above
2. Review the API documentation
3. Check browser console and backend logs for errors

## License

This project is created for educational purposes.
