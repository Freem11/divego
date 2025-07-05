import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

export type SliderInputProps = {
  min:           number
  max:           number
  value:         number
  range:         number
  unit:          string
  label?:        string
  currentLabel?: (speed: number) => void
  showLabel:     boolean
};

export default function SliderInput(props: SliderInputProps) {
  const [value, setValue] = useState<number>(props.value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.currentLabel?.(Number(e.target.value));
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


  useEffect(() => {
    setValue(props.value);
  }, [props.unit]);

  // no current: grey
  // weak drift: blue
  // typical drift: green
  // strong drift: orange
  // extreme drift: red
  return (
    <div className={styles.sliderInputContainer}>
      <div className={styles.slidecontainer}>
        <h3 className="text-center">
          {props.showLabel ? props.label : ''}
          {' '}
          {value}
          {' '}
          {props.unit}
        </h3>
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={value}
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
