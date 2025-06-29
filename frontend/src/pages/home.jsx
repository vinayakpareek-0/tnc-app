import React, { useState } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { useNavigate } from "react-router-dom";
import ConfirmedRide from "../components/ConfirmedRide";

const Home = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [locationType, setLocationType] = useState("");
  const [location, setLocation] = useState("");
  const [showVehicles, setShowVehicles] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    setLocation(location);
    if (locationType === "pickup") {
      setPickup(location);
      if (drop) {
        setTimeout(() => {
          setSuggestions(false);
          setShowSuggestions(false);
        }, 200);
      }
    } else if (locationType === "drop") {
      setDrop(location);
      if (pickup) {
        setTimeout(() => {
          setSuggestions(false);
          setShowSuggestions(false);
        }, 200);
      }
    }
  };

  const handleShowVehicles = () => {
    setShowVehicles(true);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    setSuggestions(true);
  };

  const handleMapClick = () => {
    setShowVehicles(false);
    setShowSuggestions(false);
    setSuggestions(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleVehicleSelect = () => {
    setConfirmed(true);
    setShowVehicles(false);
    setShowSuggestions(false);
    setSuggestions(false);
  };

  return (
    <div className="h-screen relative">
      <img
        className="w-28 mb-8 absolute left-6 top-7"
        src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
        alt="Uber Logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      <div className="h-screen w-full" onClick={handleMapClick}>
        <img
          className="h-full w-full object-cover"
          src="https://i.ibb.co/QW9p4sT/map-w-icons.png"
          alt="Map background"
        />
      </div>

      <div className="h-screen flex flex-col justify-end rounded absolute bottom-0 w-full">
        <div className="h-[30%] bg-white p-5">
          <h4 className="text-4xl text-lime-950 text-pretty mb-2 mt-1 font-semibold">
            Find a Trip
          </h4>

          <div className="flex flex-col mx-2 items-center justify-center min-w-20">
            <form onSubmit={submitHandler}>
              <input
                className="bg-[#eee] w-[95%] px-4 text-base py-4 mb-2 mt-4 rounded-md focus:ring focus:ring-lime-500"
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Add Pickup location"
                onFocus={() => {
                  handleFocus();
                  setLocationType("pickup");
                }}
              />

              <input
                className="bg-[#eee] w-[95%] px-4 text-base py-4 mt-2 rounded-md focus:ring focus:ring-lime-500"
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Add Drop location"
                onFocus={() => {
                  handleFocus();
                  setLocationType("drop");
                }}
              />
            </form>

            {pickup && drop && (
              <button
                onClick={handleShowVehicles}
                className="w-[50%] px-2 text-base py-3 mt-4 mb-2 rounded-md bg-black text-white 
                         hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.02] 
                         active:scale-95 font-semibold"
              >
                Choose Vehicle
              </button>
            )}
          </div>
        </div>

        <div
          className={`transition-all duration-300 px-5 bg-white w-full overflow-y-auto overflow-hidden 
                     ${
                       showSuggestions ? "h-[65%] opacity-100" : "h-0 opacity-0"
                     }`}
        >
          <div>
            <div className="flex items-center justify-between bg-gray-50 px-3 rounded-t border-b border-dashed border-gray-300">
              <h1 className="text-xl font-medium text-lime-950">Suggestions</h1>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-zinc-800 hover:text-gray-900 mb-2 text-2xl font-bold transition-colors"
                aria-label="Collapse suggestions"
              >
                &#x25BC;
              </button>
            </div>

            <div
              className={`transition-all duration-300 p-5 bg-white w-full overflow-y-auto overflow-hidden 
                         ${suggestions ? "opacity-100" : "opacity-0"}`}
            >
              {suggestions && (
                <LocationSearchPanel onLocationSelect={handleLocationSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {showVehicles && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 z-0"
          onClick={() => setShowVehicles(false)}
        />
      )}

      <div
        className={`fixed z-10 bottom-0 w-full bg-white right-0 transition-all duration-500 
                   ease-in-out transform ${
                     showVehicles
                       ? "translate-y-0 opacity-100"
                       : "translate-y-full opacity-0"
                   }`}
      >
        <div className="bg-white mx-2 flex flex-col items-start relative">
          <button
            onClick={() => setShowVehicles(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close vehicle selection"
          >
            ×
          </button>

          <h3 className="text-3xl font-sans font-extrabold mb-4 px-3 text-center mt-10 w-full">
            Choose a Vehicle
          </h3>

          {/* Uber GO */}
          <div
            onClick={handleVehicleSelect}
            className="cursor-pointer flex gap-6 h-28 border-2 border-gray rounded-lg hover:border-black transition-all bg-slate-50 justify-between items-center px-4 w-full mx-2 mb-4"
          >
            <img
              className="w-28"
              src="https://cdn-icons-png.flaticon.com/128/2736/2736906.png"
              alt="Uber GO Car"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">Uber GO</h4>
                <img
                  className="w-5"
                  src="https://cdn-icons-png.flaticon.com/128/13400/13400323.png"
                  alt="Seats Icon"
                />
                <h4 className="text-lg font-semibold">4</h4>
              </div>
              <div className="flex mt-1 items-center gap-2">
                <img
                  className="w-4"
                  src="https://cdn-icons-png.flaticon.com/128/833/833643.png"
                  alt="Time Icon"
                />
                <h5 className="text-sm font-semibold">2 min away</h5>
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                Affordable & Compact
              </p>
            </div>
            <h2 className="text-2xl font-bold font-serif">₹193.20</h2>
          </div>

          {/* Bike */}
          <div
            onClick={handleVehicleSelect}
            className="cursor-pointer flex gap-6 h-28 rounded-lg border-2 border-gray hover:border-black transition-all bg-slate-50 justify-between items-center px-4 w-full mx-2 mb-4"
          >
            <img
              className="w-24 pl-2"
              src="https://cdn-icons-png.flaticon.com/128/6750/6750554.png"
              alt="Uber Bike"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">Moto</h4>
                <img
                  className="w-5"
                  src="https://cdn-icons-png.flaticon.com/128/13400/13400323.png"
                  alt="Seats Icon"
                />
                <h4 className="text-lg font-semibold">1</h4>
              </div>
              <div className="flex mt-1 items-center gap-2">
                <img
                  className="w-4"
                  src="https://cdn-icons-png.flaticon.com/128/833/833643.png"
                  alt="Time Icon"
                />
                <h5 className="text-sm font-semibold">3 min away</h5>
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                Fast & Convenient
              </p>
            </div>
            <h2 className="text-2xl font-bold font-serif">₹75.50</h2>
          </div>

          {/* Auto */}
          <div
            onClick={handleVehicleSelect}
            className="cursor-pointer flex gap-6 h-28 rounded-lg border-2 border-gray hover:border-black transition-all bg-slate-50 justify-between items-center px-4 w-full mx-2 mb-4"
          >
            <img
              className="w-28 px-3"
              src="https://cdn-icons-png.flaticon.com/128/5316/5316727.png"
              alt="Uber Auto"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-semibold">Auto</h4>
                <img
                  className="w-5"
                  src="https://cdn-icons-png.flaticon.com/128/13400/13400323.png"
                  alt="Seats Icon"
                />
                <h4 className="text-lg font-semibold">3</h4>
              </div>
              <div className="flex mt-1 items-center gap-2">
                <img
                  className="w-4"
                  src="https://cdn-icons-png.flaticon.com/128/833/833643.png"
                  alt="Time Icon"
                />
                <h5 className="text-sm font-semibold">5 min away</h5>
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                Affordable & Spacious
              </p>
            </div>
            <h2 className="text-2xl font-bold font-serif">₹120.00</h2>
          </div>
        </div>
      </div>

      {confirmed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 z-0"
          onClick={() => setConfirmed(false)}
        />
      )}

      <div
        className={`fixed z-10 bottom-0 w-full bg-white right-0 transition-all duration-500 
                   ease-in-out transform ${
                     confirmed
                       ? "translate-y-0 opacity-100"
                       : "translate-y-full opacity-0"
                   }`}
      >
        <div className="bg-white mx-2 flex flex-col items-start relative">
          <button
            onClick={() => setConfirmed(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close vehicle selection"
          >
            ×
          </button>

          <ConfirmedRide />
        </div>
      </div>
    </div>
  );
};

export default Home;
