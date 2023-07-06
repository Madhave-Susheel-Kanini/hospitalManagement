import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';

function ViewAppointment() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const role = getCookieValue('role');
    const username = getCookieValue('username');
    setRole(role);
    setUsername(username);
    console.log(username)
    fetchData(username);
  }, []);

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  const fetchData = (username) => {
    axios
      .get(Variable.api_url + 'Doctors', {
        params: {
          name: username,
        },
          headers: {
            Authorization: `Bearer ${getCookieValue('token')}`,
          }
      })
      .then((response) => {
        const doctorId = response.data[0]?.id;
        if (doctorId) {
          return axios.get(Variable.api_url + 'Appointments',{
            headers: {
              Authorization: `Bearer ${getCookieValue('token')}`,
            }
          });
        } else {
          return Promise.resolve({ data: [] });
        }
      })
      .then((response) => {
        const filteredAppointments = response.data.filter(
          item => item.doctor && item.doctor.firstName === username
        );
        setData(filteredAppointments);
        console.log(filteredAppointments);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <h2>Appointment List</h2>
      <div className="card-container">
        {data.map((item) =>
          item && item.id ? (
            <div key={item.id} className="card">
              <div className="card-header">
                <div className="card-header-item">
                  <span className="card-label">ID:</span>
                  <span>{item.id}</span>
                </div>
                <div className="card-header-item">
                  <span className="card-label">Patient Name:</span>
                  <span>{item.patientName}</span>
                </div>
                <div className="card-header-item">
                  <span className="card-label">Appointment Date:</span>
                  <span>{item.appointmentDate}</span>
                </div>
              </div>
              <div className="card-body">
                <div className="card-body-item">
                  <span className="card-label">Status:</span>
                  <span>{item.status}</span>
                </div>
                <div className="card-body-item">
                  <span className="card-label">Reason:</span>
                  <span>{item.reason}</span>
                </div>
                <div className="card-body-item">
                  <span className="card-label">Doctor Id:</span>
                  <span>{item.doctor && item.doctor.id}</span>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default ViewAppointment;
