import Login from "./page/login/Login";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./page/home/Home";
import Cart from "./page/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import { AuthContext } from "./contextAPI/AuthContext";
import { useContext, useEffect } from "react";
import Profile from "./page/profile/Profile";
import MyPurchase from "./page/profile/MyPurchase";
import ErrorPage from "./page/errorPage/ErrorPage";
import "react-toastify/dist/ReactToastify.css";

import WishlistMapping from "./components/wishlist/WishlistMapping";
import useFetch from "./contextAPI/useFetch";
import { UrlPath } from "./UrlPath";
import FirstLogin from "./components/first-login/FirstLogin";
import { ToastContainer } from "react-toastify";

import ProductMapping from "./components/product/ProductMapping";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  useEffect(() => {
    if (email) {
      dispatch({ type: "LOGIN_SUCCESS", payload: email });
    }

    console.log(email);
  }, []);

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/login" ? null : <Navbar user={user} />}
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/"
          element={
            data && data?.firstLogin === false ? <FirstLogin /> : <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/category/:id" element={<ProductMapping />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/orders"
          element={user ? <MyPurchase /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist/:email"
          element={user ? <WishlistMapping /> : <Navigate to="/login" />}
        />
        {/* <Route path="/topay" element={<ToPay />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
