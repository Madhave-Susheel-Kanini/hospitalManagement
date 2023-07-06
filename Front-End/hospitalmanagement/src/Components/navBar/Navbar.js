/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faHospital, faUsers, faAngleDown, faNotesMedical, faAngleRight, faSignOutAlt, faCog, faList, faFolder, faUserMd, faVial } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  const [expandedItems, setExpandedItems] = useState([]);
  const [role, setRole] = useState('');

  const handleExpand = (itemIndex) => {
    if (expandedItems.includes(itemIndex)) {
      setExpandedItems(expandedItems.filter((index) => index !== itemIndex));
    } else {
      setExpandedItems([...expandedItems, itemIndex]);
    }
  };

  const isItemExpanded = (itemIndex) => {
    return expandedItems.includes(itemIndex);
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

  useEffect(() => {
    const role = getCookieValue('role');
    setRole(role);
  }, []);

  return (
    <div>
      <div className="vertical-nav bg-white" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="media d-flex align-items-center">
            <div className="media-body">
              <h4 className="m-0">HOSPITAL MANAGEMENT</h4>
              <p className="font-weight-light text-muted mb-0">Dashboard</p>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">GENERAL</p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <a href="patientlist" className="nav-link text-dark font-italic">
              <FontAwesomeIcon icon={faUsers} className="mr-3" />
              Patients
            </a>
          </li>
          <li className="nav-item">
            <a href="doctorlist" className="nav-link text-dark font-italic">
              <FontAwesomeIcon icon={faUserMd} className="mr-3" />
              Doctors
            </a>
          </li>
          <li className="nav-item">
            <a href="userlist" className="nav-link text-dark font-italic">
              <FontAwesomeIcon icon={faList} className="mr-3" />
              User List
            </a>
          </li>

          {role !== 'doctor' && (
            <React.Fragment>
              <li className="nav-item">
                <a href="doctorauthapproval" className="nav-link text-dark font-italic">
                  <FontAwesomeIcon icon={faUser} className="mr-3" />
                  Doctor Approval
                </a>
              </li>
              <li className="nav-item">
                <a href="billgenerate" className="nav-link text-dark font-italic">
                  <FontAwesomeIcon icon={faFolder} className="mr-3" />
                  Bill Generate
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>

        {role !== 'doctor' && (
          <React.Fragment>
            <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>
          </React.Fragment>
        )}

        {role === 'doctor' && (
          <React.Fragment>
            <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Actions</p>

            <ul className="nav flex-column bg-white mb-0">
              <li className="nav-item">
                <a href="viewappointment" className="nav-link text-dark font-italic">
                  <FontAwesomeIcon icon={faNotesMedical} className="mr-3" />
                  View All Appointments
                </a>
              </li>
            </ul>
          </React.Fragment>
        )}


        <ul className="nav flex-column bg-white mb-0">
          {role !== 'doctor' && (
            <React.Fragment>
              <li className="nav-item">
                <a href="invoiceDownload" className="nav-link text-dark font-italic">
                  <FontAwesomeIcon icon={faVial} className="mr-3" />
                  Invoice Download
                </a>
              </li>
              <li className="nav-item">
                <a href="activebillings" className="nav-link text-dark font-italic">
                  <FontAwesomeIcon icon={faHospital} className="mr-3" />
                  Active Billings
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">SETTINGS</p>
        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <a href="logout" className="nav-link text-dark font-italic">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
