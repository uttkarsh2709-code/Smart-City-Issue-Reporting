# Smart City Issue Reporting System

A full-stack web application that enables citizens to report civic issues and municipal administrators to manage and resolve them efficiently.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven

### Installation

0. **One-Click Start (Windows)**
```bat
start-dev.bat
```
This opens two terminals automatically for backend and frontend.

1. **Setup Database**
```bash
mysql -u root -p
CREATE DATABASE smart_city_db;
mysql -u root -p smart_city_db < database/schema.sql
```

2. **Start Backend**
```bash
cd backend
mvn spring-boot:run
```

3. **Start Frontend**
```bash
cd frontend
npm install
npm start
```

### Frontend Runtime Configuration (Optional)

For production or custom deployments, copy `frontend/.env.example` to `.env` and adjust values:

```bash
cd frontend
copy .env.example .env
```

Available variables:
- `REACT_APP_NAME`: App title shown in navbar
- `REACT_APP_API_BASE_URL`: API base path or full URL
- `REACT_APP_API_TIMEOUT_MS`: Request timeout in milliseconds
- `REACT_APP_SUPPORT_EMAIL`: Footer support contact

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Default Login Credentials

**Admin Account:**
- Email: admin@smartcity.com
- Password: admin123

**Test User:**
- Email: john@example.com
- Password: password

## 📖 Complete Documentation

For detailed setup instructions, troubleshooting, and configuration, see **[SETUP.md](SETUP.md)**

## 📋 Project Overview

The Smart City Issue Reporting System bridges the gap between citizens and municipal authorities by providing a transparent, efficient platform for reporting and tracking civic infrastructure issues such as potholes, broken street lights, water leakage, garbage collection problems, and more.

## 🎯 Key Features

### For Citizens:
- ✅ User registration and secure login
- ✅ Report issues with descriptions and images
- ✅ Location tagging with GPS/map integration
- ✅ Real-time status tracking
- ✅ Receive automated notifications
- ✅ Provide feedback on resolved issues

### For Administrators:
- ✅ Comprehensive admin dashboard
- ✅ View and manage all reported issues
- ✅ Assign issues to departments
- ✅ Update issue status with timeline
- ✅ Generate reports and analytics
- ✅ Performance monitoring

## 🛠️ Technology Stack

### Frontend:
- **Framework**: React 18.2.0
- **UI Library**: Material-UI 5.15.0
- **Routing**: React Router 6.20.0
- **HTTP Client**: Axios 1.6.2
- **State Management**: React Hooks (useState, useEffect)

### Backend:
- **Framework**: Spring Boot 3.2.0
- **Java Version**: JDK 17+
- **Security**: Spring Security + JWT (io.jsonwebtoken 0.11.5)
- **ORM**: Spring Data JPA
- **Build Tool**: Maven

### Database:
- **Database**: MySQL 8.0+
- **Connection**: mysql-connector-j

### Development Tools:
- **IDE**: IntelliJ IDEA, VS Code
- **API Testing**: Postman
- **Version Control**: Git
- **Browser**: Chrome/Edge

## 📁 Project Structure

```
Smart city issue/
├── database/                           # Database scripts
│   └── schema.sql                     # Schema with sample data
│
├── backend/                           # Spring Boot backend
│   ├── src/main/java/com/smartcity/
│   │   ├── SmartCityApplication.java # Main application
│   │   ├── model/                    # JPA entities
│   │   │   ├── User.java
│   │   │   ├── Department.java
│   │   │   └── Issue.java
│   │   ├── repository/               # Data access
│   │   │   ├── UserRepository.java
│   │   │   ├── DepartmentRepository.java
│   │   │   └── IssueRepository.java
│   │   ├── service/                  # Business logic
│   │   │   ├── AuthService.java
│   │   │   ├── IssueService.java
│   │   │   └── DepartmentService.java
│   │   ├── controller/               # REST APIs
│   │   │   ├── AuthController.java
│   │   │   ├── IssueController.java
│   │   │   └── DepartmentController.java
│   │   ├── dto/                      # Data Transfer Objects
│   │   ├── config/                   # Configuration
│   │   │   └── SecurityConfig.java
│   │   └── util/                     # Utilities
│   │       └── JwtUtil.java
│   ├── src/main/resources/
│   │   └── application.properties    # Configuration
│   └── pom.xml                       # Maven dependencies
│
└── frontend/                          # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── services/                 # API services
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── issueService.js
    │   │   └── departmentService.js
    │   ├── components/               # React components
    │   │   └── Navbar.js
    │   ├── pages/                    # Page components
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── ReportIssue.js
    │   │   ├── TrackStatus.js
    │   │   ├── IssueList.js
    │   │   └── AdminDashboard.js
    │   ├── App.js                    # Main component
    │   └── index.js                  # Entry point
    └── package.json                  # npm dependencies
```

## 🚀 Getting Started

See **[SETUP.md](SETUP.md)** for complete installation instructions, troubleshooting, and configuration details.

## 📊 System Architecture

```
User (Browser)
      ↓
React Frontend (Port 3000)
      ↓
REST API (HTTP/HTTPS)
      ↓
Spring Boot Backend (Port 8080)
      ↓
MySQL/PostgreSQL Database
```

## 📈 Database Schema

### Main Tables:
- **users**: Store citizen and admin information (id, full_name, email, password, phone, address, role, created_at)
- **departments**: Municipal departments (id, name, description, contact_email, contact_phone, head_name)
- **issues**: All reported civic issues (id, user_id, department_id, title, description, category, location, latitude, longitude, status, priority, image_url, created_at, updated_at)

### Sample Data Included:
- 5 departments (Road & Transportation, Water Supply, Electricity, Sanitation, Public Works)
- 3 users (1 admin, 2 citizens)
- 3 sample issues

For complete schema see `database/schema.sql`

## 🔑 Key API Endpoints

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

## 🎨 Features in Action

### 🏠 Home Page
- Landing page with feature overview
- Quick access to register and login
- Category-based navigation

### 📝 Report Issue
- Form with title, description, category selection
- Location input with GPS support
- Image URL upload (optional)
- Submit and track issues

### 📊 Track My Issues
- View all your submitted issues
- Status tracking (PENDING, IN_PROGRESS, RESOLVED)
- Issue details and assignment information
- Timeline of updates

### 👤 Issue List
- Public view of all reported issues
- Filter and search functionality
- Status indicators with color coding

### 🛡️ Admin Dashboard
- Statistics cards (Total, Pending, In Progress, Resolved)
- Complete issue management table
- Update status and assign departments
- Issue prioritization

## 📝 Documentation

- **Setup Guide**: [SETUP.md](SETUP.md) - Complete installation and configuration
- **Project Documentation**: [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Full project details
- **Quick Summary**: [QUICK_SUMMARY.md](QUICK_SUMMARY.md) - Project overview

## 🧪 Testing the Application

1. **Start the application** following SETUP.md
2. **Test as Citizen:**
   - Register new account
   - Login and report an issue
   - Track your issue status
3. **Test as Admin:**
   - Login with: admin@smartcity.com / admin123
   - View dashboard statistics
   - Update issue status and assign departments

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Deploy build/ folder to web server (Vercel, Netlify, AWS S3)
```

**Backend:**
```bash
cd backend
mvn clean package
# Deploy target/smart-city-0.0.1-SNAPSHOT.jar to server
```

### Deployment Options:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: AWS EC2, Heroku, Railway, DigitalOcean
- **Database**: AWS RDS, Azure Database for MySQL
- **Full Stack**: AWS Elastic Beanstalk, Heroku

## 📈 Future Enhancements

- 📱 Mobile application (React Native)
- 📧 Email notifications for status updates
- 🗺️ Google Maps integration with issue markers
- 📸 Direct image upload (cloud storage)
- 💬 Issue comments and updates
- 📊 Advanced analytics dashboard
- 🌐 Multi-language support
- 🔔 Real-time notifications (WebSocket)
- 🤖 AI-based issue classification
- 📈 Reporting and data visualization

For complete future plans, see [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) Section 10

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push to branch: `git push origin feature/NewFeature`
5. Submit a Pull Request

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a full-stack web development project demonstrating:
- React.js frontend development
- Spring Boot backend API
- JWT authentication & security
- MySQL database design
- RESTful API architecture

## 📞 Support

Having issues? Check the troubleshooting guide in [SETUP.md](SETUP.md)

## 🙏 Acknowledgments

- React.js and Material-UI documentation
- Spring Boot and Spring Security communities
- MySQL and JPA documentation
- Open source community

---

**Built with ❤️ for Smart Cities Initiative**
