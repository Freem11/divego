import React, { useEffect, useState } from 'react';
import SliderInput from '../sliderInput';
import { convertDistance } from '../../../helpers/utils/converter';

export type CurrentSliderInputProps = {
  isMetric: boolean
  value:    number
};
export default function CurrentSliderInput(
  props: CurrentSliderInputProps,
) {
  const maxMetrics = 2.5;
  const maxImperial = 8;

  const [label, setLabel] = useState<string>('');

  function currentLabel(speed: number) {
    const range = props.isMetric ? (maxMetrics - 0) : (maxImperial - 0);
    const percent = (speed - 0) / range;

    if (percent >= 0 && percent < 0.2) {
      setLabel('no current');
    } else if (percent < 0.4) {
      setLabel('weak drift');
    } else if (percent < 0.6) {
      setLabel('typical drift');
    } else if (percent < 0.8) {
      setLabel('strong drift');
    } else {
      setLabel('extreme drift');
    }
  }

  useEffect(() => {
    currentLabel(props.value);
  }, [props.value]);

  return (
    <div>
      {
        props.isMetric
          ?      (
              <SliderInput
                min={0}
                max={maxMetrics}
                value={props.value}
                range={10 / 100}
                unit="m/s"
                showLabel={true}
                label={label}
                currentLabel={currentLabel}
              />
            )
          :      (
              <SliderInput
                min={0}
                max={maxImperial}
                value={convertDistance(props.value, 'm')}
                range={3 / 30}
                unit="ft/s"
                showLabel={true}
                label={label}
                currentLabel={currentLabel}
              />
            )
      }

    </div>
  );
}
