/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import './UserList.css';

function UserList() {
    const [data, setData] = useState([]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [specialization, setSpecialization] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [addToDoctorRep, setAddToDoctorRep] = useState(false);
    const [role, setRole] = useState('');
    

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddToDoctorRep = (doctor) => {
        setSelectedDoctor(doctor);
        setAddToDoctorRep(true);
    };

    useEffect(() => {
        fetchData();
        const isAuth = getCookieValue('token')
        if (isAuth === "") {
        }
    }, []);

    const handleAddToDoctorRepSubmit = () => {
        const { name, lastName, phone, email, address } = selectedDoctor;

        const formData = new FormData();
        formData.append('firstName', name);
        formData.append('lastName', '');
        formData.append('specialization', specialization);
        formData.append('phoneNumber', phone);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('imageFile', imageFile);

        console.log('Form Data:', {
            name,
            lastName,
            specialization,
            phone,
            email,
            address,
            imageFile
        });

        setRole(getCookieValue('token'))



        axios
            .post(Variable.api_url + 'Doctors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                }
            })
            .then((response) => {
                console.log('Doctor added to other table:', response.data);
                setAddToDoctorRep(false);
                setSelectedDoctor(null);
                fetchData();
            })
            .catch((error) => {
                console.error('Error adding doctor to other table:', error);
            });
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

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Users', {
                headers: {
                    Authorization: `Bearer ${getCookieValue('token')}`,
                }
            })
            .then((response) => {
                const patientData = response.data.filter((item) => item.role === 'patient');
                const otherData = response.data.filter((item) => item.role === 'doctor');
                const doctorData = [...patientData, ...otherData];
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
            .put(Variable.api_url + `Users/${id}`, updatedItem)
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
                                    <button onClick={() => handleAddToDoctorRep(item)} className="add-button">
                                        Add to Doctor Rep
                                    </button>
                                </div>
                            
                    </div>
                ))}


                {selectedDoctor && addToDoctorRep && (
                    <div className="modal-overlay">
                        <div className="modalarea">
                            <span className="close" onClick={() => setAddToDoctorRep(false)}>
                                &times;
                            </span>
                            <h2>Add to Doctor Rep</h2>
                            <div>
                                <span className="card-label">ID:</span>
                                <span>{selectedDoctor.id}</span>
                            </div>
                            <div>
                                <span className="card-label">Name:</span>
                                <span>
                                    {selectedDoctor.name}
                                </span>
                            </div>
                            <div>
                                <span className="card-label">Email:</span>
                                <span>{selectedDoctor.email}</span>
                            </div>
                            <div>
                                <span className="card-label">Specialization:</span>
                                <span>{selectedDoctor.specialization}</span>
                            </div>
                            <div>
                                <span className="card-label">Phone Number:</span>
                                <span>{selectedDoctor.phone}</span>
                            </div>
                            <div>
                                <span className="card-label">Address:</span>
                                <span>{selectedDoctor.address}</span>
                            </div>

                            <input
                                type="text"
                                name="specialization"
                                className=""
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                required
                            />

                            <input
                                type="file"
                                name="imageFile"
                                className="form-control-file"
                                onChange={handleImageChange}
                                required
                            />

                            {/* Add any additional fields you want to display */}
                            <div className="card-buttons">
                                <button
                                    type="button"
                                    onClick={handleAddToDoctorRepSubmit}
                                    className="edit-button"
                                >
                                    Add to Doctor Rep
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAddToDoctorRep(false)}
                                    className="delete-button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserList;
