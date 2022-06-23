// Confirm script is injected
console.log("fired content js");

//initial interval value
let intervalId;

//function to grab elements to click refresh button

function clickRefreshButtonProcess() {
  if (intervalId) {
    // Grab frame containing refresh button
    iframeEl = document.querySelector(
      "#brandBand_2 > div > div > div > div > div.dashboardContainer > iframe"
    );
    if (iframeEl) {
      refreshButton = iframeEl.contentDocument.querySelector(
        "button.slds-button.refresh"
      );
      console.log("found Button");
    }
    if (refreshButton) {
      console.log(refreshButton);
      // checks if button is enabled
      if (!refreshButton.disabled) refreshButton.click();

      // if button is disabled then there will be a force refresh of entire page
      if (refreshButton.disabled) iframeEl.contentWindow.location.reload();
    }
  }
  if (!intervalId) {
    console.log("There is no interval set");
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

//sets interval id and also sets the interval
function setRefreshInterval() {
  intervalId = setInterval(clickRefreshButtonProcess, refreshInterval);

  console.log(`New intervalId is ${intervalId}`);
}

//grabs value varriable from storage and sets it to refresh interval and calls refresh interval function
function getTimerSelectValue() {
  chrome.storage.local.get(["refreshTimerSelectValue"], function (result) {
    console.log(
      `Value currently is ${parseInt(result.refreshTimerSelectValue) * 100}`
    );

    refreshInterval = parseInt(result.refreshTimerSelectValue) * 100;

    console.log(refreshInterval);

    setRefreshInterval();
  });
}

function pluginProcess() {
  //checks storage to see if refresh is enabled
  chrome.storage.local.get(["isRefreshEnabled"], function (result) {
    console.log(`sentinal is set to ${result.isRefreshEnabled}`);

    let toggleRefresh = result.isRefreshEnabled;

    console.log(toggleRefresh);
    //if refresh is enabled the proccess continues
    if (toggleRefresh) {
      console.log("Refresh is enabled");

      clearRefreshInterval();

      getTimerSelectValue();
    }
    if (!toggleRefresh) {
      console.log("Refresh is not enabled");

      clearRefreshInterval();
    }
  });
}

//init plugin process
pluginProcess();

// on change to storage starts plugin process again
chrome.storage.onChanged.addListener(function () {
  pluginProcess();
});
