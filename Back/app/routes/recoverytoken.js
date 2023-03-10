const express = require('express')
const router = express.Router()

const { recoverytoken } = require('../controllers/recoverytokencontrollers')

router.post('/recovery/:token', recoverytoken)

module.exports = router
