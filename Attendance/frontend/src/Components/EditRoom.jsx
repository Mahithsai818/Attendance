import React, { useState } from "react";
import axios from "axios";
import cross from "../Assets/cross.webp";

export default function EditRoom(props) {
  const [cname, setCname] = useState(props.cname);
  const [ccode, setCcode] = useState(props.ccode);
  const [days, setDays] = useState(props.days);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/editroom", {
        roomid: props.idx,
        cname,
        ccode,
        days,
      });
      props.setTrigger(0);
      props.setreload((prev) => (prev ? 0 : 1));
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  if (!props.trigger) return null;

  return (
    <div style={styles.modalBackground}>
      <div style={styles.modalCard}>
        <img
          src={cross}
          alt="Close"
          style={styles.closeBtn}
          onClick={() => props.setTrigger(0)}
        />
        <h2 style={styles.title}>Edit Classroom</h2>
        <form onSubmit={handleEdit}>
          <div style={styles.field}>
            <label>Course Name</label>
            <input
              type="text"
              required
              style={styles.input}
              value={cname}
              onChange={(e) => setCname(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label>Course Code</label>
            <input
              type="text"
              required
              style={styles.input}
              value={ccode}
              onChange={(e) => setCcode(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label>Total Days</label>
            <input
              type="number"
              required
              style={styles.input}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
          <div style={styles.actions}>
            <button type="submit" style={{ ...styles.btn, ...styles.btnPrimary }}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// CSS-in-JS
const styles = {
  modalBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalCard: {
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px 25px",
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
    fontSize: "24px",
    marginBottom: "25px",
    color: "#333",
  },
  field: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "5px",
    fontSize: "14px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    padding: "10px 18px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },
  btnPrimary: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
};
