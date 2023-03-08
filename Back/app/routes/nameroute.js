const express = require('express') //importar express
const router = express.Router() //importando routes de express
const {getitems, newCharacter, editAlly, deleteAlly} = require('../controllers/namecontroller')

router.get('/', getitems) //obtiene todos los aliados
router.post('/newCharacter', newCharacter)
router.put('/editAlly/:id', editAlly)
router.delete('/deleteAlly/:id', deleteAlly)

module.exports = router
