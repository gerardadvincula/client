import "./PopupMessage.css";

const PopupMessage = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <div className="popup-content">
          <h1>{text}</h1>
          <button onClick={closePopup}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
