# Digital Guidance Platform for J&K Students

**Smart India Hackathon 2025 Project**

A comprehensive web and mobile platform designed to provide personalized career guidance and educational support for students in Jammu & Kashmir.

## 🎯 Project Overview

The Digital Guidance Platform addresses the critical need for accessible career counseling and educational guidance in J&K by providing:

- **Personalized Career Recommendations** based on aptitude assessments
- **Government College Directory** with location-based search
- **Career Path Mapping** showing degree-to-career connections
- **Academic Timeline Tracking** for important dates and deadlines
- **Offline-First Design** for areas with limited connectivity

## 🚀 Features

### Core Functionality
- **User Authentication & Profiles** - Secure registration with personalized profiles
- **Aptitude Assessment** - 50+ questions across 6 categories (Mathematical, Creative, Social, Technical, Leadership, Research)
- **Smart Recommendations** - AI-powered career suggestions based on quiz results
- **College Search** - Interactive map showing 30+ government colleges in J&K
- **Timeline Management** - Track admissions, scholarships, and key academic dates
- **Resource Library** - Study materials and scholarship information

### Technical Features
- **Progressive Web App (PWA)** - Works offline and can be installed on mobile devices
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Real-time Updates** - Push notifications for important deadlines
- **Data Visualization** - Interactive charts for career path exploration

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite for fast development
- **Tailwind CSS** for responsive UI design
- **React Router** for navigation
- **Chart.js/Recharts** for data visualization
- **Service Workers** for PWA functionality

### Backend
- **Node.js** with Express.js
- **JWT Authentication** for secure sessions
- **RESTful APIs** for data management

### Database & Storage
- **MongoDB Atlas** for flexible data storage
- **Cloudinary** for image management

### APIs & Integrations
- **Google Maps API** for college locations
- **OpenAI API/TensorFlow.js** for recommendation engine
- **Firebase Cloud Messaging** for push notifications

### Deployment
- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Render
- **Database**: MongoDB Atlas

## 📱 Application Flow

```
Landing Page → Authentication → Profile Setup → Dashboard
     ↓
Aptitude Quiz → Results & Recommendations → Career Path Mapping
     ↓
College Directory → Timeline Tracker → Resources
```

## 🏗️ Project Structure

```
digital-guidance-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── quiz/
│   │   │   ├── dashboard/
│   │   │   └── college/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── services/
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/digital-guidance-platform.git
   cd digital-guidance-platform
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_MAPS_API_KEY=your_google_maps_key
   CLOUDINARY_URL=your_cloudinary_url
   ```

5. **Run the application**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📊 Data Sources

### Government Colleges Dataset
- **Source**: J&K Higher Education Department
- **Coverage**: 30+ colleges for prototype (142 total available)
- **Data**: College names, locations, programs, cut-offs, facilities

### Career Paths Database
- **Source**: O*NET Career Database, Indian job market data
- **Coverage**: 20-30 career paths
- **Focus**: Government jobs, private sector, entrepreneurship

### Aptitude Assessment
- **Questions**: 50-100 across 6 categories
- **Scoring**: Weighted system for Science/Commerce/Arts streams

## 🔧 Development Workflow

### Team Structure (6 Members)
- **Member A**: Project Lead - Project structure & coordination
- **Member B**: Data Engineer - College data & Google Maps integration
- **Member C**: Database Specialist - MongoDB schemas & database setup
- **Member D**: Frontend Developer 1 - Landing page & authentication
- **Member E**: Frontend Developer 2 - Quiz components
- **Member F**: Frontend Developer 3 - Dashboard & navigation

### Daily Standup Schedule
- **Time**: Daily 15-minute meetings
- **Focus**: Progress tracking, blocker resolution, task coordination

## 🎯 MVP Success Metrics

- ✅ Working user registration and login
- ✅ Functional aptitude quiz with results
- ✅ Basic college directory with search
- ✅ Personalized recommendations based on quiz
- ✅ Mobile-responsive design
- ✅ Deployed and accessible online

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway)
```bash
railway login
railway init
railway up
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

## 📱 PWA Features

- **Offline Functionality**: Core features work without internet
- **Installable**: Can be added to home screen on mobile devices
- **Push Notifications**: Updates on important deadlines
- **Responsive**: Adapts to all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📋 Roadmap

### Phase 1 (Hackathon - 7 Days)
- [x] Core user flow implementation
- [x] Basic recommendation engine
- [x] College directory with search
- [x] PWA setup and deployment

### Phase 2 (Post-Hackathon)
- [ ] Advanced AI recommendations
- [ ] Real-time chat support
- [ ] Integration with more educational databases
- [ ] Parent/Guardian dashboard
- [ ] Multilingual support (Hindi, Urdu, Dogri)

## 🏆 Smart India Hackathon 2025

This project was developed for SIH 2025 with the goal of addressing educational guidance challenges in J&K. The platform aims to bridge the gap between students and career opportunities through technology.

**Demo Date**: September 13th, 2025

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: [Your Name]
- **Data Engineer**: [Team Member B]
- **Database Specialist**: [Team Member C]
- **Frontend Developer 1**: [Team Member D]
- **Frontend Developer 2**: [Team Member E]
- **Frontend Developer 3**: [Team Member F]

## 📞 Support

For support and queries:
- Email: atharv.sghorpade@gmail.com
- LinkedIn: https://www.linkedin.com/in/atharv-ghorpade-3a6333328/



- J&K Higher Education Department for college data
- Smart India Hackathon 2025 organizers
- Open source community for tools and libraries
- Mentors and advisors who guided the project

