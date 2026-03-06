const express   = require('express');
const todoRoute = require('./routes/todo.route');
const loggingMiddleware = require('./middleware/logging.middleware');

const app = express();

app.use(express.json()); // parse body JSON
app.use(loggingMiddleware);

app.use('/todos', todoRoute);

console.log("this is dev branch");

console.log("this is dev branch 2");

console.log("this is dev branch 3");

console.log("hehe 3");

console.log("hehe 4");


app.listen(3000, () => console.log('Server running on port 3000'));