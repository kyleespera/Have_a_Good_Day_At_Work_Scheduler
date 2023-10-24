// const dayjs = require("/node_modules/dayjs");

$(function() {
  // Section 1: Initializing the Application

  // Displaying the current date at the top of the page
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);

  // Retrieving and displaying the tasks saved in localStorage
  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var savedTask = localStorage.getItem(hour);
    if (savedTask) {
      $(this).find(".description").val(savedTask);
    }
  });

   // Section 2: Setting up Event Listeners

  // Saving task data to localStorage when the save button is clicked
  $(".saveBtn").on("click", function() {
    var hour = $(this).parent().attr("id"); // Get the id of the containing time-block
    var userInput = $(this).siblings(".description").val(); // Get the user input from the textarea
    localStorage.setItem(hour, userInput); // Save the user input in local storage using the hour as the key
  });

  // Section 3: Updating the User Interface

   // Updating the appearance of the time blocks based on the current time
  var currentHour = dayjs().hour(); 
  // Fetching the current hour
  $(".time-block").each(function() {
    // Extracting the hour from the time block's ID
    var blockHour = parseInt($(this).attr("id").split("-")[1]); 
    if (blockHour < currentHour) {
      // If the time block is in the past
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
       // If the time block represents the current hour
      $(this).removeClass("past future").addClass("present");
    } else {
      // If the time block is in the future
      $(this).removeClass("past present").addClass("future");
    }
  });
});
