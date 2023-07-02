/* eslint-disable */
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
      <div class="vertical-nav bg-white" id="sidebar">
        <div class="py-4 px-3 mb-4 bg-light">
          <div class="media d-flex align-items-center">
            <div class="media-body">
              <h4 class="m-0">HOSPITAL MANAGEMENT</h4>
              <p class="font-weight-light text-muted mb-0">Dashboard</p>
            </div>
          </div>
        </div>

        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

        <ul class="nav flex-column bg-white mb-0">
          <li class="nav-item">
            <a href="patientlist" class="nav-link text-dark font-italic">
              <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
              Patients
            </a>
          </li>
          <li class="nav-item">
            <a href="doctorlist" class="nav-link text-dark font-italic">
              <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
              Doctors
            </a>
          </li>
          <li class="nav-item">
            <a href="doctorauthapproval" class="nav-link text-dark font-italic">
              <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
              Doctor Approval
            </a>
          </li>
          <li class="nav-item">
            <a href="billgenerate" class="nav-link text-dark font-italic">
              <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
              Bill Generate
            </a>
          </li>
        </ul>

        <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

        <ul class="nav flex-column bg-white mb-0">
          <li class="nav-item">
            <a href="activebillings" class="nav-link text-dark font-italic">
              <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
              Invoice Download
            </a>
          </li>
          <li class="nav-item">
            <a href="activebillings" class="nav-link text-dark font-italic">
              <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
              Active Billings
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic">
              <i class="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
              Pie charts
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic">
              <i class="fa fa-line-chart mr-3 text-primary fa-fw"></i>
              Line charts
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
