const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {getitem, getitems, createitem, updateitem, deleteitem} = require('../controllers/usercontrollers')


router.get('/' ,checkAuth,checkRoleAuth(['admin']), getitems)
router.get('/:id',checkAuth,checkRoleAuth(['admin']), getitem)
router.post('/',checkAuth,checkRoleAuth(['admin']), createitem)
router.patch('/:id', checkAuth,checkRoleAuth(['admin']), updateitem)
router.delete('/:id', checkAuth,checkRoleAuth(['admin']), deleteitem)

module.exports = router
