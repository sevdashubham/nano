var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Note = mongoose.model('Note');
var Label = mongoose.model('Label');

/* API utility functions */

/* Get current date in specific format as a string */
var getCurrentDate = function() {

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date();
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

    // Save some default labels
    var label = new Label();
    label.author = user._id;
    label.labels = ['Inspiration', 'Personal', 'Work', 'Miscellaneous'];
    label.save(function(err) {
        if(err) {
            res.status(401).json({
                message: 'Error while generating user labels.'
            });
            return;
        }
    });

    console.log('labels ban rhe');
    // Save some default notes
    var note;

    note = new Note();
    note.title = '';
    note.content = '<p>Easily identify & organize your notes with colors and labels.</p>';
    note.dateCreated = getCurrentDate();
    note.labels = ['Personal', 'Miscellaneous'];
    note.colorClass = 'color4';
    note.isArchived = false;
    note.isTrashed = false;
    note.timestamp = Math.floor(Date.now() / 1000) + 0;
    note.author = user._id;
    note.save(function(err) {
        if(err) {
            res.status(401).json({
                message: 'Error while generating user notes.'
            });
            return;
        }
    });

    console.log('notes ban rhe');

    // note = new Note();
    // note.title = 'Everything at one place';
    // note.content = '<p>Find your notes from any device - laptop, tablet, smartphone.</p><p>Capture a note once, and access it from anywhere.</p>';
    // note.dateCreated = getCurrentDate();
    // note.labels = ['Miscellaneous'];
    // note.colorClass = 'color2';
    // note.isArchived = false;
    // note.isTrashed = false;
    // note.timestamp = Math.floor(Date.now() / 1000) + 1;
    // note.author = user._id;
    // note.save(function(err) {
    //     if(err) {
    //         res.status(401).json({
    //             message: 'Error while generating user notes.'
    //         });
    //         return;
    //     }
    // });
    //
    // note = new Note();
    // note.title = '';
    // note.content = '<p>Done with a note?</p><p>Just send to the <em>archive</em>, where you can always find it later.</p>';
    // note.dateCreated = getCurrentDate();
    // note.labels = [];
    // note.colorClass = 'color8';
    // note.isArchived = false;
    // note.isTrashed = false;
    // note.timestamp = Math.floor(Date.now() / 1000) + 2;
    // note.author = user._id;
    // note.save(function(err) {
    //     if(err) {
    //         res.status(401).json({
    //             message: 'Error while generating user notes.'
    //         });
    //         return;
    //     }
    // });
    //
    // note = new Note();
    // note.title = 'Welcome to ng-notes';
    // note.content = '<p>Capture your ideas effortlessly with NGN. <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f606.svg);">&nbsp;</span><br><br>To add a new note, click on the <strong>+</strong> icon below.</p>';
    // note.dateCreated = getCurrentDate();
    // note.labels = [];
    // note.colorClass = 'color9';
    // note.isArchived = false;
    // note.isTrashed = false;
    // note.timestamp = Math.floor(Date.now() / 1000) + 3;
    // note.author = user._id;
    // note.save(function(err) {
    //     if(err) {
    //         res.status(401).json({
    //             message: 'Error while generating user notes.'
    //         });
    //         return;
    //     }
    // });


    user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};