const express = require('express')
const {getHomePage, postCreateUser,postUpdateUser, postDeleteUser, postHandleRemoveUser, getCreatePage, getUpdatePage} = require('../controllers/homeController')
const router = express.Router()

router.get('/', getHomePage)
router.get('/create', getCreatePage)
router.get('/update/:id', getUpdatePage)
router.post('/create-user', postCreateUser)
router.post('/update-user', postUpdateUser)
router.post('/delete-user/:id', postDeleteUser)
router.post('/delete-user', postHandleRemoveUser)
module.exports = router