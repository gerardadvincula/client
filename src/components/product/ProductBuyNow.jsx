import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../contextAPI/useFetch";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";
import { UrlPath } from "../../UrlPath";
import Modal from "react-modal";
import GCashQR from "/gcash.jpg";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "50%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const ProductBuyNow = ({ product, setIsOpen, quantity }) => {
  const { user } = useContext(AuthContext);
  const [isOpenQRModal, setQRModalOpen] = useState(false);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleQRModal = () => {
    setQRModalOpen(!isOpenQRModal);
  };

  const arrayProducts = JSON.stringify([product]);

  const arrayIto = JSON.parse(arrayProducts);

  console.log(arrayIto[0].id);

  const handlePlaceOrder = async () => {
    const orderData = {
      products: arrayIto.map((item) => ({
        productId: item.id,
        quantity: 1,
      })),
      totalPrice: product.price,
      userId: data.id,
      email: data.email,
      userFullName: data.name,
      orderJsonList: arrayProducts,
      modeOfPayment: "gcash",
    };

    try {
      await axios.post(`${UrlPath}/api/order/create`, orderData);
      toggleQRModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseBtn = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="orderConfirmationModal">
      <span className="orderConfirmPrice">PHP {product.price}</span>
      <span>Includes taxes and fees</span>
      <div className="orderConfirmBtns">
        <button className="orderProceedBtn" onClick={handlePlaceOrder}>
          Proceed
        </button>
        <button className="orderCancelBtn" onClick={closeModal}>
          Cancel
        </button>
      </div>
      <Modal
        isOpen={isOpenQRModal}
        onRequestClose={toggleQRModal}
        contentLabel="My dialog"
        style={customStyle}
      >
        <div className="shipping-modal">
          <button className="shipping-btn-close" onClick={handleCloseBtn}>
            x
          </button>

          <img src={GCashQR} alt="" className="qrImage" />

          <span style={{ fontSize: "20px" }}>
            Please scan it or save it before closing.
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ProductBuyNow;
