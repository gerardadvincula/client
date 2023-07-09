import { useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import CategoryMapping from "../../components/category/CategoryMapping";
import SearchComponent from "../../components/searchComponent/SearchComponent";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  return (
    <div>
      {location.pathname === `/category/${id}` ? (
        <SearchComponent id={id} />
      ) : (
        <SearchComponent />
      )}
      <CategoryMapping />
      <hr style={{ opacity: "0.4" }} />
      <Footer />
    </div>
  );
};

export default Product;
