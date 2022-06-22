const selectEl = document.getElementById("time");
const toggleEl = document.getElementById("toggle");
let togglePause = false;

// function changeselected() {
//   let selectedIndex = selectEl.selectedIndex;
//   selectEl[selectedIndex].setAttribute("selected", true);
// }

function selectedText() {
  if (selectEl.selectedIndex == -1) return null;
  return selectEl.options[selectEl.selectedIndex].value;
}

function setStorage() {
  let selectedValue = selectedText();
  let refreshTimer = parseInt(selectedValue) * 100;
  chrome.storage.local.set({ value: refreshTimer }, function () {
    console.log(`Refresh timer is set to ${refreshTimer} seconds`);
  });
}

// if (isChecked) {
chrome.runtime.onStartup.addListener(setStorage);

toggleEl.addEventListener("click", function () {
  togglePause = togglePause ? false : true;
  console.log(togglePause);
  chrome.storage.local.set({ sentinalPause: togglePause }, function () {
    console.log(`pause button is ${togglePause}`);
  });
});

selectEl.addEventListener("change", function () {
  setStorage();
  // changeselected();
});
// }
