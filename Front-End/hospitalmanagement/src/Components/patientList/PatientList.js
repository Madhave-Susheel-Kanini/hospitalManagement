import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';

function PatientList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Patients')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

  return (
    <div>
        <h2>PATIENT LIST</h2>
            <div className="card-container">
                {data.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-header">
                            <div className="card-header-item">
                                <span className="card-label">ID:</span>
                                <span>{item.id}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Name:</span>
                                <span>{item.firstName} {item.lastName}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Email:</span>
                                <span>{item.email}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-body-item">
                                <span className="card-label">Date of Birth:</span>
                                <span>{item.dateofbirth}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Phone:</span>
                                <span>{item.phoneNumber}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Address:</span>
                                <span>{item.address}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Gender:</span>
                                <span>{item.gender}</span>
                            </div>
                        </div>
                        {/* <div className="card-buttons">
                            <button onClick={() => handleApprove(item.id)} className='approve-button'>Approve</button>
                            <button onClick={() => handleDeny(item.id)} className='deny-button'>Deny</button>
                        </div> */}
                    </div>
                ))}
            </div>
    </div>
  )
}

export default PatientList