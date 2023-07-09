import { AiFillFacebook } from "react-icons/ai";

const FbLoginButton = () => {
  const handleFacebookLogin = () => {
    const redirectUrl = `${
      import.meta.env.VITE_APP_API_URL
    }/oauth2/authorization/facebok`;

    window.open(redirectUrl, "_self");
  };

  return (
    <div>
      <button className="facebook-login-btn" onClick={handleFacebookLogin}>
        <AiFillFacebook color="14A2F9" />
        Login with Facebook
      </button>
    </div>
  );
};

export default FbLoginButton;
