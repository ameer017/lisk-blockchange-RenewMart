

import Navbar from "./Navbar";
import ProductTile from "./ProductTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
const sampleData = [
  
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function  getAllProducts() {
    const ethers = require("ethers");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
   
    let transaction = await contract.getAllProducts()

 
    const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllProducts();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top Products
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center ">
                {data.map((value, index) => {
                    return <ProductTile data={value} key={index}></ProductTile>;
                })}
            </div>
        </div>            
    </div>
);

}