import React, { useContext, useEffect } from 'react';
import './style.scss';
import { XcoordinateContext } from './xCoordinateContext';
import { SliderNumberContext } from './sliderNumberContext';
import { PageMaxContext } from './pageMaxContext';

type SliderProps = {
  startPage: number | 1
  pageData:  any[]
};

export default function Slider(props: SliderProps) {
  const pageWidth = window.innerWidth / 2;
  const numberOfPages = props.pageData.length;
  const animationDuration = 500;
  
  const {xCoordinate, setxCoordinate} = useContext(XcoordinateContext);
  const {setSlideNum} = useContext(SliderNumberContext);
  const {setPageMax} = useContext(PageMaxContext);

  useEffect(() => {
    setSlideNum(props.startPage)
    setxCoordinate((props.startPage - 1) * -pageWidth);
    setPageMax(numberOfPages * pageWidth)
  }, []);

  const pageChangeStyle = {
    width:      pageWidth * numberOfPages,
    transform:  `translateX(${xCoordinate}px)`,
    transition: `transform ${animationDuration}ms ease-out`,
  };

  return (
    <>
      <div className="slider">
        <div className="leftSide">
        </div>

        <div className="slider-center-container" style={pageChangeStyle}>
          {props.pageData
          && props.pageData.map((page, index) => {
            return (
              <div style={{ display: 'flex', width: '100%'}} key={index}>
                {page}
              </div>
            );
          })}
        </div>
        <div className="rightSide">
        </div>
      </div>
    </>
  );
};
