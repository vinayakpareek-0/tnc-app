import React from "react";
import { useState } from "react";
const LocationSearchPanel = ({ onLocationSelect }) => {
  const locations = [
    "D-98 Kinderstate, Florida",
    "K-45 North Street, Riverside",
    "A-12 Maple Avenue, Springfield",
    "B-34 Ocean Drive, Miami",
    "C-56 Sunset Boulevard, Los Angeles",
    "E-78 Elm Street, Chicago",
    "F-90 Pine Road, Seattle",
    "G-23 Broadway, New York",
    "H-67 Hilltop Lane, Denver",
    "I-89 Riverbank Way, Austin",
    "J-45 Beacon Street, Boston",
  ];

  return (
    <div>
      {locations.map((location) => (
        <Locations
          key={location}
          children={location}
          onClick={() => onLocationSelect(location)}
        />
      ))}
    </div>
  );
};

const Locations = ({ children, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div>
      <div className="my-4 flex border-2 rounded-xl active:border-black items-center gap-4 justify-between p-2 cursor-pointer">
        <div className="flex items-center gap-4">
          <div>
            <img
              className="w-8"
              src="https://cdn-icons-png.flaticon.com/128/15627/15627835.png"
              alt="Location Icon"
            />
          </div>
          <h4 className="bg-white font-medium text-xl">{children}</h4>
        </div>
        <button
          className="bg-black text-white px-3 py-1 text-sm rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleClick}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default LocationSearchPanel;
