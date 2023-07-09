import Rating from "@mui/material/Rating";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

import { CgRemoveR } from "react-icons/cg";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import { UrlPath } from "../../UrlPath";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contextAPI/AuthContext";

const WishlistCard = ({ wishlist }) => {
  const [userData, setUserData] = useState({});
  const [wishlistProductData, setWishlistProductData] = useState([]);
  const [rating, setRating] = useState(wishlistProductData.rating);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setWishlistProductData(wishlist.product);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${UrlPath}/api/user/${user}`);
      setUserData(res.data);
    };
    fetchData();
  }, []);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      wishlistProductData.quantity >= quantity + 1 && setQuantity(quantity + 1);
    }

    if (quantity > wishlistProductData.quantity) {
      setQuantity(0);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: wishlistProductData.id,
        productName: wishlistProductData.name,
        productDes: wishlistProductData.description,
        productPrice: wishlistProductData.price,
        imgUrl: wishlistProductData.imageUrl,
        quantity,
        price: wishlistProductData.price * quantity,
      })
    );
  };

  // handle remove to wishlist
  const handleRemoveWishlist = async (wishlistId, productId) => {
    try {
      await axios.delete(
        `${UrlPath}/api/wishlist/delete/${wishlistId}/${productId}`
      );
      toast.success("Successfully remove a wishlist!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    const orderData = {
      userFullName: userData.name,
      email: userData.email,
      totalPrice: wishlistProductData.price * quantity,
      status: "Pending",
      productId: wishlistProductData.id,
      productName: wishlistProductData.name,
      productDes: wishlistProductData.description,
      productPrice: wishlistProductData.price,
      imgUrl: wishlistProductData.imageUrl,
      quantity,
    };

    try {
      await axios.post(`${UrlPath}/api/order/create`, orderData);

      // Redirect to the order success page or any other page you want
      toast.success("Successfully placed an order!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={wishlistProductData.imageUrl}
          alt={wishlistProductData.name}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{wishlistProductData.name}</h3>
        <p className="product-description">{wishlistProductData.description}</p>
        <div className="product-rating">
          <Rating name="simple-controlled" value={rating} readOnly={true} />
        </div>
        <div className="product-price">
          <span className="price-label">Price:</span>
          <span>{wishlistProductData.price}.00</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Quantity:</span>
          <span>{wishlistProductData.quantity}</span>
        </div>
        <div className="product-quantity-btns">
          <CgRemoveR
            onClick={() => handleQuantity("dec")}
            style={{ cursor: "pointer" }}
          />
          <span className="product-amount">{quantity}</span>
          <BiAddToQueue
            onClick={() => handleQuantity("inc")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="product-buttons">
          <button
            className="btn btn-cart"
            onClick={handleAddToCart}
            disabled={
              wishlistProductData.quantity === 0 ||
              wishlistProductData.quantity <= quantity
            }
          >
            Add to Cart
          </button>
          <button
            className="btn btn-wishlist"
            onClick={() =>
              handleRemoveWishlist(wishlist.wishlistId, wishlistProductData.id)
            }
          >
            Remove from Wishlist
          </button>
          {/* <button className="btn btn-buy">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
