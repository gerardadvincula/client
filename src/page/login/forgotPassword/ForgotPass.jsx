import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../../../contextAPI/useFetch";

const secretQuestions = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "In what city were you born?",
  "What is your favorite book?",
  "What is your favorite movie?",
];

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // API to check if email is existing
  const { data } = useFetch(
    `${import.meta.env.VITE_APP_API_URL}/api/user/${email}`
  );

  console.log(data);

  console.log("password", password);

  const handleForgotPass = async () => {
    if (confirmPassword === password) {
      await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/user/changePassword/${email}`,
        {
          password,
        }
      );

      toast("Successfully change password!", {
        type: "success",
        position: "center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setError("Password and Confirm password not matched!");
    }
  };

  console.log("secret Question", secretQuestion, "secret Answer", secretAnswer);

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <span>
        Please enter the details correctly to show the change password
      </span>
      <input
        style={{ width: "100%", height: "32px", fontSize: "20px" }}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        onChange={(e) => setSecretQuestion(e.target.value)}
        style={{ width: "100.5%", height: "32px", fontSize: "20px" }}
      >
        <option value="">Select a secret question</option>
        {secretQuestions.map((question, index) => (
          <option key={index} value={question}>
            {question}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Type your answer"
        style={{ width: "100%", height: "32px", fontSize: "20px" }}
        onChange={(e) => setSecretAnswer(e.target.value)}
      />

      {data &&
      data.secretQuestion === secretQuestion &&
      data.secretAnswer === secretAnswer ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            style={{ width: "100%", height: "32px", fontSize: "20px" }}
            placeholder="new password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{ width: "100%", height: "32px", fontSize: "20px" }}
            placeholder="confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <div>{error}</div>}
          <button
            style={{
              width: "100%",
              height: "32px",
              fontSize: "20px",
              cursor: "pointer",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#4B4B4B",
              color: "#ffff",
              padding: "5px",
            }}
            onClick={handleForgotPass}
          >
            Change Password
          </button>
        </div>
      ) : (
        <></>
      )}

      <ToastContainer />
    </div>
  );
};

export default ForgotPass;
