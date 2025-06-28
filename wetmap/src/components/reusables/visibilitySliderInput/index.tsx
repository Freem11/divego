import React from 'react';
import SliderInput from '../sliderInput';
import { convertDistance } from '../../../helpers/utils/converter';

export default function VisibilitySliderInput(
  { isMetric, value }: { isMetric: boolean, value: number },
) {
  const maxMetrics = 30;
  const maxImperial = 100;

  return (
    <div>
      {
        isMetric
          ?      (
              <SliderInput
                min={0}
                max={maxMetrics}
                value={value}
                range={3 / 30}
                unit="m"
                showLabel={false}
              />
            )
          :      (
              <SliderInput
                min={0}
                max={maxImperial}
                value={convertDistance(value, 'm')}
                range={10 / 100}
                unit="ft"
                showLabel={false}
              />
            )
      }

    </div>
  );
}
