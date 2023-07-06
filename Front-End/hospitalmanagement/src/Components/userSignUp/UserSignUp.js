import React, { useState } from 'react';
import './UserSignUp.css';
import { Variable } from '../../Variable';
import axios from 'axios';
import signinimage from './signup.png'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');



    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const regobj = {
            name,
            email,
            password,
            role,
            phone,
            country,
            address,
            gender,
            status: role === "patient" ? "approved" : "requested"
        };

        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const isValidPassword = uppercaseRegex.test(password) && numberRegex.test(password);

        if (!isValidPassword) {
            showToast2();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        if (!isValidEmail) {
            showToast3();
            return;
        }

        axios
            .post(Variable.api_url + 'Users', regobj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log('New item added:', response.data);
                setName('');
                setAddress('');
                setCountry('');
                setGender('');
                setRole('');
                setPhone('');
                setEmail('');
                setPassword('');
                showToast();

                setTimeout(function () {
                    window.location.href = '/userlogin';
                }, 3000);
            })
            .catch((error) => {
                console.error('Error adding new item:', error);
            });
    };

    function showToast() {
        var toastModal = document.getElementById("toastModal");
        toastModal.classList.add("show");
        setTimeout(function () {
            hideToast();
        }, 3000);
    }

    function hideToast() {
        var toastModal = document.getElementById("toastModal");
        toastModal.classList.remove("show");
    }

    function showToast1() {
        var toastModal = document.getElementById("toastModal1");
        toastModal.classList.add("show");
        setTimeout(function () {
            hideToast1();
        }, 3000);
    }

    function hideToast1() {
        var toastModal = document.getElementById("toastModal1");
        toastModal.classList.remove("show");
    }

    function showToast2() {
        var toastModal = document.getElementById("toastModal2");
        toastModal.classList.add("show");
        setTimeout(function () {
            hideToast2();
        }, 3000);
    }

    function hideToast2() {
        var toastModal = document.getElementById("toastModal2");
        toastModal.classList.remove("show");
    }

    function showToast3() {
        var toastModal = document.getElementById("toastModal3");
        toastModal.classList.add("show");
        setTimeout(function () {
            hideToast3();
        }, 3000);
    }

    function hideToast3() {
        var toastModal = document.getElementById("toastModal3");
        toastModal.classList.remove("show");
    }

    return (
        <div className='main'>
            <section className="sign-in">
                <div className="container1">
                    <div className="signin-content1">
                        <div className="signin-image1">
                            <figure><img className='img1' src={signinimage} alt='' /></figure>
                            <br></br>
                            {/* <span className="signup-image-link">Create an account</span> */}
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form method="POST" onSubmit={handleSubmit} className="register-form" id="login-form">
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="your_name" id="your_name" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="your_email" id="your_email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="your_pass" id="your_pass" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    {/* <span className='selecttitle'><i className="zmdi zmdi-lock"></i>ROLE : </span> */}
                                    <select value={role} onChange={(e) => setRole(e.target.value)} name="your_role" id="your_role" className='widthselect'>
                                        <option value="">Select an option</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="your_address" id="your_address" placeholder="Address" />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="your_phone" id="your_phone" placeholder="Phone" />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} name="your_country" id="your_country" placeholder="Country" />
                                </div>
                                <div className="form-group">
                                    <label><i className="zmdi zmdi-lock"></i></label>
                                    <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} name="your_gender" id="your_gender" placeholder="Gender" />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                    <label className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit1" value="Sign Up" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="toastModal" class="toast">
                    <div class="toast-content">
                        <span className='toastmessage'>Registration Successful</span>
                    </div>
                </div>

                <div id="toastModal1" class="toastred">
                    <div class="toast-content">
                        <span className='toastmessage'>Registration Unsuccessful</span>
                    </div>
                </div>

                <div id="toastModal2" class="toastred">
                    <div class="toast-content">
                        <span className='toastmessage'>Password must contain 1 UpperCase, 1 Special Character</span>
                    </div>
                </div>

                <div id="toastModal3" class="toastred">
                    <div class="toast-content">
                        <span className='toastmessage'>Invalid E-Mail ID format</span>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Signup;
