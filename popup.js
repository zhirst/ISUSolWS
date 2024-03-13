window.addEventListener('load', function (evt) {
	console.log('popup.js loaded');

	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

//TODO grab the INC number from title instead of first field 
chrome.runtime.onMessage.addListener(function (message) {
	console.log('popup.js received message from payload.js');
	
	var title_parts = message.title.split(" | ");
	var title_first_part = title_parts[0]; 

	console.log('INC: ' + title_first_part);
	document.getElementById('title').innerHTML = title_first_part;
});

document.getElementById('sendButton').addEventListener('click', function() {
	console.log('sendButton clicked');

	var incValue = document.getElementById('title').value;
	var kbValue = document.getElementById('kb').value;
	var assignmentGroupValue = document.getElementById('assignmentgroup').value;

	try{
		if(kbValue.toLowerCase().startsWith('kb') && /^\d{7}$/.test(kbValue.slice(2))) {
			return 'KB' + kbValue.slice(2);
		} else {
			throw new Error('Invalid kbValue format. Expected format is "kb" followed by a 7-digit number.');
		}
	} catch(error) {
		console.log('Error formatting kbValue', error);
	}

	console.log('Form Values: ', {incValue, kbValue, assignmentGroupValue});

	var formURL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=mthHA3QB002t6zM5yJw19YVBTy6hCVZEnwuXvhFA35JUODdSNlU0RUlVSlRPUk1MT0w2SktCRVRLQyQlQCN0PWcu';
	var formData = new formData();

	formData.append('QuestionId_r56340fcad985487aaff9636aad9893e7 QuestionInfo_r56340fcad985487aaff9636aad9893e7', incValue);
	formData.append('QuestionId_r015fea291c5f49a69cdb24054e9883d2 QuestionInfo_r015fea291c5f49a69cdb24054e9883d2', kbValue);
	formData.append('QuestionId_r518dab23ce314eb2818a9c0a9b90c11a QuestionInfo_r518dab23ce314eb2818a9c0a9b90c11a', assignmentGroupValue);

	console.log('Sending form data: ', formData);

	fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });

	console.log('Form data sent');
	
	/**
	 * 
	 * 
	 * TODO name field addition
	 * 
	 * TODO test KB value for correct format
	 * 
	 * autofilling form from list/live search of assignment groups 
	 */

	/**
	 * when server sends recieved code, flash a "sent" message
	 * on popup
	 */
})