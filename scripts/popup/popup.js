const selectEl = document.getElementById("time");
// const toggleSwitch = document.getElementById("toggle");
// let isChecked = true;

function setStorage() {
  let selectedValue = selectedText("time");
  let refreshTimer = parseInt(selectedValue) * 100;
  chrome.storage.local.set({ value: refreshTimer }, function () {
    console.log(`Refresh timer is set to ${refreshTimer} seconds`);
  });
}
function selectedText(El) {
  const selectEl = document.getElementById(El);
  if (selectEl.selectedIndex == -1) return null;

  return selectEl.options[selectEl.selectedIndex].value;
}

// function selectedIndex(El) {
//   const selectEl = document.getElementById(El);
//   if (selectEl.selectedIndex == -1) return null;

//   return selectEl.options[selectEl.selectedIndex];
// }
// let isSelected = selectedIndex("time");

// function selectedStorage() {
//   chrome.storage.local.set({ selected: isSelected });

//   isSelected = chrome.storage.local.get(["selected"], function (result) {
//     return result.selected;
//   });
// }

// toggleSwitch.addEventListener("click", () => {
//   isChecked = isChecked ? false : true;
//   console.log(`Switch is ${isChecked}`);
//   chrome.storage.local.set({ checked: isChecked });
//   isChecked = chrome.storage.local.get(["checked"], function (result) {
//     return result.checked;
//   });
// });

// if (isChecked) {
chrome.runtime.onStartup.addListener(() => {
  setStorage();
});
selectEl.onchange = function () {
  setStorage();
  selectedStorage();
};
// }
