// Confirm script is injected


//initial interval value
let intervalId;

//function to grab elements to click refresh button

function clickRefreshButtonProcess() {
  if (intervalId) {
    const refreshButton = null
    // Grab frame containing refresh button
    const iframeEl = document.querySelector("#brandBand_2 > div > div > div > div > div.dashboardContainer > iframe");
    
    if (iframeEl) {
      
      refreshButton = iframeEl.contentDocument.querySelector("button.slds-button.refresh");

    }
    
    if (refreshButton) {

      // checks if button is enabled
      if (!refreshButton.disabled) refreshButton.click();

      // if button is disabled then there will be a force refresh of entire page
      if (refreshButton.disabled) iframeEl.contentWindow.location.reload();
    }
  }
  
  if (!intervalId) {

  }
}

//clears interval id restarting interval for new value
function clearRefreshInterval() {


  clearInterval(intervalId);
  
  //clear interval Id from varriable
  
  intervalId = null;


}

//sets interval id and also sets the interval
function setRefreshInterval() {
  
  intervalId = setInterval(clickRefreshButtonProcess, refreshInterval);

}

//grabs value varriable from storage and sets it to refresh interval and calls refresh interval function
function getTimerSelectValue() {
  
  chrome.storage.local.get(["refreshTimerSelectValue"], function (result) {


    const refreshInterval = parseInt(result.refreshTimerSelectValue) * 1000;

    console.log(refreshInterval);

    setRefreshInterval();
  });
}

function pluginProcess() {
  //checks storage to see if refresh is enabled
  chrome.storage.local.get(["isRefreshEnabled"], function (result) {
    
    console.log(`sentinal is set to ${result.isRefreshEnabled}`);

    const toggleRefresh = result.isRefreshEnabled;

    console.log(toggleRefresh);
    //if refresh is enabled the proccess continues
    if (toggleRefresh) {


      clearRefreshInterval();

      getTimerSelectValue();
    }
    if (!toggleRefresh) {


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
