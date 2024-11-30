import React, { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from "react";
import './style.scss';

type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type CustomInputProps = {
  children: React.ReactElement;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Slider = React.forwardRef(function Slider(
  props: TextInputProps & CustomInputProps,
  ref
) {
  const { children, onChange, onFileChange, ...rest } = props;
  
const [slideNum, setSlideNum] = useState<number>(1);
  return (
    <>
      <div className="slider"><div className="slider-center-container">{children[slideNum]}</div>
      
      </div>
    </>
  );
});

export default Slider;
