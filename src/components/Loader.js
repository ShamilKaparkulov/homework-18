import React from "react";
import LoaderImg from "./assets/loader.png";
import ReactDOM from "react-dom";
import "./Loader.css";

/// стиль бергенге жетишпей калдым

function Loader() {
  return ReactDOM.createPortal(
    <div className="loader">
      <div className="loader_img">
        <img src={LoaderImg} alt="" />
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
