$(document).ready(function() {
    $("#register-form").submit(function(event) {
      event.preventDefault();
      // Handle registration form submission
      // e.g., send AJAX request to server to create a new user account
      // and redirect to login page if successful
      window.location.href = "login.html"; // Replace with actual login page URL
    });
  });