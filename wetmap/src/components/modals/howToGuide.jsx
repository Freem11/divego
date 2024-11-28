import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import ModalHeader from '../reusables/modalHeader';
import LargeButton from '../reusables/button/largeButton';
import IntroTutorial from '../guides/introTutorial';
import { ModalContext } from '../contexts/modalContext';

const HowToGuide = (props) => {
  const {} = props;

  const { modalSuccess } = useContext(ModalContext);

  const { modalCancel } = useContext(ModalContext);

  return (
    <>
      <ModalHeader
        title="How to use Scuba SEAsons"
        onClose={modalCancel}
      />

      {/* <div className='flex-center-column' style={{ marginTop: '-25%' }}> */}
      <div className="hero flex-centered">
        <LargeButton onClick={null} btnText="Intro Guide" />
        <LargeButton
          onClick={null}
          btnText="Fun With Dive Sites"
        />
        <LargeButton
          onClick={null}
          btnText="Photogenics"
        />
      </div>
    </>
  );
};

export default HowToGuide;
