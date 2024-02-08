import { createContext, useState } from 'react';

export const UserProfileContext = createContext('');

const UserProfileContextProvider = ({children}) => {
    const [profile, setProfile] = useState([]);

    return (
        <UserProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserProfileContext.Provider>
    )
}

export default UserProfileContextProvider;