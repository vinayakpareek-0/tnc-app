import React, { useState } from "react";

export const UserDataContext = React.createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
