const express = require('express') //importar express
const router = express.Router() //importando routes de express
const {getitems,getitem, newCharacter, editAlly, deleteAlly} = require('../controllers/namecontroller')

router.get('/', getitems)
router.get('/:id', getitem) //obtiene todos los aliados
router.post('/', newCharacter)
router.put('/:id', editAlly)
router.delete('/:id', deleteAlly)

module.exports = router
