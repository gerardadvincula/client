import "./OrderConfirmationModal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contextAPI/AuthContext";
import useFetch from "../../../contextAPI/useFetch";
import { useContext, useState } from "react";
import { UrlPath } from "../../../UrlPath";
import Modal from "react-modal";
import GCashQR from "/gcash.jpg";
import MayaQR from "/maya.jpg";
import { toast } from "react-toastify";

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

const OrderConfirmationModal = ({ carttotal, setIsOpen, shippingAddress }) => {
  const [isOpenQRModal, setQRModalOpen] = useState(false);
  const { products } = useSelector((state) => state.cart);

  const { user } = useContext(AuthContext);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleQRModal = () => {
    setQRModalOpen(!isOpenQRModal);
  };

  const handleCloseBtn = () => {
    navigate("/");
    window.location.reload();
  };

  const arrayProducts = JSON.stringify(products);

  console.log("array products", arrayProducts);

  const handleUpdateAddress = async () => {
    await axios.put(`${UrlPath}/api/user/changeAddress/${user}`, {
      barangay: shippingAddress.barangay,
      street: shippingAddress.street,
      municipality: shippingAddress.municipality,
      city: shippingAddress.city,
      blockNLot: shippingAddress.blockNLot,
      contactNumber: shippingAddress.contactNumber,
      postalCode: shippingAddress.postalCode,
    });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      products: products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      totalPrice: carttotal,
      userId: data.id,
      email: data.email,
      userFullName: data.name,
      orderJsonList: arrayProducts,
      modeOfPayment: shippingAddress.modeOfPayment,
    };
    try {
      await axios.post(`${UrlPath}/api/order/create`, orderData);
      await handleUpdateAddress();
      window.localStorage.removeItem("persist:root");
      toast.success("You're order has been placed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
       toggleQRModal();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orderConfirmationModal">
      <span className="orderConfirmPrice">PHP {carttotal}.00</span>
      <span>Proceed to payment</span>
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
          {shippingAddress.modeOfPayment === "gcash" && (
            <img src={GCashQR} alt="" className="qrImage" />
          )}
          {shippingAddress.modeOfPayment === "maya" && (
            <img src={MayaQR} alt="" className="qrImage" />
          )}
          <span style={{ fontSize: "20px" }}>
            Please scan it or save it before closing.
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default OrderConfirmationModal;
