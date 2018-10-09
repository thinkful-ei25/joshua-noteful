'use strict';
 const express = require('express');
 // Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
 console.log('Hello Noteful!');

 const { PORT } = require('./config');
// Create an Express application

const app = express();
 // Create a static webserver
const { logger } = require('./middleware/logger');
app.use(express.static('public'));
 // Get All (and search by query)
app.use(logger);
app.get('/api/notes', (req, res) => {
   
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }
   
 });
app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
   /**
   * Verbose solution
   */
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);
   
 });

 app.use(function(req, res, next){
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
 });

 app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
 });
 
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});