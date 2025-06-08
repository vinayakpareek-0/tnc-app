import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: { firstName, lastName },
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASED_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error (show message, etc.)
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-200 p-7">
      <div>
        <img
          className="w-24 mb-8 drop-shadow-lg"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt=""
        />
        <form
          onSubmit={submitHandler}
          className="flex flex-col border-1 border-gray-100 px-4 justify-center h-full bg-white/80 mt-4 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-orange-700">
            User Signup
          </h3>
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            What's your name?
          </h4>
          <div className="flex gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border w-full bg-orange-50 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              type="text"
              required
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border w-full bg-orange-50 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              type="text"
              required
              placeholder="Last Name"
            />
          </div>
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            What's your Email?
          </h4>
          <input
            className="border w-full bg-orange-50 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            type="email"
            required
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            Enter your password
          </h4>
          <input
            className="border bg-orange-50 w-full shadow-sm rounded-md px-4 py-2 mb-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            type="password"
            required
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#f4c165] text-white px-4 py-2 mt-4 font-semibold text-lg rounded  transition-colors"
          >
            Create Account
          </button>
          <Link
            to="/login"
            className="w-full text-center mt-4 bg-transparent text-blue-900  font-semibold rounded-md transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </form>
        <div className="flex flex-col bg-transparent items-center mt-4 space-y-3"></div>
      </div>

      <div className="flex flex-col items-center mt-4 space-y-2">
        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-green-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-green-700">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-xs text-gray-500 text-center">
          © 2023
          <Link to="/" className="hover:text-green-700">
            {" "}
            Uber
          </Link>
          . All rights reserved
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
