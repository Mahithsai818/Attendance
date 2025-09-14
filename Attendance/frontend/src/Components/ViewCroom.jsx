import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddStudent from "./AddStudent";
import EditRoom from "./EditRoom";

export default function ViewCroom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState({});
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const [editRoomModal, setEditRoomModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getroom/${id}`);
        setRoom(res.data.room);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getstudents/${id}`);
        setStudents(res.data.students);
        setAlertMsg("");
      } catch (err) {
        setAlertMsg(err.response?.data?.message || "Error fetching students");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
    fetchStudents();
  }, [id, refresh]);

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/delstudent/${studentId}`);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:5000/del/${id}`);
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={styles.loader}></div>;

  return (
    <div style={styles.container}>
      {/* Modals */}
      <AddStudent
        trigger={addStudentModal}
        setTrigger={setAddStudentModal}
        roomid={room._id}
        reload={refresh}
        setreload={setRefresh}
      />
      <EditRoom
        idx={room._id}
        trigger={editRoomModal}
        setTrigger={setEditRoomModal}
        reload={refresh}
        setreload={setRefresh}
        cname={room.cname}
        ccode={room.ccode}
        days={room.days}
      />

      {/* Back Button */}
      {window.innerWidth > 600 && (
        <button style={styles.btnBack} onClick={() => navigate(-1)}>
          ← Back
        </button>
      )}

      {/* Room Card */}
      <div style={styles.roomCard}>
        <h2 style={styles.roomCode}>{room.ccode}</h2>
        <h3 style={styles.roomName}>{room.cname}</h3>
        <div style={styles.roomStats}>
          <span style={styles.stat}>Strength: {room.strength}</span>
          <span style={styles.stat}>Total Days: {room.days}</span>
        </div>
        <div style={styles.roomActions}>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={() => setAddStudentModal(true)}
          >
            Add Student
          </button>
          {!alertMsg && (
            <Link to={`/markatt/${id}`} style={{ textDecoration: "none" }}>
              <button style={{ ...styles.btn, ...styles.btnSecondary }}>
                Mark Attendance
              </button>
            </Link>
          )}
          <button
            style={{ ...styles.btn, ...styles.btnWarning }}
            onClick={() => setEditRoomModal(true)}
          >
            Edit Classroom
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnDanger }}
            onClick={handleDeleteRoom}
          >
            Delete Classroom
          </button>
        </div>
      </div>

      {/* Student Table */}
      {alertMsg ? (
        <h2 style={styles.alert}>{alertMsg}</h2>
      ) : (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Attendance</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>
                    {student.attendance}/{room.days}
                  </td>
                  <td>
                    <button
                      style={{ ...styles.btn, ...styles.btnSm, ...styles.btnDanger }}
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// CSS-in-JS
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  loader: {
    width: "50px",
    height: "50px",
    margin: "100px auto",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  btnBack: {
    backgroundColor: "#eee",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  roomCard: {
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    marginBottom: "20px",
  },
  roomCode: { fontSize: "24px", fontWeight: "bold", marginBottom: "5px" },
  roomName: { fontSize: "20px", color: "#555", marginBottom: "15px" },
  roomStats: {
    display: "flex",
    justifyContent: "center",
    gap: "40px", // added spacing between strength and days
    marginBottom: "20px",
    fontSize: "16px",
  },
  stat: { fontWeight: "500", color: "#333" },
  roomActions: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  btnPrimary: { backgroundColor: "#4CAF50", color: "#fff" },
  btnSecondary: { backgroundColor: "#f1c40f", color: "#fff" },
  btnWarning: { backgroundColor: "#f39c12", color: "#fff" },
  btnDanger: { backgroundColor: "#e74c3c", color: "#fff" },
  btnSm: { padding: "6px 10px", fontSize: "12px" },
  tableCard: {
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "20px",
    overflowX: "auto",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  alert: { textAlign: "center", marginTop: "50px", color: "#e74c3c" },
};
