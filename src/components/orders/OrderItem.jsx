/* eslint no-eval: 0 */
import { useEffect, useState } from "react";
import "./OrderItem.css";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import Modal from "react-modal";
import SubmitOrImage from "./SubmitOrImage";
import { UrlPath } from "../../UrlPath";
import { useContext } from "react";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "40%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const OrderItem = ({ item }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [arrayOfObjects, setArrayOfObjects] = useState([]);

  useEffect(() => {
    setArrayOfObjects(eval(item.orderJsonList));
  }, [item.orderJsonList]);

  const handleSaveRating = async (newRating, arrayItem) => {
    console.log(arrayItem);
    try {
      await axios.post(`${UrlPath}/api/productRating/rate`, {
        rating: parseFloat(newRating),
        email: user,
        productId: arrayItem,
      });
      const updatedArrayOfObjects = arrayOfObjects.map((obj) => {
        if (obj.id === arrayItem) {
          return { ...obj, productRating: newRating };
        } else {
          return obj;
        }
      });

      await axios.put(`${UrlPath}/api/order/updateOrderList/${item.id}`, {
        orderJsonList: JSON.stringify(updatedArrayOfObjects),
      });
      toast("Successfully rating the product!", {
        type: "success",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOrPayment = () => {
    setOpen(!open);
  };

  return (
    <div className="orderItem">
      <h1 style={{ float: "left", fontWeight: "500" }}>Order ID: {item.id}</h1>
      <h1 className="orderStatus">{item.status}</h1>
      <div className="orderHorizontalLine"></div>
      {arrayOfObjects?.map((arrayItem) => {
        return (
          <div key={arrayItem.id}>
            <div className="orderContainer">
              <div className="orderProductImageContainer">
                <img
                  src={arrayItem.imgUrl || arrayItem.imageUrl}
                  alt="productImage"
                  className="orderImg"
                />
              </div>
              <div className="orderDetailsContainer">
                <h1 className="orderProductName">
                  <i>Product Name:</i> {arrayItem.productName || arrayItem.name}
                </h1>
                <span className="orderQuanitty">
                  <i>Quantity: </i>
                  {arrayItem.name ? "1" : arrayItem.quantity}
                </span>
                {item.status === "Completed" ? (
                  <div className="orderitem-rating">
                    <label>Please rate if you love this product.</label>
                    <Rating
                      initialValue={arrayItem.productRating}
                      allowFraction={true}
                      onClick={(rate) => handleSaveRating(rate, arrayItem.id)}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <span className="orderProductPrice">
                <i>Price:</i> ₱ {arrayItem.price}.00
              </span>
            </div>
            <div className="orderHorizontalLineInside"></div>
          </div>
        );
      })}
      <div>
        <h1 className="orderTotalPrice">
          <i>Order Total:</i> ₱ {item.totalPrice}.00
        </h1>
      </div>
      {item.status === "Pending" && (
        <div className="orderSubmitProofContainer">
          <div style={{ marginTop: "5px" }}>
            <button
              className="orderItemSubmitBtn"
              // onClick={handlePutImageInOrder}
              onClick={toggleOrPayment}
            >
              Upload Proof of Payment
            </button>
          </div>
        </div>
      )}
      {item.status === "ToShip" && (
        <div>
          <span>tracking # here: </span>
          {item?.trackingNum}
          <span style={{ marginLeft: "10px" }}>
            Please track your order here {"   "}
            {item?.courier}
          </span>
        </div>
      )}
      <Modal
        isOpen={open}
        onRequestClose={toggleOrPayment}
        contentLabel="My dialog"
        style={customStyle}
        close
      >
        {/* <span style={{ display: "none" }}>{item.id}</span> */}
        <SubmitOrImage item={item} close={toggleOrPayment} />
      </Modal>
    </div>
  );
};

export default OrderItem;
