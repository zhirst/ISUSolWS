document.getElementById('set-button').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    chrome.storage.sync.set({username: username}, function() {
        console.log('Username is set to ' + username);
    });
});

window.onload = function() {
    chrome.storage.sync.get('username', function(data) {
        document.getElementById('display-username').textContent = data.username;
    });
}

//TODO settings page functionality 
//TODO log of data sent to the form 