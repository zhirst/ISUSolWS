window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;
});


chrome.runtime.onMessage.addListener(function (message) {
	var title_parts = message.title.split(" | ");
	var title_first_part = title_parts[0]; 
	document.getElementById('title').innerHTML = title_first_part;
});

document.getElementById('sendButton').addEventListener('click', function() {
	var incValue = document.getElementById('title').value;
	var kbValue = document.getElementById('kb').value;
	var assignmentGroupValue = document.getElementById('assignmentgroup').value;

	var formURL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=mthHA3QB002t6zM5yJw19YVBTy6hCVZEnwuXvhFA35JUODdSNlU0RUlVSlRPUk1MT0w2SktCRVRLQyQlQCN0PWcu';
	var formData = new formData();

	formData.append('QuestionId_r56340fcad985487aaff9636aad9893e7 QuestionInfo_r56340fcad985487aaff9636aad9893e7', incValue);
	formData.append('QuestionId_r015fea291c5f49a69cdb24054e9883d2 QuestionInfo_r015fea291c5f49a69cdb24054e9883d2', kbValue);
	formData.append('QuestionId_r518dab23ce314eb2818a9c0a9b90c11a QuestionInfo_r518dab23ce314eb2818a9c0a9b90c11a', assignmentGroupValue);

	fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });


	/**
	 * kb value has a captial kb followed by a 7 digit number (e.g. kb1234567)
	 * 
	 * TODO talk to parents about how they want assignment groups data to be filtered 
	 */

	/**
	 * when server sends recieved code, flash a "sent" message
	 * on popup
	 */
})