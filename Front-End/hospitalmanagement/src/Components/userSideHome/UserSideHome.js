import React, { useEffect, useState } from 'react'
import './UserSideHome.css'
import axios from 'axios';
import { Variable } from '../../Variable';

function UserSideHome() {

    const [data, setData] = useState([]);

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
        // Logic to handle fixing appointment
        console.log('Fix appointment for doctor with ID:', doctorId);
      };


    return (
        <div>
            <div>
                <nav className="navbarabc">
                    <ul className="navbar-listabc">
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">Home</a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">Contact Us</a>
                        </li>
                        <li className="navbar-itemabc">
                            <a className="navbar-linkabc" href="#">About</a>
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
        </div>
    )
}

export default UserSideHome