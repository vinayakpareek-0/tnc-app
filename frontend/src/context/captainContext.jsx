import React, { createContext, useContext, useState } from "react";

// Create the context
export const CaptainDataContext = createContext();

// Cus tom hook for easy access
export const useCaptain = () => useContext(CaptainContext);

// Provider component
export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isloading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (newCaptain) => {
    setCaptain(newCaptain);
  };

  const value = {
    captain,
    setCaptain: updateCaptain,
    isloading,
    setisLoading,
    error,
    setError,
  };

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain: updateCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

// Export the context for use in other components
export default CaptainContext;
