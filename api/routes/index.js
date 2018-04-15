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
router.get('/getlabels', auth, ctrlProfile.getLabels);
router.post('/addnote', auth, ctrlProfile.addNote);
router.put('/updatenote', auth, ctrlProfile.updateNote);
router.delete('/deletenote/:id', auth, ctrlProfile.deleteNote);
router.get('/addlabel/:label', auth, ctrlProfile.addLabel);
router.delete('/deletelabel/:label', auth, ctrlProfile.deleteLabel);

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
