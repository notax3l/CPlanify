// Home page route

const express = require('express');
const router = express.Router();

// home page
router.get('/', (req, res) => 
{
  res.render('index', {
    title: 'CPlanify - Plan Like a Boss'
  });
});

module.exports = router;
