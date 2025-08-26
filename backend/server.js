const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for demo (in production, use a database)
let notes = [
  {
    id: 1,
    title: "Welcome to Notes App",
    content: "This is your first note! Try adding more notes using the form above.",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Demo Note",
    content: "This app demonstrates basic fullstack development with React frontend and Express backend.",
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Routes

// GET /api/notes - Get all notes
app.get('/api/notes', (req, res) => {
  console.log('GET /api/notes - Fetching all notes');
  res.json({
    success: true,
    data: notes,
    count: notes.length
  });
});

// POST /api/notes - Create a new note
app.post('/api/notes', (req, res) => {
  console.log('POST /api/notes - Creating new note:', req.body);
  
  const { title, content } = req.body;
  
  // Simple validation
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: 'Title and content are required'
    });
  }

  const newNote = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString()
  };

  notes.unshift(newNote); // Add to beginning of array

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: newNote
  });
});

// GET /api/notes/:id - Get a specific note (bonus endpoint)
app.get('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }

  res.json({
    success: true,
    data: note
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Notes API is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Notes API Server running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/notes`);
  console.log(`   POST http://localhost:${PORT}/api/notes`);
  console.log(`   GET  http://localhost:${PORT}/api/health\n`);
}); 