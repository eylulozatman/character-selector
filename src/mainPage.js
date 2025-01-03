import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Character Selector</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate('/admin')}>
          Go to Admin Page
        </button>
        <button style={styles.button} onClick={() => navigate('/homepage')}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MainPage;
