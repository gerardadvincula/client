import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const redirectUrl = `${
      import.meta.env.VITE_APP_API_URL
    }/oauth2/authorization/google`;

    window.open(redirectUrl, "_self");
  };

  return (
    <div>
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        <FcGoogle /> Login with Google
      </button>
    </div>
  );
};

export default GoogleLoginButton;
