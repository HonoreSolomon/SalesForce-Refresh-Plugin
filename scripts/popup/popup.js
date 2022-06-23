// Init the toggle value

chrome.storage.local.get(["isRefreshEnabled"], function (result) {
  const storedRefreshCheckedValue = result.isRefreshEnabled;

  const refreshEnableEl = document.getElementById("toggle");

  if (storedRefreshCheckedValue) {
    refreshEnableEl.checked = storedRefreshCheckedValue;
  }

  if (!storedRefreshCheckedValue) {
    refreshEnableEl.checked = false;

    console.log(refreshEnableEl.checked);

    chrome.storage.local.set({ isRefreshEnabled: refreshEnableEl.checked });
  }

  console.log(`isRefreshEnabled: ${result.isRefreshEnabled}`);
});

// Init the select value

chrome.storage.local.get(["refreshTimerSelectValue"], function (result) {
  const storedValue = result.refreshTimerSelectValue;

  const refreshTimerSelectEl = document.getElementById("time");

  if (storedValue) {
    refreshTimerSelectEl.value = storedValue;
  }

  if (!storedValue) {
    refreshTimerSelectEl.value = 90;

    console.log(refreshTimerSelectEl.value);

    chrome.storage.local.set({
      refreshTimerSelectValue: refreshTimerSelectEl.value,
    });
  }

  console.log(
    `setRefreshTimerDropdownValue: ${result.refreshTimerSelectValue}`
  );
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
