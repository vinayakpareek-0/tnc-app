import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const newUserData = {
      email: email,
      password: password,
    };
    setUserData(newUserData);
    setEmail("");
    setPassword("");
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
            User Login
          </h3>
          <h4 className="text-lg font-medium mb-2 text-orange-800">
            What's your email?
          </h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full bg-orange-50 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            type="email"
            required
            placeholder="john.doe@example.com"
          />
          <h4 className="text-lg font-medium mb-2 text-orange-800">
            Enter your password
          </h4>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border bg-orange-50 w-full shadow-sm rounded-md px-4 py-2 mb-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            type="password"
            required
            placeholder="********"
          />
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 mt-4 font-semibold text-lg rounded hover:bg-orange-700 transition-colors"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="w-full text-center mt-4 bg-transparent text-blue-900  font-semibold rounded-md transition-colors"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
        <div className="flex flex-col bg-transparent items-center mt-4 space-y-3"></div>
      </div>
      <div>
        <div className="flex flex-col items-center mt-6 space-y-3">
          <Link
            to="/captain-login"
            className="w-full max-w-xs text-center  bg-[#08c66b]  text-white font-semibold py-2 rounded-md shadow hover:bg-[#da5f26]/80  transition-colors"
          >
            Sign in as Captain
          </Link>
        </div>
        <div className="flex flex-col items-center   mt-6 space-y-2">
          <p className="text-sm text-gray-500 text-center">
            © 2023 Uber. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
