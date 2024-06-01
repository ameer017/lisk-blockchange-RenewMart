import logo from "../assest/renew-mart-high-resolution-logo-white-transparent.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  async function getAddress() {
    try {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      updateAddress(addr);
    } catch (error) {
      console.error("Failed to get address:", error);
    }
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const liskSepoliaChainId = "0x106a";
    const liskSepoliaChainParams = {
      chainId: liskSepoliaChainId,
      chainName: "Lisk Sepolia Test Network",
      nativeCurrency: {
        name: "Lisk Sepolia ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.sepolia-api.lisk.com"],
      blockExplorerUrls: ["https://sepolia-blockscout.lisk.com/"],
    };

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      if (chainId !== liskSepoliaChainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: liskSepoliaChainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [liskSepoliaChainParams],
              });
            } catch (addError) {
              console.error("Failed to add Lisk Sepolia chain:", addError);
              return;
            }
          } else {
            console.error(
              "Failed to switch to Lisk Sepolia chain:",
              switchError
            );
            return;
          }
        }
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      updateButton();
      console.log("Connected to MetaMask and Lisk Sepolia network");
      await getAddress(); // Ensure getAddress is awaited to handle async
      window.location.replace(location.pathname);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
    }
  }

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      // console.log("is it because of this?", val);
      getAddress();
      toggleConnect(val);
      updateButton();
    }
    window.ethereum.on("accountsChanged", function (account) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="w-full">
      <nav className="w-full px-4 py-3 flex items-center justify-between">
        <Link to="/" className="md:ml-6">
          <img src={logo} alt="Logo" className="w-[150px]" />
        </Link>
        <div className="md:hidden" onClick={handleNav}>
          {!nav ? <AiOutlineMenu size={25} /> : <AiOutlineClose size={25} />}
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-bold">
          <li
            className={location.pathname === "/marketPlace" ? "border-b-2" : ""}
          >
            <Link to="/marketPlace">Marketplace</Link>
          </li>
          <li
            className={location.pathname === "/sellProduct" ? "border-b-2" : ""}
          >
            <Link to="/sellProduct">List Product</Link>
          </li>
          <li className={location.pathname === "/profile" ? "border-b-2" : ""}>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect Wallet"}
            </button>
          </li>
        </ul>
      </nav>
      {nav && (
        <ul className="md:hidden bg-gray-800 p-4 space-y-2">
          <li onClick={handleNav}>
            <Link to="/marketPlace">Marketplace</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/sellProduct">List Product</Link>
          </li>
          <li onClick={handleNav}>
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={handleNav}>
            <button
              className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              onClick={connectWebsite}
            >
              {connected ? "Connected" : "Connect"}
            </button>
          </li>
        </ul>
      )}
      <div className="text-white font-bold text-right p-4">
        {currAddress !== "0x"
          ? `Connected to ${currAddress.substring(0, 15)}...`
          : "Not Connected. Please login to view products"}
      </div>
    </div>
  );
}

export default Navbar;
