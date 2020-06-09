const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController')
const { authenticateUser } = require('../app/middlewares/authentication')
const NgoControlleer = require('../app/controllers/NgoController')

router.post('/NGO', NgoControlleer.create)
router.get('/NGO', NgoControlleer.list)
router.get('/NGO/:id', NgoControlleer.show)
router.put('/NGO/:id', NgoControlleer.update)

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)

module.exports = router;