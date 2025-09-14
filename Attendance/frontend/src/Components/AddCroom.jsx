import React, { useState } from 'react';
import axios from 'axios';
import cross from '../Assets/cross.webp';

export default function AddCroom({ trigger, setTrigger, datax }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/createroom", {
        cname: name,
        ccode: code,
        userid: datax,
        strength: 0,
        days: 0,
      });
      setLoading(false);
      setTrigger(false);
      window.location.href = "/home"; // or use a router navigate
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!trigger) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <img
          src={cross}
          alt="X"
          style={styles.closeBtn}
          onClick={() => setTrigger(false)}
        />
        <h2 style={styles.title}>{loading ? "Adding..." : "Add Classroom"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Classroom Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Course Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            disabled={loading}
            style={styles.submitBtn}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px",
    width: "400px",
    position: "relative",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "25px",
    cursor: "pointer",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  submitBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
};
