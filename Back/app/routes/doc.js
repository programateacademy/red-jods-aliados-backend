const express = require('express')
const router = express.Router()
const path = require('path');
const { cacheInit } = require('../middleware/cache')

router.get('/', cacheInit, (req, res) => {
  res.render("documentation") //respuesta
});

module.exports = router
