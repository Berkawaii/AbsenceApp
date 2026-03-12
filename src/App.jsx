import { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import { useAttendanceStore } from './store/attendanceStore'
import './App.css'

function App() {
  const { absences, users } = useAttendanceStore();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const userStats = users.map(u => ({
      ...u,
      count: absences.filter(a => a.userId === u.id).length
    }));
    setStats(userStats);
  }, [absences, users]);

  return (
    <div className="app-container animate-fade-in">
      <header className="glass-panel main-header">
        <h1 className="logo-text">İzinTakip</h1>
        <div className="header-stats">
          {stats.map(s => (
            <div key={s.id} className="stat-pill" style={{ '--bg': s.color }}>
              {s.name}: <strong>{s.count} gün</strong>
            </div>
          ))}
        </div>
      </header>

      <main style={{ padding: '0 2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Calendar />
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        © 2026 İzinTakip - Premium Absence Tracker
      </footer>
    </div>
  )
}

export default App
