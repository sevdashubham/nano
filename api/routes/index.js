var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/getnotes', auth, ctrlProfile.getNotes);
router.get('/addnote', auth, ctrlProfile.addNote);
router.get('/updatenote', auth, ctrlProfile.updateNote);
router.get('/deletenote', auth, ctrlProfile.deleteNote);

// notes


// router.post('/addnote', auth, ctrlNote.addNote());
// router.put('/updatenote', auth, ctrlNote.updateNote());
// router.delete('/deletenote/:id', auth, ctrlNote.deleteNote);
//
// // folders
//
// router.get('/getlabels', auth, ctrlLabel.getLabels);
// router.get('/addlabel/:label', auth, ctrlLabel.addLabel);
// router.delete('/deletelabel/:label', auth, ctrlLabel.deleteLabel);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
