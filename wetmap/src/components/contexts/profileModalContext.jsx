import { createContext, useState } from 'react';

export const ProfileModalContext = createContext('');

const ProfileModalContextProvider = ({children}) => {
    const [profileModal, setProfileModal] = useState(false);

    return (
        <ProfileModalContext.Provider value={{ profileModal, setProfileModal }}>
            {children}
        </ProfileModalContext.Provider>
    )
}

export default ProfileModalContextProvider;