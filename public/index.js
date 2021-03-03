//on page load:
update();

function update() {
  fetch("/get").then(res => res.json()).then(function(json) {
    console.log(json);
    document.getElementById("tasks").innerHTML = ""
    var list = document.querySelector('#tasks');
    var tasks = json.tasks
    for (var i = 0; i < tasks.length; i++) {
      task = tasks[i]
      let li = document.createElement('li');
      li.textContent = task
      li.setAttribute("onclick", "deletetask(" + i + ");");
      list.append(li);
    }
  });

}

function newtask() {
  var content = document.getElementById("content").value
  if (content.trim() != '') {
    console.log("not empty");
    const json = {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "task": content
      }
    }
    fetch("/new", json).then(function() {
      document.getElementById("content").value = ""
    }).then(update());
  }

}

function deletetask(id) {

  console.log(id);

  const json = {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "taskid": id
    }
  }

  fetch("/delete", json).then(update());
}

function cleartasks() {
  fetch("/clear").then(update());
}