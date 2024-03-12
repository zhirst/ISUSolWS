var title = document.title;
// var inc = document.querySelectorAll('.navbar-title-display-value');
// var inc_value;

// if(inc.length > 0) { inc_value = inc[0].innerText; }
// else { inc_value = "Error Grabbing INC"; }

// send the scraped info as a chrome message
chrome.runtime.sendMessage({title: title});