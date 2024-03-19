var globalINC = '';

window.addEventListener('load', function (evt) {
	console.log('popup.js loaded');

	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'payload.js'
	});;

	chrome.storage.sync.get('username', function(data) {
        console.log('Username currently is ' + data.username);
        document.getElementById('username').value = data.username || '';
    });

	chrome.storage.sync.get('backgroundColor', function(data) {
        let color = data.backgroundColor || '#92620ad2'; 
        document.body.style.backgroundColor = color;
        document.getElementById('colorpicker').value = color;

		console.log('Color currently is ' + color);
    });
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

	if(document.getElementById('username').value == '')
	{
		document.getElementById('errorMessage').textContent = 'Please set your SC Email in settings';
		console.error('Please set your SC Email');
		return;
	} else {
		document.getElementById('errorMessage').textContent = '';	
	}
	var username = document.getElementById('username').value;
	username += '@iastate.edu';
	console.log('Username grabbed: ', username);

	console.log('Form Values: ', {username, incValue, KB, assignmentGroupValue});

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
    }); //TODO make this actually send the form data correctly 

	console.log('Form data sent');
	//TODO flash a sent message onto the popup.html when form is sent? 
});

document.getElementById('settings-icon').addEventListener('click', function() {
    var settingsOptions = document.getElementById('settingsOptions');
    if (settingsOptions.style.display === 'none') {
        settingsOptions.style.display = 'block';
    } else {
        settingsOptions.style.display = 'none';
    }
});

document.getElementById('setButton').addEventListener('click', function() {
    let username = document.getElementById('username').value;

	if(username.includes('@')) {
		document.getElementById('errorMessage').textContent = 'Please enter your NetID without the @iastate.edu';
		console.error('Please enter your NetID without the @iastate.edu');
		return;
	} else {
		document.getElementById('errorMessage').textContent = '';
	}

    chrome.storage.sync.set({username: username}, function() {
        console.log('Username is set to ' + username);
    });
});

function isColorDark(color) {
    var r, g, b, hsp; 
    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    } else {
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp<127.5;
};

document.getElementById('colorpicker').addEventListener('input', function() {
    let color = this.value;
    document.body.style.backgroundColor = color;

    chrome.storage.sync.set({backgroundColor: color}, function() {
        console.log('Background color is set to ' + color);
    });

	document.body.style.color = isColorDark(color) ? 'white' : 'black';
});

document.getElementById('resetButton').addEventListener('click', function() {
    let defaultColor = '#92620ad2';
    document.body.style.backgroundColor = defaultColor;
    document.getElementById('colorpicker').value = defaultColor;
    document.body.style.color = isColorDark(defaultColor) ? 'white' : 'black';

    chrome.storage.sync.set({backgroundColor: defaultColor}, function() {
        console.log('Background color is reset to ' + defaultColor);
    });
});
