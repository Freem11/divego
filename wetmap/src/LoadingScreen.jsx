import React from "react";
import "./loadingScreen.css";
import MantaRay from "./images/Matt_Manta_White.png";

export default function LoadingScreen() {
  return (
    <div className="screenDiv">
      <img src={MantaRay} className="mantaLogo"></img>

      <div className="logoDiv">DiveGo</div>
    </div>
  );
}