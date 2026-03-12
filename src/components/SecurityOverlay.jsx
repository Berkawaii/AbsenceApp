import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInAnonymously } from 'firebase/auth';
import './SecurityOverlay.css';

const SecurityOverlay = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === '1234') {
      try {
        await signInAnonymously(auth);
        onUnlock();
        setError(false);
      } catch (err) {
        console.error("Auth error:", err);
        setError(true);
      }
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="security-overlay glass-panel animate-fade-in">
      <form onSubmit={handleSubmit} className="security-form">
        <h3>Yönetici Girişi</h3>
        <p>İzin eklemek veya silmek için şifre giriniz.</p>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? 'error' : ''}
            autoFocus
          />
          <button type="submit" className="unlock-btn">Kilidi Aç</button>
        </div>
        {error && <span className="error-msg">Hatalı şifre!</span>}
      </form>
    </div>
  );
};

export default SecurityOverlay;
