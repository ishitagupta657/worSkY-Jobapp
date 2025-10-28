# worSkY - Professional Job Portal

worSkY is a modern, full-stack job listing platform built with React, Spring Boot, and MongoDB. This project allows HR professionals to post job vacancies and job seekers to discover and apply to positions that match their skills and interests.

## 🚀 Features

### For Job Seekers
- **Advanced Job Search**: Search jobs by title, company, skills, or location
- **Smart Filtering**: Filter by experience level, job type, and required skills
- **Job Applications**: Easy-to-use application system with cover letter and resume upload
- **Job Bookmarks**: Save interesting positions for later review
- **Responsive Design**: Mobile-friendly interface for job hunting on the go

### For Employers/HR
- **Professional Job Posting**: Multi-step form with comprehensive job details
- **Dashboard Analytics**: Track job performance, applications, and views
- **Job Management**: Edit, delete, and manage active job postings
- **Application Tracking**: Monitor candidate applications and responses
- **Company Branding**: Professional company profiles and job listings

### Technical Features
- **Modern UI/UX**: Built with Material-UI for professional appearance
- **Authentication System**: Secure user login and role-based access
- **Real-time Updates**: Live job posting and application updates
- **Responsive Design**: Works seamlessly across all devices
- **Search & Pagination**: Efficient job browsing with pagination
- **File Upload**: Resume/CV upload support for applications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI) 5** - Professional UI component library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API communication
- **Context API** - State management for authentication

### Backend
- **Spring Boot 3** - Java-based REST API framework
- **Spring Data MongoDB** - MongoDB integration
- **MongoDB** - NoSQL database for job data
- **Maven** - Dependency management and build tool

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

```
worsky/
├── frontend/                          # React frontend application
│   └── frontendPart/
│       ├── src/
│       │   ├── components/           # Reusable UI components
│       │   │   ├── JobCard.js       # Job posting card component
│       │   │   └── JobApplication.js # Job application dialog
│       │   ├── context/              # React context providers
│       │   │   └── AuthContext.js   # Authentication context
│       │   ├── pages/                # Application pages
│       │   │   ├── Home.js          # Landing page
│       │   │   ├── Auth.js          # Login/Register page
│       │   │   ├── Feed.js          # Job listings page
│       │   │   ├── Dashboard.js     # Employer dashboard
│       │   │   ├── Create.js        # Job creation form
│       │   │   └── Navbar.js        # Navigation component
│       │   ├── App.js               # Main application component
│       │   └── index.js             # Application entry point
│       └── package.json             # Frontend dependencies
├── backend/                          # Spring Boot backend application
│   ├── src/main/java/com/ishita/joblisting/
│   │   ├── controller/              # REST API controllers
│   │   │   └── PostController.java  # Job posting endpoints
│   │   ├── model/                   # Data models
│   │   │   └── Post.java           # Job posting entity
│   │   ├── repository/              # Data access layer
│   │   │   ├── PostRepository.java  # MongoDB repository
│   │   │   └── SearchRepository.java # Search functionality
│   │   └── JoblistingApplication.java # Main application class
│   ├── pom.xml                      # Maven configuration
│   └── application.properties       # Application configuration
└── README.md                        # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Java 17+** - For Spring Boot backend
- **Node.js 16+** - For React frontend
- **MongoDB** - Database (local or cloud instance)
- **Maven** - Java build tool
- **Git** - Version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd worsky
   ```

2. **Backend Setup**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

3. **Frontend Setup**
   ```bash
   cd frontend/frontendPart
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:3000`

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create the required collections

### Environment Configuration

Create `backend/src/main/resources/application.properties`:
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/joblisting
server.port=8080
```

## 📱 Usage

### For Job Seekers
1. Visit the homepage and click "Get Started"
2. Register/Login as a job seeker
3. Browse available job postings
4. Use filters to find relevant positions
5. Click "Apply Now" to submit applications
6. Track your applications and responses

### For Employers/HR
1. Visit the homepage and click "Hire Talent"
2. Register/Login as an employer
3. Access the employer dashboard
4. Click "Post New Job" to create job postings
5. Fill out the comprehensive job form
6. Monitor applications and job performance

## 🔧 API Endpoints

### Job Postings
- `GET /allPosts` - Get all job postings
- `GET /posts/{text}` - Search jobs by text
- `POST /post` - Create new job posting

### Authentication (Mock)
- Frontend includes mock authentication for demonstration
- Replace with real authentication service in production

## 🎨 UI Components

### Material-UI Components Used
- **Cards** - Job posting displays
- **Dialogs** - Application forms and job details
- **Forms** - Multi-step job creation
- **Tables** - Dashboard data display
- **Navigation** - Responsive navbar and menus
- **Charts** - Dashboard analytics (planned)

### Design System
- **Color Palette**: Professional blues and grays with gold accents
- **Typography**: Clear hierarchy with Material-UI typography
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth
- **Animations**: Smooth transitions and hover effects

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend/frontendPart
npm run build
# Deploy the build folder to your hosting service
```

### Backend Deployment
```bash
cd backend
mvn clean package
# Deploy the generated JAR file to your server
```

### Environment Variables
Set the following environment variables in production:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Allowed frontend origins

## 🔒 Security Features

- **CORS Configuration** - Cross-origin resource sharing
- **Input Validation** - Form validation and sanitization
- **Authentication Context** - Secure user session management
- **Role-based Access** - Different features for employers vs job seekers

## 📊 Performance Optimizations

- **Lazy Loading** - Components loaded on demand
- **Pagination** - Efficient data loading
- **Search Optimization** - Fast job search functionality
- **Image Optimization** - Optimized company logos and avatars
- **Caching** - Client-side caching for better performance

## 🧪 Testing

### Frontend Testing
```bash
cd frontend/frontendPart
npm test
```

### Backend Testing
```bash
cd backend
mvn test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** - For the beautiful component library
- **Spring Boot** - For the robust backend framework
- **MongoDB** - For the flexible database solution
- **React Community** - For the amazing frontend ecosystem

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ by experienced developers for the modern job market**



## Command to Deploy Backend
Simply rebuild your image with an explicit platform flag 👇

Step 1:
docker buildx build --platform linux/amd64 -t ishitagupta657/demo-deployment:latest ./backend

Step 2:
docker push ishitagupta657/demo-deployment:latest

Step 3: Rebuild on the Render Website