import React, { useState } from 'react';
import styles from './style.module.scss';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

export type SliderInputProps = {
  min:       number
  max:       number
  unit:      string
  showLabel: boolean
};

export default function SliderInput(props: SliderInputProps) {
  const [label, setLabel] = useState<string>('');

  const marks = [
    {
      value: props.min,
      label: `${props.min}${props.unit}`,
    },
    {
      value: props.max,
      label: `${props.max}${props.unit}`,
    },
  ];

  function valuetext(value: number) {
    return `${value}${props.unit}`;
  }

  function handleChange(e: Event, value: number) {
    e.stopPropagation();
    currentLabel(value);
  }

  const steps = (props.max - props.min) / 5;

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

  return (
    <div style={{ height: 400, width: 400 }}>
      {/* <Box sx={{ width: 300 }}>
        <h3>{props.showLabel ? label : ''}</h3>
        <Slider
          defaultValue={70}
          aria-label="Small"
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={props.min}
          max={props.max}
          marks={marks}
          step={steps}
          onChange={(e, value) => handleChange(e, value as number)}
        />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
      </Box> */}
      <div className={styles.slidecontainer}>
        <input type="range" min={props.min} max={props.max} defaultValue="50" className={styles.slider} id="myRange" />
      </div>
    </div>
  );
}
