import React, { useState, useEffect } from 'react';
import TextSlider from 'src/components/TextAnimation';
import backgroundimage from '../assets/image/bg1.jpg'


export const Header = () => {
  // if (loading) {
  //   // Splash screen content
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-900" style={{ backgroundImage: `url(${backgroundimage})`, backgroundSize: 'contain' }}>
  //        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-900 to-gray-700 opacity-90"></div> <h1 className="text-6xl font-black text-gray-50 italic z-0">MAZUGPT <span className='text-yellow-500'>1.0</span></h1>
  //     </div>
  //   );
  // }

  // Main content
  return (
    <div className="h-screen flex">
   <div className="relative flex w-1/2 bg-gradient-to-tr from-gray-800 to-gray-700 i justify-around items-center" style={{ backgroundImage: `url(${backgroundimage})`, backgroundSize: 'cover' }}>
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-900 to-gray-700 opacity-90"></div>
  <div className="relative z-10">
  <TextSlider 
    slides={[
      { title: 'MAZU GPT', description: ' One of The Best Translation AI  ' },
      { title: 'Developed By', description: 'Dialogmakers International Ltd' },
    ]}
    />
  </div>
</div>



    <div className="flex w-1/2 justify-center items-center bg-white">
      <form className="bg-white">
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
        <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back To <span className='uppercase font-bold'>MAZU GPT</span> </p>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Email / UserName / Pin"
          />
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Password"
          />
        </div>
      <a href="/translation"> <button
          type="submit"
          className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Login
        </button></a> 
        <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
          Forgot Password ?
        </span>
      </form>
    </div>
  </div>
  
  );
};

export default Header;
