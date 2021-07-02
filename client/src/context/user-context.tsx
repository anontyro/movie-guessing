import React, { useState } from 'react';
const defaultUser: any = {
  apiToken: '',
};

const UserContext = React.createContext(defaultUser);

interface Props {
  children: React.ReactNode;
}

export interface User {
  apiToken: string;
}

export const UserProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser]: [
    currentUser: User,
    setCurrentUser: (user: User) => void,
  ] = useState({ ...defaultUser });

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): [
  currentUser: User,
  setCurrentUser: (user: User) => void,
] => React.useContext(UserContext);
