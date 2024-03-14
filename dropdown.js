// Get the input field and the container of different html elements
var inputField = document.getElementById('myInput');
var dropdownOptions = document.getElementById('dropdownOptions');
var showAllCheckbox = document.getElementById('showAllCheckbox');

// Initialize the active option index
var activeOptionIndex = -1;

fetch('data/assignmentgroups.txt')
  .then(response => response.text())
  .then(data => {
    // Split the text file into lines
    const lines = data.split('\n');

    // Get the dropdownOptions div
    const dropdownOptions = document.getElementById('dropdownOptions');

    // For each line, insert it as HTML into the dropdownOptions div
    lines.forEach(line => {
      dropdownOptions.innerHTML += line;
    });
});

// Add an event listener for the input event
inputField.addEventListener('input', function() {
  // Reset the active option index
  activeOptionIndex = -1;

  // Get the current value of the input field
  var inputValue = inputField.value.toUpperCase();

  // Get all the dropdown options
  var options = dropdownOptions.getElementsByTagName('a');

  // Loop through the options and hide those that don't match the input
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var optionText = option.textContent || option.innerText;
    if (inputValue.length > 0 && optionText.toUpperCase().indexOf(inputValue) > -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }

    options[i].addEventListener('click', function(e) {
      // Prevent the default action
      e.preventDefault();
  
      // Set the value of the input field to the text of the clicked option
      inputField.value = this.textContent || this.innerText;

      // Loop through all options and hide them
      for (var j = 0; j < options.length; j++) {
        options[j].style.display = "none";
        }
    });
  }
});

// Add an event listener for the change event
showAllCheckbox.addEventListener('change', function() {
  // Get all the dropdown options
  var options = dropdownOptions.getElementsByTagName('a');

  // Loop through the options and show or hide them based on the state of the checkbox
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if (showAllCheckbox.checked) {
      // If the checkbox is checked, show all the options
      option.style.display = "block";
    } else {
      // If the checkbox is unchecked, hide all the options
      option.style.display = "none";
    }

    // Add event listener for click event on each option
    option.addEventListener('click', function(e) {
      // Prevent the default action
      e.preventDefault();
  
      // Set the value of the input field to the text of the clicked option
      inputField.value = this.textContent || this.innerText;
      // Loop through all options and hide them
      for (var j = 0; j < options.length; j++) {
        options[j].style.display = "none";
      }

      // Deselect the show all checkbox when an item is clicked
      showAllCheckbox.checked = false;
    });
  }
});