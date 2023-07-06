/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import './DoctorAuthApproval.css';

function DoctorAuthApproval() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    

    useEffect(() => {
        fetchData();
        const token = getCookieValue('token');
    }, []);

    const handleFilter = (filter) => {
        setStatusFilter(filter);
        filterData(data, filter);
    };

    const filterData = (data, filter) => {
        if (filter === 'all') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => item.status === filter);
            setFilteredData(filtered);
        }
    };

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

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Users', {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                  }
            })
            .then((response) => {
               
                const doctorData = response.data.filter((item) => item.role === 'doctor');
                setData(doctorData);
                filterData(doctorData, statusFilter);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleApprove = (id) => {
        const selectedItem = data.find((item) => item.id === id);

        const updatedItem = {
            ...selectedItem,
            status: 'approved'
        };

        axios
            .put(Variable.api_url + `Users/${id}`, updatedItem, {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                  }
            })
            .then((response) => {
                console.log('Status updated:', response.data);
                fetchData();
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    const handleDeny = (id) => {
        const selectedItem = data.find((item) => item.id === id);

        const updatedItem = {
            ...selectedItem,
            status: 'denied'
        };

        axios
            .put(Variable.api_url + `Users/${id}`, updatedItem, {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                  }
            })
            .then((response) => {
                console.log('Status updated:', response.data);
                fetchData();
            })
            .catch((error) => {
                console.error('Error updating status:', error);
            });
    };

    return (
        <div>
            <h2>Doctor Authentication Approval</h2>
            <div className="filter-buttons">
                <button
                    className={statusFilter === 'all' ? 'active' : ''}
                    onClick={() => handleFilter('all')}
                >
                    All
                </button>
                <button
                    className={statusFilter === 'requested' ? 'active' : ''}
                    onClick={() => handleFilter('requested')}
                >
                    Requested
                </button>
                <button
                    className={statusFilter === 'approved' ? 'active' : ''}
                    onClick={() => handleFilter('approved')}
                >
                    Approved
                </button>
                <button
                    className={statusFilter === 'denied' ? 'active' : ''}
                    onClick={() => handleFilter('denied')}
                >
                    Denied
                </button>
            </div>
            <div className="card-container">
            {filteredData.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-header">
                            <div className="card-header-item">
                                <span className="card-label">ID:</span>
                                <span>{item.id}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Name:</span>
                                <span>{item.name}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Email:</span>
                                <span>{item.email}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="card-body-item">
                                <span className="card-label">Password:</span>
                                <span>{item.password}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Role:</span>
                                <span>{item.role}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Phone:</span>
                                <span>{item.phone}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Country:</span>
                                <span>{item.country}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Address:</span>
                                <span>{item.address}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Gender:</span>
                                <span>{item.gender}</span>
                            </div>
                            <div className="card-body-item">
                                <span className="card-label">Status:</span>
                                <span>{item.status}</span>
                            </div>
                        </div>
                        <div className="card-buttons">
                            <button onClick={() => handleApprove(item.id)} className='approve-button'>Approve</button>
                            <button onClick={() => handleDeny(item.id)} className='deny-button'>Deny</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DoctorAuthApproval;
