import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const [user, setUser] = React.useState(null);
  const [rooms, setRooms] = React.useState([]);
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [loadingRooms, setLoadingRooms] = React.useState(true);
  const [header, setHeader] = React.useState("Your Classrooms");

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setUser(res.data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingUser(false);
      });
  }, []);

  React.useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/getrooms/${user.userid}`)
        .then((res) => {
          setRooms(res.data.rooms);
          setLoadingRooms(false);
        })
        .catch((err) => {
          console.log(err);
          setHeader("Welcome to IITI Classrooms");
          setLoadingRooms(false);
        });
    }
  }, [user]);

  const truncate = (str, len = 20) =>
    str.length > len ? str.substring(0, len - 3) + "..." : str;

  if (loadingUser || loadingRooms) {
    return <div style={styles.loader}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h1 style={styles.header}>{header}</h1>
      <div style={styles.grid}>
        {rooms.map((room) => (
          <div key={room._id} style={styles.card}>
            <p style={styles.code}>{truncate(room.ccode)}</p>
            <p style={styles.name}>{truncate(room.cname, 30)}</p>
            <p style={styles.strength}>Strength: {room.strength}</p>
            <Link to={`/view/${room._id}`}>
              <button style={styles.enterBtn}>Enter</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #e0eafc)",
  },
  header: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "30px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    justifyItems: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  code: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#4CAF50",
  },
  name: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  strength: {
    fontSize: "14px",
    marginBottom: "15px",
    color: "#777",
  },
  enterBtn: {
    backgroundColor: "#2196F3",
    border: "none",
    color: "#fff",
    padding: "8px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s",
  },
  enterBtnHover: {
    backgroundColor: "#1976D2",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "24px",
    color: "#555",
  },
};
