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
  const numberOfPages = 4;
  const pageMin = 0;
  const pageMax = numberOfPages * pageWidth;

  const slideBack = (moveBy: number) => {
    const movement = moveBy * pageWidth;
    if (xCoordinate + movement > pageMin) {
      return;
    } else {
      setxCoordinate(xCoordinate + movement);
      setSlideNum(slideNum + moveBy);
    }
  };

  const slideForward = (moveBy: number) => {
    const movement = moveBy * pageWidth;
    if (xCoordinate - movement <= -pageMax) {
      return;
    } else {
      setxCoordinate(xCoordinate - movement);
      setSlideNum(slideNum - moveBy);
    }
  };

  const pageChangeStyle = {
    width:      pageWidth * numberOfPages,
    transform:  `translateX(${xCoordinate}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
  };

  return (
    <>
      <div className="slider">
        <div className="leftSide">
          <Button text="back" onClick={() => slideBack(1)} />
        </div>

        <div className="slider-center-container" style={pageChangeStyle}>
          <div style={{ backgroundColor: 'pink', height: '100%', width: '25%' }}>Page 1</div>
          <div style={{ backgroundColor: 'orange', height: '100%', width: '25%' }}>Page 2</div>
          <div style={{ backgroundColor: 'limegreen', height: '100%', width: '25%' }}>Page 3</div>
          <div style={{ backgroundColor: 'lightblue', height: '100%', width: '25%' }}>Page 4</div>
        </div>
        <div className="rightSide">
          <Button text="forward" onClick={() => slideForward(1)} />
        </div>
      </div>
    </>
  );
});

export default Slider;
