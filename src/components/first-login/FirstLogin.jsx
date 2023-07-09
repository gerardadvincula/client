import "./FirstLogin.css";
import axios from "axios";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useContext } from "react";
import { UrlPath } from "../../UrlPath";
import { useState } from "react";
import { toast } from "react-toastify";

const FirstLogin = () => {
  const [shippingAdd, setShippingAdd] = useState({
    barangay: "",
    street: "",
    municipality: "",
    city: "",
    postalCode: undefined,
    contactNumber: "",
  });
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    await axios.put(`${UrlPath}/api/user/changeAddress/${user}`, shippingAdd);
    toast("Successfully add shipping address!", {
      type: "success",
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => window.location.reload(), 2000);
  };

  return (
    <div className="first-login">
      <h1 className="first-login-title">
        Please setup your shipping address to fully enjoy your shopping.
      </h1>
      <div className="first-login-input-list">
        <label className="first-login-label">Barangay</label>
        <input
          className="first-login-input-type"
          type="text"
          placeholder="Barangay"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              barangay: e.target.value,
            }));
          }}
        />
      </div>
      <div className="first-login-input-list">
        <label className="first-login-label">Street</label>
        <input
          className="first-login-input-type"
          type="text"
          placeholder="Street"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              street: e.target.value,
            }));
          }}
        />
      </div>
      <div className="first-login-input-list">
        <label className="first-login-label">Municipality</label>
        <input
          className="first-login-input-type"
          type="text"
          placeholder="Municipality"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              municipality: e.target.value,
            }));
          }}
        />
      </div>
      <div className="first-login-input-list">
        <label className="first-login-label">City/Province</label>
        <input
          className="first-login-input-type"
          type="text"
          placeholder="City/Province"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              city: e.target.value,
            }));
          }}
        />
      </div>
      <div className="first-login-input-list">
        <label className="first-login-label">Postal Code</label>
        <input
          className="first-login-input-type cart-postalcode"
          type="number"
          placeholder="Postal Code"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              postalCode: e.target.value,
            }));
          }}
        />
      </div>
      <div className="first-login-input-list">
        <label className="first-login-label">Contact Number</label>
        <input
          className="first-login-input-type"
          type="text"
          placeholder="Contact Number"
          onChange={(e) => {
            setShippingAdd((item) => ({
              ...item,
              contactNumber: e.target.value,
            }));
          }}
        />
      </div>
      <button className="first-login-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FirstLogin;
