chrome.browserAction.onClicked.addListener(() =>
	chrome.tabs.executeScript(null, { file: 'reports.js' })
);