'use strict';
 const express = require('express');
 // Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
 console.log('Hello Noteful!');

 const { PORT } = require('./config');
 const { logger } = require('./middleware/logger');
// Create an Express application

const app = express();
app.use(logger);
 // Create a static webserver
app.use(express.static('public'));
 // Get All (and search by query)
app.use(express.json());

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  const updateObj = {};
  const updateFields = ['title', 'content'];
  updateFields.forEach(field => {
    if(field in req.body){
      updateObj[field] = req.body[field];
    }
  });
  notes.update(id, updateObj, (err, item) => {
    if(err) {
      return next(err);
    }
    if(item){
      res.json(item);
    }else{
      next();
    }
  });
});

app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if(err){
      return next(err);
    }
    res.json(list);
  });
 });

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.find(id, (err, item) =>{
    if(err){
      return next(err);
    }
    res.json(item);
  });
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