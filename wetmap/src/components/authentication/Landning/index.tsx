import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import LandingPageView from './view';
import { socialSignIn } from '../../../supabaseCalls/authenticateSupabaseCalls';

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);

  async function getSocialSignIn(provider: any) {
    await socialSignIn(provider);
  }


  return (
    <LandingPageView
      goToSlide={goToSlide}
      socialSignIn={getSocialSignIn}
    />
  );
}
