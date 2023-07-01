import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Variable } from '../../Variable';
import './BillGenerate.css'; // Import CSS file for styling

function BillGenerate() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [service, setServices] = useState([]);
  const [total, setTotal] = useState('');

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

  const handleGenerateBill = (id, firstName, email) => {
    setPatientId(id);
    setPatientFirstName(firstName);
    setPatientEmail(email);
    setShowModal(true);
  };



  const handleGenerateBillSubmit = () => {
    const billData = {
      patientFirstName,
      patientEmail,
      service,
      total,
    };

    console.log(billData)

    // Send POST request to the billing API endpoint
    axios
      .post('https://localhost:7193/api/Billings', billData)
      .then((response) => {
        console.log('Bill generated:', response.data);
        // Reset the form and close the modal
        setPatientId('');
        setPatientFirstName('');
        setPatientEmail('');
        setServices([]);
        setTotal('');
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error generating bill:', error);
      });
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <div className="card-header">
              <div className="card-header-item">
                <span className="card-span">ID:</span>
                <span>{item.id}</span>
              </div>
              <div className="card-header-item">
                <span className="card-span">Name:</span>
                <span>
                  {item.firstName} {item.lastName}
                </span>
              </div>
              <div className="card-header-item">
                <span className="card-span">Email:</span>
                <span>{item.email}</span>
              </div>
            </div>
            <div className="card-body">
              <div className="card-body-item">
                <span className="card-span">Date of Birth:</span>
                <span>{item.dateofbirth}</span>
              </div>
              <div className="card-body-item">
                <span className="card-span">Phone:</span>
                <span>{item.phoneNumber}</span>
              </div>
              <div className="card-body-item">
                <span className="card-span">Address:</span>
                <span>{item.address}</span>
              </div>
              <div className="card-body-item">
                <span className="card-span">Gender:</span>
                <span>{item.gender}</span>
              </div>
            </div>
            <div className="card-buttons">
              <button
                onClick={() =>
                  handleGenerateBill(item.id, item.firstName, item.email)
                }
                className="approve-button"
              >
                Generate Bill
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Generate Bill</h3>
            <div>
              <span>Patient First Name:</span>
              <input
                type="text"
                value={patientFirstName}
                onChange={(e) => setPatientFirstName(e.target.value)}
              />
            </div>
            <div>
              <span>Patient Email:</span>
              <input
                type="text"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              />
            </div>
            <div>
              <span>Services:</span>
              <input
                type="text"
                value={service}
                onChange={(e) => setServices(e.target.value)}
              />
            </div>
            <div>
              <span>Total:</span>
              <input
                type="text"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleGenerateBillSubmit}>Generate</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillGenerate;
