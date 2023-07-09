import useFetch from "../../contextAPI/useFetch";
import ProductCard from "./ProductCard";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import "./ProductMapping.css";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const ProductMapping = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/category/list/${id}`
  );

  const [query, setQuery] = useState("");

  const filtered = data?.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      <div className="product-mapping">
        <div className="searchInputContainer">
          <AiOutlineSearch className="searchIcon" />
          <input
            className="searchInput"
            type="text"
            placeholder="Search Product Name Here...."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <section>
          {filtered?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
      <hr style={{ opacity: "0.4" }} />
      <Footer />
    </>
  );
};

export default ProductMapping;
