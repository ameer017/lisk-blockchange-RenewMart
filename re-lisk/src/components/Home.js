import React from "react";
import Navbar from "./Navbar";
import heroimg from "../assest/heroImg.png";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();

  const loadReg = () => {
    navigate("/register");
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-[90vh] p-10">
        <div className="flex ">
          <div className=" justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
              A New Era for Previously <br className="sm:block hidden" />{" "}
              <span className="text-gradient">Owned Goods</span>{" "}
            </h1>
            <p className="max-w-[500px] mt-5">
              Transform your buying and selling journey with the revolutionary
              power of blockchain technology.
            </p>

            <p className="max-w-[500px] mt-5">
              At Renew Mart, we believe in the power of reusing and recycling.
              Discover a wide range of second-hand materials that are still in
              great condition, ready for a new home. Whether you're looking to
              buy or sell, our platform makes it easy, secure, and eco-friendly.
            </p>

            <div className=" flex mt-10 gap-5">
              <button onClick={loadReg}>Get Started</button>
            </div>
          </div>
          <div>
            <img src={heroimg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
