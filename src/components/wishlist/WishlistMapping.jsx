import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../contextAPI/useFetch";
import Footer from "../footer/Footer";
import { AuthContext } from "../../contextAPI/AuthContext";
import WishlistCard from "./WishlistCard";
import axios from "axios";
import { UrlPath } from "../../UrlPath";

const WishlistMapping = () => {
  const { user } = useContext(AuthContext);

  const [wishlistData, setWishListData] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${UrlPath}/api/wishlist/product/${user}`
        );
        if (mounted) {
          setWishListData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="product-mapping">
        {wishlistData.length > 0 ? (
          <>
            <section>
              {wishlistData?.map((wishlist) => (
                <WishlistCard key={wishlist.id} wishlist={wishlist} />
              ))}
            </section>
          </>
        ) : (
          <span style={{ margin: "30px" }}>
            There is no item in the wishlist
          </span>
        )}
      </div>
      <hr style={{ opacity: "0.4" }} />
      <Footer />
    </>
  );
};

export default WishlistMapping;
