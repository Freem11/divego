import React from 'react';
import SliderInput from '../sliderInput';
import { convertDistance } from '../../../helpers/utils/converter';

export type VisibilitySliderInputProps = {
  isMetric: boolean
  value:    number
};
export default function VisibilitySliderInput(
  props: VisibilitySliderInputProps,
) {
  const maxMetrics = 30;
  const maxImperial = 100;

  return (
    <div>
      {
        props.isMetric
          ?      (
              <SliderInput
                min={0}
                max={maxMetrics}
                value={props.value}
                range={3 / 30}
                unit="m"
                showLabel={false}
              />
            )
          :      (
              <SliderInput
                min={0}
                max={maxImperial}
                value={convertDistance(props.value, 'm')}
                range={10 / 100}
                unit="ft"
                showLabel={false}
              />
            )
      }

    </div>
  );
}
