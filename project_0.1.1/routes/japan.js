const express = require('express');
const router = express.Router();
const { Japan } = require('../models/index.js');

router.get('/', function(req, res, next) {
  Japan.findAll()
  .then((japans)=>{
    res.json(japans);
  })
  .catch((err) => {
    console.error(err);
    next(err);
  });
});

module.exports = router;