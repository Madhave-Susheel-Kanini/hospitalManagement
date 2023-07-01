import './App.css';
import UserLogin from './Components/userLogin/UserLogin';
import Navbar from './Components/navBar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OtpVerification from './Components/otpVerification/OtpVerification';
import Signup from './Components/userSignUp/UserSignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/otpauth" element={<OtpVerification />} />
        <Route path="/usersignup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
