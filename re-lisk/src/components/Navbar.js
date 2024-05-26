import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import logo from "../assest/renew-mart-high-resolution-logo-white-transparent.png"

function Navbar() {
  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

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
    ethereumButton.classList.remove("hover-bg-blue-70");
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
      console.log("is it because of this?", val);
      getAddress();
      toggleConnect(val);
      updateButton();
    }
    window.ethereum.on("accountsChanged", function (account) {
      window.location.replace(location.pathname);
    });
  }, [location.pathname]);

  return (
    <div className="">
      <nav className="w-screen">
        <ul className="flex items-end justify-between py-3 bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link to="/">
              <img src={logo} alt="" className="w-[100px]" />
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              {location.pathname === "/marketPlace" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/marketPlace">Marketplace</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/marketPlace">Marketplace</Link>
                </li>
              )}
              {location.pathname === "/sellProduct" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/sellProduct">List My product</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/sellProduct">List My product</Link>
                </li>
              )}
              {location.pathname === "/profile" ? (
                <li className="border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              ) : (
                <li className="hover:border-b-2 hover:pb-0 p-2">
                  <Link to="/profile">Profile</Link>
                </li>
              )}
              <li>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWebsite}
                >
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x"
          ? "Connected to"
          : "Not Connected. Please login to view products"}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div>
    </div>
  );
}

export default Navbar;
