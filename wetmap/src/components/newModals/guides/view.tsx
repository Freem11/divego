import React from "react";
import backGroundPic from "../../../images/boat.png";
import WavyModalHeader from "../../reusables/wavyModalHeader";

type GuidesModalViewProps = {
  onClose: () => void;
};

export default function GuidesModalView({ onClose }: GuidesModalViewProps) {
  return (
    <div className="full-height">
      <WavyModalHeader image={backGroundPic} onClose={onClose} />
      <div>
        <h2>User guides coming soon!</h2>
      </div>
    </div>
  );
}
