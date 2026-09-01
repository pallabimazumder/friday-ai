# Friday AI - Multi-Agent Application

A comprehensive multi-agent AI application with a modern, responsive UI. Friday AI provides intelligent assistance through specialized AI agents (chat, coding, vision, search, PDF analysis, and presentation generation) with a login-gated architecture, real-time chat, and conversation management.

## 🎯 Features

### Frontend
- **Authentication**: Google OAuth sign-in with Firebase integration
- **Theme Management**: Dark/Light theme toggle with localStorage persistence
- **Responsive Sidebar**: 
  - Collapsible sidebar (260px expanded, 84px collapsed)
  - User profile section with avatar and logout
- **Conversation Management**:
  - Pinned conversations section for quick access
  - Recent conversations with search functionality
  - Collapsable Recent section with BiCollapseVertical toggle
  - Pin/unpin conversations with TiPin icon
- **Chat Interface**: Clean, modern chat UI with support for various content types
- **Artifact Viewer**: Display generated code, documents, and other artifacts

### Backend
- **Multi-Agent System**: Specialized AI agents for different tasks
  - Chat Agent: General conversational AI
  - Coding Agent: Code generation and analysis
  - Vision Agent: Image understanding and analysis
  - Search Agent: Information retrieval
  - PDF Agent: Document analysis
  - PPT Agent: Presentation generation
- **Microservices Architecture**: Scalable service-based design
  - API Gateway: Central routing and middleware
  - Auth Service: Firebase integration and session management
  - Chat Service: Conversation management
  - Agent Service: AI agent orchestration
- **Data Persistence**: 
  - MongoDB for user records and conversations
  - Redis for session management (7-day TTL)
- **Security**: 
  - Firebase token verification
  - HTTP-only session cookies
  - CORS with credentials support

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Firebase Auth** - Authentication

### Backend
- **Node.js** - Runtime
- **Express.js** - API framework
- **MongoDB** - Document database
- **Redis** - Session store
- **Firebase Admin SDK** - Token verification
- **Express HTTP Proxy** - Service routing
- **Docker & Docker Compose** - Containerization

## 🏗️ Project Structure

```
fridayAi/
├── client-side/                    # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SideBar.tsx        # Sidebar with conversations
│   │   │   ├── ChatArea.tsx       # Main chat interface
│   │   │   ├── Artifact.tsx       # Content viewer
│   │   │   └── LogoutModal.tsx    # Logout confirmation
│   │   ├── pages/
│   │   │   └── Home.tsx           # Main app page
│   │   ├── redux/
│   │   │   ├── store.ts           # Redux store
│   │   │   └── userSlice.ts       # User state management
│   │   ├── features/
│   │   │   └── getCurrentUser.ts  # API calls
│   │   ├── type/
│   │   │   └── User.ts            # Type definitions
│   │   └── utils/
│   │       ├── axios.ts           # HTTP client config
│   │       └── firebase.ts        # Firebase config
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server-side/                    # Node.js backend services
│   ├── gateway/                    # API Gateway
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── services/
│   │   ├── auth/                   # Authentication service
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── routes/
│   │   ├── chat/                   # Chat service
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   └── routes/
│   │   ├── agent/                  # Agent service
│   │   │   ├── agents/             # Agent implementations
│   │   │   ├── controllers/
│   │   │   ├── graph/              # Agent graph/router
│   │   │   ├── config/             # LLM models config
│   │   │   └── routes/
│   │   └── shared/                 # Shared services
│   │       └── redis/
│   └── docker-compose.yml
│
└── docs/
    └── current-architecture.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB instance
- Redis instance
- Firebase project with authentication enabled
- Docker & Docker Compose (optional, for containerized setup)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/fridayAi.git
cd fridayAi
```

#### 2. Frontend Setup
```bash
cd client-side
npm install

# Create .env file
cat > .env.local << EOF
VITE_SERVER_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
EOF

npm run dev
```

#### 3. Backend Setup

##### Install Dependencies
```bash
cd server-side

# Auth Service
cd services/auth && npm install && cd ../..

# Chat Service
cd services/chat && npm install && cd ../..

# Agent Service
cd services/agent && npm install && cd ../..

# Gateway
cd gateway && npm install && cd ../..
```

##### Configure Environment Variables
```bash
# Create .env files for each service

# Gateway (.env)
CLIENT_SIDE_URL=http://localhost:5173
AUTH_SERVICE_URL=http://localhost:5001
CHAT_SERVICE_URL=http://localhost:5002
AGENT_SERVICE_URL=http://localhost:5003
PORT=5000

# Auth Service (.env)
PORT=5001
MONGO_URI=mongodb://localhost:27017/friday_auth
REDIS_URL=redis://localhost:6379
FIREBASE_PROJECT_ID=your_firebase_project_id

# Chat Service (.env)
PORT=5002
MONGO_URI=mongodb://localhost:27017/friday_chat
REDIS_URL=redis://localhost:6379

# Agent Service (.env)
PORT=5003
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

##### Start Services
```bash
# Terminal 1: Gateway
cd gateway && npm start

# Terminal 2: Auth Service
cd services/auth && npm start

# Terminal 3: Chat Service
cd services/chat && npm start

# Terminal 4: Agent Service
cd services/agent && npm start
```

#### 4. Docker Compose (Alternative)
```bash
cd server-side
docker-compose up
```

## 📱 Key Features in Detail

### Authentication Flow
1. User clicks "Login with Google" on landing page
2. Firebase OAuth popup opens
3. User authenticates with Google
4. Frontend sends ID token to `/api/auth/login`
5. Backend verifies token and creates/updates user in MongoDB
6. Session created in Redis with 7-day TTL
7. HTTP-only session cookie sent to client
8. Redux state updated with user data and theme

### Conversation Management
- **Recent Conversations**: Automatically tracked and displayed
- **Search**: Filter conversations in real-time (case-insensitive)
- **Pinned Conversations**: Pin frequently used conversations for quick access
- **Collapse Toggle**: Minimize Recent section to save sidebar space

### Agent Types
Each agent is specialized for specific tasks:
- **Chat Agent**: General purpose conversational AI
- **Coding Agent**: Code generation, debugging, and explanation
- **Vision Agent**: Image analysis and understanding
- **Search Agent**: Web search and information retrieval
- **PDF Agent**: Extract and analyze PDF documents
- **PPT Agent**: Generate presentations from content

## 🔐 Security Features

- **Firebase Authentication**: Industry-standard OAuth 2.0
- **Token Verification**: Server-side validation of Firebase tokens
- **HTTP-Only Cookies**: Session cookies not accessible to JavaScript
- **CORS Configuration**: Restricted origin with credentials support
- **Session Expiration**: 7-day TTL on server-side sessions

## 📊 Database Schema

### User (MongoDB)
```javascript
{
  _id: ObjectId,
  firebaseId: String,
  username: String,
  email: String,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Conversation (MongoDB)
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  messages: [Message],
  createdAt: Date,
  updatedAt: Date
}
```

### Session (Redis)
```
Key: session:{sessionId}
Value: { userId, name, email, avatar }
TTL: 7 days
```

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: User preference persisted in localStorage
- **Smooth Animations**: Transitions for sidebar collapse, theme switch
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Avatar Loading**: Handles CORS, fallback to placeholder
- **Confirmation Modals**: Safe destructive actions (logout)

## 🧪 Testing

### Frontend Build
```bash
cd client-side
npm run build  # Production build
npm run dev    # Development server
```

### Linting & Type Checking
```bash
cd client-side
npm run lint   # ESLint
```

## 📝 Environment Variables

### Client-Side (.env.local)
- `VITE_SERVER_URL`: Backend gateway URL
- `VITE_FIREBASE_*`: Firebase project credentials

### Server-Side (.env files)
- `PORT`: Service port
- `MONGO_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `CLIENT_SIDE_URL`: Frontend origin for CORS
- `*_SERVICE_URL`: Microservice URLs for gateway routing
- `FIREBASE_PROJECT_ID`: Firebase project identifier
- `OPENAI_API_KEY`: OpenAI API key for agents
- `ANTHROPIC_API_KEY`: Anthropic API key for agents

## 🐛 Known Issues & Limitations

- Agent responses currently mock-based (integration pending)
- File upload for PDF agent not yet implemented
- Real-time collaboration not yet supported

## 🗺️ Roadmap

- [ ] Real-time chat with WebSockets
- [ ] File upload and document processing
- [ ] Conversation sharing and collaboration
- [ ] Advanced agent orchestration with tool use
- [ ] Analytics and usage tracking
- [ ] Mobile app (React Native)
- [ ] Offline mode with sync

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Pallabi Mazumder** - [https://github.com/pallabimazumder]

## 📧 Support

For support, email support@fridayai.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Firebase for authentication
- OpenAI and Anthropic for LLM APIs
- React and community for excellent tooling
- All contributors who helped shape this project

---

**Status**: 🚀 Active Development