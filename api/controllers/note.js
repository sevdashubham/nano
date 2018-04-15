var mongoose = require('mongoose');
var Note = mongoose.model('Note');

/* Get user notes */
module.exports.getNotes = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var query = {author: req.payload._id};
    Note.find(query).exec(function(err, notes) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(notes);
    });
};

/* Add a user note */
module.exports.addNote = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var newNote = req.body;
    newNote.author = req.payload._id;
    var note = new Note(newNote);
    note.save(function(err) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(note);
    });
};

/* Update a user note */
module.exports.updateNote = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var note = req.body;
    var query = {_id: note._id};
    delete note._id;
    delete note.__v;
    Note.findOneAndUpdate(query, note, {upsert: true}).exec(function(err, note) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(note);
    });
};

/* Delete a user note */
module.exports.deleteNote = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var query = {_id: req.params.id};
    Note.remove(query).exec(function(err, result) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(result);
    });
};