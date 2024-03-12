// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});


chrome.runtime.onMessage.addListener(function (message) {
	// Handle the title of the ticket to grab INC 
	var title_parts = message.title.split(" | ");
	var title_first_part = title_parts[0]; 
	document.getElementById('title').innerHTML = title_first_part;
});

document.getElementById('sendButton').addEventListener('click', function() {
	// Get the values from the text boxes
	var kbValue = document.getElementById('kb').value;
	var assignmentGroupValue = document.getElementById('assignmentgroup').value;

	// Create an object to hold the data
	var data = {
		title_first_part: title_first_part,
		kb: kbValue,
		assignmentGroup: assignmentGroupValue
	};

	// Send the data to the background page
	
	/**
	 * can you write me this server side script, 
	 * the data it should have to take in is, ticketnumber, 
	 * kb, assignment group
	 */

	/**
	 * what would the client side code look like for 
	 * being able to send data using a chrome extension
	 */

	/**
	 * when server sends recieved code, flash a "sent" message
	 * on popup
	 */
})