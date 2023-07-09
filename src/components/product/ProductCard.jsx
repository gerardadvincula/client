import "./ProductCard.css";
import { Rating } from "react-simple-star-rating";

import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartRedux";

import { CgRemoveR } from "react-icons/cg";
import { BiAddToQueue } from "react-icons/bi";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";
import Modal from "react-modal";
import ProductBuyNow from "./ProductBuyNow";
import { UrlPath } from "../../UrlPath";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "20%",
    height: "15%",
    overflow: "hidden",
  },
};

const ProductCard = ({ product }) => {
  const [rating, setRating] = useState(product.rating);
  const [messageWishList, setMessageWishList] = useState("Add to Wishlist");
  const [messageAddToCart, setMessageAddToCart] = useState("Add to Cart");
  const [disabled, setDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [productRatingFetch, setProductRatingFetch] = useState();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      product.quantity >= quantity + 1 && setQuantity(quantity + 1);
    }

    if (quantity > product.quantity) {
      setQuantity(0);
    }
  };

  // handle add wishlist

  const handleAddToWishlist = async () => {
    try {
      // Check if product is already in user's wishlist
      const wishlist = await axios.get(`${UrlPath}/api/wishlist/${user}`);

      if (wishlist.data.find((item) => item.productId === product.id)) {
        // If product is already in wishlist, disable the button and set message
        setMessageWishList("Product already in wishlist");
        setDisabled(true);
      } else {
        await axios.post(`${UrlPath}/api/wishlist/create`, {
          productId: product.id,
          email: user,
        });
        // Set success message and disable button for 5 seconds
        setMessageWishList("Added to wishlist");
        setDisabled(true);
        setTimeout(() => setDisabled(false), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        id: product.id,
        productName: product.name,
        productDes: product.description,
        productPrice: product.price,
        imgUrl: product.imageUrl,
        quantity,
        price: product.price * quantity,
      })
    );
    setMessageAddToCart("Added to Cart");
    setTimeout(() => {
      setMessageAddToCart("Add to Cart");
    }, 5000);
  };

  console.log(user);

  const saveRating = async (newRating) => {
    console.log(newRating);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/productRating/rate`,
        {
          rating: parseFloat(newRating),
          email: user,
          productId: product.id,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/productRating/${user}/${
          product.id
        }`
      );
      setProductRatingFetch(res.data);
    };
    fetchData();
  }, []);

  console.log(productRatingFetch);

  return (
    <div className="product-card">
      <div className="product-image">
        {product.bestSeller === true ? (
          <div className="best-seller-badge">Best Seller</div>
        ) : (
          <div></div>
        )}
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <Rating
            name="simple-controlled"
            initialValue={productRatingFetch}
            onChange={(newValue) => {
              setRating(newValue);
              saveRating(newValue); // call a function to save the rating
            }}
          />
        </div>
        <div className="product-price">
          <span className="price-label">Price:</span>
          <span>{product.price}.00</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Quantity:</span>
          <span>{product.quantity}</span>
        </div>
        <div className="product-quantity">
          <span className="quantity-label">Sold:</span>
          <span>{product.sold}</span>
        </div>
        <div className="product-quantity-btns">
          <CgRemoveR
            onClick={() => handleQuantity("dec")}
            style={{ cursor: "pointer" }}
          />
          {/* <span className="product-amount">{quantity}</span> */}
          <input
            type="number"
            className="product-amount"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setQuantity(value);
              if (value > product.quantity) {
                window.alert(
                  `The quantity cannot be greater than ${product.quantity}`
                );
                setQuantity(product.quantity);
              }
            }}
            min="1"
            max={product.quantity}
            disabled={product.quantity < 1}
          />
          <BiAddToQueue
            onClick={() => handleQuantity("inc")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="product-buttons">
          <button
            className="btn btn-cart"
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || product.quantity < quantity}
          >
            {messageAddToCart}
          </button>
          <button
            className="btn btn-wishlist"
            onClick={handleAddToWishlist}
            disabled={disabled}
          >
            {messageWishList}
          </button>
          <button className="btn btn-buy" onClick={toggleModal}>
            Buy Now
          </button>
        </div>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          style={modalStyle}
        >
          <ProductBuyNow
            product={product}
            setIsOpen={setIsOpen}
            quantity={quantity}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProductCard;
