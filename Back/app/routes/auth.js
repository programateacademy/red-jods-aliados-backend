const express = require('express')
const router = express.Router()

const { registerCtrl, loginCtrl} = require('../controllers/authcontrollers')

//login
router.post('/login', loginCtrl)


//new user
router.post('/register', registerCtrl)


module.exports = router
