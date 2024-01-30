const production = false;
export const baseUrl = production ? "https://apigpt.mazutech.online/api" : "http://localhost:8086/api";
export const translateText = async (toTranslateText,callback) => {
  
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text:toTranslateText,
      language:"english"
    })
  });
  if (!response.ok || !response.body) {
    throw response.statusText;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const loopRunner = true;
  while (loopRunner) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value, { stream: true });
    callback(decodedChunk)
  }
  return true
};
