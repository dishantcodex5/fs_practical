import { useState, useEffect } from 'react'
import './App.css'

// Simple React wrapper that redirects to the main HTML app
function App() {
  useEffect(() => {
    // Redirect to the main HTML file
    window.location.href = '/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#0b1020,#141a3f)',
      color: '#e8eeff',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#16db65', 
            boxShadow: '0 0 18px #16db65' 
          }}></div>
          <h1 style={{ margin: 0, fontWeight: '700' }}>Chatter</h1>
        </div>
        <p style={{ opacity: 0.8, marginBottom: '24px' }}>Redirecting to chat application...</p>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(255,255,255,0.1)', 
          borderTopColor: '#6c7cff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.6 }}>
          If you're not redirected automatically, <a href="/index.html" style={{ color: '#6c7cff' }}>click here</a>
        </p>
      </div>
    </div>
  )
}

export default App
