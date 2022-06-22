console.log("fired content js");

//initial interval value
let intervalId;

//function to grab elements to click refresh button

function forceRefresh() {
  if (intervalId) {
    iframe = document.querySelector(
      "#brandBand_2 > div > div > div > div > div.dashboardContainer > iframe"
    );
    if (iframe) {
      refreshButton = iframe.contentDocument.querySelector(
        "button.slds-button.refresh"
      );
      console.log("found Button");
    }
    if (refreshButton) {
      console.log(refreshButton);
      if (!refreshButton.disabled) refreshButton.click();
      if (refreshButton.disabled) iframe.contentWindow.location.reload();
    }
  }
}

//clears interval id restarting interval for new value
function clearRefreshInterval() {
  console.log(`Old IntervalId was ${intervalId}`);
  clearInterval(intervalId);
  //clear interval Id from varriable
  intervalId = null;
  console.log(intervalId);
}

//sets interval id and function called
function setRefreshInterval() {
  // if (intervalId === null) {
  intervalId = setInterval(forceRefresh, refreshInterval);
  console.log(`New intervalId is ${intervalId}`);
  // }
}

//grabs value varriable from storage and sets it to refresh interval
function getStorage() {
  chrome.storage.local.get(["value"], function (result) {
    console.log(`Value currently is ${result.value}`);
    console.log(result.value);
    refreshInterval = result.value;
    setRefreshInterval();
    // refreshInterval = result.value;
    // console.log(refreshInterval);
  });
}

chrome.storage.onChanged.addListener(function () {
  chrome.storage.local.get(["sentinalPause"], function (result) {
    console.log(`sentinal is set to ${result.sentinalPause}`);
    let togglePause = result.sentinalPause;
    console.log(togglePause);
    if (!togglePause) {
      console.log(togglePause);
      getStorage();

      // on change to storage aka refresh interval time the new value will be grabbed
      //and then the old interval id will be cleared along with setting the new one
      // chrome.storage.onChanged.addListener(function () {
      clearRefreshInterval();
      getStorage();
      // });
    } else {
      clearRefreshInterval();
    }
  });
});
