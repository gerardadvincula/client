import React, { useContext } from "react";
import ProfileSide from "../../components/profileSidebar/ProfileSide";
import { AuthContext } from "../../contextAPI/AuthContext";
import "./Profile.css";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import useFetch from "../../contextAPI/useFetch";
import Modal from "react-modal";
import ChangePassword from "./ChangePassword";
import { toast } from "react-toastify";
import { UrlPath } from "../../UrlPath";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "20%",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setprofileData] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  // const [address, setAddress] = useState("");
  // const [formattedAddress, setFormatedAddress] = useState("");

  const { user } = useContext(AuthContext);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // handle onClick event for submit button
  // const handleAddressSubmit = async () => {
  //   try {
  //     await axios.put(`${UrlPath}/api/user/${user}/address`, {
  //       address: address,
  //     });
  //     toast.success("✅ Success!", {
  //       position: "bottom-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     window.location.reload();
  //     console.log("success");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { data } = useFetch(`${UrlPath}/api/user/${user}`);

  useEffect(() => {
    // const address = data.address || ""; // set default value to empty string if address is undefined
    // const parsedAddress = address ? JSON.parse(address) : {}; // check if address is truthy before parsing
    // setFormatedAddress(parsedAddress.address || ""); // get the 'address' property from the parsed object, set default value to empty string if not found

    setprofileData(data);
  }, [data]);

  console.log(profileData);

  const handlePutImage = async () => {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "upload");
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
      data
    );

    const { url } = uploadRes.data;
    await axios.put(`${UrlPath}/api/user/image/${user}`, {
      imageUrl: url,
    });
    toast.success("✅ Success!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.location.reload();
    console.log("success");
  };

  const fileTypeChecking = (e) => {
    var fileInput = document.getElementById("fileImage");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageSelected(e.target.files[0]);
  };

  return (
    <>
      <div className="profile">
        <ProfileSide />
        <div className="profileManageContainer">
          <div className="profileInfoIntro">
            <h2>My Profile</h2>
            <p>Manage and protect your account</p>
            <div className="profileHorizontalLine"></div>
          </div>
          <div className="profileManageContainerAll">
            <div className="profileManageContainerLeft">
              <img
                src={
                  imageSelected
                    ? URL.createObjectURL(imageSelected)
                    : profileData.imageUrl ||
                      "https://i.ibb.co/MBtjqXQ/no=avatar.gif"
                }
                alt="profilePic"
                className="profileImage"
              />
              <label htmlFor="fileImage" className="profileInputLabel">
                <input
                  type="file"
                  accept="image/*"
                  id="fileImage"
                  className="profileInputTypeFile"
                  onChange={fileTypeChecking}
                />
                <AiOutlineCamera /> Choose a file
              </label>
              <button className="profileSaveImageBtn" onClick={handlePutImage}>
                <AiOutlineSave /> Save Image
              </button>
            </div>
            <div className="profileVerticalLine"></div>
            <div className="profileManageContainerRight">
              <div className="profileManageInfo">
                <section>
                  <label>
                    Fullname: <br />
                  </label>
                  <span
                    className="profileManageInfoList"
                    style={{ border: "1px solid black" }}
                  >
                    {data.name}
                  </span>
                </section>

                <section>
                  <label>Email: </label>
                  <span
                    className="profileManageInfoList"
                    style={{ border: "1px solid black" }}
                  >
                    {data.email}
                  </span>
                </section>

                <section>
                  <label>
                    Full Address: <br />
                  </label>
                  <span
                    // className="profile-address-inputtype"

                    // onChange={(e) => setAddress(e.target.value)}
                    className="profileManageInfoList"
                    style={{
                      border: "1px solid black",
                      textTransform: "capitalize",
                    }}
                  >
                    {data.address + " " + data.city + " " + data.postalCode}
                  </span>
                </section>

                <button
                  className="profileManageInfoList"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px",
                    marginTop: "10px",
                    cursor: "pointer",
                    backgroundColor: "#51503F",
                    color: "white",
                    marginBottom: "10px",
                  }}
                  onClick={toggleModal}
                >
                  Change Password
                </button>

                {/* <button className="saveProfileInfo" onClick={handleUpdate}>
                  Save
                </button> */}
                {/* <section className="profile-address-itemlist">
                  {/* <label>Full Address</label> 
                <span
                  // className="profile-address-inputtype"
                  className="profileManageInfoList"
                  // onChange={(e) => setAddress(e.target.value)}
                >
                  {data.address + " " + data.city + " " + data.postalCode}
                </span>
                {/* <button
                    className="profile-address-btn"
                    // onClick={handleAddressSubmit}
                  >
                    Change Address
                  </button> 
                </section> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <Footer />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyle}
      >
        <ChangePassword userId={data?.id} />
      </Modal>
    </>
  );
};

export default Profile;
