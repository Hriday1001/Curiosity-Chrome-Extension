(() => {

    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "ENTER YOUR KEY HERE";
  
    const resultText = document.getElementById("resultText");
    let request = "";
    let resp = "";

    async function getSubs(langCode = "en") {
        let ct = JSON.parse(
            (await (await fetch(window.location.href)).text())
              .split("ytInitialPlayerResponse = ")[1]
              .split(";var")[0]
          ).captions.playerCaptionsTracklistRenderer.captionTracks,
          findCaptionUrl = (x) => ct.find((y) => y.vssId.indexOf(x) === 0)?.baseUrl,
          firstChoice = findCaptionUrl("." + langCode),
          url = firstChoice
            ? firstChoice + "&fmt=json3"
            : (findCaptionUrl(".") ||
                findCaptionUrl("a." + langCode) ||
                ct[0].baseUrl) +
              "&fmt=json3&tlang=" +
              langCode;
        return (await (await fetch(url)).json()).events.map((x) => ({
          ...x,
          text: x.segs
            ?.map((x) => x.utf8)
            ?.join(" ")
            ?.replace(/\n/g, " "),
        }));
      }
    
      async function logSubs(langCode) {
        const subs = await getSubs(langCode);
        const text = subs.map((x) => x.text).join("\n");
        console.log(text);
        return text;
      }

      const generate = async () => {

        try {
          // Fetch the response from the OpenAI API with the signal from AbortController
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: `ENTER YOUR PROMPT FOR THE TEXT HERE \n ${request}` }],
            }),
          });
      
          const data = await response.json();
          console.log(data.choices[0].message.content);
          // resultText.innerHTML = data.choices[0].message.content;
          return data.choices[0].message.content;
        } catch (error) {
          console.error("Error:", error);
          console.log("Error occurred while generating.");
        }
      };

    

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            let info = logSubs("en");
            info.then((x) => request = x);
            let respPromise = generate();
            respPromise.then((x) => resp = x);
        }
    });

    function handleResponse(message){
        console.log(`Message from the background script: ${message.response}`);
    }

    function handleError(error) {
        console.log(`Error: ${error}`);
    }

    function contactWithBackground(e){
        const sendMessage = chrome.runtime.sendMessage({
            links : `${resp}`
        })
        sendMessage.then(handleResponse,handleError);
    }

    window.addEventListener("dblclick" , contactWithBackground);


    let info = logSubs("en");
    info.then((x) => request = x);
    generate();

})();


console.log("CONTENT INVOKED");