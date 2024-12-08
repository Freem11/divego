import { createContext } from 'react';
import { ModalHandle } from './types';

// For some reason context doesnt work after hot reload when it's been defined in the same file with provider
// It works fine when is's a separate file
// https://github.com/vitejs/vite/issues/3301#issuecomment-1080030773
export const ModalContext = createContext<ModalHandle>({} as ModalHandle);
