import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextAPI/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FbLoginButton from "../../components/facebookLogin/FbLoginButton";
import GoogleLoginButton from "../../components/googleLogin/GoogleLoginButton";
import Registration from "./registration/Registration";

import Modal from "react-modal";

import logo from "../../images/logo.png";
import "./Login.css";
import { UrlPath } from "../../UrlPath";
import ForgotPass from "./forgotPassword/ForgotPass";

const customStylesRegistration = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    minWidth: "360px",
    height: "65%",
    overflow: "hidden",
  },
};

const customStylesForgotPass = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "35%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

function Login() {
  const { dispatch } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleModalForgotPass = () => {
    setIsOpenForgotPass(!isOpenForgotPass);
  };

  const navigate = useNavigate();

  const handleChangeLogin = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(credentials);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${UrlPath}/api/user/login`, credentials);
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: credentials.email });
        navigate("/", { replace: true });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
        setErrorMessage("You are not allowed!");
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: "User not correct!" },
      });
      setErrorMessage("User not correct!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <p>Your ultimate relief for your dry skin.. glowing skin always in..</p>
        <h2>Beauty Avenue</h2>
      </div>
      <div className="login-right">
        <img className="login-logo" src={logo} />
        <h1>Hello Again!</h1>
        <p>
          Welcome to Beauty Avenue, please enter your login credential to start
          shopping.
        </p>
        <div>
          <section className="login-right-itemlist">
            <label>Email:</label>
            <input type="email" id="email" onChange={handleChangeLogin} />
          </section>
          <section className="login-right-itemlist">
            <label>Password:</label>
            <input type="password" id="password" onChange={handleChangeLogin} />
          </section>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        <span style={{ cursor: "pointer" }} onClick={toggleModalForgotPass}>
          Forgot password?
        </span>
        <Modal
          isOpen={isOpenForgotPass}
          onRequestClose={toggleModalForgotPass}
          contentLabel="My dialog"
          style={customStylesForgotPass}
        >
          <ForgotPass />
        </Modal>
        <section>
          <GoogleLoginButton />
        </section>
        <span className="login-signup-container">
          Don't have account yet ?
          <button className="login-signup" onClick={toggleModal}>
            Sign Up
          </button>
        </span>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStylesRegistration}
      >
        <Registration />
      </Modal>
    </div>
  );
}

export default Login;
