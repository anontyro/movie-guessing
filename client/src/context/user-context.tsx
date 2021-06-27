import React, { useState } from 'react';
const defaultUser: any = {
  apiToken: '',
};

const UserContext = React.createContext(defaultUser);

interface Props {
  children: React.ReactNode;
}

interface User {
  apiToken?: string;
}

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState({ ...defaultUser });

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
