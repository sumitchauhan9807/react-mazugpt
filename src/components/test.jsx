import axios from "axios";
import { useEffect, useState } from "react";
function Test() {
  const [result, setResult] = useState("");
  const openAI = async () => {
    try {
      let stream = await axios({
        method: "get",
        url: "http://localhost:8086/api",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      // Here we start prepping for the streaming response
      const reader = stream.data.getReader();
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
    } catch (e) {
      console.log(e);
    }
  };

  const openai2 = async () => {
    const response = await fetch("http://localhost:8086/api", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
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
  return (
    <>
      {result}
      <br />
      <button onClick={() => {openai2(); openAI() }}>click</button>
    </>
  );
}

export default Test;
