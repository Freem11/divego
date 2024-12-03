import React, { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';
import './style.scss';
import Button from '../button/button';

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

  const [xCoordinate, setxCoordinate] = useState<number>(0);
  const [slideNum, setSlideNum] = useState<number>(1);

  const animationDuration = 500;
  const pageWidth = window.innerWidth / 3;

  const slideForward = (moveBy: number) => {
    const movement = moveBy * pageWidth;
    setxCoordinate(xCoordinate + movement);
    setSlideNum(slideNum + moveBy);
  };

  const slideBack = (moveBy: number) => {
    const movement = moveBy * pageWidth;
    setxCoordinate(xCoordinate - movement);
    setSlideNum(slideNum - moveBy);
  };

  const pageChangeStyle = {
    transform:  `translateX(${xCoordinate}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
  };

  return (
    <>
      <div className="slider">
        <Button text="back" onClick={() => slideBack(1)} />
        <div className="slider-center-container" style={pageChangeStyle}>
          <div style={{ backgroundColor: 'pink', height: '100%', width: '25%' }} />
          <div style={{ backgroundColor: 'orange', height: '100%', width: '25%' }} />
          <div style={{ backgroundColor: 'limegreen', height: '100%', width: '25%' }} />
          <div style={{ backgroundColor: 'lightblue', height: '100%', width: '25%' }} />
        </div>
        <Button text="forward" onClick={() => slideForward(1)} />
      </div>
    </>
  );
});

export default Slider;
