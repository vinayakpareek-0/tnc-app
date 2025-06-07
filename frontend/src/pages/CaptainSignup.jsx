import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
      //  location: {
      //     lat: 12.3716,
      //     lng: 77.5346,
      //   },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASED_URL}/captains/register`,
        CaptainData
      );
      if (response.status === 201) {
        setCaptain(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity("");
        setVehicleType("");
      } else {
        console.log("Signup failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Signup failed:",
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-br from-green-100 via-blue-50 to-green-200 p-3">
      <div>
        <img
          className="w-20 mb-4 drop-shadow-lg"
          src="https://cdn1.iconfinder.com/data/icons/transportation-85/65/uber-512.png"
          alt=""
        />
        <form
          onSubmit={submitHandler}
          className="flex flex-col border-1 border-gray-100 px-4 justify-center h-full bg-white/80 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4 text-orange-700">
            Captain Signup
          </h3>
          <h4 className="text-lg font-medium mb-2 text-gray-800">
            What's your name?
          </h4>
          <div className="flex gap-3">
            <input
              className="border bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              className="border bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm text-lg font-semibold rounded-md px-4 py-2 mb-4 placeholder:text-sm"
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
            className="border bg-gradient-to-br from-green-50 via-blue-50 w-full shadow-sm rounded-md px-4 py-2 mb-4 focus:border-orange-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />

          {/* Vehicle Details Section */}
          <h4 className="text-lg font-semibold mb-2 text-green-800 mt-2">
            Vehicle Details
          </h4>
          <div className="flex gap-3 mb-3">
            <input
              className="border bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm rounded-md px-4 py-2 placeholder:text-sm"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              placeholder="Color"
            />
            <input
              className="border bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm rounded-md px-4 py-2 placeholder:text-sm"
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              placeholder="Plate Number"
            />
          </div>
          <div className="flex gap-3 mb-4">
            <input
              className="border bg-gradient-to-br from-green-50 via-blue-50 w-1/2 shadow-sm rounded-md px-4 py-2 placeholder:text-sm"
              type="number"
              min="1"
              max="7"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              placeholder="Capacity (1-7)"
            />
            <select
              className="border bg-white w-1/2 shadow-sm rounded-md px-4 py-2 text-gray-700 
    transition-all duration-200 focus:scale-120 focus:shadow-xl focus:border-gray-500 outline-none"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="car">car</option>
              <option value="bike">bike</option>
              <option value="auto">auto</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 mt-4 font-semibold text-lg rounded transition-colors"
          >
            Create Captain Account
          </button>
          <Link
            to="/captain-login"
            className="w-full text-center mt-4 bg-transparent text-blue-900 font-semibold rounded-md transition-colors"
          >
            Have an account? Sign in
          </Link>
        </form>
        <div className="flex flex-col bg-transparent items-center  space-y-3"></div>
      </div>
      <div className="flex flex-col items-center mt-4 space-y-2">
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
          © 2023
          <a href="/" className=" hover:text-green-700">
            {" "}
            Uber
          </a>
          . All rights reserved
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
