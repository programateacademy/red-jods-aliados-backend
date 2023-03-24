const express = require('express') //importar express
const { model } = require('mongoose')
const { items, editActivity, newActivity, deleteActivity } = require('../controllers/activityhcontroller')
const router = express.Router() //importando routes de express
const { cacheInit } = require('../middleware/cache')
const checkAuthtoken = require('../middleware/authToken')
const checkRoleAuth = require('../middleware/roleAuth')


router.get('/',cacheInit,checkAuthtoken,checkRoleAuth(['admin','user']), items) //obtiene todos los aliados
router.post('/',cacheInit,checkAuthtoken,checkRoleAuth(['admin','user']), newActivity)
router.put('/:id',checkAuthtoken,checkRoleAuth(['admin','user']), editActivity)
router.delete('/:id',checkAuthtoken,checkRoleAuth(['admin','user']), deleteActivity)

module.exports = router
