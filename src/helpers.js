const production = false;
export const baseUrl = production ? "https://apigpt.mazutech.online" : "http://localhost:8086";
export const translateText = async ({toTranslateText, onStream , language = 'english',operation}) => {
  try {
    const response = await fetch(`${baseUrl}/api`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: toTranslateText,
        language: language,
        operation:operation
      }),
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
      onStream(decodedChunk);
    }
    return true;
  } catch (e) {
    throw Error(e);
  }
};
