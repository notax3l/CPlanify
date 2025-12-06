console.log("indexes loaded");
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("HITTING HOME PAGE ROUTE");  
  res.render('index', {
    title: 'CPlanify'
  });
});

module.exports = router;
