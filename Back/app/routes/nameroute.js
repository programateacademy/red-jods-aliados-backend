const express = require('express') //importar express
const router = express.Router() //importando routes de express
const checkAuthtoken = require('../middleware/authToken')
const checkRoleAuth = require('../middleware/roleAuth')
const {getitems,getitem, newCharacter, editAlly, deleteAlly} = require('../controllers/namecontroller')
const { cacheInit } = require('../middleware/cache')

router.get('/', checkAuthtoken,checkRoleAuth(['admin']), cacheInit, getitems)
router.get('/:id',checkAuthtoken,checkRoleAuth(['admin']),cacheInit, getitem)
router.post('/',checkAuthtoken,checkRoleAuth(['admin']), newCharacter)
router.put('/:id',checkAuthtoken,checkRoleAuth(['admin']), editAlly)
router.delete('/:id', checkAuthtoken,checkRoleAuth(['admin']), deleteAlly)

module.exports = router
