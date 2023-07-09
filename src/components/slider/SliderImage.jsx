import { useEffect, useState } from "react";
import "./SliderImage.css";
import slider1 from "../../images/slider1.png";
import slider2 from "../../images/slider2.png";
import slider3 from "../../images/slider3.jpeg";

const SliderImage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set the time interval for slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img
        className={`slider-image ${currentSlide === 0 ? "active" : ""}`}
        src={slider1}
        alt="Slider 1"
      />
      <img
        className={`slider-image ${currentSlide === 1 ? "active" : ""}`}
        src={slider2}
        alt="Slider 2"
      />
      <img
        className={`slider-image ${currentSlide === 2 ? "active" : ""}`}
        src={slider3}
        alt="Slider 3"
      />
      <div className="slider-indicators">
        <span
          className={`slider-indicator ${currentSlide === 0 ? "active" : ""}`}
          onClick={() => setCurrentSlide(0)}
        ></span>
        <span
          className={`slider-indicator ${currentSlide === 1 ? "active" : ""}`}
          onClick={() => setCurrentSlide(1)}
        ></span>
        <span
          className={`slider-indicator ${currentSlide === 2 ? "active" : ""}`}
          onClick={() => setCurrentSlide(2)}
        ></span>
      </div>
    </div>
  );
};

export default SliderImage;
