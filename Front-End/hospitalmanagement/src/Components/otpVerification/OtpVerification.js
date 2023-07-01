import React, { useState } from 'react';
import './OtpVerification.css';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom'; // Replace 'your-routing-library' with the actual routing library you are using

function OtpVerification() {
  const digitValidate = function (ele) {
    ele.value = ele.value.replace(/[^0-9]/g, '');
  };

  const [randomNumber, setRandomNumber] = useState('');
  const navigate = useNavigate();


  const handleGetOTP = () => {
    sendEmail();
  }

// Empty dependency array to trigger the effect only once

  function sendEmail() {
    const email = localStorage.getItem('email');
    const generatedNumber = Math.floor(Math.random() * 9000) + 1000;

    setRandomNumber(generatedNumber); // Store the generated number in the state

    const templateParams = {
      to_name: 'Maddy',
      from_name: 'Madhave Susheel',
      message: 'The OTP is ' + generatedNumber,
      to_email: email
    };

    // console.log(templateParams);

    emailjs
      .send('otp_gen', 'template_prwx0u4', templateParams, 'Wp4bNYUOJ_Tk2pd9m')
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  const tabChange = function (val, event) {
    const ele = document.querySelectorAll('input');

    if (event.key === 'Backspace') {
      if (val > 1 && ele[val - 1].value === '') {
        ele[val - 2].focus();
      } else if (val === 1) {
        // Prevent focusing on the previous cell
        ele[val - 1].value = ''; // Clear the value in the current cell
      } else if (val < ele.length && ele[val - 1].value !== '') {
        ele[val].focus();
      }
    } else if (val < ele.length && ele[val - 1].value !== '') {
      ele[val].focus();
    }

    if (ele[val - 1].value.length > 1) {
      ele[val - 1].value = ele[val - 1].value.slice(0, 1); // Truncate to only one character
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your verification logic here
    const otpInputs = document.querySelectorAll('.otp');
    let otp = '';
    otpInputs.forEach((input) => {
      otp += input.value;
    });
    if (otp === randomNumber.toString()) {
      console.log("Correct otp");
      navigate('/'); // Navigate to the '/home' route
    } else {
      console.log("Invalid otp");
    }
    console.log('OTP:', otp);
  };

  return (
    <div className="container1">
      <div className="bgWhite">
        <a className='otpclick' href='' onClick={handleGetOTP}>Click here to resend verification code</a>
        <div className="title">Verify OTP</div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="otpbox">
            <input
              className="otp"
              type="text"
              onInput={(e) => digitValidate(e.target)}
              onKeyUp={(e) => tabChange(1, e)}
              maxLength="1"
            />
            <input
              className="otp"
              type="text"
              onInput={(e) => digitValidate(e.target)}
              onKeyUp={(e) => tabChange(2, e)}
              maxLength="1"
            />
            <input
              className="otp"
              type="text"
              onInput={(e) => digitValidate(e.target)}
              onKeyUp={(e) => tabChange(3, e)}
              maxLength="1"
            />
            <input
              className="otp"
              type="text"
              onInput={(e) => digitValidate(e.target)}
              onKeyUp={(e) => tabChange(4, e)}
              maxLength="1"
            />

            <hr className="mt-4" />
            <button type="submit" className="btn btn-primary btn-block mt-4 mb-4 customBtn">
              Verify
            </button>
          </div>
        </form>
        {/* <button className="btn btn-primary btn-block mt-4 mb-4" >
          Get OTP
        </button> */}
      </div>
    </div>
  );
}

export default OtpVerification;
