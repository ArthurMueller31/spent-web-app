import React from "react";
import "./LoadingMessage.css";

const LoadingMessage = () => {
  return (
    <div className="loading-div">
      <span className="loading-text">Buscando informações, por favor aguarde...</span>
    </div>
  );
};

export default LoadingMessage;
