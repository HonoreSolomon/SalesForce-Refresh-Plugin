// Initialize the toggle value on page load
chrome.storage.local.get(["isRefreshEnabled"], function (result) {
  const storedRefreshCheckedValue = result.isRefreshEnabled;

  // Get the DOM element for the toggle
  const refreshEnableEl = document.getElementById("toggle");

  // Check if there is a stored value and set the toggle accordingly
  if (storedRefreshCheckedValue) {
    refreshEnableEl.checked = storedRefreshCheckedValue;
  } else {
    // If no stored value, set the toggle to false and store the value
    refreshEnableEl.checked = false;
    chrome.storage.local.set({ isRefreshEnabled: refreshEnableEl.checked });
  }

  console.log(`isRefreshEnabled: ${result.isRefreshEnabled}`);
});

// Initialize the select value on page load
chrome.storage.local.get(["refreshTimerSelectValue"], function (result) {
  const storedValue = result.refreshTimerSelectValue;

  // Get the DOM element for the select
  const refreshTimerSelectEl = document.getElementById("time");

  // Check if there is a stored value and set the select accordingly
  if (storedValue) {
    refreshTimerSelectEl.value = storedValue;
  } else {
    // If no stored value, set the select to 90 and store the value
    refreshTimerSelectEl.value = 90;
    chrome.storage.local.set({ refreshTimerSelectValue: refreshTimerSelectEl.value });
  }

  console.log(`setRefreshTimerDropdownValue: ${result.refreshTimerSelectValue}`);
});

// Store checked value on refresh enable button
document.getElementById("toggle").addEventListener("click", function () {
  chrome.storage.local.set({ isRefreshEnabled: this.checked });

  console.log(this.checked);
});

// Store refresh timer select value
document.getElementById("time").addEventListener("change", function () {
  chrome.storage.local.set({
    refreshTimerSelectValue: this.value,
  });

  console.log(this.value);
});
