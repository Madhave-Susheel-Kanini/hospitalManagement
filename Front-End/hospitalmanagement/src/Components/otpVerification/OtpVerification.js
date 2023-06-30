import React from 'react';
import './OtpVerification.css';

function OtpVerification() {
  const digitValidate = function (ele) {
    ele.value = ele.value.replace(/[^0-9]/g, '');
  };

  const tabChange = function (val) {
    const ele = document.querySelectorAll('input');
    if (val > 1 && ele[val - 1].value === '') {
      ele[val - 2].focus();
    } else if (val === 1 && ele[val - 1].value === '') {
      ele[val - 1].focus();
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
    console.log('OTP:', otp);
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-4 text-center">
          <div className="row">
            <div className="col-sm-12 mt-5 bgWhite">
              <div className="title">Verify OTP</div>

              <form onSubmit={handleSubmit} className="mt-5">
                <input
                  className="otp"
                  type="text"
                  onInput={(e) => digitValidate(e.target)}
                  onKeyUp={() => tabChange(1)}
                  maxLength="1"
                />
                <input
                  className="otp"
                  type="text"
                  onInput={(e) => digitValidate(e.target)}
                  onKeyUp={() => tabChange(2)}
                  maxLength="1"
                />
                <input
                  className="otp"
                  type="text"
                  onInput={(e) => digitValidate(e.target)}
                  onKeyUp={() => tabChange(3)}
                  maxLength="1"
                />
                <input
                  className="otp"
                  type="text"
                  onInput={(e) => digitValidate(e.target)}
                  onKeyUp={() => tabChange(4)}
                  maxLength="1"
                />
                <hr className="mt-4" />
                <button type="submit" className="btn btn-primary btn-block mt-4 mb-4 customBtn">
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
