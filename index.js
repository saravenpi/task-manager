//project task manager

const express = require("express")
const app = express()
var port = 8080
var tasks = ["go to mars", "buy some food", "walk the cat"]

app.use(express.static('public'))

app.get("/", function(req, res) {
  res.sendFile(path.join(public, 'index.html'));
})

app.post("/new", function(req, res) {
  if (req.headers.task) {
    var new_task = req.headers.task
    console.log(`new task: ${new_task}`)
    tasks.push(new_task)
    res.send("successfully added")
  }

});

app.get("/get", function(req, res) {
  console.log("getting tasks:", tasks)
  res.json({
    tasks: tasks
  })
});

app.get("/clear", function(req, res) {
  console.log("clearing all stasks")
  tasks = []
});

app.post("/delete", function(req, res) {

  if (req.headers.taskid) {
    var taskid = req.headers.taskid
    if (taskid > -1) {
      tasks.splice(taskid, 1);
    }
  }

});

app.listen(port, function() {
  console.log(`🌵 - LISTENING ON PORT ${port}`);
})