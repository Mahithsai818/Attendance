import React, { useState, useEffect } from "react";
import AddCroom from "./AddCroom";
import axios from "axios";

export default function Navbar() {
  const [addRoom, setAddRoom] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/user", {
          headers: { token: localStorage.getItem("token") },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <AddCroom trigger={addRoom} setTrigger={setAddRoom} datax={user.userid} />

      <nav style={styles.navbar}>
        <div style={styles.left}>
          <p style={styles.welcome}>
            Welcome, <span style={styles.username}>{user?.name || "User"}</span>
          </p>
        </div>

        <div style={styles.right}>
          <button style={{ ...styles.button, backgroundColor: "#4CAF50" }} onClick={() => setAddRoom(true)}>
            Add Classroom
          </button>
          {/* <button style={styles.button}>Edit Profile</button> */}
          <button style={{ ...styles.button, backgroundColor: "#f44336" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#fff",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    margin: "20px",
    flexWrap: "wrap",
  },
  left: {
    flex: "1",
  },
  welcome: {
    margin: 0,
    fontSize: "18px",
    color: "#333",
  },
  username: {
    fontWeight: "bold",
    color: "#2196F3",
  },
  right: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontSize: "16px",
  },
};
