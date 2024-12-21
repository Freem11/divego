import React, { useContext, useState } from 'react';
import { SliderContext } from '../../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';

export default function SignUpPage() {
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
      secureTextEntry={secureTextEntry}
      setSecureTextEntry={setSecureTextEntry}
    />
  );
}
