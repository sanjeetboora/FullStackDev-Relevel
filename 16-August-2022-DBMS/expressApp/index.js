const express = require('express');
const app = express();
const port = 3000;

let userData = [{
    id: 1,
    name: "Anshul",
    email: "anshul@gmail.com"
},
{
    id: 2,
    name: "Seema",
    email: "seema@gmail.com"
}];

app.get('/users',(req, res) => {
    res.send(userData);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/home',(req, res) => {
    res.send('Welcome to home page!');
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
});
