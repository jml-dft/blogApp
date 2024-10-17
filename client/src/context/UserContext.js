import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Define the unsetUser function
  const unsetUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
