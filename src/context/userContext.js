import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogged, setisLogged] = useState(null);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setisLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
