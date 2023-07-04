import React, { useEffect, useState } from 'react';
import './UserSideHome.css';
import axios from 'axios';
import { Variable } from '../../Variable';

function UserSideHome() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [appointmentData, setAppointmentData] = useState({
        patientName: '',
        appointmentDate: '',
        status: '',
        reason: '',
        doctorId: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Doctors')
            .then((response) => {
                setData(response.data);
                console.log(response.data); // Print the fetched data in the console
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleFixAppointment = (doctorId) => {
        setAppointmentData((prevData) => ({
            ...prevData,
            doctorId: doctorId,
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
        // Logic to submit the appointment data
        console.log('Appointment Data:', appointmentData);
        axios
            .post('https://localhost:7193/api/Appointments', appointmentData)
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
                                Home
                            </a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                Contact Us
                            </a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">
                                About
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="containerabc">
                    {data.map((item) => (
                        <div key={item.id} className="cardabc">
                            <h2 className="card-titleabc">{item.firstName}</h2>
                            <p className="card-contentabc">
                                Last Name: {item.lastName}
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
                                    value={appointmentData.patientName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <span htmlFor="appointmentDate">Appointment Date</span>
                                <input
                                    type="text"
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
