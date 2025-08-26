# 📝 Fullstack Notes App - Lecture Demo

A simple fullstack application demonstrating **React frontend** and **Express.js backend** communication, for teaching fullstack development concepts and API testing with Postman.

## 🏗️ Architecture

```
Frontend (React)     ←→     Backend (Express)
Port 3000                   Port 3001
```

- **Frontend**: React app with modern UI for creating and viewing notes
- **Backend**: Express.js REST API with GET and POST endpoints
- **Storage**: In-memory (resets on server restart)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies  
```bash
cd ../frontend
npm install
```

### 3. Run the Applications

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend  
npm start
# React app runs on http://localhost:3000
```

### 4. Open Your Browser
Visit `http://localhost:3000` to see the app in action! 🎉

---

## 🔧 API Endpoints

### Base URL: `http://localhost:3001/api`

### 1. **GET** `/notes` - Fetch all notes
```http
GET http://localhost:3001/api/notes
```

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Welcome to Notes App",
      "content": "This is your first note!",
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. **POST** `/notes` - Create a new note
```http
POST http://localhost:3001/api/notes
Content-Type: application/json

{
  "title": "My New Note",
  "content": "This is the content of my note"
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "id": 3,
    "title": "My New Note", 
    "content": "This is the content of my note",
    "createdAt": "2024-01-20T10:35:00.000Z"
  }
}
```

### 3. **GET** `/notes/:id` - Get specific note
```http
GET http://localhost:3001/api/notes/1
```

### 4. **GET** `/health` - Health check
```http
GET http://localhost:3001/api/health
```

---

## 📮 Postman Demo Collection

### Import this Collection:

1. Open Postman
2. Click "Import" 
3. Copy-paste this JSON:

```json
{
  "info": {
    "_postman_id": "12345678-1234-5678-9012-123456789012",
    "name": "Notes App Demo",
    "description": "Fullstack lecture demo endpoints",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Notes",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3001/api/notes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["api", "notes"]
        }
      }
    },
    {
      "name": "Create New Note",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Created via Postman\",\n  \"content\": \"This note was created using Postman to demonstrate the POST endpoint!\"\n}"
        },
        "url": {
          "raw": "http://localhost:3001/api/notes",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["api", "notes"]
        }
      }
    },
    {
      "name": "Get Single Note",
      "request": {
        "method": "GET", 
        "header": [],
        "url": {
          "raw": "http://localhost:3001/api/notes/1",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["api", "notes", "1"]
        }
      }
    },
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3001/api/health",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3001",
          "path": ["api", "health"]
        }
      }
    }
  ]
}
```

### Demo Script for Lecture:

1. **Show Health Check** - Verify server is running
2. **GET Notes** - Show initial demo data
3. **POST New Note** - Create note via Postman
4. **GET Notes Again** - Show the new note was added
5. **Refresh Frontend** - Show real-time sync between API and UI
6. **Error Demo** - Try POST with missing fields to show validation


---

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development  
```bash
cd frontend
npm start    # Hot reloading enabled
```

### Building for Production
```bash
cd frontend
npm run build
```

---

## 🔍 Troubleshooting

**"Failed to connect to server"**
- Make sure backend is running on port 3001
- Check if port is already in use: `lsof -i :3001`

**CORS Issues**
- Backend includes CORS middleware
- Frontend proxy configured in package.json

**Port Conflicts**
- Backend: Change `PORT` in `backend/server.js`
- Frontend: Set `PORT=3002 npm start`

---
