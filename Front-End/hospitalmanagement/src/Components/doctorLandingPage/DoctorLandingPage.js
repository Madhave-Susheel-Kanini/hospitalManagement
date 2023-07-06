import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Variable } from '../../Variable';
import './DoctorLandingPage.css'

function DoctorLandingPage() {

    const [registers, setRegisters] = useState([]);


    useEffect(() => {
        fetchItems();
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

    const username = getCookieValue('username')

    const filteredRegisters = registers.filter((register) => register.name === username);

    const fetchItems = () => {

        axios
            .get(Variable.api_url + 'Users')
            .then((response) => {
                if (response.status === 200) {
                    setRegisters(response.data);
                } else {
                    throw new Error('Failed to fetch registers');
                }
            })
            .catch((error) => {
                console.error('Error fetching registers:', error);
            });
    };


    return (
        <div>
            <div className="userapproval-container">
                {filteredRegisters.map((register, index) => (
                    <div key={register.id} className={`usercard ${index % 4 === 0 ? 'userfirst-card' : ''}`}>
                        <div className="usercard-content">
                            <p className="usercard-title">Hello {register.name}</p>

                            <p>Your Status is {register.status}</p>
                            {register.status === 'approved' && (
                                <div className='down'>
                                    {/* <Link to="/" className="useraccess-button">Access</Link> */}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DoctorLandingPage