import React, { useState } from "react";
import axios from "axios";
import cross from "../Assets/cross.webp";
import { ToastContainer, toast } from "react-toastify";

export default function AddStudent({ trigger, setTrigger, roomid, reload, setreload }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [att, setAtt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/createstudent", {
        name,
        roll,
        roomid,
        attendance: att,
      });

      toast.success("Student added successfully!", { position: "top-center" });
      setTrigger(false);

      // reload parent data
      setreload(!reload);
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  if (!trigger) return null;

  return (
    <div style={styles.overlay}>
      <ToastContainer />
      <div style={styles.card}>
        <img
          src={cross}
          alt="X"
          style={styles.closeBtn}
          onClick={() => setTrigger(false)}
        />
        <h2 style={styles.title}>{loading ? "Adding..." : "Add Student"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Roll No."
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Current Attendance"
            value={att}
            onChange={(e) => setAtt(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.submitBtn}>
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
