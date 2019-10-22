const app = require('express')()
//Updated the tasks apis
const tasks = [];

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.get('/tasks/:taskId', (req, res) => {
  const task = _.find(tasks, { _id: req.params.taskId });
  console.log(req.params.taskId)
  if (task) {
      res.send(task);
  } else {
      res.status(404).send({ err: 'Task not found' });
  }
});

app.post('/tasks', (req, res) => {
  tasks.push(req.body);
  res.status(201).send(req.body);
});

app.put('/tasks/:taskId', (req, res) => {
  let task = _.find(tasks, { _id: req.params.taskId });
  if (task) {
      task = req.body;
      task._id = req.params.taskId;
      _.remove(tasks, { _id: req.params.taskId });
      tasks.push(task);
      res.send(task);
  } else {
      res.status(404).send({ err: 'Task not found' });
  }
});

app.delete('/tasks/:taskId', (req, res) => {
  const task = _.find(tasks, { _id: req.params.taskId });
  if (task) {
      _.remove(tasks, { _id: req.params.taskId });
      res.status(204).send();
  } else {
      res.status(404).send({ err: 'Task not found' });
  }
});
 
module.exports.app = app;
