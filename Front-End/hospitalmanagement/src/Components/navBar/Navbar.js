import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faHospital, faUsers, faAngleDown, faNotesMedical, faAngleRight, faSignOutAlt, faCog, faFolder, faUserMd, faVial } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  const [expandedItems, setExpandedItems] = useState([]);

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

  return (
    <div>
      <nav className="admin-navbar">
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(0)}>
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              <span className='navheading'>GENERAL</span>
              <FontAwesomeIcon
                icon={isItemExpanded(0) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(0) && (
              <ul className="sub-menu">
                <hr className='hrclass'/>
                <li>
                  <Link to="/admin/logout">
                    <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings">
                    <FontAwesomeIcon icon={faCog} className="nav-icon" />
                    Settings
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(1)}>
              <FontAwesomeIcon icon={faHospital} className="nav-icon" />
              <span className='navheading'>HOSPITAL</span>
              <FontAwesomeIcon
                icon={isItemExpanded(1) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(1) && (
              <ul className="sub-menu">
                <hr/>
                <li>
                  <Link to="/admin/departments">
                    <FontAwesomeIcon icon={faFolder} className="nav-icon" />
                    Departments
                  </Link>
                </li>
                <li>
                  <Link to="/admin/doctors">
                    <FontAwesomeIcon icon={faUserMd} className="nav-icon" />
                    Doctors
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(7)}>
              <FontAwesomeIcon icon={faHospital} className="nav-icon" />
              <span className='navheading'>BILLING</span>
              <FontAwesomeIcon
                icon={isItemExpanded(7) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(7) && (
              <ul className="sub-menu">
                <hr/>
                <li>
                  <Link to="/billgenerate">
                    <FontAwesomeIcon icon={faFolder} className="nav-icon" />
                    Generate Bill
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(2)}>
              <FontAwesomeIcon icon={faUsers} className="nav-icon" />
              <span className='navheading'>CONSULTANTS</span>
              <FontAwesomeIcon
                icon={isItemExpanded(2) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(2) && (
              <ul className="sub-menu">
                <hr/>
                <li>
                  <Link to="/patientlist">
                    <FontAwesomeIcon icon={faUser} className="nav-icon" />
                    Patients
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(4)}>
              <FontAwesomeIcon icon={faNotesMedical} className="nav-icon" />
              <span className='navheading'>DIAGNOSIS</span>
              <FontAwesomeIcon
                icon={isItemExpanded(4) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(4) && (
              <ul className="sub-menu">
                <hr/>
                <li>
                  <Link to="/admin/diseases">
                    <FontAwesomeIcon icon={faVial} className="nav-icon" />
                    Diseases
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <div className="nav-group" onClick={() => handleExpand(3)}>
              <FontAwesomeIcon icon={faNotesMedical} className="nav-icon" />
              <span className='navheading'>AUTHORIZATION</span>
              <FontAwesomeIcon
                icon={isItemExpanded(3) ? faAngleDown : faAngleRight}
                className="arrow"
              />
            </div>
            {isItemExpanded(3) && (
              <ul className="sub-menu">
                <hr/>
                <li>
                  <Link to="/doctorauthapproval">
                    <FontAwesomeIcon icon={faVial} className="nav-icon" />
                    Doctor Approval
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
