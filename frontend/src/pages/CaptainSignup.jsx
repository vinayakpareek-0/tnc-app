import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [CaptainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    setCaptainData(newData);
    setFirstName("");
    setLastName("");
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
          className="flex flex-col border-1 border-gray-100 px-4 justify-center h-full bg-white/80  rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-orange-700">
            Captain Signup
          </h3>
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            What's your name?
          </h4>
          <div className="flex gap-3">
            <input
              className="border  bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              className="border  bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm "
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
            />
          </div>
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            What's your Email?
          </h4>
          <input
            className="border w-full bg-gradient-to-br from-green-50 via-blue-50 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john.doe@example.com"
          />
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            Enter your password
          </h4>
          <input
            className="border bg-gradient-to-br from-green-50 via-blue-50  w-full shadow-sm rounded-md px-4 py-2 mb-4 focus:border-orange-500 "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
          <button
            type="submit"
            className="  bg-green-600 text-white px-4 py-2 mt-4 font-semibold text-lg rounded  transition-colors"
          >
            Signup
          </button>
          <Link
            to="/captain-login"
            className="w-full text-center mt-4 bg-transparent text-blue-900  font-semibold rounded-md transition-colors"
          >
            Have an account? Sign in
          </Link>
        </form>
        <div className="flex flex-col bg-transparent items-center mt-4 space-y-3"></div>
      </div>
      <div className="flex flex-col items-center mt-6 space-y-2">
        <p className="text-xs text-gray-500 text-center">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline hover:text-green-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-green-700">
            Privacy Policy
          </a>
          .
        </p>
        <p className="text-xs text-gray-500 text-center">
          © 2023 Uber. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
