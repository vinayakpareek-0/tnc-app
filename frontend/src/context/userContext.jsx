import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export const UserDataContext = React.createContext();

const userContext = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    fullname: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      <UserDataContext.Provider value={userData}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default userContext;
