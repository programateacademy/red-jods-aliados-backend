const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/auth')
const checkRoleAuth = require('../middleware/roleAuth')
const {getitem, getitems, createitem, updateitem, deleteitem} = require('../controllers/usercontrollers')


router.get('/' ,checkAuth,checkRoleAuth(['admin']), getitems)
router.get('/:id', getitem)
router.post('/', createitem)
router.patch('/:id', updateitem)
router.delete('/:id', deleteitem)

module.exports = router
