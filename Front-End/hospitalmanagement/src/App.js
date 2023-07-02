import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserLogin from './Components/userLogin/UserLogin';
import Navbar from './Components/navBar/Navbar';
import OtpVerification from './Components/otpVerification/OtpVerification';
import Signup from './Components/userSignUp/UserSignUp';
import DoctorAuthApproval from './Components/doctorAuthApproval/DoctorAuthApproval';
import PatientList from './Components/patientList/PatientList';
import BillGenerate from './Components/billGenerate/BillGenerate';
import InvoiceDownload from './Components/invoiceDownload/InvoiceDownload';
import ActiveBilling from './Components/activeBilling/ActiveBilling';
import DoctorList from './Components/doctorList/DoctorList';
import UserSideHome from './Components/userSideHome/UserSideHome';

function App() {
  const shouldRenderSidebar =
    window.location.pathname !== '/userlogin' &&
    window.location.pathname !== '/otpauth' &&
    window.location.pathname !== '/invoicedownload' &&
    window.location.pathname !== '/userside' &&
    window.location.pathname !== '/usersignup';

  return (
    <Router>
      <div className="App">
        {shouldRenderSidebar && <Navbar />}
        <div className={shouldRenderSidebar ? 'content' : 'content1'}>
          <Routes>
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/otpauth" element={<OtpVerification />} />
            <Route path="/usersignup" element={<Signup />} />
            <Route path="/doctorauthapproval" element={<DoctorAuthApproval />} />
            <Route path="/patientlist" element={<PatientList />} />
            <Route path="/billgenerate" element={<BillGenerate />} />
            <Route path="/invoicedownload" element={<InvoiceDownload />} />
            <Route path="/activebillings" element={<ActiveBilling />} />
            <Route path="/doctorlist" element={<DoctorList />} />
            <Route path="/userside" element={<UserSideHome />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
