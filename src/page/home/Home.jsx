import "./Home.css";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
// import Categories from "../../components/categories/Categories";
import SliderImage from "../../components/slider/SliderImage";
import CategoryMapping from "../../components/category/CategoryMapping";

const FooterDiv = styled.div`
  margin-right: 0;
`;

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <SliderImage />
        <CategoryMapping />
        <hr style={{ opacity: "0.4" }} />
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </div>
    </div>
  );
};

export default Home;
