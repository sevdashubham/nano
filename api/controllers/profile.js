var mongoose = require('mongoose');
var User = mongoose.model('User');
var Note = mongoose.model('Note');
var Label = mongoose.model('Label');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }


};

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
        console.log('notes aaye fine mein');
    });
};

module.exports.getLabels = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var query = {author: req.payload._id};
    Label.findOne(query).exec(function(err, labels) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(labels);
    });
};
module.exports.addLabel = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var label = req.params.label;
    var query = {author: req.payload._id};
    Label.findOneAndUpdate(query, {$push: {labels: label}}).exec(function(err, labels) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(labels);
    });
};

/* Delete a user label */
module.exports.deleteLabel = function(req, res) {

    if(!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: Private profile.'
        });
        return;
    }

    var label = req.params.label;
    var query = {author: req.payload._id};
    Label.findOneAndUpdate(query, {$pullAll: {labels: [label]}}).exec(function(err, labels) {
        if(err)
            res.status(401).json(err);
        else
            res.status(200).json(labels);
    });
};



/* Add a user note */
module.exports.addNote = function(req, res) {
    console.log('addnotee re');
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
        if(err) {
            res.status(401).json(err);
            console.log('notes nhi aaye fine mein');
        }
        else
            res.status(200).json(note);
        console.log('notes aaye fine mein');
    });
};

/* Update a user note */
module.exports.updateNote = function(req, res) {
    console.log('updateotee re');
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
    console.log('delete re');
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
