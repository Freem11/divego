import React, { useState } from 'react';
import styles from './style.module.scss';
// import { set } from 'react-hook-form';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

export type SliderInputProps = {
  min:       number
  max:       number
  value:     number
  range:     number
  unit:      string
  showLabel: boolean
};

export default function SliderInput(props: SliderInputProps) {
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<number>(props.value);

  // const marks = [
  //   {
  //     value: props.min,
  //     label: `${props.min}${props.unit}`,
  //   },
  //   {
  //     value: props.max,
  //     label: `${props.max}${props.unit}`,
  //   },
  // ];


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    currentLabel(Number(e.target.value));
    setValue(Number(e.target.value));
  }

  const steps = (props.max - props.min) / 5;
  const speedRange = () => {
    const arr = [];
    for (let i = props.min; i <= props.max; i += steps) {
      arr.push(parseFloat(i.toFixed(1)));
    }
    return arr;
  };

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
    <div className={styles.sliderInputContainer}>
      <div className={styles.slidecontainer}>
        <h3>{props.showLabel ? label : ''}</h3>
        <input
          type="range"
          min={props.min}
          max={props.max}
          defaultValue={props.value}
          step={props.range}
          className={styles.slider}
          onChange={e => handleChange(e)}
          data-value={`${value}${props.unit}`}
          id="myRange"
        />
        <div className={styles.sliderticks}>
          {speedRange().map((item, index) => (
            <span key={index}>
              {item}
              {index === 0 || index === speedRange().length - 1 ? props.unit : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
