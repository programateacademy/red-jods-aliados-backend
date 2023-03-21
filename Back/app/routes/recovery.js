const express = require('express');
const router = express.Router();
const path = require('path');
const checkAuth = require('../middleware/auth');


const { recoverycontroller } = require('../controllers/recoverycontrollers');

router.post('/reset/:token', recoverycontroller );


router.get('/updatepass/:token', checkAuth, (req, res) => {
  const token = req.params.token
  res.render("recovery",{url:token}) //respuesta
  console.log(token)
});
module.exports = router;
