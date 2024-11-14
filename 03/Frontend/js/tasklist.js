$(document).ready(function() {
    $("#create-task-btn").click(function() {
      $("#create-task-form").toggle();
    });
  
    $("#create-task-form").submit(function(event) {
      event.preventDefault();
      var title = $("#title").val();
      var description = $("#description").val();
      var priority = $("#priority").val();
      var status = $("#status").val();
      var deadline = $("#deadline").val();
      var task = {
        title: title,
        description: description,
        priority: priority,
        status: status,
        deadline: deadline
      };
      var taskList = $("#task-list");
      var row = $("<tr>");
      row.append($("<td>").text(task.title));
      row.append($("<td>").text(task.description));
      row.append($("<td>").text(task.priority));
      row.append($("<td>").text(task.status));
      row.append($("<td>").text(task.deadline));
      row.append($("<td>").html("<button class='btn btn-primary'>Edit</button> <button class='btn btn-danger'>Delete</button>"));
      taskList.append(row);
      $("#create-task-form")[0].reset();
    });
  });