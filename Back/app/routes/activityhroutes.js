const express = require('express') //importar express
const { model } = require('mongoose')
const router = express.Router() //importando routes de express
const {getitems, newCharacter, editAlly, deleteAlly} = require('../controllers/namecontroller')

router.get('/', getitems) //obtiene todos los aliados
router.post('/newActivity', Activity)
router.put('/editActivity/:id', Edit)
router.delete('/deleteActivity/:id', DeleteActivity)

module.exports = router
