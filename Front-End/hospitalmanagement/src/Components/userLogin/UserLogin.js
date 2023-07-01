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
			.then((res) => res.text())
			.then((resp) => {	
			  console.log(resp);
			  toast.success('Success');
			  
			  // Store the token in a cookie
			document.cookie = `token=${resp}; expires=${getCookieExpirationDate()}; path=/`;
			navigate('/otpauth')
	  
			  localStorage.setItem('name', name);
			  localStorage.setItem('email', email)
			})
			.catch((err) => {
			  toast.error('Login Failed due to: ' + err.message);
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
							<span className="signup-image-link">Create an account</span>
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
									<label><i className="zmdi zmdi-lock"></i></label>
									<input type="text" value={role} onChange={(e) => setRole(e.target.value)} name="your_pass" id="your_role" placeholder="Role" />
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
			</section>

		</div>
	)
}

export default UserLogin