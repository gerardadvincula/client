import { useContext, useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import {
  decreaseCart,
  getTotal,
  incrementQuantity,
  removeProduct,
} from "../../redux/cartRedux";
import "./Cart.css";
import { mobile } from "../../responsive";
import Modal from "react-modal";
import OrderConfirmationModal from "../../components/orders/orderConfirmationModal/OrderConfirmationModal";
import { AuthContext } from "../../contextAPI/AuthContext";
import useFetch from "../../contextAPI/useFetch";
import { UrlPath } from "../../UrlPath";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

const ProductPageContainer = styled.div`
  flex: 6;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const FooterDiv = styled.div`
  margin-right: 0;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "18%",
  },
};

Modal.setAppElement("#root");

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    blockNLot: "",
    street: "",
    barangay: "",
    municipality: "",
    city: "",
    postalCode: "",
    modeOfPayment: "gcash",
    contactNumber: "",
  });

  const [formValid, setFormValid] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    const streetInput = document.getElementById("cart-street");
    const barangayInput = document.getElementById("cart-barangay");
    const municipalityInput = document.getElementById("cart-municipality");
    const cityInput = document.getElementById("cart-city");
    const postalCodeInput = document.getElementById("cart-postalcode");
    const contactNumber = document.getElementById("cart-contactNumber");
    const blockNLot = document.getElementById("cart-blockNLot");

    if (
      streetInput?.value !== "" &&
      barangayInput?.value !== "" &&
      municipalityInput?.value !== "" &&
      cityInput?.value !== "" &&
      postalCodeInput?.value !== "" &&
      contactNumber?.value !== "" &&
      blockNLot?.value !== ""
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  });

  console.log(formValid);

  const cart = useSelector((state) => state.cart);

  const { data } = useFetch(`${UrlPath}/api/product/list`);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${UrlPath}/api/user/${user}`);
      setUserDetail(res.data);
    };
    fetch();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    const item = data.find((item) => item.id === product);

    const cartProduct = cart.products.find((item) => item.id === product);

    if (item.quantity > cartProduct.quantity) {
      dispatch(incrementQuantity(product));
    } else {
      alert(`Can't add more product, ${item.quantity} the only stock on hand`);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  console.log(shippingAddress);

  return (
    <Container>
      <ProductPageContainer>
        <Wrapper>
          <Bottom>
            <Info>
              {cart.products?.map((product) => (
                <div key={product.id}>
                  <Product>
                    <ProductDetail>
                      <Image src={product.imgUrl} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.productName}
                        </ProductName>
                        <ProductId>
                          <b>Description:</b> {product.productDes}
                        </ProductId>
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                        >
                          Remove
                        </button>
                        {/* <ProductSize>
                          <b>Size:</b> 37.5
                        </ProductSize> */}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <BiAddToQueue
                          style={{ cursor: "pointer" }}
                          onClick={() => handleIncreaseCart(product.id)}
                        />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <CgRemoveR
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDecreaseCart(product.id)}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        ₱ {product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </div>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>₱ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>₱ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              {user ? (
                <div className="cart-shipping-container">
                  <hr style={{ borderBottom: "2px solid gray" }} />
                  <div className="cart-shippingaddress">
                    <h2>Shipping Address</h2>
                    <div className="cart-shippingaddress-itemlist">
                      <div className="cart-shippingaddress-itemlist">
                        <label>Block and Lot</label>
                        <input
                          defaultValue={userDetail.blockNLot}
                          id="cart-blockNLot"
                          type="text"
                          placeholder="Block and Lot"
                          onChange={(e) => {
                            setShippingAddress((data) => ({
                              ...data,
                              blockNLot: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <label>Street</label>
                      <input
                        defaultValue={userDetail.street}
                        id="cart-street"
                        type="text"
                        placeholder="Street"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            street: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Barangay</label>
                      <input
                        defaultValue={userDetail.barangay}
                        id="cart-barangay"
                        type="text"
                        placeholder="Barangay"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            barangay: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Municipality</label>
                      <input
                        defaultValue={userDetail.municipality}
                        id="cart-municipality"
                        type="text"
                        placeholder="Municipality"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            municipality: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>City</label>
                      <input
                        defaultValue={userDetail.city}
                        id="cart-city"
                        type="text"
                        placeholder="City"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            city: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Postal Code</label>
                      <input
                        defaultValue={userDetail.postalCode}
                        id="cart-postal"
                        className="cart-postalcode"
                        type="number"
                        placeholder="Postal Code"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            postalCode: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>ContactNumber</label>
                      <input
                        defaultValue={userDetail.contactNumber}
                        id="cart-contactNumber"
                        type="text"
                        placeholder="Contact Number"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            contactNumber: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div className="cart-shippingaddress-itemlist">
                      <label>Mode of Payment</label>
                      <select
                        className="cart-modeofpayment"
                        onChange={(e) => {
                          setShippingAddress((data) => ({
                            ...data,
                            modeOfPayment: e.target.value,
                          }));
                        }}
                      >
                        <option value="gcash">GCash</option>
                        <option value="maya">MAYA</option>
                      </select>
                    </div>
                    {formValid ? null : (
                      <p style={{ color: "red" }}>
                        {/* {Object.values(error).join(", ")} */}
                        Please fill in all fields.
                      </p>
                    )}
                  </div>

                  <Button
                    className="checkout-btn"
                    disabled={!formValid || cart.total === 0}
                    onClick={toggleModal}
                  >
                    CHECKOUT NOW
                  </Button>
                </div>
              ) : (
                <span style={{ fontSize: "30px" }}>
                  Please login before checking out
                </span>
              )}
            </Summary>
            {/* Modal start */}
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              style={customStyles}
            >
              <OrderConfirmationModal
                carttotal={cart.total}
                setIsOpen={setIsOpen}
                shippingAddress={shippingAddress}
              />
            </Modal>
            {/* Modal end */}
          </Bottom>
        </Wrapper>
        <hr style={{ opacity: "0.4" }} />
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </ProductPageContainer>
    </Container>
  );
};

export default Cart;
