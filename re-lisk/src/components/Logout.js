import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3500/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <button onClick={handleLogout} className="bg-none hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" >Logout</button>;
};

export default Logout;
