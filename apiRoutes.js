const path = require('path');
const fs = require('fs');

//exporting the function for setting up our routes
module.exports = function(app) {
//defining the get route
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });
//defining the post route for saving new note to db.json
  app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);
//write updated saved notes back to db.json file
    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
//send updated notes to client
    res.json(savedNotes);
  });
//delete note route
  app.delete('/api/notes/:id', function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteID = req.params.id;

    console.log(`Deleting note with ID ${noteID} line 28 server`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
//write
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
  });
};
