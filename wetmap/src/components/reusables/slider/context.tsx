import { createContext } from 'react';

type SlideHandle = {
  goToSlide:     (index: number) => void
  slideForward:  () => void
  slideBackward: () => void
};

export const SliderContext = createContext<SlideHandle>({} as SlideHandle);
