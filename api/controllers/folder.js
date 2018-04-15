var mongoose = require('mongoose');
var Label = mongoose.model('Label');

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

/* Add a user label */
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
