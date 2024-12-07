import React, { useContext } from 'react';
import { slideForward } from './sliderHelpers';
import { XcoordinateContext } from './xCoordinateContext';
import { SliderNumberContext } from './sliderNumberContext';
import { PageMaxContext } from './pageMaxContext';
import Button from '../../reusables/button/index';

export default function TestPage() {
  const { xCoordinate, setxCoordinate } = useContext(XcoordinateContext);
  const { slideNum, setSlideNum } = useContext(SliderNumberContext);
  const { pageMax } = useContext(PageMaxContext);


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <Button onClick={() => slideForward(1, pageMax, xCoordinate, setxCoordinate, slideNum, setSlideNum)}>Page Up</Button>
      </div>
    </div>
  );
}
