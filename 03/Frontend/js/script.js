$(document).ready(function() {
    // Example AJAX call to get tasks (replace with your actual API calls)
    function getTasks() {
      $.ajax({
        url: "/api/tasks", // Replace with your API endpoint
        type: "GET",
        success: function(response) {
          // Process the response (JSON) from the server
          if (response.status === "success") {
            // Populate the task list table
            // ... your logic to add rows to the table using jQuery's DOM manipulation functions
          } else if (response.status === "error") {
            alert(response.message);
          }
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            alert("Error fetching tasks.");
        }
      });
    }
  });