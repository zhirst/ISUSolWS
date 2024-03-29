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
	document.getElementById('title').value = globalINC;
});

document.getElementById('sendButton').addEventListener('click', function() {
	console.log('sendButton clicked');

	var incValue = document.getElementById('title').value.trim();
	console.log('Raw INC grabbed: ', incValue, 'Formatting...');
	var incNumber = incValue.slice(3);
	if(incNumber.length != 7)
	{ 
		document.getElementById('errorMessage').textContent = 'Please enter a valid INC number';
		console.error('INC number should be exactly 7 digits long'); 
		return;
	} else {
		document.getElementById('errorMessage').textContent = '';
	}
	console.log('INC grabbed: ', incValue);
	
	var kbValue = document.getElementById('kb').value.trim();
	console.log('Raw KB grabbed: ', kbValue, 'Formatting...');
	var kbnumber = kbValue.slice(2);
	if(kbnumber.length != 7)
	{ 
		document.getElementById('errorMessage').textContent = 'Please enter a valid KB number';
		console.error('KB number should be exactly 7 digits long'); 
		return;
	} else {
		document.getElementById('errorMessage').textContent = '';
	}
	var KB = 'KB' + kbnumber;
	console.log('Success formatting kbValue: ', KB);

	var assignmentGroupValue = document.getElementById('myInput').value;
	if(assignmentGroupValue == 'Enter an assignment group' || assignmentGroupValue == '')
	{
		document.getElementById('errorMessage').textContent = 'Please choose an assignment group';
		console.error('Please choose an assignment group');
		return;
	} else {
		document.getElementById('errorMessage').textContent = '';
	}
	console.log('Assignment Group grabbed: ', assignmentGroupValue);

	console.log('Form Values: ', {incValue, KB, assignmentGroupValue});

	var formURL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=mthHA3QB002t6zM5yJw19YVBTy6hCVZEnwuXvhFA35JUODdSNlU0RUlVSlRPUk1MT0w2SktCRVRLQyQlQCN0PWcu';
	var formData = new FormData();

	formData.append('QuestionId_r56340fcad985487aaff9636aad9893e7 QuestionInfo_r56340fcad985487aaff9636aad9893e7', incValue);
	formData.append('QuestionId_r015fea291c5f49a69cdb24054e9883d2 QuestionInfo_r015fea291c5f49a69cdb24054e9883d2', KB);
	formData.append('QuestionId_r518dab23ce314eb2818a9c0a9b90c11a QuestionInfo_r518dab23ce314eb2818a9c0a9b90c11a', assignmentGroupValue);

	console.log('Sending form data: ', formData);
	fetch(formURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    });

	console.log('Form data sent');
})

//TODO flash a sent message onto the popup.html 
//TODO POST error flashing on main html
//TODO name field addition (persistent storage and editing of username in settings page)
//TODO settings/info page (persistent storage and editing of settings)