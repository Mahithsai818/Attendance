import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { ToastContainer } from "react-toastify";

export default function Landing() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to EasyAttendance</h1>
        <p style={styles.subtitle}>Simplify your attendance tracking in seconds!</p>

        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, backgroundColor: "#4CAF50" }}
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#2196F3" }}
            onClick={() => setShowLogin(true)}
          >
            Log In
          </button>
        </div>
      </div>

      {/* Modals */}
      <Signup
        trigger={showSignup}
        setTrigger={setShowSignup}
        onSuccess={() => {
          setShowSignup(false);
          setShowLogin(true); // automatically open login after signup
        }}
      />
      <Login
        trigger={showLogin}
        setTrigger={setShowLogin}
        onSuccess={() => {
          setShowLogin(false);
          window.location.href = "/home"; // go to home after login
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    textAlign: "center",
    minWidth: "300px",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#333",
  },
  subtitle: {
    margin: "0 0 30px 0",
    color: "#666",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  button: {
    padding: "10px 25px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s",
  },
};
