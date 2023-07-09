import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import { mobile } from "../../responsive";
import useFetch from "../../contextAPI/useFetch";
import { UrlPath } from "../../UrlPath";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${mobile({ padding: "0", marginLeft: "-3px" })};
`;

const CategoryMapping = () => {
  const { data } = useFetch(`${UrlPath}/api/category/list`);

  return (
    <Container>
      {data?.map((item) => (
        <CategoryCard item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default CategoryMapping;
