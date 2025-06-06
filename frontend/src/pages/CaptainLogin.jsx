import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CaptainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      email: email,
      password: password,
    };
    setCaptainData(newData);
    console.log("Captain Data:", newData); // This will log the correct data
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-br from-green-100 via-blue-50 to-green-200 p-7">
      <div>
        <img
          className="w-20 mb-6 drop-shadow-lg"
          src="https://cdn1.iconfinder.com/data/icons/transportation-85/65/uber-512.png"
          alt=""
        />
        <form
          onSubmit={submitHandler}
          className="flex flex-col border-1 border-gray-100 px-4 justify-center h-full bg-white/80 mt-1 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-green-700">
            Captain Login
          </h3>
          <h4 className="text-lg font-medium mb-2 text-green-800">
            What's your email?
          </h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full bg-green-50 shadow text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
            type="email"
            required
            placeholder="captain@example.com"
          />
          <h4 className="text-lg font-medium mb-2 text-green-800">
            Enter your password
          </h4>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border bg-green-50 w-full shadow rounded-md px-4 py-2 mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            type="password"
            required
            placeholder="********"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 mt-4 font-semibold text-lg rounded hover:bg-green-700 transition-colors"
          >
            Login
          </button>

          <Link
            to="/captain-signup"
            className="w-full text-center mt-4 bg-transparent text-blue-900 font-semibold rounded-md transition-colors "
          >
            Register as a Captain
          </Link>
        </form>
        <div className="flex flex-col bg-transparent items-center mt-4 space-y-3"></div>
      </div>

      <div>
        <div className="flex flex-col items-center mt-6 space-y-3">
          <Link
            to="/login"
            className="w-full max-w-xs text-center  bg-[#da5f26]  font-semibold text-white py-2 rounded-md shadow hover:bg-[#07b15e] transition-colors"
          >
            Sign in as User
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

export default CaptainLogin;
