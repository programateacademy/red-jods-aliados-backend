const express = require('express') //importar express
const router = express.Router() //importando routes de express
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {getitems,getitem, newCharacter, editAlly, deleteAlly} = require('../controllers/namecontroller')

router.get('/',checkAuth,checkRoleAuth(['admin']), getitems)
router.get('/:id',checkAuth,checkRoleAuth(['admin']), getitem)
router.post('/',checkAuth,checkRoleAuth(['admin']), newCharacter)
router.put('/:id',checkAuth,checkRoleAuth(['admin']), editAlly)
router.delete('/:id', checkAuth,checkRoleAuth(['admin']), deleteAlly)

module.exports = router
