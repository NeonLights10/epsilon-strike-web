const express = require('express');
const mongoose = require('mongoose');

const passport = require("passport");
const querystring = require("querystring");

const router = express.Router();

require("dotenv").config();

const Warn = mongoose.model('Warn', 'warns')

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};

router.get('/', secured, (req, res, next) => {
  res.render('strike', { title: 'Strike Database' });
});

/* GET users listing. */
router.get('/strikelist', secured, (req, res, next) => {
  Warn.find({},{},function(e,docs){
  	res.json(docs)
  });
});

/* DELETE to deletestrike */
router.delete('/deletestrike/:id', secured, (req, res, next) => {
	var strikeToDelete = req.params.id;
	Warn.deleteOne({ '_id' : strikeToDelete }, function(err) {
		res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	});
});

module.exports = router;