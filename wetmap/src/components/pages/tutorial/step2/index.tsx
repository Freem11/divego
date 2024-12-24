import React, { useContext } from 'react';
import Button from '../../../reusables/button';
import { SliderContext } from '../../../reusables/slider/context';

export default function TutorialStep2() {
  const { slideForward, slideBackward } = useContext(SliderContext);
  return (
    <div>
      <h1>Step 2</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

      <Button onClick={slideBackward}>
        Back
      </Button>

      <Button onClick={slideForward}>
        Next
      </Button>
    </div>
  );
};
