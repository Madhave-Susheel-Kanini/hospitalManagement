import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {

    const navigate = useNavigate();

    useEffect(() => {
        deleteCookies();
        navigate('/userlogin');
        window.location.reload();
      }, []);

    const deleteCookies = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('Cookies deleted');
      };
      
  return (
    <div>Logout</div>
  )
}

export default Logout