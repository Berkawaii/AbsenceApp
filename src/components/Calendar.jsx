import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, monthNames, dayNames, formatDate } from '../utils/dateUtils';
import { isHoliday } from '../utils/holidays';
import { useAttendanceStore } from '../store/attendanceStore';
import SecurityOverlay from './SecurityOverlay';
import UserManagement from './UserManagement';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showUserMgmt, setShowUserMgmt] = useState(false);
  
  const { absences, users, toggleAbsence, addUser, updateUser, deleteUser } = useAttendanceStore();

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  const handleDateClick = async (date) => {
    if (!isAdmin) {
      setShowSecurity(true);
      return;
    }
    if (!selectedUser) return;
    
    const dateStr = formatDate(date);
    await toggleAbsence(selectedUser.id, dateStr);
    window.dispatchEvent(new CustomEvent('attendance-updated'));
  };
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = formatDate(date);
    const holiday = isHoliday(date);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const dayAbsences = absences.filter(a => a.date === dateStr);
    const MAX_DOTS = 3;
    const extraCount = dayAbsences.length - MAX_DOTS;
    
    days.push(
      <div 
        key={d} 
        className={`calendar-day ${holiday ? 'holiday' : ''} ${isWeekend ? 'weekend' : ''}`}
        title={holiday ? holiday.name : ''}
        onClick={() => handleDateClick(date)}
      >
        <div className="day-header">
           <span className="day-number">{d}</span>
        </div>
        <div className="absence-indicators">
          {dayAbsences.slice(0, MAX_DOTS).map(a => {
            const user = users.find(u => u.id === a.userId);
            return (
              <div 
                key={a.id} 
                className="absence-dot" 
                style={{ backgroundColor: user?.color || 'var(--primary)' }}
                title={user?.name}
              />
            );
          })}
          {extraCount > 0 && <span className="extra-dots">+{extraCount}</span>}
        </div>
        {holiday && <span className="holiday-label">{holiday.name}</span>}
      </div>
    );
  }

  return (
    <div className="calendar-container animate-fade-in">
      {showSecurity && <SecurityOverlay onUnlock={() => { setIsAdmin(true); setShowSecurity(false); }} />}
      {showUserMgmt && (
        <UserManagement 
          users={users} 
          onAdd={addUser}
          onUpdate={updateUser}
          onDelete={deleteUser}
          onClose={() => setShowUserMgmt(false)}
        />
      )}
      
      <div className="calendar-top-bar">
        <div className="user-selector glass-panel">
          {users.map(u => (
            <button 
              key={u.id}
              className={`user-btn ${selectedUser?.id === u.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(u)}
              style={{ '--user-color': u.color }}
            >
              {u.name}
            </button>
          ))}
        </div>
        
        <div className="admin-actions">
          {isAdmin && (
            <button className="mgmt-btn" onClick={() => setShowUserMgmt(true)}>⚙️ Ayarlar</button>
          )}
          <button 
            className={`admin-toggle ${isAdmin ? 'unlocked' : 'locked'}`}
            onClick={() => isAdmin ? setIsAdmin(false) : setShowSecurity(true)}
          >
            {isAdmin ? '🔓 Yönetici' : '🔒 Kilitle'}
          </button>
        </div>
      </div>

      <div className="calendar-card glass-card">
        <div className="calendar-header">
          <button className="nav-btn" onClick={prevMonth}>&lt;</button>
          <h2>{monthNames[month]} {year}</h2>
          <button className="nav-btn" onClick={nextMonth}>&gt;</button>
        </div>
        
        <div className="calendar-grid">
          {dayNames.map(name => (
            <div key={name} className="weekday-header">{name}</div>
          ))}
          {days}
        </div>
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item"><span className="dot holiday"></span> Resmi Tatil</div>
        <div className="legend-item"><span className="dot weekend"></span> Hafta Sonu</div>
        {users.map(u => (
          <div key={u.id} className="legend-item">
            <span className="dot" style={{ backgroundColor: u.color }}></span> {u.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
