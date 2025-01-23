import { createContext } from 'react';
import { PhotoContextType } from './photoContextProvider';

export const PhotoContext = createContext<PhotoContextType>({} as PhotoContextType);
