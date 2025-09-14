import React, { useState } from 'react';
import axios from 'axios';
import cross from '../Assets/cross.webp';
import { ToastContainer, toast } from 'react-toastify';

export default function Login({ trigger, setTrigger, onSuccess }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!trigger) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password: pwd });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        toast.success('Login successful!', { position: toast.POSITION.TOP_CENTER });
        setTrigger(false);
        if (onSuccess) onSuccess(); // Redirect handled by parent
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { position: toast.POSITION.TOP_CENTER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <ToastContainer />
      <div style={styles.modal}>
        <img src={cross} alt="X" style={styles.closeBtn} onClick={() => setTrigger(false)} />
        <h2 style={styles.title}>{loading ? 'Logging in...' : 'Login'}</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              className="forminput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPwd ? 'text' : 'password'}
                required
                className="forminput"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                style={styles.input}
              />
              <i
                className={`far ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}
                style={styles.eyeIcon}
                onClick={() => setShowPwd(!showPwd)}
              ></i>
            </div>
          </div>

          <div style={styles.submitWrapper}>
            <input type="submit" value="LOGIN" style={styles.submitBtn} />
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '400px',
    padding: '30px 25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    position: 'relative',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '20px',
    cursor: 'pointer',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#888',
  },
  submitWrapper: {
    marginTop: '20px',
    textAlign: 'center',
  },
  submitBtn: {
    padding: '12px 25px',
    width: '100%',
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: '0.2s all',
  },
};
