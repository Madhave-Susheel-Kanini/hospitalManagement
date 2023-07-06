import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import signinimage from './signin-image.jpg'

function AdminLogin() {
    const [admin_name, setName] = useState('');
	const [admin_password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	const proceedLoginUsingAPI = (e) => {
		e.preventDefault();
		if (validate()) {
			const inputObj = { admin_name: admin_name, admin_password: admin_password };
			const url = `https://localhost:7193/api/Token/Admin`;

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
				console.log(resp);
				

				// Store the token in a cookie
				document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
				document.cookie = `email=${email}; expires=${getCookieExpirationDate()}; path=/`;
				document.cookie = `username=${admin_name}; expires=${getCookieExpirationDate()}; path=/`;
				document.cookie = `role=${role}; expires=${getCookieExpirationDate()}; path=/`;
				// localStorage.setItem('email', email)
				// localStorage.setItem('username', name);
				// localStorage.setItem('role', role);
				showToast()
				setTimeout(function() {
					window.location.href = '/userlist';
				  }, 3000);
			})
			.catch((err) => {
				showToast1()
				console.log('Login Failed due to: ' + err.message);
			});
		}
	};

	const getCookieExpirationDate = () => {
		const expirationDate = new Date();
		expirationDate.setMinutes(expirationDate.getMinutes() + 10); // Set expiration to 10 minutes from now
		return expirationDate.toUTCString();
	};

	const validate = () => {
		let result = true;
		if (admin_name === '' || admin_name === null) {
			result = false;
			
		}
		if (admin_password === '' || admin_password === null) {
			result = false;
			
		}
		return result;
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


  return (
    <div className='main'>
			<section className="sign-in">
				<div className="container">
					<div className="signin-content">
						<div className="signin-image">
							<figure><img src={signinimage} alt='' /></figure>
							<br></br>
							{/* <span className="signup-image-link">Create an account</span> */}
						</div>
						<div className="signin-form">
							<h2 className="form-title">Admin Sign In</h2>
							<form method="POST" onSubmit={proceedLoginUsingAPI} className="register-form" id="login-form">
								<div className="form-group">
									<label><i className="zmdi zmdi-account material-icons-name"></i></label>
									<input type="text" value={admin_name} onChange={(e) => setName(e.target.value)} name="your_name" id="your_name" placeholder="Your Name" />
								</div>
								<div className="form-group">
									<label><i className="zmdi zmdi-lock"></i></label>
									<input type="password" value={admin_password} onChange={(e) => setPassword(e.target.value)} name="your_pass" id="your_pass" placeholder="Password" />
								</div>
								<div className="form-group">
									<input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
									<label className="label-agree-term"><span><span></span></span>Remember me</label>
								</div>
								<div className="form-group form-button">
									<input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
								</div>
							</form>
						</div>
					</div>
				</div>

				<div id="toastModal" class="toast">
					<div class="toast-content">
						<span className='toastmessage'>Signin Successful</span>
					</div>
				</div>

				<div id="toastModal1" class="toastred">
					<div class="toast-content">
						<span className='toastmessage'>Incorrect Username or Password</span>
					</div>
				</div>
			</section>

		</div>
  )
}

export default AdminLogin