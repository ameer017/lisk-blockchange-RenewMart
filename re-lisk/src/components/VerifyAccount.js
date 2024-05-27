import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setMessage('Invalid verification link');
      return;
    }

    axios
      .patch(`http://localhost:3500/api/users/verify?token=${token}`)
      .then((response) => {
        setMessage('Account verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setMessage('Invalid verification link');
        } else {
          setMessage('Server error, please try again later');
        }
      });
  }, [location, navigate]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyAccount;
