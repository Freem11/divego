const pageWidth = window.innerWidth / 2;

export function slideForward(moveBy: number, max: number, xValue: number, setXValue: (xValue: number) => void, sliderVal: number, setSliderVal: (sliderVal: number) => void ) {
  const movement = moveBy * pageWidth;
  if (xValue - movement <= -max) {
    return;
  } else {
    setXValue(xValue - movement);
    setSliderVal(sliderVal - moveBy);
  }
};

export function  slideBackward(moveBy: number, xValue: number, setXValue: (xValue: number) => void, sliderVal: number, setSliderVal: (sliderVal: number) => void ) {
  const movement = moveBy * pageWidth;
  if (xValue + movement > 0) {
    return;
  } else {
    setXValue(xValue + movement);
    setSliderVal(sliderVal + moveBy);
  }
};