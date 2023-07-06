/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import './PatientList.css';
import { useNavigate,Link } from 'react-router-dom';
function PatientList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newPatient, setNewPatient] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        address: '',
    });
    const [role, setRole] = useState('');
    useEffect(() => {
        const isAuthenticated = getCookieValue('token');
        if (!isAuthenticated) {
        console.log("Nil")
        } else {
          fetchData();
        }
      }, [navigate]);
      
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
        const role = getCookieValue('role');
        setRole(role);
    }, []);

    const handleImageChange = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleEditImageChange = (e) => {
        setSelectedPatient({
            ...selectedPatient,
            [e.target.name]: e.target.files[0],
        });
    };

    const fetchData = () => {
        axios
            .get(Variable.api_url + 'Patients', {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                },
              })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleEdit = (patient) => {
        console.log('Edit ID:', patient.id);
        setSelectedPatient(patient);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('firstName', selectedPatient.firstName);
        formData.append('lastName', selectedPatient.lastName);
        formData.append('email', selectedPatient.email);
        formData.append('dateOfBirth', selectedPatient.dateOfBirth);
        formData.append('gender', selectedPatient.gender);
        formData.append('phoneNumber', selectedPatient.phoneNumber);
        formData.append('address', selectedPatient.address);
        if (selectedPatient.imageFile) {
            formData.append('imageFile', selectedPatient.imageFile);
        }

        axios
            .put(Variable.api_url + `Patients/${selectedPatient.id}`, formData, {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                },
              })
            .then((response) => {
                console.log('Patient updated:', response.data);
                setShowEditModal(false);
            })
            .catch((error) => {
                console.error('Error updating patient:', error);
            });
    };

    const handleInputChange = (e) => {
        setSelectedPatient({
            ...selectedPatient,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = (patientId) => {
        axios
            .delete(Variable.api_url + `Patients/${patientId}`, {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                },
              })
            .then((response) => {
                console.log('Patient deleted:', response.data);
                setData((prevData) => prevData.filter((item) => item.id !== patientId));
            })
            .catch((error) => {
                console.error('Error deleting patient:', error);
            });
    };

    const handleAddInputChange = (e) => {
        setNewPatient({
            ...newPatient,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddPatient = () => {
        const formData = new FormData();
        formData.append('firstName', newPatient.firstName);
        formData.append('lastName', newPatient.lastName);
        formData.append('email', newPatient.email);
        formData.append('dateOfBirth', newPatient.dateOfBirth);
        formData.append('gender', newPatient.gender);
        formData.append('phoneNumber', newPatient.phoneNumber);
        formData.append('address', newPatient.address);
        formData.append('imageFile', newPatient.imageFile);

        axios
            .post(Variable.api_url + 'Patients', formData, {
                headers: {
                  Authorization: `Bearer ${getCookieValue('token')}`,
                },
              })
            .then((response) => {
                console.log('Patient added:', response.data);
                setShowAddModal(false);
                setNewPatient({
                    firstName: '',
                    lastName: '',
                    email: '',
                    dateOfBirth: '',
                    gender: '',
                    phoneNumber: '',
                    address: '',
                    imageFile: null,
                });
                fetchData();
            })
            .catch((error) => {
                console.error('Error adding patient:', error);
            });
    };

    return (
        <div>
            <h2>Patient List</h2>
            {role !== 'doctor' && (
                <React.Fragment>
                    <div className="card-buttons">
                        <button onClick={() => setShowAddModal(true)} className="edit-button">
                            Add New Patient
                        </button>
                    </div>
                </React.Fragment>
            )}
            <div className="card-container">
                {data.map((item) => (
                    <div key={item.id} className="card">
                        <div className="card-header">
                            <div className="card-header-item">
                                <img className='cardimg' src={`https://localhost:7193/uploads/patient/${item.patImagePath}`}></img>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">ID:</span>
                                <span>{item.id}</span>
                            </div>
                            <div className="card-header-item">
                                <span className="card-label">Name:</span>
                                <span>
                                    {item.firstName} {item.lastName}
                                </span>
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
                        {role !== 'doctor' && (
                            <React.Fragment>
                                <div className="card-buttons">
                                    <button onClick={() => handleEdit(item)} className="edit-button">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                ))}
            </div>

            {selectedPatient && showEditModal && (
                <div className="modal-overlay">
                    <div className="modalarea">
                        <span className="close" onClick={() => setShowEditModal(false)}>
                            &times;
                        </span>
                        <h2>Edit Patient</h2>
                        <form>
                            <span htmlFor="firstName">First Name:</span>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={selectedPatient.firstName}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="lastName">Last Name:</span>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={selectedPatient.lastName}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="email">Email:</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={selectedPatient.email}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="dateOfBirth">Date of Birth:</span>
                            <input
                                type="text"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={selectedPatient.dateOfBirth}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="gender">Gender:</span>
                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={selectedPatient.gender}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="phoneNumber">Phone Number:</span>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={selectedPatient.phoneNumber}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="address">Address:</span>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={selectedPatient.address}
                                onChange={handleInputChange}
                            />

                            <span htmlFor="address">Image:</span>
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="imageFile"
                                    className="form-control-file"
                                    onChange={handleEditImageChange}
                                    required
                                />
                            </div>

                            <div className="card-buttons">
                                <button type="button" onClick={handleUpdate} className="edit-button">
                                    Save Changes
                                </button>
                                <button type="button" onClick={() => setShowEditModal(false)} className="delete-button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modalarea">
                        <span className="close" onClick={() => setShowAddModal(false)}>
                            &times;
                        </span>
                        <h2>Add New Patient</h2>
                        <form>
                            <span htmlFor="newFirstName">First Name:</span>
                            <input
                                type="text"
                                id="newFirstName"
                                name="firstName"
                                value={newPatient.firstName}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newLastName">Last Name:</span>
                            <input
                                type="text"
                                id="newLastName"
                                name="lastName"
                                value={newPatient.lastName}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newEmail">Email:</span>
                            <input
                                type="email"
                                id="newEmail"
                                name="email"
                                value={newPatient.email}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newDateOfBirth">Date of Birth:</span>
                            <input
                                type="text"
                                id="newDateOfBirth"
                                name="dateOfBirth"
                                value={newPatient.dateOfBirth}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newGender">Gender:</span>
                            <input
                                type="text"
                                id="newGender"
                                name="gender"
                                value={newPatient.gender}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newPhoneNumber">Phone Number:</span>
                            <input
                                type="text"
                                id="newPhoneNumber"
                                name="phoneNumber"
                                value={newPatient.phoneNumber}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="newAddress">Address:</span>
                            <input
                                type="text"
                                id="newAddress"
                                name="address"
                                value={newPatient.address}
                                onChange={handleAddInputChange}
                            />

                            <span htmlFor="address">Image:</span>
                            <div className="form-group">
                                <input
                                    type="file"
                                    name="imageFile"
                                    className="form-control-file"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>

                            <div className="card-buttons">
                                <button type="button" onClick={handleAddPatient} className="edit-button">
                                    Save
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="delete-button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientList;
