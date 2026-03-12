import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = ({ users, onAdd, onUpdate, onDelete, onClose }) => {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#6366f1');

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setColor(user.color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      onUpdate(editingId, name, color);
    } else {
      onAdd(name, color);
    }
    reset();
  };

  const reset = () => {
    setEditingId(null);
    setName('');
    setColor('#6366f1');
  };

  return (
    <div className="user-mgmt-overlay glass-panel animate-fade-in">
      <div className="user-mgmt-card glass-card">
        <div className="mgmt-header">
          <h3>Kullanıcı Yönetimi</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <input 
            type="text" 
            placeholder="Kullanıcı Adı" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mgmt-input"
          />
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mgmt-color"
          />
          <button type="submit" className="save-btn">
            {editingId ? 'Güncelle' : 'Ekle'}
          </button>
          {editingId && <button type="button" onClick={reset} className="cancel-btn">İptal</button>}
        </form>

        <div className="user-list">
          {users.map(u => (
            <div key={u.id} className="user-item">
              <span className="user-color-preview" style={{ backgroundColor: u.color }}></span>
              <span className="user-name-text">{u.name}</span>
              <div className="user-actions">
                <button onClick={() => handleEdit(u)} className="action-btn">✏️</button>
                <button onClick={() => onDelete(u.id)} className="action-btn delete">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
