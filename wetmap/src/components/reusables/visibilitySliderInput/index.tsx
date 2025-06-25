import React from 'react';
import SliderInput from '../sliderInput';

export default function VisibilitySliderInput(
) {
  // we need react redux to get the imperial/metric data, otherwise, we have to keep calling the api
  const maxMetrics = 100;
  const maxImperial = 30;
  return (
    <div>
      <SliderInput
        min={0}
        max={100}
        value={0}
        range={10 / 100}
        unit="ft"
        showLabel={false}
      />
    </div>
  );
}
