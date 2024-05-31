import "./App.css";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import SellProduct from "./components/SellProduct.js";
import ProductPage from "./components/Productpage.js";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";




function App() {
  

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketPlace" element={<Marketplace />} />
        <Route path="/productPage/:tokenId" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sellProduct" element={<SellProduct />} />
        

      </Routes>
    </div>
  );
}

export default App;
