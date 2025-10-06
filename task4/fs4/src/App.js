import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);
  const handleIncrementFive = () => setCount(count + 5);

  return (
    <div className="App" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Count: <span>{count}</span></h1>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrementFive}>Increment 5</button>
      </div>
      <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Welcome to CHARUSAT!!!</h1>
      <div style={{ margin: '1.5rem 0' }}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ marginBottom: '0.5rem' }}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
        <div>First Name: <b>{firstName}</b></div>
        <div>Last Name: <b>{lastName}</b></div>
      </div>
    </div>
  );
}

export default App;
