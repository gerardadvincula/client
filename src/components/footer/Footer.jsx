import styled from "styled-components";
import { mobile } from "../../responsive";
import { BsFacebook, BsWhatsapp, BsFillPersonFill } from "react-icons/bs";
import { BiSolidSchool } from "react-icons/bi";
import stilogo from "../../images/logo.png";
import csuvlogo from "/csuvlogo.png";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column", margin: 0, padding: 0 })};
  margin-top: 10px;
  width: 95%;
  margin-left: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  margin-right: 0;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 0;
  margin-right: 0;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

// const Payment = styled.img`
//   width: 50%;
// `;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          Beauty Avenue
          <img
            src={stilogo}
            alt="sti logo"
            style={{
              height: "60px",
              width: "auto",
              marginLeft: "5px",
            }}
          />
        </Logo>
        <Desc>
          Welcome to our Beauty Avenue! We are a team of passionate beauty
          enthusiasts who believe that everyone deserves to look and feel their
          best. We offer a wide range of beauty products from top brands,
          including skincare, makeup, haircare, and fragrance. Our mission is to
          provide our customers with the best shopping experience possible by
          offering high-quality products at competitive prices and excellent
          customer service. We are committed to helping you find the perfect
          products to enhance your natural beauty and feel confident in your own
          skin. Thank you for choosing us as your go-to destination for all your
          beauty needs.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <BsFacebook />
          </SocialIcon>
          <SocialIcon color="49C358">
            <BsWhatsapp />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <a style={{ textDecoration: "none", color: "black" }} href="/">
              Home
            </a>
          </ListItem>
          <ListItem>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/category/4"
            >
              Facemask
            </a>
          </ListItem>
          <ListItem>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/category/1"
            >
              Soap
            </a>
          </ListItem>
          <ListItem>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/category/3"
            >
              Glutathione
            </a>
          </ListItem>
          <ListItem>
            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/category/2"
            >
              Serum
            </a>
          </ListItem>
        </List>
      </Center>
      <Right>
        <ContactItem>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img style={{ width: "100px" }} src={csuvlogo} alt="" /> © CSVU,
            Joyce Ann PaduaAira Jamillah Quiamzon Michaella Sergio, 2023
          </div>
        </ContactItem>
        {/* <ContactItem>
          <BsFillPersonFill style={{ marginRight: "10px" }} /> Joyce Ann Padua
        </ContactItem>
        <ContactItem>
          <BsFillPersonFill style={{ marginRight: "10px" }} /> Aira Jamillah
        </ContactItem>
        <ContactItem>
          <BsFillPersonFill style={{ marginRight: "10px" }} /> Michaella Sergio
        </ContactItem> */}
      </Right>
    </Container>
  );
};

export default Footer;
