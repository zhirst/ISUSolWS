// Get the input field and the container of the dropdown options
var inputField = document.getElementById('myInput');
var dropdownOptions = document.getElementById('dropdownOptions');

// Initialize the active option index
var activeOptionIndex = -1;

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