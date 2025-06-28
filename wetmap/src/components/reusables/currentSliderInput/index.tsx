import React, { useEffect } from 'react';
import SliderInput from '../sliderInput';
import { convertDistance } from '../../../helpers/utils/converter';

export default function CurrentSliderInput(
  { isMetric, value }: { isMetric: boolean, value: number },
) {
  const maxMetrics = 2.5;
  const maxImperial = 8;

  const [label, setLabel] = useState<string>('');

  function currentLabel(speed: number) {
    const range = props.max - props.min;
    const percent = (speed - props.min) / range;

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
    currentLabel(value);
  }, [value]);

  return (
    <div>
      {
        isMetric
          ?      (
              <SliderInput
                min={0}
                max={maxMetrics}
                value={value}
                range={10 / 100}
                unit="m/s"
                showLabel={true}
              />
            )
          :      (
              <SliderInput
                min={0}
                max={maxImperial}
                value={convertDistance(value, 'm')}
                range={3 / 30}
                unit="ft/s"
                showLabel={true}
              />
            )
      }

    </div>
  );
}
