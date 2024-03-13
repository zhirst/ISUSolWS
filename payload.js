console.log('payload.js loaded');

var title = document.title;
chrome.runtime.sendMessage({title: title});

console.log('payload.js sent message to popup.js');