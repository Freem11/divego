import { createContext, useState } from 'react';

export const AdminContext = createContext('');

const AdminContextProvider = ({ children }) => {
  const [adminStat, setAdminStat] = useState(false);

  return (
    <AdminContext.Provider value={{ adminStat, setAdminStat }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
