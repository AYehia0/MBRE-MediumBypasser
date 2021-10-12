// guide: https://developer.chrome.com/docs/extensions/reference/tabs/#method-query

/*
EXAMPLE:
https://medium.com/volosoft/whats-new-in-rxjs-7-a11cc564c6c0 -> https://volosoft.medium.com/whats-new-in-rxjs-7-a11cc564c6c0
*/

document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTab = { data: tabs[0], url: tabs[0].url };

  const dialogBox = document.getElementById("dialog-box");

  if (testMediumRegex(currentTab.url)) {
    dialogBox.innerText = "You are being redirected.";

    const { writerName, restOfURL } = sliceMediumURL(currentTab.url);

    // chrome.tabs.update();

    console.log(`https://${writerName}.medium.com/${restOfURL}`);
    chrome.tabs.update(currentTab.data.id, {
      url: `https://${writerName}.medium.com/${restOfURL}`,
    });
  } else {
    dialogBox.innerText = "It isn't a medium article link!";
  }
});

function testMediumRegex(url) {
  const mediumRegex = /.*medium.com\/.+\/./;
  return mediumRegex.test(url);
}

function sliceMediumURL(url) {
  let urlWithoutHTTP = url.split("//")[1];
  urlComponents = urlWithoutHTTP.split("/");
  const writerName = urlComponents[1];
  const restOfURL = urlComponents.slice(2).join("/");
  return { writerName, restOfURL };
}
