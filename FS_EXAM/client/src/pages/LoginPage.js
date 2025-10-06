import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setMessage(msg);
    }
  }

  return (
    <div className="card">
      <h2 className="title">Login</h2>
      <form onSubmit={onSubmit} className="form">
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="button" type="submit">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}


