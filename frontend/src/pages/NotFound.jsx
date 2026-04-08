import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - Shefware';
  }, []);

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{ fontSize: '6rem', fontWeight: '700', color: '#003178', lineHeight: 1, margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginTop: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: '#64748b', marginTop: '0.75rem', maxWidth: '400px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '2rem',
          display: 'inline-block',
          padding: '0.75rem 2rem',
          background: '#003178',
          color: '#fff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '0.95rem',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
