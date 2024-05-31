import React from "react";
import Navbar from "./Navbar";
import heroimage from "../assest/heroimage2.png";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center h-[87vh] p-10">
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
          <div className="md:flex-8 ">
            <div>
              <h1 className="font-poppins font-semibold text-[42px] ss:text-[72px] text-white leading-[75px] ss:leading-[100.8px]">
                A New Era for Previously
              </h1>
              <span className="text-gradient font-poppins font-semibold text-[42px] ss:text-[72px] text-white leading-[75px] ss:leading-[100.8px]">
                Owned Goods
              </span>
            </div>
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
          <div className="mt-10 md:mt-0 md:ml-10">
            <img
              src={heroimage}
              alt="Hero"
              className="w-full md:max-w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
