var globalINC = '';

window.addEventListener('load', function (evt) {
	console.log('popup.js loaded');

	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});

chrome.runtime.onMessage.addListener(function (message) {
	console.log('popup.js received message from payload.js');
	
	var title_parts = message.title.split(" ");
	globalINC = title_parts.find(part => part.startsWith('INC'));

	console.log('INC: ' + globalINC);
	document.getElementById('title').innerHTML = globalINC;
});

document.getElementById('sendButton').addEventListener('click', function() {
	console.log('sendButton clicked');

	var incValue = globalINC;
	console.log('INC grabbed: ', incValue);
	var kbValue = document.getElementById('kb').value;
	console.log('Raw KB grabbed: ', kbValue, 'Formatting...');
	var kbnumber = kbValue.slice(2);
	var KB = 'KB' + kbnumber;
	console.log('Success formatting kbValue: ', KB);
	var assignmentGroupValue = document.getElementById('assignmentgroup').value;
	console.log('Assignment Group grabbed: ', assignmentGroupValue);

	console.log('Form Values: ', {incValue, KB, assignmentGroupValue});

	var formURL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=mthHA3QB002t6zM5yJw19YVBTy6hCVZEnwuXvhFA35JUODdSNlU0RUlVSlRPUk1MT0w2SktCRVRLQyQlQCN0PWcu';
	var formData = new formData();

	formData.append('QuestionId_r56340fcad985487aaff9636aad9893e7 QuestionInfo_r56340fcad985487aaff9636aad9893e7', incValue);
	formData.append('QuestionId_r015fea291c5f49a69cdb24054e9883d2 QuestionInfo_r015fea291c5f49a69cdb24054e9883d2', KB);
	formData.append('QuestionId_r518dab23ce314eb2818a9c0a9b90c11a QuestionInfo_r518dab23ce314eb2818a9c0a9b90c11a', assignmentGroupValue);

	console.log('Sending form data: ', formData);

	fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });

	console.log('Form data sent');

	/**
	 * TODO bug fix: inc value not being thrown in form data object 
	 * TODO name field addition
	 * 
	 * TODO test KB value for correct format
	 * 
	 * autofilling form from list/live search of assignment groups 
	 * TODO change h3 in popup.html 
	 */

	/**
	 * when server sends recieved code, flash a "sent" message
	 * on popup
	 */
})