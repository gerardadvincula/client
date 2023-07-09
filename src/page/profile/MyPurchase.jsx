import "./MyPurchase.css";
import ProfileSide from "../../components/profileSidebar/ProfileSide";
import OrderItem from "../../components/orders/OrderItem";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useContext, useState } from "react";
import useFetch from "../../contextAPI/useFetch";
import Footer from "../../components/footer/Footer";
import { UrlPath } from "../../UrlPath";

const MyPurchase = () => {
  const { user } = useContext(AuthContext);

  const { data } = useFetch(`${UrlPath}/api/order/listOrder/${user}`);

  const [allOpen, setAllOpen] = useState(false);
  const [cancelledOpen, setCancelledOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(true);
  const [toShipOpen, settoShipOpen] = useState(false);
  const [completedOpen, setcompletedOpen] = useState(false);

  const toggleAll = () => {
    setCancelledOpen(false);
    setPendingOpen(false);
    settoShipOpen(false);
    setcompletedOpen(false);
    setAllOpen(true);
  };

  const toggleCancel = () => {
    setAllOpen(false);
    setPendingOpen(false);
    settoShipOpen(false);
    setcompletedOpen(false);
    setCancelledOpen(true);
  };

  const togglePending = () => {
    setAllOpen(false);
    setCancelledOpen(false);
    settoShipOpen(false);
    setcompletedOpen(false);
    setPendingOpen(true);
  };

  const toggleToShip = () => {
    setAllOpen(false);
    setCancelledOpen(false);
    setPendingOpen(false);
    setcompletedOpen(false);
    settoShipOpen(true);
  };

  const toggleCompleted = () => {
    setAllOpen(false);
    setCancelledOpen(false);
    setPendingOpen(false);
    settoShipOpen(false);
    setcompletedOpen(true);
  };

  const cancelled = data?.filter((data) => data.status === "Cancelled");
  const pending = data?.filter((data) => data.status === "Pending");
  const toShip = data?.filter((data) => data.status === "ToShip");
  const completed = data?.filter((data) => data.status === "Completed");

  return (
    <>
      <div className="myPurchase">
        <ProfileSide />
        <div className="myPurchaseList">
          <div className="orderBtnlistContainer">
            <button
              className={allOpen ? "active" : "ordersBtnList"}
              onClick={toggleAll}
            >
              All
            </button>
            <button
              className={pendingOpen ? "active" : "ordersBtnList"}
              onClick={togglePending}
            >
              Pending
            </button>
            <button
              className={toShipOpen ? "active" : "ordersBtnList"}
              onClick={toggleToShip}
            >
              To Ship
            </button>
            <button
              className={completedOpen ? "active" : "ordersBtnList"}
              onClick={toggleCompleted}
            >
              Completed
            </button>
            <button
              className={cancelledOpen ? "active" : "ordersBtnList"}
              onClick={toggleCancel}
            >
              Cancelled
            </button>
          </div>
          {allOpen &&
            data?.map((item) => <OrderItem item={item} key={item.id} />)}
          {cancelledOpen &&
            cancelled?.map((item) => <OrderItem item={item} key={item.id} />)}
          {pendingOpen &&
            pending?.map((item) => <OrderItem item={item} key={item.id} />)}
          {toShipOpen &&
            toShip?.map((item) => <OrderItem item={item} key={item.id} />)}
          {completedOpen &&
            completed?.map((item) => <OrderItem item={item} key={item.id} />)}
        </div>
      </div>
      <div className="myPurchaseFooter">
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default MyPurchase;
