import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaBuilding } from 'react-icons/fa';

export default function PendingCompanyDashboard() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [companyEmail, setCompanyEmail] = useState('');

  useEffect(() => {
    // Get company email from localStorage
    const email = localStorage.getItem('companyEmail');
    setCompanyEmail(email);

    // Check if company is accepted or rejected
    const acceptedCompanies = JSON.parse(localStorage.getItem('acceptedCompanies') || '[]');
    const rejectedCompanies = JSON.parse(localStorage.getItem('rejectedCompanies') || '[]');
    const accepted = acceptedCompanies.find(company => company.email === email);
    const rejected = rejectedCompanies.find(company => company.email === email);

    if (accepted) {
      setNotifications([{
        id: 1,
        message: 'Your account is accepted',
        date: accepted.decisionDate,
        status: 'accepted'
      }]);
    } else if (rejected) {
      setNotifications([{
        id: 1,
        message: 'Your account is rejected',
        date: rejected.decisionDate,
        status: 'rejected'
      }]);
    } else {
      setNotifications([]);
    }
  }, []);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      background: '#f3f4f6',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif",
    },
    mainContent: {
      flex: 1,
      padding: '2.5rem',
      background: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      background: '#fff',
      borderRadius: '12px',
      padding: '2.5rem',
      maxWidth: '800px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      gap: '1rem',
    },
    title: {
      color: '#1976d2',
      fontSize: '2rem',
      fontWeight: '700',
      margin: 0,
    },
    notificationCard: {
      background: '#e3f2fd',
      border: '1px solid #bbdefb',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)',
    },
    notificationContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    notificationIcon: {
      fontSize: '2rem',
      color: '#1976d2',
    },
    notificationMessage: {
      color: '#1976d2',
      fontSize: '1.2rem',
      fontWeight: '600',
      margin: 0,
    },
    notificationDate: {
      color: '#666',
      fontSize: '0.9rem',
      margin: '0.5rem 0 0 0',
    },
    button: {
      background: '#1976d2',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      '&:hover': {
        background: '#1565c0',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
      },
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '2rem 0',
    },
    emptyStateIcon: {
      fontSize: '4rem',
      color: '#e0e0e0',
    },
    emptyStateText: {
      color: '#666',
      fontSize: '1.2rem',
      lineHeight: '1.6',
      maxWidth: '400px',
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.header}>
            <FaBuilding style={{ fontSize: '2rem', color: '#1976d2' }} />
            <h1 style={styles.title}>Company Dashboard</h1>
          </div>

          {notifications.length > 0 ? (
            <div style={styles.notificationCard}>
              <div style={styles.notificationContent}>
                <FaBell style={styles.notificationIcon} />
                <div>
                  <p style={styles.notificationMessage}>{notifications[0].message}</p>
                  <p style={styles.notificationDate}>Date: {notifications[0].date}</p>
                </div>
              </div>
              {notifications[0].status === 'accepted' ? (
                <button
                  onClick={() => navigate('/')}
                  style={styles.button}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#1565c0';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#1976d2';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Go to Login
                </button>
              ) : notifications[0].status === 'rejected' ? (
                <button
                  onClick={() => navigate('/register')}
                  style={styles.button}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#1565c0';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#1976d2';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Go to Register
                </button>
              ) : null}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <FaBell style={styles.emptyStateIcon} />
              <p style={styles.emptyStateText}>No notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}