import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductTile from "./ProductTile";
import Logout from "./Logout";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  async function getProductData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an product Token
    let transaction = await contract.getMyProduct();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyProducts() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getProductData(tokenId);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from local storage:", token);

    if (token) {
      axios
        .get("http://localhost:3500/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("User data fetched:", response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 404) {
            setError("User not found");
          } else {
            setError("Server error");
          }
        });
    } else {
      setError("No token found in local storage");
    }
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/login">Proceed to login</Link>
      </div>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div className="profileClass" style={{ "min-height": "100vh" }}>
      <Navbar></Navbar>
      <div className="profileClass">
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <p>Name: {user.name}</p>
          </div>
        </div>
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <h2 className="font-bold">Wallet Address</h2>
            {address}
          </div>
        </div>
        <div className="flex flex-row text-center justify-center mt-10 md:text-2xl text-white">
          <div>
            <h2 className="font-bold">No. of products</h2>
            {data.length}
          </div>
          <div className="ml-20">
            <h2 className="font-bold">Total Value</h2>
            {totalPrice} ETH
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-11 text-white">
          <h2 className="font-bold">Your Products</h2>
          <div className="flex justify-center flex-wrap max-w-screen-xl">
            {data.map((value, index) => {
              return <ProductTile data={value} key={index}></ProductTile>;
            })}
          </div>
          <div className="mt-10 text-xl">
            {data.length === 0
              ? "Oops, No product data to display (Are you logged in?)"
              : ""}
          </div>

          {isLoggedIn ? (
            <Logout onLogout={handleLogout} />
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
