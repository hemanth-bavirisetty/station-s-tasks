$(document).ready(function() {
    $("#login-form").submit(function(event) {
      event.preventDefault();
      // Handle login form submission
      // e.g., send AJAX request to server to authenticate user
      // and redirect to task list page if successful
      window.location.href = "tasklist.html"; // Replace with actual task list page URL
    });
  });