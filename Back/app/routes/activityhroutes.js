const express = require('express') //importar express
const { model } = require('mongoose')
const { items, editActivity, newActivity, deleteActivity } = require('../controllers/activityhcontroller')
const router = express.Router() //importando routes de express


router.get('/', items) //obtiene todos los aliados
router.post('/ newActivity', newActivity)
router.put('/ editActivity/:id', editActivity)
router.delete('/ deleteActivity/:id', deleteActivity)

module.exports = router
