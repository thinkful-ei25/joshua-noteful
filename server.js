'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/notes/', (req, res) => {
    // const { search } = req.query;
    // res.json(search ? data.filter(item => item.title.includes(search)) : data);
    const search = req.query.search;
    if(search){
        let filtered = data.filter(item => {
            return item.title.includes(search);
        });
        res.json(filtered);
    }else{
        res.json(data);
    }
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.json(data.find(item => item.id === Number(id)));
});




app.listen(8080, function () {
    console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});



