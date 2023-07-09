import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  object-fit: cover;
  overflow: hidden;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ItemName = styled.div`
  position: absolute;
  bottom: 15px;
  text-align: center;
  font-weight: 500;
  font-size: 19px;
`;

//this component is for single product card that if you hover you will see the option to add something

const CategoryCard = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.imageUrl} />
      <ItemName>{item.categoryName}</ItemName>
      <Info>
        <Icon>
          <Link
            to={`/category/${item.id}`}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            <AiOutlineSearch />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

export default CategoryCard;
