import React, { useState, useEffect } from "react";
import backgroundimage from "../assets/image/bg1.jpg";

const TextSlider = () => {
  const [result, setResult] = useState("");
  const [toTranslateText,setToTranslateText] = useState("")
  const translate = () =>  {
      
    openai2()
  };
  const openai2 = async () => {
    setResult("")
    const response = await fetch("https://apigpt.mazutech.online/api", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text:toTranslateText,
        language:"german"
      })
    });
    if (!response.ok || !response.body) {
      throw response.statusText;
    }

    // Here we start prepping for the streaming response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const loopRunner = true;
    while (loopRunner) {
      console.log(loopRunner, "loopRunner");
      // Here we start reading the stream, until its done.
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      console.log(decodedChunk);
      setResult((answer) => answer + decodedChunk); // update state with new chunk
    }
  };
  const initialTextState = {
    text1: "",
    text2: "",
    text3: "",
    text4: "",
    text5: "",
  };

  const [textState, setTextState] = useState({ ...initialTextState });
  const [currentStep, setCurrentStep] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleTranslate1 = () => {
    setTextState((prevState) => ({
      ...prevState,
      text2: prevState.text1,
    }));
    // setCurrentStep(2);
  };

  const handleTranslate2 = () => {
    setTextState((prevState) => ({
      ...prevState,
      text4: prevState.text3,
      text5: prevState.text4,
    }));
    setCurrentStep(3);
    setShowNextButton(true);
  };

  const handleCopyText5 = () => {
    const textArea = document.getElementById("text5");
    textArea.select();
    document.execCommand("copy");
  };

  const handleContextMenu = (e) => {
    if (!currentStep || currentStep === 3) {
      e.preventDefault(); // Prevent right-click context menu
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));
    setShowNextButton(false);
  };

  const handleReset = () => {
    setTextState({ ...initialTextState });
    setCurrentStep(1);
    setShowNextButton(false);
  };

  useEffect(() => {
    // Update text5 when text4 changes
    setTextState((prevState) => ({
      ...prevState,
      text5: prevState.text4,
    }));
  }, [textState.text4]);

  return (
    <div
      class="flex justify-center items-center h-screen w-screen z-50"
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
              value={toTranslateText}
              onChange={(e) =>
                setToTranslateText(e.target.value)
              }
              placeholder="Type or paste text here"
              rows="5"
              cols="30"
              disabled={currentStep !== 1}
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            <textarea
              value={result}
              readOnly={currentStep !== 1}
              onContextMenu={handleContextMenu}
              placeholder="Translated text will appear here"
              rows="5"
              cols="30"
              disabled={true}
              className={`w-full p-2 mt-2 border border-gray-500 rounded ${
                currentStep !== 1 ? "bg-gray-600" : ""
              }`}
            />
            <br />
            {currentStep === 1 && (
              <div className="mt-4">
                <button
                  onClick={() => translate()} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                  Translate
                </button>
                <button
                  
                  disabled={currentStep === 1}
                  className="ml-2 px-4 py-2 bg-yellow300 text-gray-600 rounded cursor-not-allowed focus:outline-none"
                >
                  Previous
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl">
            <textarea
              value={textState.text3}
              onChange={(e) =>
                setTextState((prevState) => ({
                  ...prevState,
                  text3: e.target.value,
                }))
              }
              placeholder="Type or paste text here"
              rows="5"
              cols="30"
              disabled={currentStep !== 2}
              className="w-full p-2 border border-gray-500 rounded focus:outline-none "
            />
            <br />
            <textarea
              value={textState.text4}
              readOnly={currentStep !== 2}
              onContextMenu={handleContextMenu}
              placeholder="Translated text will appear here"
              rows="5"
              cols="30"
              disabled={currentStep !== 2}
              className={`w-full p-2 mt-2 border border-gray-500 rounded ${
                currentStep !== 2 ? "bg-gray-600" : ""
              }`}
            />
            <br />
            {currentStep === 2 && (
              <div className="mt-4">
                <button
                  onClick={handleTranslate2}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                >
                  Translate
                </button>

                {showNextButton && (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                  >
                    Next
                  </button>
                )}
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-600 rounded focus:outline-none"
                >
                  Previous
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-800 p-4 border-2 border-gray-600 rounded-2xl">
            <textarea
              id="text5"
              value={textState.text5}
              readOnly={false} // Allow editing for copying
              onContextMenu={handleContextMenu}
              placeholder="Copied text will appear here (can be copied)"
              rows="5"
              cols="30"
              disabled={currentStep !== 3}
              className={`w-full p-2 border border-gray-500 rounded ${
                currentStep !== 3 ? "bg-gray-600" : ""
              }`}
            />
            <br />
            {currentStep === 3 && (
              <div className="mt-4 gap-2 flex">
                <button
                  onClick={handleCopyText5}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                >
                  Copy Text
                </button>

                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="mt-2 px-4 py-2 bg-gray-300 text-gray-600 rounded  focus:outline-none"
                >
                  Previous
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="col-span-3 mt-8  w-36 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 flex justify-center mx-auto focus:outline-none"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextSlider;
