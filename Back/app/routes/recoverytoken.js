const express = require('express')
const router = express.Router()
const path = require('path');


const { recoverytoken } = require('../controllers/recoverytokencontrollers')

router.post('/recovery/:token', recoverytoken)

router.get('/update-password/:token', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/recovery.html'));
});

module.exports = router
