/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './UserSideHome.css';
import axios from 'axios';
import { Variable } from '../../Variable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';

function UserSideHome() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [appointmentData, setAppointmentData] = useState({
        patientName: '',
        appointmentDate: '',
        status: 'Active',
        reason: '',
        doctor: {
            id: 0
        },
    });

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

    useEffect(() => {
        fetchData();
        const username = getCookieValue('username');
        setUsername(username)
    }, []);

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Doctors', {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                },
              })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleFixAppointment = (doctorIdVal) => {
        console.log(doctorIdVal);
        setAppointmentData((prevData) => ({
            ...prevData,
            patientName: username,
            doctor: {
                id: doctorIdVal,
            },
        }));
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitAppointment = () => {
        console.log('Appointment Data:', appointmentData);
        axios
            .post('https://localhost:7193/api/Appointments', appointmentData, {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                }})
            .then((response) => {
                console.log('Appointment submitted:', response.data);
                setShowModal(false);
                setAppointmentData({
                    patientName: '',
                    appointmentDate: '',
                    status: '',
                    reason: '',
                    doctorId: 0,
                });
            })
            .catch((error) => {
                console.error('Error submitting appointment:', error);
            });
    };

    return (
        <div>
            <div>
                <nav className="navbarabc">
                    <ul className="navbar-listabc">
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                            </a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                <FontAwesomeIcon icon={faInfoCircle} /> About
                            </a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                <FontAwesomeIcon icon={faUser} /> Welcome {username}
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="containerabc">
                    {data.map((item) => (
                        <div key={item.id} className="cardabc">
                            <h2 className="card-titleabc">{item.firstName}</h2>
                            <img className='cardimg1' src={`https://localhost:7193/uploads/doctor/${item.docImagePath}`}></img>
                            <p className="card-contentabc">
                                {/* Last Name: {item.lastName} */}
                                <br />
                                Specialization: {item.specialization}
                                <br />
                                Phone Number: {item.phoneNumber}
                            </p>
                            <button
                                className="fix-appointment-button"
                                onClick={() => handleFixAppointment(item.id)}
                            >
                                Fix Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Fix Appointment</h2>
                        <form>
                            <div className="form-group">
                                <span htmlFor="patientName">Patient Name</span>
                                <input
                                    type="text"
                                    id="patientName"
                                    name="patientName"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <span htmlFor="appointmentDate">Appointment Date</span>
                                <input
                                    type="date"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={appointmentData.appointmentDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <span htmlFor="status">Status</span>
                                <input
                                    type="text"
                                    id="status"
                                    name="status"
                                    value={appointmentData.status}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <span htmlFor="reason">Reason</span>
                                <input
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    value={appointmentData.reason}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <span htmlFor="doctorId">Doctor ID</span>
                                <input
                                    type="text"
                                    id="doctorId"
                                    name="doctorId"
                                    value={appointmentData.doctor.id}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>
                            <button type="button" onClick={handleSubmitAppointment}>
                                Submit
                            </button>
                            <button type="button" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserSideHome;
