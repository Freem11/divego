import { createContext } from 'react';
import { UserProfileContextType } from './userProfileContextProvider';

export const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);
