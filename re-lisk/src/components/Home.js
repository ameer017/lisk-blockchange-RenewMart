import React from "react";
import Navbar from "./Navbar";
import heroimage from "../assest/heroimage2.png";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-[87vh] p-10">
        <div className="flex  items-center">
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
          </div>
          <div>
            <img src={heroimage} alt="" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
