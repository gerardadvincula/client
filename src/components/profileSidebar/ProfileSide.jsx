import "./ProfileSide.css";
import { useContext } from "react";
import { BiEditAlt, BiPurchaseTagAlt } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { AuthContext } from "../../contextAPI/AuthContext";
import useFetch from "../../contextAPI/useFetch";
import { Link } from "react-router-dom";
import { UrlPath } from "../../UrlPath";

const ProfileSide = () => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  return (
    <div className="profileSide">
      <div className="profileInfo">
        <h3>{data.email}</h3>
      </div>
      <div className="profileBtns">
        <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
          <button className="profileSideBtn">
            <MdAccountCircle />
            My Account
          </button>
        </Link>
        <Link
          to="/profile/orders"
          style={{ textDecoration: "none", color: "black" }}
        >
          <button className="profileSideBtn">
            <BiPurchaseTagAlt />
            My Purchase
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSide;
