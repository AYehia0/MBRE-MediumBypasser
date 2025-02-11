chrome.tabs.onUpdated.addListener(async (tabid, changeinfo, tab) => {
  const currentTab = await getCurrentTab()

  // extracting the url
  const currentUrl = currentTab.url

  // on complete
  if (tab.url !== undefined && changeinfo.status == "complete") {
    // check if it's a medium url
    if (isMediumUrl(currentUrl)) {
      // check if url not in localStorage
      chrome.storage.local.get([currentUrl], (result) => {
        // console.log(`Current Url : ${currentUrl} is a valid medium url !!!`)

        // console.log(result)

        // doesn't exist
        if (!result[currentUrl]) {
          const newUrl = convertToValidUrl(currentUrl)

          if (newUrl) {
            // save it to localStorage
            chrome.storage.local.set({ [currentUrl]: "true" }, () => {
              // redirect to it
              chrome.tabs.update({ active: true, url: newUrl })
            })
          }
        }
      })
    }
  }
})

// is it a medium url
const isMediumUrl = (url) => {
  if (url.startsWith("https://medium.com/")) return true

  return false
}

// converts a url to a new working one
// https://medium.com/volosoft/whats-new-in-rxjs-7-a11cc564c6c0 -> https://volosoft.medium.com/whats-new-in-rxjs-7-a11cc564c6c0
const convertToValidUrl = (url) => {
  try {
    const splittedUrl = url.split("/")
    const authorDomain = splittedUrl[3]
    const restOfUrl = splittedUrl[splittedUrl.length - 1]

    return `https://${authorDomain}.medium.com/${restOfUrl}`
  } catch (e) {
    console.log(e)
    return null
  }
}

// getting the current opended tab
const getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

