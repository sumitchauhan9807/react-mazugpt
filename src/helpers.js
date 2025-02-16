const production = true;
export const baseUrl = production ? "https://apigpt.dialogmakers-international.com" : "http://localhost:8086";

const getAuthToken = () => {
  let userData = localStorage.getItem('persist:root')
  if(userData) {
      userData = JSON.parse(userData)
      let user = JSON.parse(userData.user)
      return `Bearer ${user.token}`
  }else{
    alert('Error')
  }
}
export const translateText = async ({toTranslateText, onStream , language = 'english',operation}) => {
  try {
    if(language == 'english'){
      language = 'US american english'
    }
    const response = await fetch(`${baseUrl}/api`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Authorization":getAuthToken()
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
