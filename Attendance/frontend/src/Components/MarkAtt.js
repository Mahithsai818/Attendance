import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function MarkAtt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setdata] = React.useState({});
  const [stud, setstud] = React.useState([]);
  const [load, setload] = React.useState(false);
  const [binary, setbinary] = React.useState([]);

  // fetch room details
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/getroom/${id}`)
      .then((res) => {
        setdata(res.data.room);
      })
      .catch((err) => console.log(err.response?.data?.message || err.message));
  }, [id]);

  // fetch students + initialize binary
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/getstudents/${id}`)
      .then((res) => {
        setstud(res.data.students || []);
        setbinary(
          (res.data.students || []).map((st) => ({
            name: st.name,
            value: 0,
          }))
        );
        setload(true);
      })
      .catch((err) => console.log(err.response?.data?.message || err.message));
  }, [id]);

  // confirm attendance
  const handleConf = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/confirmed/${id}`, { binary })
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((err) => console.log(err.response?.data?.message || err.message));
  };

  // toggle attendance for a student
  const handleClick = (idx) => {
    setbinary((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, value: item.value ? 0 : 1 } : item
      )
    );
  };

  return load ? (
    <div className="container pt-4 pb-4 d-flex flex-column">
      <div className="backbtn mt-1">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <h1 align="center">{data.cname}</h1>

      <table className="attentable mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {stud.map((student, idx) => (
            <tr key={idx}>
              <td style={{ borderLeft: "solid 1px rgb(194, 194, 194)" }}>
                {student.name}
              </td>
              <td>{student.roll}</td>
              <td>
                <div className="tabbtns">
                  {!binary[idx]?.value ? (
                    <button
                      className="presbtn"
                      onClick={() => handleClick(idx)}
                    >
                      Mark As Present
                    </button>
                  ) : (
                    <button
                      className="absbtn"
                      onClick={() => handleClick(idx)}
                    >
                      Change To Absent
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <span className="note">
        *Please click confirm only if attendance for everyone has been marked
        and is final else click on BACK.
      </span>
      <button
        className="confbtn mt-3 btn btn-primary"
        onClick={handleConf}
      >
        Confirm
      </button>
    </div>
  ) : (
    <>Loading...</>
  );
}

export default MarkAtt;
