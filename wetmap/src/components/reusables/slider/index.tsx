import React, { useState } from 'react';
import  { SliderContext } from './context';

import './style.scss';

const defaultProps = {
  startIndex: 0 as number,
  slides:     [] as React.ReactNode[],
  showArrows: true as boolean,
};

export type SliderProps = Partial<typeof defaultProps>;


export default function Slider(_props: SliderProps) {
  const props = { ...defaultProps, ..._props };
  const [currentSlide, setCurrentSlide] = useState<number>(props.startIndex);

  function goToSlide(index: number) {
    if (!props.slides) {
      return;
    }
    if (index >= props.slides.length) {
      return;
    }
    if (index < 0) {
      return;
    }

    setCurrentSlide(index);
  }

  function slideForward() {
    goToSlide(currentSlide + 1);
  }

  function slideBackward() {
    goToSlide(currentSlide - 1);
  }

  return (
    <div className="ssrc-slider">
      <div className="ssrc-slider__container">
        <div className="ssrc-slider__line" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <SliderContext.Provider value={{ slideForward, slideBackward, goToSlide }}>
            {props.slides && props.slides.map((page, index) => {
              return (
                <div className="ssrc-slider__slide" key={index}>
                  {page}
                </div>
              );
            })}
          </SliderContext.Provider>
        </div>

        {props.showArrows && (
          <>
            <button className="ssrc-slider__prev" onClick={slideBackward}>&#10094;</button>
            <button className="ssrc-slider__next" onClick={slideForward}>&#10095;</button>
          </>
        )}
      </div>
    </div>
  );
};
