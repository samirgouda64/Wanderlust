import React from "react";
import "./PageLoader.css";

const PageLoader = ({ visible = false, text = "Processing...", subText = "Please wait" }) => {
  if (!visible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
        <h4>{text}</h4>
        <p>{subText}</p>
      </div>
    </div>
  );
};

export default PageLoader;
