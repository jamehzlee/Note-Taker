const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to post note`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json')

        const response = {
            status: 'Success',
            body: newNote,
        };
        console.log(response);
        res.json(response);
    }
    else {
        res.json('Error in adding note')
    }
});

module.exports = notes;