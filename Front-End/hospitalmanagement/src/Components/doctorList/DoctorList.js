/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import './DoctorList.css';
import { useNavigate } from 'react-router-dom';

function DoctorList() {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [role, setRole] = useState('');

  const [newDoctor, setNewDoctor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialization: '',
    imageFile: null,
    gender: '',
    phoneNumber: '',
    address: '',
  });

  const navigate = useNavigate();

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
    const isAuthenticated = getCookieValue('token');
    if (!isAuthenticated) {
      navigate('/userlogin');
      window.location.reload()
    } else {
      fetchData();
    }
    const role = getCookieValue('role');
    setRole(role);
  }, []);

  // useEffect(() => {
  //   // Check if the user is authenticated
  //   const isAuthenticated = getCookieValue('token');
  //   if (!isAuthenticated) {
  //     navigate('/userlogin'); // Redirect to the login page if not authenticated
  //   } else {
  //     fetchData();
  //   }
  // }, [navigate]);


  const fetchData = () => {
    axios
      .get(Variable.api_url + 'Doctors', {
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

  const handleEdit = (doctor) => {
    console.log('Edit ID:', doctor.id);
    setSelectedDoctor(doctor);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('firstName', selectedDoctor.firstName);
    formData.append('lastName', selectedDoctor.lastName);
    formData.append('email', selectedDoctor.email);
    formData.append('specialization', selectedDoctor.specialization);
    formData.append('gender', selectedDoctor.gender);
    formData.append('phoneNumber', selectedDoctor.phoneNumber);
    formData.append('address', selectedDoctor.address);
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
  
    axios
      .put(Variable.api_url + `Doctors/${selectedDoctor.id}`, formData, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log('Doctor updated:', response.data);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Error updating doctor:', error);
      });
  };

  const handleInputChange = (e) => {
    setSelectedDoctor({
      ...selectedDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (doctorId) => {
    axios
      .delete(Variable.api_url + `Doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${getCookieValue('token')}`,
        },
      })
      .then((response) => {
        console.log('Doctor deleted:', response.data);
        setData((prevData) => prevData.filter((item) => item.id !== doctorId));
      })
      .catch((error) => {
        console.error('Error deleting doctor:', error);
      });
  };

  const handleAddInputChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  
  const handleAddDoctor = () => {
    const formData = new FormData();
    formData.append('firstName', newDoctor.firstName);
    formData.append('lastName', newDoctor.lastName);
    formData.append('email', newDoctor.email);
    formData.append('specialization', newDoctor.specialization);
    formData.append('gender', newDoctor.gender);
    formData.append('phoneNumber', newDoctor.phoneNumber);
    formData.append('address', newDoctor.address);
    formData.append('imageFile', imageFile);
  
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
        console.log('Doctor added:', response.data);
        setShowAddModal(false);
        setNewDoctor({
          firstName: '',
          lastName: '',
          email: '',
          specialization: '',
          imageFile: null,
          gender: '',
          phoneNumber: '',
          address: '',
        });
        fetchData();
      })
      .catch((error) => {
        console.error('Error adding doctor:', error);
      });
  };

  return (
    <div>
      <h2>Doctor List</h2>
      {role !== 'doctor' && (
            <React.Fragment>
      <div className="card-buttons">
        <button onClick={() => setShowAddModal(true)} className="edit-button">
          Add New Doctor
        </button>
      </div>
      </React.Fragment>
      )}
      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header">
            <div className="card-header-item">
                <img className='cardimg1' src={`https://localhost:7193/uploads/doctor/${item.docImagePath}`}></img>
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
                <span className="card-label">Specialization:</span>
                <span>{item.specialization}</span>
              </div>
              <div className="card-body-item">
                <span className="card-label">Phone:</span>
                <span>{item.phoneNumber}</span>
              </div>
              <div className="card-body-item">
                <span className="card-label">Address:</span>
                <span>{item.address}</span>
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

      {selectedDoctor && showEditModal && (
        <div className="modal-overlay">
          <div className="modalarea">
            <span className="close" onClick={() => setShowEditModal(false)}>
              &times;
            </span>
            <h2>Edit Doctor</h2>
            <form>
              <span htmlFor="firstName">First Name:</span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={selectedDoctor.firstName}
                onChange={handleInputChange}
              />

              <span htmlFor="lastName">Last Name:</span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={selectedDoctor.lastName}
                onChange={handleInputChange}
              />

              <span htmlFor="email">Email:</span>
              <input
                type="email"
                id="email"
                name="email"
                value={selectedDoctor.email}
                onChange={handleInputChange}
              />

              <span htmlFor="specialization">Specialization:</span>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={selectedDoctor.specialization}
                onChange={handleInputChange}
              />

              <span htmlFor="phoneNumber">Phone Number:</span>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={selectedDoctor.phoneNumber}
                onChange={handleInputChange}
              />

              <span htmlFor="address">Address:</span>
              <input
                type="text"
                id="address"
                name="address"
                value={selectedDoctor.address}
                onChange={handleInputChange}
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
            <h2>Add New Doctor</h2>
            <form>
              <span htmlFor="newFirstName">First Name:</span>
              <input
                type="text"
                id="newFirstName"
                name="firstName"
                value={newDoctor.firstName}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newLastName">Last Name:</span>
              <input
                type="text"
                id="newLastName"
                name="lastName"
                value={newDoctor.lastName}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newEmail">Email:</span>
              <input
                type="email"
                id="newEmail"
                name="email"
                value={newDoctor.email}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newSpecialization">Specialization:</span>
              <input
                type="text"
                id="newSpecialization"
                name="specialization"
                value={newDoctor.specialization}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newGender">Gender:</span>
              <input
                type="text"
                id="newGender"
                name="gender"
                value={newDoctor.gender}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newPhoneNumber">Phone Number:</span>
              <input
                type="text"
                id="newPhoneNumber"
                name="phoneNumber"
                value={newDoctor.phoneNumber}
                onChange={handleAddInputChange}
              />

              <span htmlFor="newAddress">Address:</span>
              <input
                type="text"
                id="newAddress"
                name="address"
                value={newDoctor.address}
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
                <button type="button" onClick={handleAddDoctor} className="edit-button">
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

export default DoctorList;
