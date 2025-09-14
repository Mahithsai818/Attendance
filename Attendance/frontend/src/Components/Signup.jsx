import React, { useState } from "react";
import axios from "axios";
import cross from "../Assets/cross.webp";
import { ToastContainer, toast } from "react-toastify";

export default function Signup({ trigger, setTrigger, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!trigger) return null;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", { position: toast.POSITION.TOP_CENTER });
      return;
    }
    if (password !== confPassword) {
      toast.error("Passwords do not match", { position: toast.POSITION.TOP_CENTER });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/register", { name, email, password });
      toast.success("Signed up successfully!", { position: toast.POSITION.TOP_CENTER });
      setTrigger(false);
      if (onSuccess) onSuccess(); // open login modal
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed", { position: toast.POSITION.TOP_CENTER });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <ToastContainer />
      <div style={styles.modal}>
        <img src={cross} alt="X" style={styles.closeBtn} onClick={() => setTrigger(false)} />
        <h2 style={styles.title}>{loading ? "Signing Up..." : "Sign Up"}</h2>

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <i
                className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showConf ? "text" : "password"}
                required
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                style={styles.input}
              />
              <i
                className={`far ${showConf ? "fa-eye-slash" : "fa-eye"}`}
                style={styles.eyeIcon}
                onClick={() => setShowConf(!showConf)}
              ></i>
            </div>
          </div>

          <div style={styles.submitWrapper}>
            <input type="submit" value="SIGN UP" style={styles.submitBtn} />
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    padding: "30px 25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    position: "relative",
    animation: "fadeIn 0.3s ease-in-out",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "20px",
    cursor: "pointer",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    width: "100%",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#888",
  },
  submitWrapper: {
    marginTop: "20px",
    textAlign: "center",
  },
  submitBtn: {
    padding: "12px 25px",
    width: "100%",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "0.2s all",
  },
};
