import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailAddress: "",
    password: "",
    password2: "",
    phone: "",
  });
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, emailAddress, password, phone, password2 } = formData;

    if (!name || !emailAddress || !password || !phone || !password2) {
      setFormValidMessage("Oops! all fields are required");
      return;
    }
    if (password !== password2) {
      setFormValidMessage("Oops! Password does not match");
      return;
    }
    setIsSubmitting(true);

    axios
      .post("http://localhost:3500/api/users/create", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setIsSubmitting(false);
        navigate("/profile");
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.response && error.response.status === 400) {
          setFormValidMessage("User with the same email address already exist");
        } else {
          setFormValidMessage(
            "Server error unable to process your registration"
          );
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-[100vh] flex items-center justify-center ">
      <form className="w-[360px] md:w-[500px] p-2 " onSubmit={handleSubmit}>
        <p className="font-bold text-center text-[15px] ">Register.</p>
        <p className="font-bold text-left text-[12px] ">Join the revolution.</p>

        <div className="flex flex-col p-2 gap-2 ">
          <label htmlFor="fullname">Full Name:</label>

          <input
            type="text"
            placeholder="e.g John Doe"
            className="p-2 bg-none outline-none rounded-lg text-[#000] "
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
        </div>

        <div className="flex flex-col p-2 gap-2 ">
          <label htmlFor="email">Email:</label>

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
          <label htmlFor="phone">Phone:</label>

          <input
            type="text"
            placeholder="08123456789"
            className="p-2 bg-none outline-none rounded-lg text-[#000] "
            onChange={handleChange}
            value={formData.phone}
            name="phone"
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

        <div className="flex flex-col p-2 gap-2 ">
          <label htmlFor="password2">Confirm Password:</label>

          <input
            type="password"
            className="p-2 bg-none outline-none rounded-lg text-[#000] "
            onChange={handleChange}
            value={formData.password2}
            name="password2"
          />
        </div>

        <div className="p-2">
          <button type="submit" className="w-[100%] mt-4 ">
            {isSubmitting ? <p>Loading...</p> : <span>Register</span>}
          </button>
        </div>

        {formValidMessage && (
          <div className="event-page-registration-error-message">
            {formValidMessage}
          </div>
        )}

        <div className="text-center mt-2  ">
          <Link to="/login" className="hover:underline">
            Already have an account? - Login
          </Link>{" "}
          ||
          <Link to="/" className="hover:underline">
            &nbsp;Go Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
