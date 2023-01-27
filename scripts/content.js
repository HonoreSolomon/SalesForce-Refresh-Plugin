let intervalId = null;
const refreshButtonSelector = ".dashboardHeader .actionRibbon .actions .slds-button.refresh";
const iframeSelector = ".dashboardContainer [title=dashboard]";

/**
 * Finds the refresh button element in the page
 * @returns {HTMLElement|null} - the refresh button element, or null if not found
 */
const getRefreshButton = () => {
    const iframeEl = document.querySelector(iframeSelector);
    return iframeEl ? iframeEl.contentDocument.querySelector(refreshButtonSelector) : null;
}

/**
 * Clicks the refresh button if it's enabled, otherwise reloads the page
 */
const clickRefreshButton = () => {
    const refreshButton = getRefreshButton();
    if(!refreshButton) return console.log("Refresh button not found");
    if(refreshButton.disabled) {
        iframeEl.contentWindow.location.reload();
    } else {
        refreshButton.click();
    }
}

/**
 * Clears the refresh interval
 */
const clearRefreshInterval = () => {
    clearInterval(intervalId);
    intervalId = null;
}

/**
 * Sets the refresh interval
 * @param {number} refreshInterval - the interval to set, in milliseconds
 */
const setRefreshInterval = (refreshInterval) => {
    intervalId = setInterval(clickRefreshButton, refreshInterval);
}

/**
 * Gets the refresh interval value from storage and sets it
 */
const getTimerSelectValue = () => {
    chrome.storage.local.get(["refreshTimerSelectValue"], function (result) {
        const refreshInterval = parseInt(result.refreshTimerSelectValue) * 1000;
        setRefreshInterval(refreshInterval);
    });
}

/**
 * The main function that handles the refresh process
 */
const pluginProcess = () => {
    chrome.storage.local.get(["isRefreshEnabled"], function (result) {
        if (result.isRefreshEnabled) {
            clearRefreshInterval();
            getTimerSelectValue();
        } else {
            clearRefreshInterval();
        }
    });
}

// Initialize the plugin process
pluginProcess();

// Listen for changes to storage and re-run the plugin process
chrome.storage.onChanged.addListener(() => {
    pluginProcess();
});
