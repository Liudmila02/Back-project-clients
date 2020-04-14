const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the clients .',
}));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
 console.log(`Node.js API server is listening on http://localhost:${port}/`);
});