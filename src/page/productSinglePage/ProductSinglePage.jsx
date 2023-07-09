import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { BiAddToQueue } from "react-icons/bi";
import { CgRemoveR } from "react-icons/cg";
import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import { mobile, tablet } from "../../responsive";
import useFetch from "../../contextAPI/useFetch";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import "./ProductSinglePage.css";
import axios from "axios";
import { UrlPath } from "../../UrlPath";

const Container = styled.div`
  display: flex;
  margin-right: 0;
  margin-left: 0;
  overflow-x: hidden;
  ${mobile({
    flexDirection: "column",
    marginRight: "0",
  })};
`;

const ProductPageContainer = styled.div`
  flex: 6;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  margin-left: 50px;
  ${tablet({
    marginLeft: "0",
    flexDirection: "column",
  })};
  ${mobile({
    marginLeft: "5px",
    flexDirection: "column",
  })};
`;

const ImgContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  ${tablet({
    flex: "none",
    marginRight: "0",
  })};
`;

// overflow: hidden;

// const Image = styled.img`
//   width: 100%;
//   height: 90vh;
//   object-fit: cover;
//   ${mobile({ height: "40vh" })}
// `;

// transition: all 0.3s ease 0s;
// &:hover {
//   transform: scale(10);
// }

// &:hover {
//   transform: scale(1.5);
//   cursor: zoom-in;
//   margin-left: 50%;
// }

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: " 0px 10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  color: black;
  white-space: nowrap;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "90%" })}
  ${tablet({ width: "90%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
  &:disabled {
    background-color: white;
    cursor: not-allowed;
  }
  ${mobile({ marginLeft: "0" })}
`;

const FooterDiv = styled.div`
  margin-right: 0;
`;

const VariationName = styled.b`
  padding: 5px;
  border: 1px solid gray;
  background-color: #fffdd0;
  margin-left: 4px;
  cursor: pointer;
  &.active {
    padding: 10px;
    font-size: 20px;
    border: 2px solid teal;
    color: black;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const { data, loading } = useFetch(`${UrlPath}/api/product/list/${id}`);

  const dispatch = useDispatch();

  const [classActive, setClassActive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${UrlPath}/api/productVariations/${id}/min`);
      setClassActive(res.data);
    };
    fetchData();
  }, [id]);

  const handleClickVariationName = (e) => {
    setClassActive(e);
  };

  const [quantity, setQuantity] = useState(1);
  const [productVariation, setProductVariation] = useState({});

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      productVariation.quantity >= quantity + 1 && setQuantity(quantity + 1);
    }

    if (quantity > productVariation.quantity) {
      setQuantity(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${UrlPath}/api/productVariations/${classActive}`
      );
      setProductVariation(res.data);
    };
    fetchData();
  }, [classActive]);

  const handleClick = () => {
    dispatch(
      addProduct({
        id: productVariation.id,
        name: data.name,
        description: productVariation.description,
        productPrice: productVariation.price,
        imgUrl: productVariation.imgUrl,
        quantity,
        price: productVariation.price * quantity,
        variationName: productVariation.variationName,
      })
    );
  };

  return (
    <Container>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <ProductPageContainer>
            <Wrapper>
              <ImgContainer>
                <InnerImageZoom
                  src={productVariation?.imgUrl}
                  zoomSrc={productVariation?.imgUrl}
                  className="InnerImageZoom"
                />
              </ImgContainer>
              <InfoContainer>
                <Title>{data.name}</Title>
                <Desc>{productVariation?.description}</Desc>
                <Desc>
                  Quantity: <b>{productVariation.quantity}</b>
                </Desc>
                <Price>₱{productVariation.price}</Price>
                <FilterContainer>
                  Variations:
                  <Filter>
                    {data.productVariations?.map((item, key) => {
                      return (
                        <span key={key}>
                          <VariationName
                            className={classActive === item.id && "active"}
                            onClick={() => handleClickVariationName(item.id)}
                          >
                            {item.variationName}
                          </VariationName>
                        </span>
                      );
                    })}
                  </Filter>
                </FilterContainer>
                <AddContainer>
                  <AmountContainer>
                    <CgRemoveR
                      onClick={() => handleQuantity("dec")}
                      style={{ cursor: "pointer" }}
                    />
                    <Amount>{quantity}</Amount>
                    <BiAddToQueue
                      onClick={() => handleQuantity("inc")}
                      style={{ cursor: "pointer" }}
                    />
                  </AmountContainer>
                  <Button
                    onClick={handleClick}
                    disabled={
                      productVariation.quantity === 0 ||
                      productVariation.quantity <= quantity
                    }
                  >
                    ADD TO CART
                  </Button>
                </AddContainer>
              </InfoContainer>
            </Wrapper>
            <hr style={{ opacity: "0.4" }} />
            <FooterDiv>
              <Footer />
            </FooterDiv>
          </ProductPageContainer>
        </>
      )}
    </Container>
  );
};

export default Product;
