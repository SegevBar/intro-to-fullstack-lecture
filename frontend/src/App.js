import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE_URL}/notes`);
      
      if (response.data.success) {
        setNotes(response.data.data);
      } else {
        setError('Failed to fetch notes');
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to connect to server. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  // Load notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const response = await axios.post(`${API_BASE_URL}/notes`, {
        title: formData.title.trim(),
        content: formData.content.trim()
      });

      if (response.data.success) {
        setSuccess('Note created successfully!');
        setFormData({ title: '', content: '' });
        // Refresh notes list
        await fetchNotes();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to create note');
      }
    } catch (err) {
      console.error('Error creating note:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create note. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>📝 Notes App</h1>
        <p>A simple fullstack demo with React & Express</p>
      </header>

      {/* Add Note Form */}
      <div className="form-container">
        <h2>✨ Add New Note</h2>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter note title..."
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your note content here..."
              disabled={submitting}
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Adding Note...' : '➕ Add Note'}
          </button>
        </form>
      </div>

      {/* Notes List */}
      <div className="notes-container">
        <h2>📚 Your Notes</h2>
        
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <>
            <div className="notes-count">
              {notes.length > 0 ? `${notes.length} note${notes.length !== 1 ? 's' : ''} total` : 'No notes yet'}
            </div>
            
            {notes.length > 0 ? (
              <div className="notes-list">
                {notes.map(note => (
                  <div key={note.id} className="note-item">
                    <h3 className="note-title">{note.title}</h3>
                    <p className="note-content">{note.content}</p>
                    <div className="note-date">
                      Created: {formatDate(note.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                No notes yet! Create your first note using the form above. 🚀
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App; 