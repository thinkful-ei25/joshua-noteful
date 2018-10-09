'use strict';
 const express = require('express');
 // Load array of notes
const data = require('./db/notes');
 console.log('Hello Noteful!');
// Create an Express application
const app = express();
 // Create a static webserver
app.use(express.static('public'));
 // Get All (and search by query)
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
 
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});