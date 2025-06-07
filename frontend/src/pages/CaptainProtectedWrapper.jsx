import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext.jsx";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASED_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data);
          setIsLoading(false);
        } else {
          console.log(
            "Failed to fetch captain profile:",
            response.data.message
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token"); // Clear token on error
        navigate("/captain-login");
      });
  }, [token, navigate, setCaptain]);

  if (!token) return null; // Don't render children if not authenticated

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
