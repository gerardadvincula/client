import axios from "axios";
import { MdOutlineUpload } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { UrlPath } from "../../UrlPath";
// import { useEffect } from "react";

const SubmitOrImage = ({ item, close }) => {
  const [ImageFile, setImageFile] = useState("");

  const handlePutImageInOrder = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", ImageFile);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        data
      );
      const { url } = uploadRes.data;

      await axios.put(`${UrlPath}/api/order/update/proofPayment/${item.id}`, {
        proofPayment: url,
      });
      toast.success("✅ Success!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("success");
      window.location.reload();
    } catch (err) {}
  };

  const fileTypeChecking = (e) => {
    var fileInput = document.getElementById("file-upload");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src={ImageFile ? URL.createObjectURL(ImageFile) : null}
        alt="OR Proof Payment"
        className="orProof"
      />
      <label htmlFor="file-upload" className="orderInputImageLabel">
        <MdOutlineUpload /> "Upload your image here"
        <input
          type="file"
          id="file-upload"
          onChange={fileTypeChecking}
          style={{ display: "none" }}
        />
      </label>
      <div
        style={{ marginTop: "5px", display: "flex", flexDirection: "column" }}
      >
        <button className="orderItemSubmitBtn" onClick={handlePutImageInOrder}>
          Submit
        </button>
        <button className="orderItemSubmitBtn" onClick={close}>
          Close Modal
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SubmitOrImage;
