import React, { useContext } from 'react';
import { slideBackward } from './sliderHelpers';
import { XcoordinateContext } from './xCoordinateContext';
import { SliderNumberContext } from './sliderNumberContext';
import Button from '../../reusables/button/index';

export default function TestPageEnd() {
  const { xCoordinate, setxCoordinate } = useContext(XcoordinateContext);
  const { slideNum, setSlideNum } = useContext(SliderNumberContext);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <Button onClick={() => slideBackward(3, xCoordinate, setxCoordinate, slideNum, setSlideNum)}>Page Down</Button>
      </div>
    </div>
  );
}
