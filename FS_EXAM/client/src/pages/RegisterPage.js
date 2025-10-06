import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/auth/register', { name, email, password });
      setMessage('Registration successful. You can now login.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setMessage(msg);
    }
  }

  return (
    <div className="card">
      <h2 className="title">Register</h2>
      <form onSubmit={onSubmit} className="form">
        <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="button" type="submit">Create Account</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}


