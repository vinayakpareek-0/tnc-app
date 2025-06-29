import React from "react";
import { Link } from "react-router-dom";

const Starting = () => {
  //https://i.ibb.co/DD6ZkPnG/uber-bg.jpg
  //https://i.ibb.co/YFgmsLSb/MKL.jpg
  return (
    <div>
      <div className="bg-cover bg-[url(https://i.ibb.co/DD6ZkPnG/uber-bg.jpg)] bg-[center_left_58%]   h-screen w-full pt-8 flex flex-col justify-between">
        <img
          className="w-28 ml-10 mt-4 drop-shadow-xl"
          src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png"
          alt=""
        />
        <div className="max-w-md mx-auto mb-2 py-6 px-6 h-[18vh] bg-white/90 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Get Started with <span className="text-black">Uber</span>
          </h2>
          <Link
            to="/home"
            className="flex justify-center items-center w-full bg-black px-6 text-xl text-white py-3 mt-3 mb-2 rounded-lg font-semibold shadow hover:scale-105 hover:bg-gray-900 transition-all"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Starting;
