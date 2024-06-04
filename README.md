# Curiosity-Chrome-Extension

Curiosity is a Chrome Extension that intelligently summarizes a Youtube Video and suggests new topics based on the contents of the video which would be helpful for the user to learn more.


## Installation

To install this extension, follow these steps:


  1) `git clone <THIS_REPOSITORY>`

  2) `cd Curiosity-Chrome-Extension`

  3) In `contentScript.js` find the placeholder for your `OPENAI_API_KEY` . Add your API key here.

  4) In the `generate()` function inside `contentScript.js` , find the appropriate placeholder for your prompt.

  5) In case of Google Chrome, open the Extensions page (chrome://extensions/).

  6) Turn on Developer mode by clicking the toggle switch in the top right corner of the page.

  7) Click the Load unpacked button and select this directory.

  BOOM , YOU ARE READY TO GO !

 

    
## Detailed Description
1) This extension uses the [Openai API](https://openai.com/index/openai-api/) and the [Youtube data API](https://developers.google.com/youtube/v3)

2) It begins by extracting the transcript of the Youtube Video.

3) This is utilised to extract useful information from the video and on the basis of it , new topics are suggested.

4) Youtube video recommendations can be made using the search endpoint of the Youtube data API.
