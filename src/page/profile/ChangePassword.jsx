import axios from "axios";
// import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { registrationSchema } from "../../validations/RegistrationValidation";
import { UrlPath } from "../../UrlPath";

const ChangePassword = ({ userId }) => {
  const handleChangePass = async () => {
    await axios.put(`${UrlPath}/api/user/update/password/${userId}`, {
      password: values.password,
    });

    toast.success("✅ Success!", {
      position: "center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    // setFieldValue,
  } = useFormik({
    initialValues: {
      // firstName: "",
      // lastName: "",
      // username: "",
      // email: "",
      password: "",
      confirmPassword: "",
      // birthday: new Date(),
      // gender: "Male",
    },
    validationSchema: registrationSchema,
    ChangePassword,
  });

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <span>Please enter your desired password in the space provided.</span>
      <input
        style={{ width: "100%", height: "32px", fontSize: "20px" }}
        type="password"
        id="password"
        placeholder="Your Password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        // onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && touched.password && (
        <div className="error-message">{errors.password}</div>
      )}
      <input
        style={{ width: "100%", height: "32px", fontSize: "20px" }}
        type="password"
        id="confirmPassword"
        placeholder="Confirm Password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        // onChange={(e) => setPassword(e.target.value)}
      />
      {errors.confirmPassword && touched.confirmPassword && (
        <div className="error-message">{errors.confirmPassword}</div>
      )}
      <button
        className={
          (values.password === "" && values.confirmPassword === "") ||
          values.password !== values.confirmPassword
            ? "changePassBtnDisable"
            : "changePassBtn"
        }
        disabled={
          (values.password === "" && values.confirmPassword === "") ||
          values.password !== values.confirmPassword
            ? "changePassBtnDisable"
            : "changePassBtn"
        }
        title={
          (values.password === "" && values.confirmPassword === "") ||
          values.password !== values.confirmPassword
            ? "Please type your password in the space provided"
            : ""
        }
        onClick={handleChangePass}
      >
        Change Password
      </button>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
