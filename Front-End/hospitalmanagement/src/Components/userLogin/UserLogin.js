import React, { useEffect, useState } from 'react'
import './UserLogin.css'
import signinimage from './signin-image.jpg'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserLogin() {

	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	const proceedLoginUsingAPI = (e) => {
		e.preventDefault();
		if (validate()) {
			const inputObj = { name: name, password: password };
			const url = `https://localhost:7193/api/Token/${role}`;

			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(inputObj),
			})
				.then((res) => {
					if (res.ok) {
						return res.text();
					} else {
						throw new Error('Invalid Credentials');
					}
				})
				.then((resp) => {
					showToast();
					console.log(resp);
					document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
					document.cookie = `email=${email}; expires=${getCookieExpirationDate()}; path=/`;
					document.cookie = `username=${name}; expires=${getCookieExpirationDate()}; path=/`;
					document.cookie = `role=${role}; expires=${getCookieExpirationDate()}; path=/`;
					// localStorage.setItem('email', email)
					// localStorage.setItem('username', name);
					// localStorage.setItem('role', role);
					if(role === "doctor"){
					setTimeout(function() {
						window.location.href = '/otpauth';
					  }, 3000);
					}else{
						window.location.href = '/otpauth';
					}
					
				})
				.catch((err) => {
					toast.error('Login Failed due to: ' + err.message);
					showToast1()
				});
		}
	};

	const getCookieExpirationDate = () => {
		const expirationDate = new Date();
		expirationDate.setMinutes(expirationDate.getMinutes() + 30); 
		return expirationDate.toUTCString();
	};

	function showToast() {
		var toastModal = document.getElementById("toastModal");
		toastModal.classList.add("show");
		setTimeout(function () {
		  hideToast();
		}, 3000); 
	  }

	  function showToast1() {
		console.log("ABC")
		var toastModal = document.getElementById("toastModal1");
		toastModal.classList.add("show");
		setTimeout(function () {
		  hideToast1();
		}, 3000); 
	  }
	  
	  function hideToast() {
		var toastModal = document.getElementById("toastModal");
		toastModal.classList.remove("show");
	  }

	  function hideToast1() {
		var toastModal = document.getElementById("toastModal1");
		toastModal.classList.remove("show");
	  }

	const validate = () => {
		let result = true;
		if (name === '' || name === null) {
			result = false;
			toast.warning('Please Enter Username');
		}
		if (password === '' || password === null) {
			result = false;
			toast.warning('Please Enter Password');
		}
		return result;
	};



	return (
		<div className='main'>
			<section className="sign-in">
				<div className="container">
					<div className="signin-content">
						<div className="signin-image">
							<figure><img src={signinimage} alt='' /></figure>
							<br></br>
						</div>
						<div className="signin-form">
							<h2 className="form-title">Sign In</h2>
							<form method="POST" onSubmit={proceedLoginUsingAPI} className="register-form" id="login-form">
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
									<select value={role} onChange={(e) => setRole(e.target.value)} name="your_role" id="your_role" className='widthselect1'>
										<option value="">Select Role</option>
										<option value="patient">Patient</option>
										<option value="doctor">Doctor</option>
									</select>
								</div>
								<div className="form-group">
									<input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
									<label className="label-agree-term"><span><span></span></span>Remember me</label>
								</div>
								<div className="form-group form-button">
									<input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
								</div>
							</form>
							{/* <div className="social-login">
								<span className="social-label">Or Sign Up with</span>
								<ul className="socials">
									<li><i className="display-flex-center zmdi zmdi-facebook"></i></li>
									<li><i className="display-flex-center zmdi zmdi-twitter"></i></li>
									<li><i className="display-flex-center zmdi zmdi-google"></i></li>
								</ul>
							</div> */}
						</div>
					</div>
				</div>

				<div id="toastModal" class="toast">
					<div class="toast-content">
						<span className='toastmessage'>Login Successful</span>
					</div>
				</div>

				<div id="toastModal1" class="toastred">
					<div class="toast-content">
						<span className='toastmessage'>Incorrect Username/Password</span>
					</div>
				</div>

			</section>

		</div>
	)
}

export default UserLogin