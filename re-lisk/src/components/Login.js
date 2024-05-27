import axios from "axios";
import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  
  const [formValidMessage, setFormValidMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { emailAddress, password } = formData;

    if (!emailAddress || !password) {
      setFormValidMessage('Email and password are required');
      return;
    }
    setIsSubmitting(true);

    axios
      .post('http://localhost:3500/api/users/login', formData)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setIsSubmitting(false);
        navigate('/');
      })
      .catch(error => {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage('Invalid email or password');
        } else {
          setFormValidMessage('Server error unable to process your login');
        }
      });
  };

  return (
    <div className="w-screen h-[100vh] flex items-center justify-center ">
      <form className="w-[360px] md:w-[500px] p-2 " onSubmit={handleSubmit}>
        <p className="font-bold text-center text-[15px] ">Login.</p>
        <p className="font-bold text-center text-[12px] ">Welcome Back!.</p>

        <div className="flex flex-col p-2 gap-2 ">
          <label htmlFor="emailAddress">Email:</label>

          <input
            type="email"
            placeholder="yourname@gmail.com"
            className="p-2 bg-none outline-none rounded-lg text-[#000] "
            onChange={handleChange}
            value={formData.emailAddress}
            name="emailAddress"
          />
        </div>

        <div className="flex flex-col p-2 gap-2 ">
          <label htmlFor="password">Password:</label>

          <input
            type="password"
            className="p-2 bg-none outline-none rounded-lg text-[#000] "
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
        </div>

        <div className="p-2">
          <button type="submit" className="w-[100%] mt-4 ">
          {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {formValidMessage && (
          <div className="event-page-registration-error-message">
            {formValidMessage}
          </div>
        )}

        <div className="text-center mt-2  ">
          <Link to="/register" className="hover:underline">Don&apos;t have an account? - Register</Link> ||
          <Link to="/" className="hover:underline">&nbsp;&nbsp;&nbsp;Go Home</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
