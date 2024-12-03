import React, { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';
import './style.scss';

type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type CustomInputProps = {
  children:      React.ReactElement
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Slider = React.forwardRef(function Slider(
  props: TextInputProps & CustomInputProps,
  ref,
) {
  const { children, onChange, onFileChange, ...rest } = props;

  const [prevSlideNum, setPrevSlideNum] = useState<number>(0);
  const [slideNum, setSlideNum] = useState<number>(1);

  const animationDuration = 300;
  const pageWidth = '33vw';

  const slideLeftStyle = {
    // aka page forward
    transform:  `translateX(${slideNum - prevSlideNum}*${pageWidth})`,
    transition: `transform ${animationDuration}ms ease-in-out`,
  };

  const slideRightStyle = {
    // aka page backward
    transform:  `translateX(-${slideNum - prevSlideNum}*${pageWidth})`,
    transition: `transform ${animationDuration}ms ease-out`,
  };

  return (
    <>
      <div className="slider">
        <div className="slider-center-container">{children[slideNum]}</div>

      </div>
    </>
  );
});

export default Slider;
