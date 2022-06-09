// chrome.storage.onChanged.addListener(function () {
//   chrome.storage.local.get(["value"], function (result) {
//     console.log(`Value currently is ${result.value}`);
//     refreshInterval = result.value;
//     console.log(refreshInterval);
//     setInterval(function () {
//       forceRefresh = function () {
//         iframe = document.querySelector(
//           "#brandBand_2 > div > div > div > div > div.dashboardContainer > iframe"
//         );
//         if (iframe) {
//           refreshButton = iframe.contentDocument.querySelector(
//             "button.slds-button.refresh"
//           );
//           console.log("found Button");
//         }
//         if (refreshButton) {
//           console.log(refreshButton);
//           refreshButton.click();
//         }
//       };
//     }, refreshInterval);
//   });
// });

// chrome.runtime.onStartup.addListener(function executeRefreshes() {
