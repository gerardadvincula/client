import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  MdProductionQuantityLimits,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../images/logo.png";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../contextAPI/useFetch";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { UrlPath } from "../../UrlPath";
import axios from "axios";

const predefinedCategories = [
  "GLUTATHIONE",
  "FACEMASK",
  "SERUM",
  "SOAP",
  "LIPSTICK",
];

const Navbar = ({ user }) => {
  const { dispatch } = useContext(AuthContext);
  const [toClaim, setToClaim] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [isOtherLink, setIsOtherLink] = useState(false);
  const [category, setCategory] = useState([]);
  const [otherCategories, setOtherCategories] = useState([]);

  const { quantity } = useSelector((state) => state.cart);

  const { data } = useFetch(`${UrlPath}/api/order/listOrder/${user}`);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    setToClaim(data?.filter((data) => data.status === "Pending"));
  }, [data]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${UrlPath}/api/category/list`);
      setCategory(res.data);

      const filteredCategories = res.data.filter(
        (category) => !predefinedCategories.includes(category.categoryName)
      );
      setOtherCategories(filteredCategories);
    };

    fetchCategories();
  }, []);

  const toggleNavbarOthers = () => {
    setIsOtherLink(!isOtherLink);
  };

  return (
    <>
      <div className="first-bar-design"></div>
      <div className="second-bar-design"></div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo-container">
            <img src={logo} alt="logo" className="navbar-logo" />
            <span className="navbar-logo-letter">BEAUTY AVENUE</span>
          </Link>
          <section className="navbar-responsive-profile-burger">
            <div className={isOpen ? "nav-menu open" : "nav-menu"}>
              <Link
                className="nav-item"
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <span>HOME</span>
              </Link>
              {category
                .filter((category) =>
                  predefinedCategories.includes(category.categoryName)
                )
                .map((category) => (
                  <Link
                    className="nav-item"
                    to={`/category/${category.id}`}
                    key={category.id}
                  >
                    <span>{category.categoryName}</span>
                  </Link>
                ))}
              {/* render here the items that are not predefined and render in dropdown under others */}
              <div className="navbar-dropdown-menu">
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "16px",
                    color: "white",
                    padding: "0px 10px",
                    fontWeight: 550,
                    cursor: "pointer",
                  }}
                  onClick={toggleNavbarOthers}
                >
                  OTHERS
                </button>
                <div
                  className={
                    isOtherLink
                      ? "dropdown-content-true"
                      : "dropdown-content-false"
                  }
                >
                  {isOtherLink &&
                    otherCategories.map((category) => (
                      <Link
                        className="nav-item-dropdown"
                        style={{ color: "black" }}
                        to={`/category/${category.id}`}
                        key={category.id}
                      >
                        <span>{category.categoryName}</span>
                      </Link>
                    ))}
                </div>
              </div>

              <Link
                className="nav-item"
                to="/cart"
                onClick={() => setIsOpen(false)}
              >
                <Badge
                  badgeContent={quantity}
                  color={open ? "secondary" : "primary"}
                >
                  <MdProductionQuantityLimits className="sidebar-icon" />
                </Badge>
              </Link>
              <Link className="nav-item" to="/profile/orders">
                <Badge
                  badgeContent={toClaim?.length}
                  color={open ? "secondary" : "primary"}
                >
                  {user ? (
                    <MdOutlineNotificationsActive className="sidebar-icon" />
                  ) : (
                    ""
                  )}
                </Badge>
              </Link>
            </div>
            {user ? (
              <div
                className="profile-dropdown"
                onClick={() => setProfileIsOpen(!profileIsOpen)}
              >
                <img
                  src={
                    data.imageUrl || "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                  }
                  alt="profile"
                  className="top-avatar"
                />
                {profileIsOpen && (
                  <div className="profile-menu-container">
                    <div className="profile-menu">
                      <div className="profile-menu-top">
                        <img
                          src={
                            data.imageUrl ||
                            "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                          }
                          alt=""
                          id="circle-avatar"
                        />
                        <p>{user}</p>
                      </div>
                      <Link
                        to="/profile"
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <button className="profile-menu-btn">My Profile</button>
                      </Link>
                      <Link
                        to={`/wishlist/${user}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <button className="profile-menu-btn">
                          My Wishlist
                        </button>
                      </Link>
                      <div className="logout-container">
                        <button className="btnLogout" onClick={logout}>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="navbar-login-btn">Login</button>
              </Link>
            )}

            <div className="menu-icon" onClick={toggleNavbar}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
