import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Welcome to CHARUSAT!!!!</h1>
      <h2 style={{ fontWeight: 'bold', marginTop: '2rem' }}>It is {formattedDate}</h2>
      <h2 style={{ fontWeight: 'bold', marginTop: '1rem' }}>It is {formattedTime}</h2>
    </div>
  );
}

export default App
