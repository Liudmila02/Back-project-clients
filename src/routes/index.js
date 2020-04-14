module.exports = function(app){
app.get('/api', (req, res) => {
  console.log(req.body)
  res.status(200).send('Hello')})
};


