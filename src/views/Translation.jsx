import React, { useState, useEffect, useReducer } from "react";
import backgroundimage from "../assets/image/bg1.jpg";
import {translateText} from 'src/helpers'
import {initialState,reducer,ACTION_TYPES} from 'src/reducer'

const TextSlider = () => {
  const [state, dispatch] = useReducer(reducer,initialState);
  const translate = () => {
    dispatch({ type: ACTION_TYPES.SET_PARENT_TEXT_TRANSLATION, payload: "", });
    translateText(state.parentText,(decodedChunk) => {
      dispatch({ type: ACTION_TYPES.APPEND_PARENT_TEXT_TRANSLATION, payload: decodedChunk});
    })
  };
  return (
    <div
      className="flex justify-center items-center h-screen w-screen z-50"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: "contain",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-gray-900 to-gray-700 opacity-90 z-1"></div>{" "}
      <div className="z-0">
        {" "}
        <h1 className="text-6xl font-black text-gray-50 italic text-center py-5 z-0">
          MAZUGPT <span className="text-yellow-500">1.0</span>
        </h1>
        <div className="grid grid-cols-3 z-50 gap-8 p-2 shadow-2xl rounded-2xl border-b-8 border-2 border-gray-700 bg-gray-800 ">
          <div className="bg-gray-800 p-4   border-2 border-gray-600 rounded-2xl  ">
            <textarea
              value={state.parentText}
              onChange={(e) => dispatch({type:ACTION_TYPES.SET_PARENT_TEXT,payload:e.target.value})}
              placeholder="Type or paste text here"
              rows="5"
              cols="30"
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            <textarea
              defaultValue={state.parentTextTranslation}
              placeholder="Translated text will appear here"
              rows="5"
              cols="30"
              className={`w-full p-2 mt-2 border border-gray-500 rounded`}
            />
            <br />

            <div className="mt-4">
              <button
                onClick={() => translate()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Translate
              </button>
              <button className="ml-2 px-4 py-2 bg-yellow300 text-gray-600 rounded cursor-not-allowed focus:outline-none">
                Previous
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl">
            <textarea
              placeholder="Type or paste text here"
              rows="5"
              cols="30"
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            <textarea
              placeholder="Translated text will appear here"
              rows="5"
              cols="30"
              className={`w-full p-2 mt-2 border border-gray-500 rounded`}
            />
            <br />

            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Translate
              </button>
              <button className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded focus:outline-none">
                Previous
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl">
            <textarea
              id="text5"
              placeholder="Copied text will appear here (can be copied)"
              rows="5"
              cols="30"
              className={`w-full p-2 border border-gray-500 rounded `}
            />
            <br />
            <div className="mt-4 gap-2 flex">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none">
                Copy Text
              </button>

              <button className="mt-2 px-4 py-2 bg-gray-300 text-gray-600 rounded  focus:outline-none">
                Previous
              </button>
            </div>
          </div>

          <button className="col-span-3 mt-8  w-36 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center mx-auto focus:outline-none">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
