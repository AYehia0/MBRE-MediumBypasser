document.addEventListener("DOMContentLoaded", () => {
  // const dialogBox = document.getElementById("dialog-box");
  const query = { active: true, currentWindow: true };

  //https://developer.chrome.com/docs/extensions/reference/tabs/#method-query

  console.log("wow");

  chrome.tabs.query(query, (tabs) => {
    const tab = tabs[0];
    const tabURL = tabs[0].url;
    console.log(tabs[0]);
    // dialogBox.innerHTML = getBarkedTitle(tabs[0].title);
    const mediumRegex = /.*medium.com\/.+\/./;
    if (mediumRegex.test(tabURL)) {
      //https://medium.com/volosoft/whats-new-in-rxjs-7-a11cc564c6c0
      let tabURLArray = tabURL.split("//");
      // tabURLArray.shift();
      tabURLArray = tabURLArray[1].split("/");
      const writerName = tabURLArray[1];
      const restOfURL = tabURLArray.slice(2).join("/");

      console.log(`https://${writerName}.medium.com/${restOfURL}`);
      chrome.tabs.update(tab.id, {
        url: `https://${writerName}.medium.com/${restOfURL}`,
      });
    } else {
      console.log("not medium");
    }
  });
});

const getBarkedTitle = (tabTitle) => {
  const barkTitle = `${getRandomBark()} Ahem.. I mean, we are at: ${tabTitle}`;
  return barkTitle;
};

const barks = [
  "Barf barf!",
  "Birf birf!",
  "Woof woof!",
  "Arf arf!",
  "Yip yip!",
  "Biiiirf!",
];

const getRandomBark = () => {
  const bark = barks[Math.floor(Math.random() * barks.length)];
  return bark;
};
