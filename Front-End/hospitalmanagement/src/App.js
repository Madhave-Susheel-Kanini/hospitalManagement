import './App.css';
import UserLogin from './Components/userLogin/UserLogin';
import Navbar from './Components/navBar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/userlogin" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
