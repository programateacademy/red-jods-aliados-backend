const express = require('express')
const router = express.Router()
const checkAuthtoken = require('../middleware/authToken')
const checkRoleAuth = require('../middleware/roleAuth')
const {getitem, getitems, createitem, updateitem, deleteitem} = require('../controllers/usercontrollers')
const { cacheInit } = require('../middleware/cache')


router.get('/', checkAuthtoken,checkRoleAuth(['admin']), cacheInit, getitems)
router.get('/:id',checkAuthtoken,checkRoleAuth(['admin','user']), cacheInit, getitem)
router.post('/',checkAuthtoken,checkRoleAuth(['admin']), createitem)
router.patch('/:id', checkAuthtoken,checkRoleAuth(['admin']), updateitem)
router.delete('/:id', checkAuthtoken,checkRoleAuth(['admin']), deleteitem)

module.exports = router
